/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
import react, { useEffect, useState } from 'react'
import { Table, Slider, Button } from 'antd'
import zhanweifu from '../../img/common/zhanweifu.png'
import wallet from '../../img/common/wallet.png'
import { NavLink, useLocation } from 'react-router-dom'
import { usePositionsContract } from 'constants/hooks/useContract'
import { formatUnits } from 'ethers/lib/utils'
import { useCommonState } from 'state/common/hooks'
import errorwaring from '../../img/common/errorwaring@2x.png'
import { useDispatch } from 'react-redux'
import CalculateRate from '../../utils/calculateCollateral'
import { useWeb3React } from '@web3-react/core'
import { useWalletModal } from 'components/WalletModal'
import useAuth from 'hooks/useAuth'
import { fixD } from 'utils'
import { useTranslation } from 'react-i18next'

const PositionTable: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const [dataSource, setDataSource] = useState(props.dataSource)
  const load = props.load
  const { account } = useWeb3React()
  const commonState = useCommonState()
  const { login, logout } = useAuth()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const columns = [
    {
      title: `${t('Ticker')}`,
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: any) => (
        <div className="table-cell">
          {/* <img src={record.logo} alt="" /> */}
          <div className="blanceName">
            <img
              src={record.assetTokenName ? require(`../../img/coin/${record.assetTokenName}.png`).default : { zhanweifu }}
              alt={record.assetTokenName}
            />
            <div>
              <div className={record.cRatio < record.minCollateralWarning ? 'warningBalance' : 'balance'}>
                {record.assetTokenName}
                {record.cRatio < record.minCollateralWarning ? (
                  <div className="blance-text">
                    <img src={errorwaring} alt="" className="warning" />
                    <p className="warningText">
                      Position is close to liquidation.Close the position or deposit more collateral. When collateral
                      ratio drops below the minimum value, any user may immediately liquidate the position.
                    </p>
                  </div>
                ) : null}
              </div>
              <p className="balance-usd recardId">ID:{record.key}</p>
            </div>
            {record.isShort ? <Button className="short">Short</Button> : null}
          </div>
        </div>
      ),
    },
    {
      title: `${t('OraclePrice')}`,
      dataIndex: 'oraclePrice',
      key: 'oraclePrice',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <p className="balance">
            {fixD(record.oraclePrice, 2)} {record.cAssetTokenName}
          </p>
          {/* <p className="balance-usd">$ {record.oraclePriceUsd}</p> */}
          <p className="balance-usd">$ {fixD(record.oraclePrice, 2)}</p>
        </div>
      ),
    },
    {
      title: `${t('MintAmount')}`,
      dataIndex: 'cAssetAmount',
      key: 'cAssetAmount',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <p className="balance">
            {Number(fixD(record.assetAmountSub, commonState.assetBaseInfoObj[record.assetTokenName].fixDPrecise)) < 0.000001 ?
              '<0.000001' : fixD(record.assetAmountSub, commonState.assetBaseInfoObj[record.assetTokenName].fixDPrecise)}{' '}
            {record.assetTokenName}
          </p>
          <p className="balance-usd">
            $ {fixD(record.assetValue, commonState.assetBaseInfoObj[record.assetTokenName].fixDPrecise)}
          </p>
        </div>
      ),
    },
    {
      title: `${t('Collateral')}`,
      dataIndex: 'address',
      key: 'address',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <p className="balance">
            {fixD(record.cAssetAmountSub, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise)}{' '}
            {record.cAssetTokenName}
          </p>
          <p className="balance-usd">
            $ {fixD(record.cAssetAmountValue, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise)}
          </p>
        </div>
      ),
    },
    {
      title: `${t('CollateralRatio')}`,
      dataIndex: 'ratio',
      key: 'ratio',
      align: 'right',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <div className="slider-text">
            <p>
              {record.cRatio}% <span className="balance-usd">Min:{record.minCollateral}%</span>
            </p>
            {/* <p className="risk-level">{record.riskLevel}</p> */}
            {Number(record.cRatio) < (Number(record.minCollateral) + 15) ? (
              <div className="input-btn-min">Higher Risk</div>
            ) : Number(record.cRatio) < (Number(record.minCollateral) + 50) ? (
              <div className="input-btn-middle">Medium Risk</div>
            ) : (
              <div className="input-btn-max">Safe</div>
            )}
          </div>
          <div>
            <Slider
              disabled
              className={[
                'collateral-slider',
                Number(record.cRatio) < (Number(record.minCollateral) + 15)
                  ? 'collateral-slider-min'
                  : Number(record.cRatio) < (Number(record.minCollateral) + 30)
                    ? 'collateral-slider-middle'
                    : 'collateral-slider-max',
              ].join(' ')}
              value={record.cRatio}
              max={300}
            />
          </div>
        </div>
      ),
    },
    {
      title: `${t('Action')}`,
      dataIndex: 'action',
      key: 'action',
      align: 'right',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <Button className="action-btn">
            <NavLink to={`/manage/${record.key}`} activeClassName="active">
              {t('Manage')}
            </NavLink>
          </Button>
        </div>
      ),
    },
  ]

  const pagination = {
    pageSize: 5,
  }
  useEffect(() => {
    if (JSON.stringify(dataSource) !== JSON.stringify(props.dataSource)) {
      setDataSource(props.dataSource)
    }
  }, [props])
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
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={pagination}
            loading={account ? load : false}></Table>
        ) : (
          <Table
            dataSource={[{ key: '1' }]}
            columns={connectWallet}
            pagination={false}
            loading={false}
            showHeader={false}></Table>
        )}
      </div>
      <div className={account ? 'h5-table' : 'h5-noAccount-table'}>
        {dataSource.map((ele, index) => (
          <TableList TableItem={ele} key={index} commonState={commonState}></TableList>
        ))}
      </div>
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
        <div className="tx-fee-text">{t('OraclePrice')}</div>
        <div className="tx-fee-showPrice">
          <p>
            {fixD(record.oraclePrice, 2)} {record.cAssetTokenName}
          </p>
          <span>$ {fixD(record.oraclePrice, 2)}</span>
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">{t('MintAmount')}</div>
        <div className="tx-fee-showPrice">
          <p>
            {Number(fixD(record.assetAmountSub, commonState.assetBaseInfoObj[record.assetTokenName].fixDPrecise)) < 0.000001 ?
              '<0.000001' : fixD(record.assetAmountSub, commonState.assetBaseInfoObj[record.assetTokenName].fixDPrecise)}{' '}
            {record.assetTokenName}
          </p>
          <span>$ {fixD(record.assetValue, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise)}</span>
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">{t('Collateral')}</div>
        <div className="tx-fee-showPrice">
          <p>
            {fixD(record.cAssetAmountSub, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise)}{' '}
            {record.cAssetTokenName}
          </p>
          <span>
            $ {fixD(record.cAssetAmountValue, commonState.assetBaseInfoObj[record.cAssetTokenName].fixDPrecise)}
          </span>
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">{t('CollateralRatio')}</div>
        <div className="tx-fee-showPrice">
          <div className="tx-fee-Collateral">
            <div>
              {record.cRatio}% <span className="balance-usd">Min:{record.minCollateral}%</span>
            </div>
            {Number(record.cRatio) < 165 ? (
              <div className="input-btn-min fee-btn">Higher Risk</div>
            ) : Number(record.cRatio) < 200 ? (
              <div className="input-btn-middle fee-btn">Medium Risk</div>
            ) : (
              <div className="input-btn-max fee-btn">Safe</div>
            )}
          </div>
          <div>
            <Slider
              disabled
              className={[
                'collateral-slider',
                Number(record.cRatio) < 165
                  ? 'collateral-slider-min'
                  : Number(record.cRatio) < 200
                    ? 'collateral-slider-middle'
                    : 'collateral-slider-max',
              ].join(' ')}
              value={record.cRatio}
              max={300}
            />
          </div>
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">{t('Action')}</div>
        <Button>
          <NavLink to={`/manage/${record.key}`} activeClassName="active">
            {t('Manage')}
          </NavLink>
        </Button>
      </div>
    </div>
  )
}
export default PositionTable
