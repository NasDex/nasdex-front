import { usePositionsContract } from "constants/hooks/useContract"
import { formatUnits } from "ethers/lib/utils"
import { useCallback } from "react"
import { useCommonState } from "state/common/hooks"
import { fixD } from "utils"
import CalculateRate from "utils/calculateCollateral"
import { getOraclePrice } from "utils/getList"

export default function useProfile() {
    // const { account } = useWeb3React()
    const commonState = useCommonState()
    const PositionContract = usePositionsContract()

    const getPositions = useCallback(async(account:any, assetsNameInfo: any, assetBaseInfoObj: any) => {
        try {
            const startAt = 0
            const limit = 100
            // const assetsNameInfo = commonState.assetsNameInfo
            // const assetBaseInfoObj = commonState.assetBaseInfoObj
            
            if(account === null || account === undefined || account === "") {
                throw new Error(`Account is undefined`)
            }

            const positionList = await PositionContract.getPositions(
                account, 
                startAt,
                limit
            )

            if(positionList.length <= 0) {
                throw new Error(`No positions found for account`)
            }

            const finalResult =  await Promise.all(positionList.map(async (position: any) => {
                const assetAddress = position.assetToken
                const cAssetAddress = position.cAssetToken

                const assetName = assetsNameInfo[assetAddress]
                const cAssetName = assetsNameInfo[cAssetAddress]

                const asset = assetBaseInfoObj[assetName]
                const cAsset = assetBaseInfoObj[cAssetName]

                // Amount sub
                const assetAmountSub = Number(
                    formatUnits(position.assetAmount, asset.decimals).substring(
                        0,
                        formatUnits(position.assetAmount, asset.decimals).indexOf('.') + 8,
                    ),
                )
                const cAssetAmountSub = Number(
                    formatUnits(position.cAssetAmount, cAsset.decimals).substring(
                        0,
                        formatUnits(position.cAssetAmount, cAsset.decimals).indexOf('.') + 8,
                    ),
                ) 

                // oracle price
                const _oraclePromises = []
                _oraclePromises.push(getOraclePrice(assetName))
                if(cAsset.isNoNStablecoin === 1) {
                    _oraclePromises.push(getOraclePrice(cAssetName))
                }
                const oracleResult = await Promise.all(_oraclePromises)
                const assetOraclePrice = oracleResult[0]
                const cAssetOraclePrice = oracleResult[1] === undefined ? 1 :oracleResult[1]

                // cAsset and nAsset value
                const cAssetPrice = cAsset.isNoNStablecoin === 0
                    ? cAsset.unitPrice
                    : cAssetOraclePrice
                const cAssetAmountValue = Number(formatUnits(position.cAssetAmount, cAsset.decimals)) * cAssetPrice
                const nAssetValue =  Number(formatUnits(position.assetAmount, asset.decimals)) * asset.swapPrice

                return {
                    key: position.id.toString(),
                    assetAmount: formatUnits(position.assetAmount, asset.decimals),
                    assetAmountSub: assetAmountSub,
                    assetToken: position.assetToken,
                    cAssetAmount: formatUnits(position.cAssetAmount, cAsset.decimals),
                    cAssetAmountValue: cAssetAmountValue,
                    cAssetAmountSub: cAssetAmountSub,
                    cAssetToken: position.cAssetToken,
                    owner: position.owner,
                    oraclePrice:
                      cAsset.isNoNStableCoin == 0
                        ? assetOraclePrice
                        : fixD(
                            Number(assetOraclePrice) /
                              Number(cAssetOraclePrice),
                            2,
                          ),
                    minCollateral: asset.minCollateral,
                    minCollateralWarning: Number(asset.minCollateral) + 5,
                    assetValue: nAssetValue,
                    assetTokenName: assetName,
                    cAssetTokenName: cAssetName,
                    isShort: position.isShort,
                    cRatio: CalculateRate(
                      fixD(assetAmountSub, 6),
                      fixD(cAssetAmountSub, 6),
                      assetOraclePrice,
                    ),
                }
            }))

            // console.log(`Final result`, finalResult)

            return finalResult

        } catch (err) {
            console.log(`Error in getPositions():`, err)
        } 
    },[])

    return {
        getPositions
    }
}