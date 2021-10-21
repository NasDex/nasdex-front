import react, { useState,useEffect } from 'react'
import {Input,Modal} from 'antd'
import '../../style/Trade/tradeSetting.less'
import { upDateTradeSetting } from '../../../src/state/trade/actions'
import { useDispatch } from 'react-redux'
const defaultOnDismiss = () => null

type TradeSettingProps = {
    onDismiss?: () => void
    poolInfo?: any
}

const slippageArr = ['0.1','0.5','1']
const TradeSetting = ({ onDismiss = defaultOnDismiss }: TradeSettingProps) => {
    const dispatch = useDispatch()
    // const [slippageNum,setSlippageNum] = useState('0')
    const [setting, setSetting] = useState('0')
    useEffect(() => {
        const result = setting
        setSetting(result)
        dispatch(upDateTradeSetting({TradeSetting: result}))
    }, [setting])
    return (
        <Modal title="Setting" width={376} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>

        <div className="trade-setting">
            {/* <div className="trade-setting-header">
                <div className="trade-setting-title">Setting</div>
                <svg className="icon close-notification-icon" aria-hidden="true">
                    <use xlinkHref="#icon-close"></use>
                </svg>
            </div> */}
            <div className="trade-setting-content">
                <div className="slippage-tolerance">Slippage tolerance</div>
                <div className="input-content">
                    {
                        slippageArr.map((ele,key)=>(
                            <div 
                                className={['slippage-item', ele === setting ? 'slippage-item-active' : null].join(' ')}
                                key={key} onClick={() => setSetting(ele)} >{ele}%</div>
                        ))
                    }
                    <Input suffix="%"
                        onClick={() => setSetting('')}
                        value={setting}
                        onChange={e => {
                            e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
                            setSetting(e.target.value)
                            dispatch(upDateTradeSetting({TradeSetting: e.target.value}))
                        }}
                    />
                </div>
            </div>
            <div className="trade-setting-alert">Slippage must be within 2 decimal points</div>
        </div>
        </Modal>
    )
}

export default TradeSetting