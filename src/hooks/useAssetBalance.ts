import { ethers } from "ethers"
import { formatUnits } from "ethers/lib/utils"
import { useActiveWeb3React } from "hooks"
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updateAssetsBalances, updateAssetsList, upDateAssetsNameInfo, updateLongFarmAssetsList } from "state/common/actions"
import { useCommonState } from "state/common/hooks"
import { simpleRpcProvider } from "utils/dist/providers"
import { getAssetList } from "utils/getList"
import Erc20Contract from '../../src/constants/abis/erc20.json'

export default function useAssetBalance() {
    const commonState = useCommonState()
    const { account } = useActiveWeb3React()
    const dispatch = useDispatch()
    const customProvider = simpleRpcProvider

    const [assets, setAssets] = useState([])
   
    useEffect(() => {
        setAssets(commonState.assets)
    }, [commonState.assets])

    useEffect(() => {
        if((account !== undefined && account !== null) && 
            (assets !== null && assets !== undefined) 
        ) {
            findAssetsBalance(assets, account)
            
            const timer = setInterval(async() => {
                findAssetsBalance(assets, account)
            }, 10000)
            return () => {
                clearInterval(timer)
            }
        }
    }, [assets, account])
  
    const findAssets = useCallback(async() => {
        const config = await getAssetList()
        const assets = config.assetPre
        const longFarmAssets = config.longFarmingInfoPre
        const assetsNameInfo = config.assetsNameInfo
        dispatch(updateAssetsList({ assets }))
        dispatch(updateLongFarmAssetsList({longFarmAssets}))
        dispatch(upDateAssetsNameInfo(assetsNameInfo))
    }, [])

    const findAssetsBalance = async(assets: any, account:string |null) => {
        const assetBalances:any = {}
        const assetsList = Object.values(assets)

        for(let i = 0; i < assetsList.length; i++) {
            const asset:any = assetsList[i]

            const contract = new ethers.Contract(asset.address, Erc20Contract, customProvider)
            const balanceRaw = await contract.balanceOf(account)
            const balance = formatUnits(balanceRaw, asset.decimals)

            const result = {
                balance,
                balanceRaw: balanceRaw.toString()
            }

            assetBalances[asset.name] = result
        }

        dispatch(updateAssetsBalances({assetBalances}))
    }

    useEffect(() => {
        if(commonState.assets === null || commonState.assets === undefined) {
            findAssets()
        }
    }, [])
}