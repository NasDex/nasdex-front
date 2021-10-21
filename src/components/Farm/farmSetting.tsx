import react, { useState } from 'react'
import {Input,Modal} from 'antd'
import '../../style/Farm/FarmSetting.less'

const defaultOnDismiss = () => null

type TradeSettingProps = {
    onDismiss?: () => void
    poolInfo?: any
}

const slippageArr = ['0.1','0.5','1']
const FarmSetting = ({ onDismiss = defaultOnDismiss }: TradeSettingProps) => {
    const [slippageNum,setSlippageNum] = useState('0')
    const [setting,setSetting] = useState('0')
    return (
        <Modal title="Setting" width={376} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>

        <div className="farm-setting">
            {/* <div className="trade-setting-header">
                <div className="trade-setting-title">Setting</div>
                <svg className="icon close-notification-icon" aria-hidden="true">
                    <use xlinkHref="#icon-close"></use>
                </svg>
            </div> */}
            <div className="farm-setting-content">
                <div className="slippage-tolerance">Slippage tolerance</div>
                <div className="input-content">
                    {
                        slippageArr.map((ele,key)=>(
                            <div 
                                className={['slippage-item', ele === slippageNum ? 'slippage-item-active' : null].join(' ')}
                                key={key} onClick={() => setSlippageNum(ele)} >{ele}%</div>
                        ))
                    }
                    <Input suffix="%"
                        onClick={() => setSlippageNum('')}
                        value={setting}
                        onChange={e => {
                            e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
                            setSetting(e.target.value)
                        }}
                    />
                </div>
            </div>
            <div className="farm-setting-alert">Slippage must be within 2 decimal points</div>
        </div>
        </Modal>
    )
}

export default FarmSetting