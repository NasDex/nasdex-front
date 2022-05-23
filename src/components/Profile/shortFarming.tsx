/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */

import react, { useEffect, useState } from 'react'
import { Table, Button, Skeleton } from 'antd'
import useModal from '../../hooks/useModal'
import zhanweifu from '../../img/common/zhanweifu.png'
import { formatUnits } from 'ethers/lib/utils'
import wallet from '../../img/common/wallet.png'
import { useWeb3React } from '@web3-react/core'
import { useWalletModal } from 'components/WalletModal'
import useAuth from 'hooks/useAuth'
import { useMultiCallContract, useShortStakingContract } from 'constants/hooks/useContract'
import { useCommonState } from 'state/common/hooks'
import { getOneAssetInfo } from 'utils/getList'
import { fixD } from 'utils/dist'
import { useDispatch } from 'react-redux'
import { upDateTxHash } from 'state/mint/actions'
import OrderNoifcation from '../common/Notification'
type IconType = 'success' | 'info' | 'error' | 'warning'
import Notification from 'utils/notification'
import Claim from './claim'
import { upDateOneAssetBaseInfo } from 'state/common/actions'
import { useTranslation } from 'react-i18next'
const ShortFarming: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const [load, setLoad] = useState(true)
  const { account } = useWeb3React()
  const commonState = useCommonState()
  const { assetsNameInfo, assetBaseInfoObj } = commonState
  const dispatch = useDispatch()
  const { login, logout } = useAuth()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const MultiCallContract = useMultiCallContract()
  const ShortStakingContract = useShortStakingContract()
  const [shortDataSource, setShortDataSource] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [assetTokenName, setAssetTokenName] = useState('')
  const [cAssetTokenName, setCAssetTokenName] = useState('')
  const [clickClaim, setClickClaim] = useState(false)
  const [clickRewardsBtn, setClickRewardsBtn] = useState(false)
  const [profileShortFarmConfirm, setProfileShortFarmConfirm] = useState(false)
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
  function openClaim(assetTokenName: string, lockedToken: string) {
    setAssetTokenName(assetTokenName)
    setCAssetTokenName(lockedToken)
    setClickClaim(true)
  }
  useEffect(() => {
    if (clickClaim) {
      openClaiming()
      setClickClaim(false)
    }
  }, [assetTokenName, cAssetTokenName, clickClaim])
  const [openClaiming] = useModal(
    <Claim
      shortDataSource={shortDataSource}
      assetTokenName={assetTokenName}
      cAssetTokenName={cAssetTokenName}
      setProfileShortFarmConfirm={setProfileShortFarmConfirm}
    ></Claim>,
  )
  function formtDate(date: number) {
    const d = new Date(date * 1000)
    const day = d.getDate()
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    const hour = d.getHours()
    const mins = d.getMinutes()
    const second = d.getSeconds()
    function newDate(newDate: number) {
      let news
      if (newDate < 10) {
        news = '0' + newDate
      } else {
        news = newDate
      }
      return news
    }
    return (
      year +
      '-' +
      newDate(month) +
      '-' +
      newDate(day) +
      ' ' +
      newDate(hour) +
      ':' +
      newDate(mins) +
      ':' +
      newDate(second)
    )
  }

  async function setData() {
    const data: any = []
    for (let i = 0; i < commonState.farmingPositionInfo.length; i++) {
      const ele = commonState.farmingPositionInfo[i]
      const date = Date.parse(new Date().toString()) / 1000
      const shortFarmingInfo = await MultiCallContract.getPositionInfo(ele.positionId)
      const assetsTokenName = assetsNameInfo[shortFarmingInfo.position.assetToken]
      const cAssetsTokenName = assetsNameInfo[shortFarmingInfo.position.cAssetToken]
      const logo = assetsNameInfo[shortFarmingInfo.assetConfig.token]
      const shortReward = await ShortStakingContract.pendingNSDX(shortFarmingInfo.assetConfig.poolId, shortFarmingInfo.position.owner)
      data.push({
        key: shortFarmingInfo.position.id.toString(),
        name: `${assetsTokenName}`,
        date: date,
        Shorted: formatUnits(shortFarmingInfo.position.assetAmount, assetBaseInfoObj[assetsTokenName].decimals),
        Locked:
          Number(shortFarmingInfo.lockInfo.unlockTime.toString()) < date
            ? '0'
            : formatUnits(shortFarmingInfo.lockInfo.lockedAmount, assetBaseInfoObj[cAssetsTokenName].decimals),
        timer: formtDate(shortFarmingInfo.lockInfo.unlockTime.toString()),
        timerString: Number(shortFarmingInfo.lockInfo.unlockTime.toString()),
        logo: logo,
        Unlocked:
          Number(shortFarmingInfo.lockInfo.unlockTime.toString()) > date
            ? '0'
            : formatUnits(shortFarmingInfo.lockInfo.lockedAmount, assetBaseInfoObj[cAssetsTokenName].decimals),
        lockedToken: assetsNameInfo[shortFarmingInfo.position.cAssetToken],
        assetToken: assetsNameInfo[shortFarmingInfo.position.assetToken],
        Rewards: formatUnits(shortReward, assetBaseInfoObj[assetsTokenName].decimals),
        assigned: shortFarmingInfo.lockInfo.assigned,
        poolId: shortFarmingInfo.assetConfig.poolId.toString(),
      })
    }
    if (data) {
      setShortDataSource(data)
      const dataResult = Object.values(
        data.reduce((res: any, item: any) => {
          res[item.name] ? res[item.name].push(item) : (res[item.name] = [item])
          return res
        }, {}),
      )
      const newDataResource: any = []
      dataResult.forEach((ele: any, index: any) => {
        ele.sort(function (a: any, b: any) {
          return a.timerString - b.timerString
        })
        const dataArr = []
        const timerArr: any = []
        ele.map((item: any, index: any) => {
          if (item.timerString > item.date) {
            timerArr.push(ele[index].timer)
          }
        })
        dataArr.push({
          name: ele[0].name,
          assetToken: ele[0].assetToken,
          lockedToken: ele[0].lockedToken,
          Rewards: ele[0].Rewards,
          poolId: ele[0].poolId,
          key: ele.map(item => item.key).join(','),
          Shorted:
            ele.length > 1
              ? ele.map(item => item.Shorted).reduce((pre, next) => Number(pre) + Number(next))
              : ele[0].Shorted,
          Locked:
            ele.length > 1
              ? ele.map(item => item.Locked).reduce((pre, next) => Number(pre) + Number(next))
              : ele[0].Locked,
          Unlocked:
            ele.length > 1
              ? ele.map(item => item.Unlocked).reduce((pre, next) => Number(pre) + Number(next))
              : ele[0].Unlocked,
          timer: timerArr[0] ? timerArr[0] : '',
        })
        newDataResource.push(dataArr[0])
      })
      newDataResource.sort(function (a: any, b: any) {
        if (b.Unlocked - a.Unlocked) {
          b.Locked - a.Locked
        } else {
          return b.Unlocked - a.Unlocked
        }
      })
      setProfileShortFarmConfirm(false)
      setDataSource(newDataResource)
      setLoad(false)
    } else {
      setLoad(false)
    }
  }
  useEffect(() => {
    if (profileShortFarmConfirm) {
      setLoad(true)
    }
    let timer: any
    const getBaseData = () => {
      setData()
      return getBaseData
    }
    if (account && (commonState.farmingPositionInfo || profileShortFarmConfirm)) {
      timer = setInterval(getBaseData(), 10000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [account, profileShortFarmConfirm, commonState.farmingPositionInfo])
  async function clickRewards(id: any) {
    dispatch(upDateTxHash({ hash: '' }))
    setClickRewardsBtn(true)
    try {
      openWaiting()
      const tx = await ShortStakingContract.getReward(id)
      dispatch(upDateTxHash({ hash: tx.hash }))
      openNoifcation()
      const receipt = await tx.wait()
      if (receipt.status) {
        openNotificationWithIcon('success', 'Success')
        const assetNewInfo = await getOneAssetInfo(
          'NSDX',
          commonState.assetBaseInfoObj['NSDX'].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const Info = { ...commonState.assetBaseInfoObj['NSDX'], ...assetNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: Info }))
        setLoad(true)
        setData()
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
  const ShortColumns = [
    {
      title: `${t('Ticker')}`,
      render: (text: any, record: any) => (
        <div className="table-cell">
          <img src={record.name ? require(`../../img/coin/${record.name}.png`).default : { zhanweifu }} alt="" />
          {record.name}
        </div>
      ),
    },
    {
      title: `${t('Shorted')}`,
      dataIndex: 'shorted',
      key: 'shorted',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <p className="balance">
            {record.Shorted < '0.000001'
              ? '<0.000001'
              : fixD(record.Shorted, commonState.assetBaseInfoObj[record.assetToken].fixDPrecise)}{' '}
            {record.assetToken}
          </p>
        </div>
      ),
    },
    {
      title: `${t('FinalUnlockTime')}`,
      dataIndex: 'time',
      key: 'time',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <p className="balance">
            {fixD(record.Locked, commonState.assetBaseInfoObj[record.lockedToken].fixDPrecise)} {record.lockedToken}
          </p>
          {record.timer ? <p className="balance-usd">{record.timer}</p> : null}
        </div>
      ),
    },
    {
      title: `${t('Unlock')}`,
      dataIndex: 'unlocked',
      key: 'unlocked',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <p className="balance">
            {fixD(record.Unlocked, commonState.assetBaseInfoObj[record.lockedToken].fixDPrecise)} {record.lockedToken}
          </p>
          {record.Unlocked > 0 ? (
            <p className="Claim" onClick={() => openClaim(record.assetToken, record.lockedToken)}>
              {t('Withdraw')}
            </p>
          ) : (
            <p className="balance-usd"> {t('Withdraw')} </p>
          )}
        </div>
      ),
    },
    {
      title: `${t('Rewards')}`,
      dataIndex: 'rewards',
      key: 'rewards',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <p className="balance">{fixD(record.Rewards, commonState.assetBaseInfoObj['NSDX'].fixDPrecise)} NSDX</p>
          {Number(fixD(record.Rewards, commonState.assetBaseInfoObj['NSDX'].fixDPrecise)) > 0 ? (
            <p className="Claim" onClick={() => clickRewards(record.poolId)}>
              {t('Claim')}
            </p>
          ) : (
            <p className="balance-usd"> {t('Claim')} </p>
          )}
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
            {/* <LongFarming /> */}
            <h4 className="tableTitle">{t('ShortFarming')}</h4>
            <Table
              dataSource={dataSource}
              columns={ShortColumns}
              pagination={pagination}
              className="shortTable"
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
          <h4 className="tableTitle">{t('ShortFarming')}</h4>
          {dataSource.map((ele, index) => (
            <TableList
              TableItem={ele}
              key={index}
              commonState={commonState}
              openClaim={openClaim}
              clickRewards={clickRewards}></TableList>
          ))}
        </div>
      }
    </div>
  )
}
const TableList: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const record = props.TableItem
  const commonState = props.commonState
  const openClaim = props.openClaim
  const clickRewards = props.clickRewards
  return (
    <div className="tx-fee">
      <div className="item">
        <div className="tx-fee-text">{t('Ticker')}</div>
        <div className="tx-fee-showPrice">
          <img src={record.name ? require(`../../img/coin/${record.name}.png`).default : { zhanweifu }} alt="" />
          <span>{record.name}</span>
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">{t('Shorted')}</div>
        <div className="tx-fee-showPrice">
          <p>
            {record.Shorted < '0.000001'
              ? '<0.000001'
              : fixD(record.Shorted, commonState.assetBaseInfoObj[record.assetToken].fixDPrecise)}{' '}
            {record.assetToken}
          </p>
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">{t('FinalUnlockTime')}</div>
        <div className="tx-fee-showPrice">
          <p>
            {fixD(record.Locked, commonState.assetBaseInfoObj[record.lockedToken].fixDPrecise)} {record.lockedToken}
          </p>
          {record.timer ? <span>{record.timer}</span> : null}
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">{t('Unlock')}</div>
        <div className="tx-fee-showPrice">
          <p className="balance">
            {fixD(record.Unlocked, commonState.assetBaseInfoObj[record.lockedToken].fixDPrecise)} {record.lockedToken}
          </p>
          {record.Unlocked > 0 ? (
            <p
              style={{ color: '#005AFF' }}
              className="balance-usd"
              onClick={() => openClaim(record.assetToken, record.lockedToken)}>
              {t('Withdraw')}
            </p>
          ) : (
            <p style={{ color: '#909db4' }}> {t('Withdraw')} </p>
          )}
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">{t('Rewards')}</div>
        <div className="tx-fee-showPrice">
          <p className="balance">{fixD(record.Rewards, commonState.assetBaseInfoObj['NSDX'].fixDPrecise)} NSDX</p>
          {Number(fixD(record.Rewards, commonState.assetBaseInfoObj['NSDX'].fixDPrecise)) > 0 ? (
            <p style={{ color: '#005AFF' }} className="Claim" onClick={() => clickRewards(record.longId)}>
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
    </div>
  )
}
export default ShortFarming
