/** @format */

import react, { useEffect, useState } from 'react'
import '../../style/Farm/farmPool.less'
import { useActiveWeb3React } from 'hooks'
import NSDXPoolItem from './NSDXpoolItem'
import FarmPoolItem from './nSTAPoolItem'
import { getAssetList } from 'utils/getList'
import { useDispatch } from 'react-redux'

const FarmPoolList = () => {
  const { account } = useActiveWeb3React()
  const [farmListArray, setFarmListArray] = useState([])
  const dispatch = useDispatch()
  async function getLongFarmingInfo() {
    const config = await getAssetList()
    setFarmListArray(config.longFarmingInfo)
  }
  useEffect(() => {
    getLongFarmingInfo()
  }, [account])
  return (
    <div className="farm-pool-list">
      {farmListArray.map((ele: any, key: any) =>
        ele.name == 'NSDX' ?
          <NSDXPoolItem farmPoolItem={farmListArray[0]}></NSDXPoolItem>
          : <FarmPoolItem farmPoolItem={ele} key={key}></FarmPoolItem>,
      )}
    </div>
  )
}

export default FarmPoolList
