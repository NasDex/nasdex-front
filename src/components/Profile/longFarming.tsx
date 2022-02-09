/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */

import react, { useEffect, useState } from 'react'
import { Table, Button, Skeleton } from 'antd'
import useModal from '../../hooks/useModal'
import { formatUnits } from 'ethers/lib/utils'
import wallet from '../../img/common/wallet.png'
import Unstake from './unstake'
import { useWeb3React } from '@web3-react/core'
import { useWalletModal } from 'components/WalletModal'
import useAuth from 'hooks/useAuth'
import { useMasterChefTestContract, useLongStakingContract } from 'constants/hooks/useContract'
import { useCommonState } from 'state/common/hooks'
import { getSwapPrice, getOneAssetInfo, getAssetList } from 'utils/getList'
import { fixD, getpriceList } from 'utils'
import { useDispatch } from 'react-redux'
import { upDateTxHash } from 'state/mint/actions'
import OrderNoifcation from '../common/Notification'
type IconType = 'success' | 'info' | 'error' | 'warning'
import Notification from 'utils/notification'
import { upDateOneAssetBaseInfo } from 'state/common/actions'
import { MasterChefTestAddress, LongStakingAddress } from 'constants/index'
import { parseUnits } from 'ethers/lib/utils'
import { getLibrary } from 'utils/getLibrary'
import { getApr, getRecevied } from 'utils/getAPR'
import { ethers } from 'ethers'
import lTokenAbi from 'constants/abis/ltoken.json'
import { useStakeState } from 'state/stake/hooks'
import { useTranslation } from 'react-i18next'
import { simpleRpcProvider } from 'utils/providers'
const LongFarming: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const [load, setLoad] = useState(true)
  const [clickUnstakeBtn, setClickUnstakeBtn] = useState(false)
  const stakeState = useStakeState()
  const { priceList } = stakeState
  const [poolInfo, setPoolInfo] = useState({})
  const { account } = useWeb3React()
  const commonState = useCommonState()
  const { assetBaseInfoObj } = commonState
  const dispatch = useDispatch()
  const [farmListArray, setFarmListArray] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [confirmSuccess, setConfirmSuccess] = useState('')
  const [profileLongFarmConfirm, setProfileLongFarmConfirm] = useState(false)

  const { login, logout } = useAuth()
  const provider = window.ethereum
  const library = getLibrary(provider) ?? simpleRpcProvider
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const LongStakingContract = useLongStakingContract()
  const MasterChefTestContract = useMasterChefTestContract()
  const [clickRewardsBtn, setClickRewardsBtn] = useState(false)
  const [openWaiting] = useModal(
    <OrderNoifcation
      type="noMessageWaitings"
      title={t('Claim')}
      from="farming"
      message={`${t('confirmWallet')}`}></OrderNoifcation>,
  )
  const openNotificationWithIcon = (type: IconType, message: any) => {
    Notification({
      type,
      message: `${message}`,
    })
  }
  const [openWaringNoifcation] = useModal(
    <OrderNoifcation type="waring" title={t('Claim')} from="farming"></OrderNoifcation>,
  )
  const [openNoifcation] = useModal(<OrderNoifcation type="success" title={t('Claim')} from="farming"></OrderNoifcation>)

  async function setData(id: any) {
    const price = priceList
    const data: any = []
    if (id) {
      setLoad(true)
    }
    const stakedInfo: any = {}
    let longFarmingUserInfo
    let ele
    let oneData
    setProfileLongFarmConfirm(false)
    for (let i = 0; i < farmListArray.length; i++) {
      ele = farmListArray[i]
      oneData = await getData(price, ele, stakedInfo, longFarmingUserInfo)
      if (oneData) {
        data.push(oneData)
      }
    }
    if (data && data.length > 0) {
      data.sort(function (a: any, b: any) {
        return b.Rewards - a.Rewards
      })
      setDataSource(data)
      setLoad(false)
    } else {
      setDataSource([])
      setLoad(false)
    }
    setConfirmSuccess('')
  }

  async function getData(price: any, ele: any, stakedInfo: any, longFarmingUserInfo: any) {
    if (ele.longId == '') {
      longFarmingUserInfo = await MasterChefTestContract.userInfo(Number(ele.id), account)
    } else {
      longFarmingUserInfo = await LongStakingContract.userInfo(Number(ele.longId), account)
    }
    if (Number(formatUnits(longFarmingUserInfo.amount, assetBaseInfoObj[ele.name].decimals)) > 0) {
      const poolInfo = await getApr(
        price,
        ele,
        MasterChefTestContract,
        LongStakingContract,
        account,
        MasterChefTestAddress,
        LongStakingAddress,
        formatUnits,
        lTokenAbi,
        ethers,
        library,
        commonState,
        longFarmingUserInfo,
      )

      const obj = {
        key: ele.longId,
        id: ele.name == 'NSDX' ? ele.id : ele.longId,
        name: `${ele.name} - ${ele.cAssetName} LP`,
        assetTokenName: ele.name,
        cAssetTokenName: ele.cAssetName,
        APR: poolInfo.longAprP < 100000000 ? fixD(poolInfo.longAprP, 2) : 'Infinity',
        Rewards: formatUnits(poolInfo.Reward, assetBaseInfoObj[ele.name].decimals),
        Staked: formatUnits(longFarmingUserInfo.amount, assetBaseInfoObj[ele.name].decimals),
        longId: ele.longId,
        longAllocPoint: poolInfo.info.longAllocPoint,
        totalStakedNum: poolInfo.totalStakedNum,
        longRootPid: ele.name == 'NSDX' ? '' : poolInfo.longPoolInfoItem.rootPid.toString(),
        assetStaked:
          ele.name == 'NSDX'
            ? formatUnits(longFarmingUserInfo.amount, assetBaseInfoObj[ele.name].decimals)
            : poolInfo.asset,
        cAssetStaked: ele.name == 'NSDX' ? null : poolInfo.cAsset,
      }
      return obj
    }
  }

  async function clickRewards(id: any) {
    dispatch(upDateTxHash({ hash: '' }))
    setClickRewardsBtn(true)
    try {
      openWaiting()
      const tx = await LongStakingContract.getReward(id)
      dispatch(upDateTxHash({ hash: tx.hash }))
      openNoifcation()
      const receipt = await tx.wait()
      if (receipt.status) {
        openNotificationWithIcon('success', 'Success')
        setData(id)
        const assetNewInfo = await getOneAssetInfo(
          'NSDX',
          commonState.assetBaseInfoObj['NSDX'].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const Info = { ...commonState.assetBaseInfoObj['NSDX'], ...assetNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: Info }))
      } else {
        openWaringNoifcation()
        openNotificationWithIcon('error', 'Error')
      }
      setClickRewardsBtn(false)
    } catch (error: any) {
      if (error.message.includes('transaction was replaced')) {
        const assetNewInfo = await getOneAssetInfo(
          'NSDX',
          commonState.assetBaseInfoObj['NSDX'].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const Info = { ...commonState.assetBaseInfoObj['NSDX'], ...assetNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: Info }))
      } else {
        openWaringNoifcation()
        openNotificationWithIcon('error', error.message)
      }
      setClickRewardsBtn(false)
      return
    }
  }

  function clickUnstake(poolInfo: any) {
    setPoolInfo(poolInfo)
    setClickUnstakeBtn(true)
  }
  useEffect(() => {
    if (clickUnstakeBtn) {
      setIsModalVisible(true)
      setClickUnstakeBtn(false)
    }
  }, [poolInfo, clickUnstakeBtn])
  useEffect(() => {
    let timer: any
    const getBaseData = () => {
      setData('')
      return getBaseData
    }
    if (account && farmListArray.length > 0) {
      timer = setInterval(getBaseData(), 5000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [account, farmListArray])
  useEffect(() => {
    getLongFarmingInfo()
  }, [account])
  async function getLongFarmingInfo() {
    const config = await getAssetList()
    setFarmListArray(config.longFarmingInfoPre)
    if (config.longFarmingInfoPre.length <= 0) {
      setLoad(false)
    }
  }
  useEffect(() => {
    if (account && confirmSuccess) {
      setData(confirmSuccess)
    }
  }, [account, confirmSuccess])
  useEffect(() => {
    if (profileLongFarmConfirm) {
      setIsModalVisible(false)
    }
  }, [profileLongFarmConfirm])
  const connectWallet = [
    {
      render: (text: any, record: any) => (
        <div className="walletZhanWei">
          <img src={wallet} alt="" />
          <Button onClick={() => onPresentConnectModal()}>{t('ConnectWallet')}</Button>
        </div>
      ),
    },
  ]
  const longColumns = [
    {
      title: `${t('PoolName')}`,
      render: (text: any, record: any) => (
        <div className="table-cell">
          <img
            style={{ width: '64px' }}
            src={require(`../../img/coin/${record.assetTokenName}-${record.cAssetTokenName}.png`).default}
            alt=""
          />
          {record.name}
        </div>
      ),
    },
    {
      title: `${t('APR')}`,
      dataIndex: 'APR',
      key: 'APR',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <div className="balance">{!record.APR ? <Skeleton active paragraph={{ rows: 0 }} /> : `${record.APR}%`}</div>
        </div>
      ),
    },
    {
      title: `${t('Staked')}`,
      dataIndex: 'Staked',
      key: 'Staked',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <p className="balance">
            {record.assetStaked < '0.000001'
              ? '<0.000001'
              : fixD(record.assetStaked, commonState.assetBaseInfoObj[record.assetTokenName].fixDPrecise)}{' '}
            {record.assetTokenName}
          </p>
          {record.name == 'NSDX' ? null : (
            <p className="balance" style={{ marginTop: '10px' }}>
              {record.cAssetStaked < '0.0001'
                ? '<0.0001'
                : fixD(record.cAssetStaked, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise)}{' '}
              {record.cAssetTokenName}
            </p>
          )}
        </div>
      ),
    },
    {
      title: `${t('Rewards')}`,
      dataIndex: 'Rewards',
      key: 'Rewards',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <p className="balance">{fixD(record.Rewards, commonState.assetBaseInfoObj['NSDX'].fixDPrecise)} NSDX</p>
          {Number(fixD(record.Rewards, commonState.assetBaseInfoObj['NSDX'].fixDPrecise)) > 0 ? (
            <p
              className="Claim"
              onClick={() =>
                record.assetTokenName == 'NSDX' ? clickRewards(record.longId) : clickRewards(record.longId)
              }>
              {t('Claim')}
            </p>
          ) : (
            <p className="balance-usd"> {t('Claim')} </p>
          )}
        </div>
      ),
    },

    {
      title: `${t('Action')}`,
      dataIndex: 'address',
      key: 'address',
      align: 'right',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <Button className="action-btn" onClick={() => clickUnstake(record)}>
            {t('Unstake')}
          </Button>
        </div>
      ),
    },
  ]

  const pagination = {
    pageSize: 5,
  }
  return (
    <div>
      <div className={account ? 'pc-table-wallet' : 'h5-table-wallet'}>
        {account ? (
          <div>
            <h4 className="tableTitle">{t('Farming')}</h4>
            <Table
              dataSource={dataSource}
              columns={longColumns}
              pagination={pagination}
              loading={account ? load : false}></Table>
          </div>
        ) : (
          <Table
            dataSource={[{ key: '1' }]}
            columns={connectWallet}
            pagination={false}
            loading={false}
            showHeader={false}></Table>
        )}
      </div>
      {
        <div className={account ? 'h5-table' : 'h5-noAccount-table'}>
          <h4 className="tableTitle">{t('Farming')}</h4>
          {dataSource.map((ele, index) => (
            <TableList
              TableItem={ele}
              key={index}
              commonState={commonState}
              clickRewards={clickRewards}
              clickUnstake={clickUnstake}></TableList>
          ))}
        </div>
      }
      {isModalVisible ? <Unstake poolInfo={poolInfo}
        setIsModalVisible={setIsModalVisible}
        setProfileLongFarmConfirm={setProfileLongFarmConfirm}
        setConfirmSuccess={setConfirmSuccess}
      ></Unstake> : null}
    </div>
  )
}
const TableList: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const record = props.TableItem
  const commonState = props.commonState
  const clickUnstake = props.clickUnstake
  const clickRewards = props.clickRewards
  return (
    <div>
      <div className="tx-fee">
        <div className="item">
          <div className="tx-fee-text">{t('PoolName')}</div>
          <div className="tx-fee-showPrice">
            <img
              style={{ width: '64px' }}
              src={require(`../../img/coin/${record.assetTokenName}-${record.cAssetTokenName}.png`).default}
              alt=""
            />
            <span>{record.name}</span>
          </div>
        </div>
        <div className="item">
          <div className="tx-fee-text">{t('APR')}</div>
          <div className="tx-fee-showPrice">
            {!record.APR ? <Skeleton active paragraph={{ rows: 0 }} /> : `${record.APR}%`}
          </div>
        </div>
        <div className="item">
          <div className="tx-fee-text">{t('Staked')}</div>
          <div className="tx-fee-showPrice">
            <p>
              {fixD(record.assetStaked, commonState.assetBaseInfoObj[record.assetTokenName].fixDPrecise)}{' '}
              {record.assetTokenName}
            </p>
            <p>
              {fixD(record.cAssetStaked, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise)}{' '}
              {record.cAssetTokenName}
            </p>
          </div>
        </div>
        <div className="item">
          <div className="tx-fee-text">{t('Rewards')}</div>
          <div className="tx-fee-showPrice">
            <p className="balance">{fixD(record.Rewards, commonState.assetBaseInfoObj['NSDX'].fixDPrecise)} NSDX</p>
            {Number(fixD(record.Rewards, commonState.assetBaseInfoObj['NSDX'].fixDPrecise)) > 0 ? (
              <p
                style={{ color: '#005AFF' }}
                className="Claim"
                onClick={() =>
                  record.assetTokenName == 'NSDX' ? clickRewards(record.longId) : clickRewards(record.longId)
                }>
                {t('Claim')}
              </p>
            ) : (
              <p className="balance-usd" style={{ color: '#909db4' }}>
                {' '}
                {t('Claim')}{' '}
              </p>
            )}
          </div>
        </div>
        <div className="item">
          <div className="tx-fee-text">{t('Action')}</div>
          <Button className="action-btn" onClick={() => clickUnstake(record)}>
            {t('Unstake')}
          </Button>
        </div>
      </div>
      ))
    </div>
  )
}
export default LongFarming
