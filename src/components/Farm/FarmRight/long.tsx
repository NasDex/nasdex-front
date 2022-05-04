/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */

import { useState, useEffect, useCallback } from 'react'
import '../../../style/Farm/long.less'
import { Input, Select, Button, Skeleton } from 'antd'
import { fixD } from 'utils'
import useModal from '../../../hooks/useModal'
import ConfirmOrder from '../longOrderConfirm/index'
import Notification from '../../../utils/notification'
import { NavLink } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks'
import { useWalletModal } from 'components/WalletModal'
import useAuth from 'hooks/useAuth'
type IconType = 'success' | 'info' | 'error' | 'warning'
import { formatUnits } from 'ethers/lib/utils'
import { upDateFarmCoinSelect, upDateCoinStock } from '../../../state/farm/actions'
import { useFarmState } from 'state/farm/hooks'
import { useCommonState, useProvider } from 'state/common/hooks'
import { upDateOneAssetBaseInfo } from 'state/common/actions'
import { useDispatch } from 'react-redux'
import { getLpPairDetail, LongStakingAddress } from '../../../constants/index'
import { ethers } from 'ethers'
import Erc20Abi from 'constants/abis/erc20.json'
import lpContractAbi from '../../../constants/abis/lpContract.json'
import { getAllowance, getAssetList } from 'utils/getList'
import { useTranslation } from 'react-i18next'
import { useSwapFactoryContract } from 'constants/hooks/useContract'
import { simpleRpcProvider } from 'utils/providers'
const { Option } = Select

