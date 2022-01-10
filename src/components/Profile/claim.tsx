/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */

import react, { useEffect, useState } from 'react'
import { Table, Slider, Button, Modal } from 'antd'
import useModal from '../../hooks/useModal'
import { useWeb3React } from '@web3-react/core'
import { useShortLockContract } from 'constants/hooks/useContract'
import { useCommonState } from 'state/common/hooks'
import { getOneAssetInfo } from 'utils/getList'
import { useTranslation } from 'react-i18next'
import { fixD } from 'utils/dist'
import { useDispatch } from 'react-redux'
import { upDateTxHash } from 'state/mint/actions'
import OrderNoifcation from '../common/Notification'
type IconType = 'success' | 'info' | 'error' | 'warning'
import Notification from 'utils/notification'
import { upDateOneAssetBaseInfo } from 'state/common/actions'

const defaultSetProfileShortFarmConfirm = () => null
interface props {
  shortDataSource: any
  assetTokenName: string
  cAssetTokenName: string
  setProfileShortFarmConfirm?: (profileShortFarmConfirm: any) => void
  onDismiss?: () => void
}
const defaultOnDismiss = () => null
const Claim: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const { shortDataSource, assetTokenName, cAssetTokenName, setProfileShortFarmConfirm } = props
  const { account } = useWeb3React()
  const commonState = useCommonState()
  const dispatch = useDispatch()
  const ShortLockContract = useShortLockContract()
  const [openWaiting] = useModal(
    <OrderNoifcation
      type="noMessageWaitings"
      title="Unlocked"
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
    <OrderNoifcation type="waring" title="Unlocked" from="farming"></OrderNoifcation>,
  )
  const [openNoifcation] = useModal(<OrderNoifcation type="success" title="Unlocked" from="farming"></OrderNoifcation>)
  async function clickUnlock(id: any) {
    dispatch(upDateTxHash({ hash: '' }))
    try {
      openWaiting()
      const tx = await ShortLockContract.unlock(id)
      dispatch(upDateTxHash({ hash: tx.hash }))
      openNoifcation()
      const receipt = await tx.wait()
      if (receipt.status) {
        setProfileShortFarmConfirm(true)
        const assetNewInfo = await getOneAssetInfo(
          cAssetTokenName,
          commonState.assetBaseInfoObj[cAssetTokenName].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const Info = { ...commonState.assetBaseInfoObj[cAssetTokenName], ...assetNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: Info }))
        openNotificationWithIcon('success', 'Success')
      } else {
        openWaringNoifcation()
        openNotificationWithIcon('error', 'Error')
      }
    } catch (error: any) {
      if (error.message.includes('transaction was replaced')) {
        const assetNewInfo = await getOneAssetInfo(
          cAssetTokenName,
          commonState.assetBaseInfoObj[cAssetTokenName].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const Info = { ...commonState.assetBaseInfoObj[cAssetTokenName], ...assetNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: Info }))
      } else {
        openWaringNoifcation()
        openNotificationWithIcon('error', error.message)
      }
      return
    }
  }
  const ShortColumns = [
    {
      title: 'Position ID',
      render: (text: any, record: any) => <div className="table-cell">{record.key}</div>,
    },
    {
      title: 'Unlocked',
      dataIndex: 'unlocked',
      key: 'unlocked',
      render: (text: any, record: any) => (
        <div className="table-cell">
          {record.date > record.timerString ? (
            <p className="balance">
              {fixD(record.Unlocked, commonState.assetBaseInfoObj[record.lockedToken].fixDPrecise)} {record.lockedToken}
            </p>
          ) : (
            '0.0'
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
          {record.Unlocked > 0 ? (
            <Button
              className="action-btn"
              onClick={() => {
                clickUnlock(record.key)
              }}>
              Withdraw
            </Button>
          ) : (
            <Button className="action-btn" disabled>
              Withdraw
            </Button>
          )}
        </div>
      ),
    },
  ]
  const [load, setLoad] = useState(true)
  const pagination = {
    pageSize: 5,
  }
  return (
    <div>
      <div className={account ? 'pc-table-wallet' : 'h5-table-wallet'}>
        {account ? (
          <div>
            <h4 className="tableTitle">Withdraw</h4>
            <Table
              dataSource={shortDataSource}
              columns={ShortColumns}
              pagination={pagination}
              className="shortTable"
            ></Table>
          </div>
        ) : (
          <Table
            dataSource={[{ key: '1' }]}
            pagination={false}
            loading={false}
            showHeader={false}></Table>
        )}
      </div>
    </div>
  )
}
const Claiming = ({ onDismiss = defaultOnDismiss,
  shortDataSource, assetTokenName,
  setProfileShortFarmConfirm = defaultSetProfileShortFarmConfirm,
  cAssetTokenName }: props) => {
  const { account } = useWeb3React()
  const [dataSource, setDataSource] = useState([])
  const data: any = []
  function handleData(shortDataSource: any, assetTokenName: any) {
    shortDataSource.forEach((ele: any, index: any) => {
      if (ele.assetToken == assetTokenName && ele.Unlocked > 0) {
        data.push(ele)
      }
    })
    if (data) {
      setDataSource(data)
    }
  }
  useEffect(() => {
    handleData(shortDataSource, assetTokenName)
  }, [account])
  return (
    <Modal
      shortDataSource={dataSource}
      assetTokenName={assetTokenName}
      width={420}
      footer={null}
      visible={true}
      onOk={onDismiss}
      onCancel={onDismiss}>
      <Claim
        shortDataSource={dataSource}
        assetTokenName={assetTokenName}
        cAssetTokenName={cAssetTokenName}
        setProfileShortFarmConfirm={setProfileShortFarmConfirm}
      />
    </Modal>
  )
}
export default Claiming
