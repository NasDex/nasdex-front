/** @format */

import react from 'react'
import FarmBanner from '../../img/farm/light-banner@2x.png'
import Title from '../../components/Title'
import FarmPool from '../../components/Farm/farmPool'
import '../../style/Farm/index.less'

const Farm = () => {
  return (
    <div className="farm-container">
      <div className="container-center">
        <Title title="Farm"></Title>
        <div className="farm-banner"></div>
        {/* <img  src={FarmBanner} alt="" /> */}
        <FarmPool></FarmPool>
      </div>
    </div>
  )
}

export default Farm
