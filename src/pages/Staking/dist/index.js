"use strict";
/** @format */

'use strict'
/** @format */
exports.__esModule = true
var react_1 = require('react')
require('../../style/Staking/staking.less')
var Title_1 = require('../../components/Title')
var index_1 = require('../../components/Staking/StakingLeft/index')
var index_2 = require('../../components/Staking/StakingRight/index')
function Staking() {
  // const dispatch = useDispatch()
  // async function initPrice() {
  //   const price = await getpriceList()
  //   dispatch(setPriceList({priceList: price}))
  // }
  // initPrice()
  return react_1['default'].createElement(
    'div',
    {className: 'stake-container'},
    react_1['default'].createElement(
      'div',
      {className: 'container-center'},
      react_1['default'].createElement(
        'div',
        {className: 'staking-container-center'},
        react_1['default'].createElement(Title_1['default'], {title: 'Stake'}),
        react_1['default'].createElement(
          'div',
          {className: 'container-box'},
          react_1['default'].createElement(index_1['default'], null),
          react_1['default'].createElement(index_2['default'], null),
        ),
      ),
    ),
  )
}
exports["default"] = Staking;
