/* eslint-disable prettier/prettier */
/** @format */

import useModal from 'hooks/useModal'
import React, { useCallback, useEffect, useState } from 'react'
import CoinLogo from '../../../../img/stake/nas.png'
import auto from '../../../../img/stake/auto.png'
import tip from '../../../../img/common/tips@2x.png'
import StakeCard from '../stake'
import UntakeCard from '../unstake'
import ClaimCard from '../claimAll'
import BigNumber from 'bignumber.js/bignumber'
import CalculatorCard from '../calculator'
import { Button } from 'antd'
import notification from '../../../../utils/notification'
import { useMasterchef, useNSDX, useNSDXVault } from 'constants/hooks/useContract'
import { formatUnits } from 'ethers/lib/utils'
import { useActiveWeb3React } from 'hooks'
import { fixD } from 'utils'
import useApproveFarm from 'hooks/autoStake/useApproveFarm'
import useAuth from 'hooks/useAuth'
import { useWalletModal } from 'components/WalletModal'
import { NSDXPrice, NSDXVaultAddress, MasterChefAddress } from '../../../../constants/index'
import nadxVaultAbi from '../../../../constants/abis/nadxVault.json'
import masterChefAbi from '../../../../constants/abis/masterChef.json'

import { ethers } from 'ethers'
import { getLibrary } from 'utils/getLibrary'
import { useTranslation } from 'react-i18next'
import { simpleRpcProvider } from 'utils/providers'
interface AutoPoolItem {
    pid: string,
    symbol: string,
    poolType: string,
    decimals: number,
    address: string,
    allocPoint: number,
    totalAllocPoint: number,
    nsdxPerBlock: number,
    vaultStakedBalance: number,
    stakedBalance: number,
    balance: number,
}
interface AutoPoolProps {
    AutoPoolListArray: Array<AutoPoolItem>
}