const Long: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const openNotificationWithIcon = (type: IconType) => {
    Notification({
      type,
      message: `${t('LongFarm')} ${type}`,
    })
  }
  const dispatch = useDispatch()
  const farmState = useFarmState()
  const commonState = useCommonState()
  const [tokenAamount, setTokenAamount] = useState('')
  const [tokenBamount, setTokenBamount] = useState('')
  const [longConfirm, setLongConfirm] = useState(false)
  const [longConfirmBtn, setLongConfirmBtn] = useState(false)
  const [tokenAPrice, setTokenAPrice] = useState(0)
  const [tokenBPrice, setTokenBPrice] = useState(0)
  const [pid, setPid] = useState('')
  const [pair, setPair] = useState('')
  const [amountActive, setAmountActive] = useState(false)
  const [collateralActive, setCollateralActive] = useState(false)
  const [token0Address, setToken0Addresss] = useState('')
  const [tokenAInputFocus, setTokenAInputFocus] = useState(false)
  const [tokenBInputFocus, setTokenBInputFocus] = useState(false)
  const [isChildTab, setChildTab] = useState(true)
  const [tokenA, setTokenA] = useState(props.assetName)
  const [tokenB, setTokenB] = useState(props.cAssetName)
  const { login, logout } = useAuth()
  const { account } = useActiveWeb3React()
  const { onPresentConnectModal } = useWalletModal(login, logout, account || undefined)
  const library = useProvider()
  const [openConfirmOrder] = useModal(
    <ConfirmOrder
      openNotificationWithIcon={openNotificationWithIcon}
      setLongConfirmBtn={setLongConfirmBtn}
      setLongConfirm={setLongConfirm}
      pid={pid}
      token0Address={token0Address}
      tokenAPrice={tokenAPrice}
      tokenBPrice={tokenBPrice}
      tokenAamount={tokenAamount}
      tokenBamount={tokenBamount}
      tokenA={tokenA}
      tokenB={tokenB}></ConfirmOrder>,
  )
  useEffect(() => {
    if (farmState.farmCoinStock) {
      setTokenA(farmState.farmCoinStock)
    }
    if (farmState.farmCoinSelect) {
      setTokenB(farmState.farmCoinSelect)
    }
  }, [farmState.farmCoinSelect, farmState.farmCoinStock])

  const [allowanceA, setAllowanceA] = useState("")
  const [allowanceB, setAllowanceB] = useState("")
  const getTokenAllowance = useCallback(async(tokenAddress: any, decimal: string, isTokenA: boolean) => {
    if(account !== undefined && account !== null) {
      const contract = new ethers.Contract(tokenAddress, lpContractAbi, library)
      const allowance = await getAllowance(contract, account, LongStakingAddress, decimal )
      isTokenA ? setAllowanceA(allowance.allowance) : setAllowanceB(allowance.allowance)
    }
  }, [account])
  useEffect(() => {
    if(tokenA !== undefined && tokenA !== null && library !== undefined) {
      const tokenADecimal = commonState.assetBaseInfoObj[tokenA].decimals
      const tokenAAddress = commonState.assetBaseInfoObj[tokenA].address
      getTokenAllowance(tokenAAddress, tokenADecimal, true)
    }
  }, [tokenA, account, library])
  useEffect(() => {
    if(tokenB !== undefined && tokenB !== null && library !== undefined) {
      const tokenBDecimal = commonState.assetBaseInfoObj[tokenB].decimals
      const tokenBAddress = commonState.assetBaseInfoObj[tokenB].address
      getTokenAllowance(tokenBAddress, tokenBDecimal, false)
    }
  }, [tokenB, account, library])
  useEffect(()=> {
      if(library !== undefined) {
        const tokenADecimal = commonState.assetBaseInfoObj[tokenA].decimals
        const tokenAAddress = commonState.assetBaseInfoObj[tokenA].address
        getTokenAllowance(tokenAAddress, tokenADecimal, true)
  
        const tokenBDecimal = commonState.assetBaseInfoObj[tokenB].decimals
        const tokenBAddress = commonState.assetBaseInfoObj[tokenB].address
        getTokenAllowance(tokenBAddress, tokenBDecimal, false)
      }
  }, [library])

  const [requestedApproval, setRequestedApproval] = useState(false)
  const handleApprove = useCallback(
    async (asset: any) => {
      const tokenAddress = commonState.assetBaseInfoObj[asset].address
      const contract = new ethers.Contract(commonState.assetBaseInfoObj[asset].address, Erc20Abi, library.getSigner())
      try {
        setRequestedApproval(true)

        const tx = await contract.approve(LongStakingAddress, ethers.constants.MaxUint256)
        const receipt = await tx.wait()

        const tokenAAddress = commonState.assetBaseInfoObj[tokenA].address.toLowerCase()
        const tokenBAddress = commonState.assetBaseInfoObj[tokenB].address.toLowerCase()
        if(tokenAddress.toLowerCase() === tokenAAddress) {
          setAllowanceA("1000000000000000000000000000000000")
        }
        if(tokenAddress.toLowerCase()===tokenBAddress){
          setAllowanceB("1000000000000000000000000000000000")
        }

        const longFarmAllowance = true
        const oneAssetInfo = { ...commonState.assetBaseInfoObj[asset], longFarmAllowance }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: oneAssetInfo }))
        setRequestedApproval(false)
        return receipt.status
      } catch (e: any) {
        if (e.message.includes('transaction was replaced')) {
          let longFarmAllowance: any
          const longFarmResult = await contract.allowance(account, LongStakingAddress)
          const longAllowance = Number(formatUnits(longFarmResult.toString(), commonState.assetBaseInfoObj[asset].decimals))
          if (longAllowance <= 0 && commonState.assetBaseInfoObj[asset]) {
            longFarmAllowance = false
          } else {
            longFarmAllowance = true
          }
          const oneAssetInfo = { ...commonState.assetBaseInfoObj[asset], longFarmAllowance }
          dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: oneAssetInfo }))
          setRequestedApproval(false)
        } else {
          setRequestedApproval(false)
        }
      }
    },
    [account],
  )

  async function handleConfirm() {
    openConfirmOrder()
  }

  const PreciseA = commonState.assetBaseInfoObj[tokenA].fixDPrecise
  const PreciseB = commonState.assetBaseInfoObj[tokenB].fixDPrecise
  useEffect(() => {
    if (!tokenAPrice || !tokenBPrice) {
      return
    } else {
      if (tokenAInputFocus && pair) {
        setTokenBamount('')
        const result = tokenAPrice * Number(tokenAamount)
        if (Number(result) > 0) {
          setTokenBamount(fixD(result.toString(), PreciseB))
        } else {
          setTokenBamount('')
        }
      }
      if (tokenBInputFocus && pair) {
        setTokenAamount('')
        const result = tokenBPrice * Number(tokenBamount)
        if (Number(result) > 0) {
          setTokenAamount(fixD(result.toString(), PreciseA))
        } else {
          setTokenAamount('')
        }
      }
    }
  }, [tokenAPrice, tokenBPrice, tokenAamount, tokenBamount, tokenAInputFocus, tokenBInputFocus])

  useEffect(() => {
    if (!longConfirmBtn) {
      setTokenAamount('')
      setTokenBamount('')
    }
  }, [longConfirmBtn])
  useEffect(() => {
    if (tokenA || tokenB) {
      setTokenAamount('')
      setTokenBamount('')
    }
  }, [tokenA, tokenB])

  const [farmListArray, setFarmListArray] = useState([])

  async function getPid(tokenA: any, tokenB: any) {
    const config = await getAssetList()
    let assetName: any
    let cAssetName: any
    if (commonState.assetBaseInfoObj[tokenA].type == 'asset') {
      assetName = tokenA
      cAssetName = tokenB
    } else {
      assetName = tokenB
      cAssetName = tokenA
    }
    const obj = config.longFarmingInfoPre.find(function (obj: any) {
      return (obj.name == assetName && obj.cAssetName == cAssetName)
    })
    setPid(obj.longId)
  }
  useEffect(() => {
    if (commonState.assetBaseInfoObj[tokenA].address && commonState.assetBaseInfoObj[tokenB].address) {
      getPair()
    }
    if (pair) {
      getReserver(pair)
    }
    getPid(tokenA, tokenB)
  }, [account, tokenA, tokenB, pair])

  const swapFactoryContract = useSwapFactoryContract()

  async function getPair() {
    // const result = await swapFactoryContract.getPair(
    //   commonState.assetBaseInfoObj[tokenA].address,
    //   commonState.assetBaseInfoObj[tokenB].address,
    // )
    // if (Number(formatUnits(result, 18)) > 0) {
    //   setPair(result)
    // } else {
    //   setPair('')
    // }
    const tokenAAddress = commonState.assetBaseInfoObj[tokenA].address
    const tokenBAddress = commonState.assetBaseInfoObj[tokenB].address

    const result = getLpPairDetail(tokenAAddress, tokenBAddress)
    if(result !== undefined) {
      setPair(result.lp)
    }
  }

  async function getReserver(result: string) {
    const customProvider = simpleRpcProvider
    const contract = new ethers.Contract(result, lpContractAbi, customProvider)
    const reserves = await contract.getReserves()
    const token0 = await contract.token0()
    const token1 = await contract.token1()
    const token0Name = commonState.assetsNameInfo[token0]
    const token1Name = commonState.assetsNameInfo[token1]
    const reserves0 = Number(formatUnits(reserves[0], commonState.assetBaseInfoObj[token0Name]?.decimals))
    const reserves1 = Number(formatUnits(reserves[1], commonState.assetBaseInfoObj[token1Name]?.decimals))
    setToken0Addresss(token0)
    if (token0 == commonState.assetBaseInfoObj[tokenA].address) {
      const tokenAPrice = reserves1 / reserves0
      const tokenBPrice = reserves0 / reserves1
      setTokenAPrice(tokenAPrice)
      setTokenBPrice(tokenBPrice)
    } else {
      const tokenAPrice = reserves0 / reserves1
      const tokenBPrice = reserves1 / reserves0
      setTokenAPrice(tokenAPrice)
      setTokenBPrice(tokenBPrice)
    }
  }

  return (
    <div className="long-container">
      <div>
        <div className="short-desc">
          {t('ProvideLiquidity')}
          <NavLink to={`/trade/${tokenB}/${tokenA}`} activeClassName="active">
            <span className="link"> {t('Purchase')}  </span>
          </NavLink>
          {t('or')}&nbsp;
          <NavLink to={`/mint/${tokenA}/${tokenB}`} activeClassName="active">
            <span className="link"> {t('mint')} </span>
          </NavLink>
          {t('nAssets')}.
        </div>
      </div>
      <div className={collateralActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p>{t('Input')}</p>
          <div className="balance">
            {t('Balance')}&nbsp;
            {account ? (
              longConfirm ? (
                <Skeleton.Input style={{ width: 100, height: 20 }} active />
              ) : (
                fixD(commonState.assetBaseInfoObj[tokenA]?.balance, commonState.assetBaseInfoObj[tokenA].fixDPrecise)
              )
            ) : (
              '0.0'
            )}
            {Number(commonState.assetBaseInfoObj[tokenA]?.balance) <= 0 ? null : (
              <Button
                disabled={Number(commonState.assetBaseInfoObj[tokenA]?.balance) > 0 && account ? false : true}
                onClick={() => {
                  setTokenBInputFocus(false)
                  setTokenAamount(fixD(commonState.assetBaseInfoObj[tokenA]?.balance, commonState.assetBaseInfoObj[tokenA].fixDPrecise))
                  setTokenAInputFocus(true)
                }}>
                {t('MAX')}
              </Button>
            )}
          </div>
        </div>
        <div className="trade-price">
          {longConfirmBtn ? (
            <Skeleton.Input style={{ width: 100, height: 20 }} active />
          ) : (
            <Input
              placeholder="0.0"
              value={tokenAamount}
              defaultValue=""
              bordered={false}
              onChange={e => {
                setTokenBInputFocus(false)
                setCollateralActive(true)
                setTokenAInputFocus(true)
                e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,6})?.*$/, '$1')
                setTokenAamount(e.target.value)
              }}
              onClick={() => {
                setCollateralActive(true)
              }}
              onBlur={() => {
                setTokenAInputFocus(false)
                setCollateralActive(false)
              }}
            />
          )}
          <div className="select-box">
            <Select
              defaultValue={tokenA}
              value={tokenA}
              onSelect={LabeledValue => {
                setTokenA(LabeledValue)
                dispatch(upDateCoinStock({ farmCoinStock: LabeledValue }))
              }}
              bordered={false}
              suffixIcon={
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-Under"></use>
                </svg>
              }>
              {commonState.allAssetsListInfo.map((ele: any, index: any) =>
                ele.name !== 'NSDX' && ele.isNoNStableCoin != 1 ? (
                  <Option
                    value={ele.name}
                    disabled={
                      ele.name == tokenB ||
                      commonState.assetBaseInfoObj[ele.name].type == commonState.assetBaseInfoObj[tokenB].type
                    }
                    className="customize-option-label-item"
                    key={index}>
                    <div className="customize-option-label-item">
                      <img src={require(`../../../img/coin/${ele.name}.png`).default} alt="" />
                      <span>{ele.name}</span>
                    </div>
                  </Option>
                ) : null,
              )}
            </Select>
          </div>
        </div>
      </div>

      <div className="long-add">
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-add"></use>
        </svg>
      </div>
      <div className={amountActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p className="amount-text">{t('Input')}</p>
          <div className="balance">
            {t('Balance')}&nbsp;
            {account ? (
              longConfirm ? (
                <Skeleton.Input style={{ width: 100, height: 20 }} active />
              ) : (
                fixD(commonState.assetBaseInfoObj[tokenB]?.balance, commonState.assetBaseInfoObj[tokenB].fixDPrecise)
              )
            ) : (
              '0.0'
            )}
            {Number(commonState.assetBaseInfoObj[tokenB]?.balance) <= 0 ? null : (
              <Button
                disabled={Number(commonState.assetBaseInfoObj[tokenB]?.balance) > 0 && account ? false : true}
                onClick={() => {
                  setTokenAInputFocus(false)
                  setTokenBamount(fixD(commonState.assetBaseInfoObj[tokenB]?.balance, commonState.assetBaseInfoObj[tokenB].fixDPrecise))
                  setTokenBInputFocus(true)
                }}>
                {t('MAX')}
              </Button>
            )}
          </div>
        </div>
        <div className="trade-price">
          {longConfirmBtn ? (
            <Skeleton.Input style={{ width: 100, height: 20 }} active />
          ) : (
            <Input
              placeholder="0.0"
              value={tokenBamount}
              defaultValue=""
              bordered={false}
              onChange={e => {
                setTokenAInputFocus(false)
                setAmountActive(true)
                setTokenBInputFocus(true)
                e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,4})?.*$/, '$1')
                setTokenBamount(e.target.value)
              }}
              onClick={() => {
                setAmountActive(true)
              }}
              onBlur={() => {
                setAmountActive(false)
                setTokenBInputFocus(false)
              }}
            />
          )}
          <div className="select-box">
            <Select
              defaultValue={tokenB}
              value={tokenB}
              bordered={false}
              onSelect={LabeledValue => {
                setTokenB(LabeledValue)
                dispatch(upDateFarmCoinSelect({ farmCoinSelect: LabeledValue }))
              }}
              suffixIcon={
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-Under"></use>
                </svg>
              }>
              {commonState.allAssetsListInfo.map((ele: any, index: any) =>
                ele.name !== 'NSDX' && ele.isNoNStableCoin != 1 ? (
                  <Option
                    value={ele.name}
                    disabled={
                      ele.name == tokenA ||
                      commonState.assetBaseInfoObj[ele.name].type == commonState.assetBaseInfoObj[tokenA].type
                    }
                    className="customize-option-label-item"
                    key={index}>
                    <div className="customize-option-label-item">
                      <img src={require(`../../../img/coin/${ele.name}.png`).default} alt="" />
                      <span>{ele.name}</span>
                    </div>
                  </Option>
                ) : null,
              )}
            </Select>
          </div>
        </div>
      </div>
      {(account && tokenAPrice && tokenBPrice) || (pair && tokenAPrice && tokenBPrice) ? (
        <div className="tx-fee">
          <div className="item">
            <div className="tx-fee-text">{t('Price')}</div>
            <div className="tx-fee-price">
              {isChildTab ? `1 ${tokenA}` : `1 ${tokenB}`} =
              {isChildTab
                ? ` ${fixD(tokenAPrice, commonState.assetBaseInfoObj[tokenB]?.fixDPrecise)} ${tokenB}`
                : ` ${fixD(tokenBPrice, commonState.assetBaseInfoObj[tokenA]?.fixDPrecise)} ${tokenA}`}
              <svg className="icon" aria-hidden="true" onClick={() => setChildTab(!isChildTab)}>
                <use xlinkHref="#Icon-Trade-Active"></use>
              </svg>
            </div>
          </div>

          {tokenBamount || tokenAamount ? (
            <div>
              <div className="item">
                <div className="tx-fee-text">Slippage Tolerance</div>
                <div className="tx-fee-price">{farmState.slippageTolerance}%</div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      {!account ? (
        <Button className="long-farm" onClick={() => onPresentConnectModal()}>
          {t('Connect')}
        </Button>
      ) : !pair ? (
        <Button className="long-farm" disabled>
          {t('InsufficientLiquidity')}
        </Button>
      ) : parseFloat(allowanceA) <= 0 ? (
        <Button className="long-farm" loading={requestedApproval} onClick={() => handleApprove(`${tokenA}`)}>
          <span>{t('Approve')} {tokenA}</span>
        </Button>
      ) : parseFloat(allowanceB) <= 0 ? (
        <Button className="long-farm" loading={requestedApproval} onClick={() => handleApprove(`${tokenB}`)}>
          <span>{t('Approve')} {tokenB}</span>
        </Button>
      ) : Number(tokenAamount) > Number(commonState.assetBaseInfoObj[tokenA]?.balance) ||
        Number(tokenBamount) > Number(commonState.assetBaseInfoObj[tokenB]?.balance) ? (
        <Button disabled className="long-farm">
          {t('Insufficient')}
        </Button>
      ) : (
        <Button
          className="long-farm"
          onClick={() => handleConfirm()}
          disabled={!Number(tokenAamount) || !Number(tokenBamount) || longConfirmBtn}>
          {t('LongFarm')}
        </Button>
      )}
      {/* {allowanceA} / {allowanceB} */}
    </div>
  )
}
export default Long
