/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
import react, { useEffect, useState } from 'react'
import { Table, Slider, Button } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks'
import zhanweifu from '../../img/common/zhanweifu.png'
import { fixD } from 'utils'
import { useWalletModal } from 'components/WalletModal'
import wallet from '../../img/common/wallet.png'
import useAuth from 'hooks/useAuth'
import { useManageState } from 'state/manage/hooks'
import { useCommonState } from 'state/common/hooks'
import { useTranslation } from 'react-i18next'
const PositionTable: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const columns = [
    {
      title: `${t('Ticker')}`,
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: any) => (
        <div className="table-cell">
          {/* <img src={record.logo} alt="" /> */}
          <img
            src={record.assetTokenName ? require(`../../img/coin/${record.assetTokenName}.png`).default : { zhanweifu }}
            alt=""
          />
          {record.assetTokenName}
        </div>
      ),
    },
    {
      title: `${t('SwapPrice')}`,
      dataIndex: 'oraclePrice',
      key: 'oraclePrice',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <p className="balance">
            {fixD(record.swapPrice, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise)}{' '}
            {record.cAssetTokenName}
          </p>
        </div>
      ),
    },
    {
      title: `${t('Balance')}`,
      dataIndex: 'balance',
      key: 'balance',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <p className="balance">
            {fixD(record.assetAmount, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise) < 0.0001
              ? '<0.0001'
              : fixD(record.assetAmount, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise)}
          </p>
        </div>
      ),
    },
    {
      title: `${t('Value')}`,
      dataIndex: 'cAssetAmount',
      key: 'cAssetAmount',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <p className="balance">
            ${' '}
            {fixD(record.value, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise) < 0.0001
              ? '<0.0001'
              : fixD(record.value, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise)}
          </p>
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
          <Button className="action-btn">
            <NavLink to={`/trade/${record.assetTokenName}/${record.cAssetTokenName}`} activeClassName="active">
              {t('Trade')}
            </NavLink>
          </Button>
        </div>
      ),
    },
  ]
  const manageState = useManageState()
  const pagination = {
    pageSize: 5,
  }

  const { account } = useActiveWeb3React()
  const commonState = useCommonState()
  const [load, setLoad] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const infoArr: any = []
  Object.keys(commonState.assetBaseInfoObj).forEach(function (trait) {
    infoArr.push(commonState.assetBaseInfoObj[trait])
  })
  async function getPositions() {
    const result: any = []

    if(load) {
      console.log(`Ongoing positions processing, skip this turn`)
      return
    }

    setLoad(true)

    if(infoArr.length <= 0) {
      console.log(`No info arr`)
      setLoad(false)
      setDataSource([])
      return
    }

    infoArr.forEach((position: any) => {
      if (position.type == 'asset') {
        if (position.balance > 0) {
          const value = (
            Number(commonState.assetBaseInfoObj[position.name].swapPrice) * Number(position.balance)
          ).toString()
          result.push({
            key: position.id,
            assetAmount: position.balance,
            oraclePrice: 40,
            assetTokenName: position.name,
            cAssetTokenName: 'USDC',
            value: value,
            swapPrice: position.swapPrice,
          })
        }
      }
    })

    result.sort(function (a: any, b: any) {
      return b.value - a.value
    })

    setLoad(false)
    setDataSource(result)
  }
  useEffect(() => {
    if (account) {
      getPositions()
    }
  }, [account, commonState.assetBaseInfoObj])
  
  const { login, logout } = useAuth()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
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
  return (
    <div>
      <div className={account ? 'pc-table-wallet' : 'h5-table-wallet'}>
        {account ? (
          <Table dataSource={dataSource} columns={columns} pagination={pagination}></Table>
        ) : (
          <Table
            dataSource={[{ key: '1' }]}
            columns={connectWallet}
            pagination={false}
            loading={account ? load : false}
            showHeader={false}></Table>
        )}
      </div>
      {
        <div className={account ? 'h5-table' : 'h5-noAccount-table'}>
          {dataSource.map((ele, index) => (
            <TableList TableItem={ele} key={index} commonState={commonState}></TableList>
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
  return (
    <div className="tx-fee">
      <div className="item">
        <div className="tx-fee-text">{t('Ticker')}</div>
        <div className="tx-fee-showPrice">
          <img
            src={record.assetTokenName ? require(`../../img/coin/${record.assetTokenName}.png`).default : { zhanweifu }}
            alt={record.assetTokenName}
          />
          <span>{record.assetTokenName}</span>
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">{t('SwapPrice')}</div>
        <div className="tx-fee-showPrice">
          <p>
            {fixD(record.oraclePrice, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise)}{' '}
            {record.cAssetTokenName}
          </p>
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">{t('Balance')}</div>
        <div className="tx-fee-showPrice">
          <p>{fixD(record.assetAmount, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise)}</p>
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">{t('Value')}</div>
        <div className="tx-fee-showPrice">
          <p>$ {fixD(record.value, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise)}</p>
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">{t('Action')}</div>
        <NavLink to={`/trade/${record.assetTokenName}/${record.cAssetTokenName}`} activeClassName="active">
          {t('Trade')}
        </NavLink>
      </div>
    </div>
  )
}
export default PositionTable