const AutoPool: React.FC<AutoPoolProps> = props => {
    const { AutoPoolListArray } = props
    return (
        <div>
            {AutoPoolListArray.map((ele, key) => (
                <AutoPoolItem autoPoolItem={ele} key={key}></AutoPoolItem>
            ))}
        </div>
    )
}
const AutoPoolItem: React.FC<any> = props => {
    const { t, i18n } = useTranslation()
    const { login, logout } = useAuth()
    const [amount, setAmount] = useState('')
    const [balance, setBalance] = useState('')
    const [isApproved, setIsApproved] = useState(false)
    const [totalLiquidity, setTotalLiquidity] = useState(0)
    const [recentNsdxProfit, setRecentNsdxProfit] = useState(0)
    const [totalPendingNSDXRewards, setTotalPendingNSDXRewards] = useState('')
    const { autoPoolItem } = props
    const MasterChefContract = useMasterchef()
    const NADXContract = useNSDX()
    const NSDXVaultContract = useNSDXVault()
    const { account } = useActiveWeb3React()
    const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
    const [poolInfo, setPoolInfo] = useState({
        allocPoint: 0,
        lastRewardBlock: '',
    })
    async function getPoolInfo() {
        const info: any = {}
        const provider = window.ethereum
        const library = getLibrary(provider) ?? simpleRpcProvider
        const MasterChefContract = new ethers.Contract(MasterChefAddress, masterChefAbi, library)
        const poolInfoItem = await MasterChefContract.poolInfo(autoPoolItem.pid)
        info.lastRewardBlock = poolInfoItem.lastRewardBlock.toString()
        info.allocPoint = poolInfoItem.allocPoint.toString()
        setPoolInfo(info)
        const NSDXVaultContract = new ethers.Contract(NSDXVaultAddress, nadxVaultAbi, library)
        const totalNadx = Number(formatUnits(await NSDXVaultContract.balanceOf(), autoPoolItem.decimals))
        setTotalLiquidity(totalNadx)
    }

    async function getUserInfo() {
        const balance = formatUnits(await NADXContract.balanceOf(account), autoPoolItem.decimals)
        setBalance(fixD(balance, 4))
        const stakedBalance = await NSDXVaultContract.userInfo(account)
        const amountValue = formatUnits(stakedBalance.shares.toString(), autoPoolItem.decimals)
        const cakeAtLastUserAction = formatUnits(stakedBalance.cakeAtLastUserAction.toString(), autoPoolItem.decimals)
        setAmount(fixD(amountValue, 4))
        const pricePerFullShare = formatUnits(await NSDXVaultContract.getPricePerFullShare(), autoPoolItem.decimals)
        const recentNsdxProfit = Number(new BigNumber(amountValue).times(new BigNumber(pricePerFullShare)).minus(cakeAtLastUserAction))
        setRecentNsdxProfit(recentNsdxProfit)
        const totalPendingNSDXRewards = formatUnits(await NSDXVaultContract.calculateTotalPendingNSDXRewards(), autoPoolItem.decimals)
        setTotalPendingNSDXRewards(totalPendingNSDXRewards)
        const totalNadx = Number(formatUnits(await NSDXVaultContract.balanceOf(), autoPoolItem.decimals))
        setTotalLiquidity(totalNadx)

    }


    async function getAllowance() {
        const result = await NADXContract.allowance(account, NSDXVaultAddress)
        const allowance = Number(formatUnits(result.toString(), autoPoolItem.decimals))
        if (account && allowance <= 0) {
            setIsApproved(true)
        } else {
            setIsApproved(false)
        }
    }


    const { onApprove } = useApproveFarm(NADXContract)
    const [requestedApproval, setRequestedApproval] = useState(false)
    const handleApprove = useCallback(async () => {
        try {
            setRequestedApproval(true)
            await onApprove()
            setRequestedApproval(false)
        } catch (e) {
            console.error(e)
        }
    }, [onApprove, account])

    const [apr, setApr] = useState('0')
    const [apy, setApy] = useState('0')
    const [openCalculatorCard] = useModal(<CalculatorCard apr={apr}></CalculatorCard>)

    useEffect(() => {
        async function calculateApr() {
            let aprP: any
            let d365: any
            const tvlF = totalLiquidity
            const price = autoPoolItem.usdPrice
            const day = autoPoolItem.nsdxPerBlock * 43200
            if (Number(autoPoolItem.nsdxPerBlock) && Number(tvlF)) {
                aprP =
                    ((day * (poolInfo.allocPoint / autoPoolItem.totalAllocPoint) * price * 365) /
                        (Number(tvlF) * price)) *
                    100
                const str = Number(aprP) ? Number(aprP) / 365 / 100 : 0
                d365 = ((1 + Number(str)) ** 365 - 1) * 100
                if (Number(d365) > 100000000) {
                    d365 = 'Infinity'
                }
            } else {
                aprP = 'Infinity'
            }
            setApr(fixD(aprP, 2))
            if (d365) {
                setApy(fixD(d365, 2))
            }

        }
        if (totalLiquidity) {
            calculateApr()
        }
    }, [totalLiquidity])


    useEffect(() => {
        let timer: any
        const getBaseData = () => {
            getPoolInfo()
            if (account) {
                getUserInfo()
                getAllowance()
            }
            return getBaseData
        }
        if (MasterChefContract && NADXContract && NSDXVaultContract) {
            timer = setInterval(getBaseData(), 30000)
        }
        return () => {
            clearInterval(timer)
        }
    }, [account, MasterChefContract, NADXContract, NSDXVaultContract])

    const [openStakeCard] = useModal(<StakeCard poolInfo={
        {
            ...autoPoolItem,
            balance,
        }
    } ></StakeCard>)
    const [openUntakeCard] = useModal(<UntakeCard poolInfo={
        {
            ...autoPoolItem,
            amount,
        }
    }></UntakeCard>)


    return (
        <div className="liquidity-item">
            <div className="liquidity-header">
                <div className="liquidity-logo">
                    <img src={CoinLogo} alt="" className="nas-auto-logo" />
                    <div className="liquidity-name liquidity-name-auto">Auto NSDX</div>
                    <div className="auto">
                        <img src={auto} alt="" />
                        <div className="auto-hover">
                            {t('autohover')}
                        </div>
                    </div>
                </div>
            </div>

            <div className="liquidity-bottom liquidity-bottom-auto">
                <div className="total-liquidity">
                    <div className="title">{fixD(totalLiquidity, 4)} </div>
                    <div className="text">{t('TotalStaked')}</div>
                </div>
                <div className="apr">
                    <div className="title">
                        {apy}%
                        <svg className="icon calculator" aria-hidden="true" onClick={openCalculatorCard}>
                            <use xlinkHref="#icon-calculator"></use>
                        </svg>
                    </div>
                    <div className="text">{t('APY')}</div>
                </div>
                {
                    !account ? <Button className="pc-stake-btn" onClick={() => onPresentConnectModal()}>
                        {t('Connect')}
                    </Button> : (!isApproved ? <Button className="pc-stake-btn" onClick={openStakeCard}>
                        {t('Stake')}
                    </Button> : <Button className="pc-stake-btn" onClick={() => handleApprove()} loading={requestedApproval}>
                        {t('Approve')}
                    </Button>)
                }

            </div>
            {
                !account ? <Button className="h5-stake-btn" onClick={() => onPresentConnectModal()}>
                    {t('Connect')}
                </Button> : (!isApproved ? <Button className="h5-stake-btn" onClick={openStakeCard}>
                    {t('Stake')}
                </Button> : <Button className="h5-stake-btn" onClick={() => handleApprove()} loading={requestedApproval}>
                    {t('Approve')}
                </Button>)
            }

            {recentNsdxProfit ? (Number(amount) > 0 ? <span className="line"></span> : null) : (Number(amount) > 0 ? <span className="line"></span> : null)}
            <div className="claim-unstake">
                {
                    recentNsdxProfit ? <div className="claim">
                        <div className="left">
                            <span>{t('RecentNSDXProfit')}</span>
                            <div className="tip">
                                <img src={tip} alt="" className="tip-img" />
                                <div className="tip-hover">
                                    <p>{t('fee')}</p>
                                    <p>{t('within')}</p>
                                    <p>{t('Performance')}</p>
                                </div>
                            </div>
                            <p>{fixD(recentNsdxProfit, 4)}</p>
                        </div>
                    </div> : null
                }
                {
                    Number(amount) > 0 ? <div className="claim">
                        <div className="left">
                            <span>{t('Staked')}</span>
                            <p>{amount}</p>
                        </div>
                        {
                            !account ? <Button className="pc-stake-btn" onClick={() => onPresentConnectModal()}>
                                {t('Connect')}
                            </Button> :
                                (!isApproved ? <Button className="pc-stake-btn" onClick={openUntakeCard}>
                                    {t('Unstake')}
                                </Button> : <Button className="pc-stake-btn" onClick={() => handleApprove()} loading={requestedApproval}>
                                    {t('Approve')}
                                </Button>)
                        }
                    </div> : null
                }

            </div>
        </div>
    )
}

export default AutoPool
