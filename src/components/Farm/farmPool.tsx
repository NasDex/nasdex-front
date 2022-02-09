/** @format */

import react, { useEffect, useState } from 'react'
import '../../style/Farm/farmPool.less'
import { useActiveWeb3React } from 'hooks'
import NSDXPoolItem from './NSDXpoolItem'
import FarmPoolItem from './nSTAPoolItem'
import { getAssetList } from 'utils/getList'
import { useDispatch } from 'react-redux'

interface ProfileCardProps {
  priceList?: any
}
const FarmPoolList: React.FC<ProfileCardProps> = props => {
  const { account } = useActiveWeb3React()
  const [farmListArray, setFarmListArray] = useState([])
  const dispatch = useDispatch()
  async function getLongFarmingInfo() {
    const config = await getAssetList()
    setFarmListArray(config.longFarmingInfoPre)
  }
  useEffect(() => {
    getLongFarmingInfo()
  }, [account])
  return (
    <div className="farm-pool-list">
      {farmListArray ? farmListArray.map((ele: any, key: any) =>
        ele.name == 'NSDX' ?
          <NSDXPoolItem farmPoolItem={farmListArray[0]} priceList={props.priceList}></NSDXPoolItem>
          : <FarmPoolItem farmPoolItem={ele} key={key} priceList={props.priceList}></FarmPoolItem>,
      ) : null}
    </div>
  )
}

export default FarmPoolList
