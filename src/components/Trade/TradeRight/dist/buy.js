/** @format */

'use strict'
/* eslint-disable @typescript-eslint/no-var-requires */
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
};
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = {next: verb(0), throw: verb(1), return: verb(2)}),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return {value: op[1], done: false}
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return {value: op[0] ? op[1] : void 0, done: true}
    }
  }
exports.__esModule = true
var react_1 = require('react')
require('../../../style/Trade/buy.less')
var antd_1 = require('antd')
var utils_1 = require('utils')
var useModal_1 = require('../../../hooks/useModal')
var index_1 = require('../buyOrderConfirm/index')
var notification_1 = require('../../../utils/notification')
var hooks_1 = require('hooks')
var WalletModal_1 = require('components/WalletModal')
var useAuth_1 = require('hooks/useAuth')
var hooks_2 = require('state/common/hooks')
var hooks_3 = require('state/trade/hooks')
var index_2 = require('components/common/approve/index')
var index_3 = require('constants/index')
var useContract_1 = require('constants/hooks/useContract')
var utils_2 = require('ethers/lib/utils')
var icon_swap_normal_light_png_1 = require('../../../img/swap/icon-swap-normal-light.png')
var icon_swap_disabled_light_png_1 = require('../../../img/swap/icon-swap-disabled-light.png')
var icon_swap_hover_light_png_1 = require('../../../img/swap/icon-swap-hover-light.png')
var getLibrary_1 = require('utils/getLibrary')
var lpContract_json_1 = require('../../../constants/abis/lpContract.json')
var ethers_1 = require('ethers')
var actions_1 = require('../../../state/trade/actions')
var react_redux_1 = require('react-redux')
var hooks_4 = require('state/mint/hooks')
var react_2 = require('react')
// import coinImg from '../../img/coin/USDC@2x.png'
var Option = antd_1.Select.Option
var Buy = function (props) {
  var _a, _b, _c, _d, _e, _f, _g, _h
  // const h = React.createElement
  var mintState = hooks_4.useMintState()
  var hash = mintState.hash
  var openNotificationWithIcon = function (type) {
    notification_1['default']({
      type: type,
      message: 'Swap ' + type,
      description: react_2['default'].createElement(
        'a',
        {href: 'https://mumbai.polygonscan.com/tx/' + hash, target: '_blank'},
        'View on Explorer',
      ),
    }
    // const tradeState = useTradeState()
    // const [tradeAmount, setAmount] = useState('')
    var _j = react_1.useState(false), amountActive = _j[0], setAmountActive = _j[1]
    var _k = react_1.useState(false), collateralActive = _k[0], setCollateralActive = _k[1]
    var _l = useAuth_1["default"](), login = _l.login, logout = _l.logout
    var account = hooks_1.useActiveWeb3React().account
    var commonState = hooks_2.useCommonState()
    var tradeState = hooks_3.useTradeState()
    var _m = WalletModal_1.useWalletModal(login, logout, account || undefined), onPresentConnectModal = _m.onPresentConnectModal, onPresentAccountModal = _m.onPresentAccountModal
    var _o = react_1.useState('USDT'), tokenA = _o[0], setTokenA = _o[1]
    var _p = react_1.useState('nSTA'), tokenB = _p[0], setTokenB = _p[1]
    var _q = react_1.useState(''), tokenFeeAamount = _q[0], setFeeTokenAamount = _q[1]
    var _r = react_1.useState(''), tokenFeeBamount = _r[0], setFeeTokenBamount = _r[1]
    var _s = react_1.useState(''), tokenAamount = _s[0], setTokenAamount = _s[1]
    var _t = react_1.useState(''), tokenBamount = _t[0], setTokenBamount = _t[1]
    var _u = react_1.useState(''), tokenABalance = _u[0], setTokenABalance = _u[1]
    var _v = react_1.useState(false), tokenApprove = _v[0], setTokenApprove = _v[1]
    var _w = react_1.useState(false), isChangeTokenA = _w[0], setIsChangeTokenA = _w[1]
    var _x = react_1.useState(false), isChangeTokenB = _x[0], setIsChangeTokenB = _x[1]
    var _y = react_1.useState(true), isTab = _y[0], setIsTab = _y[1]
    // 获取swap代币余额
    var assetBaseInfoObj = commonState.assetBaseInfoObj
    react_1.useEffect(function () {
      if (commonState.assetBaseInfoObj[tokenA].balance) {
        setTokenABalance(commonState.assetBaseInfoObj[tokenA].balance)
      }
      if (tokenA || commonState.assetBaseInfoObj[tokenA].swapContractAllowance) {
        setTokenA(tokenA)
        setTokenApprove(commonState.assetBaseInfoObj[tokenA].swapContractAllowance)
      }
    },
    [tokenA, commonState.assetBaseInfoObj],
  )
  // 判断有没有授权
  var _z = react_1.useState(
      (_a = commonState.assetBaseInfoObj[tokenA]) === null || _a === void 0 ? void 0 : _a.address,
    ),
    tokenAaddress = _z[0],
    setTokenAaddress = _z[1]
  var _0 = react_1.useState(
      (_b = commonState.assetBaseInfoObj[tokenB]) === null || _b === void 0 ? void 0 : _b.address,
    ),
    tokenBaddress = _0[0],
    setTokenBaddress = _0[1]
  var _1 = react_1.useState(''),
    pair = _1[0],
    setPair = _1[1]
  react_1.useEffect(
    function () {
      if (tokenAaddress && tokenBaddress && account) {
        getPair()
      }
      if (pair) {
        getReserver(pair)
      }
    },
    [tokenAaddress, tokenBaddress, account, pair],
  )
  // 创建工厂合约
  var swapFactoryContract = useContract_1.useSwapFactoryContract()
  // 判断是否可以swap
  function getPair() {
    return __awaiter(this, void 0, void 0, function () {
      var result
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, swapFactoryContract.getPair(tokenAaddress, tokenBaddress)]
          case 1:
            result = _a.sent()
            if (Number(utils_2.formatUnits(result, 18)) > 0) {
              setPair(result)
            } else {
              setPair('')
            }
            return [2 /*return*/]
        }
      })
    })
  }
  var _2 = react_1.useState(0),
    priceTo = _2[0],
    setPriceTo = _2[1]
  var _3 = react_1.useState(0),
    priceForm = _3[0],
    setPriceForm = _3[1]
  var _4 = react_1.useState(0),
    reserves0 = _4[0],
    setReserves0 = _4[1]
  // 获取汇率
  function getReserver(result) {
    return __awaiter(this, void 0, void 0, function () {
      var provider, library, contract, reserves, reserves0, reserves1, priceTo, priceForm
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            provider = window.ethereum
            library = getLibrary_1.getLibrary(provider)
            contract = new ethers_1.ethers.Contract(result, lpContract_json_1['default'], library)
            return [4 /*yield*/, contract.getReserves()]
          case 1:
            reserves = _a.sent()
            reserves0 = Number(utils_2.formatUnits(reserves[0], 18))
            reserves1 = Number(utils_2.formatUnits(reserves[1], 18))
            setReserves0(reserves0)
            priceTo = reserves0 / reserves1
            priceForm = reserves1 / reserves0
            setPriceForm(priceForm)
            setPriceTo(priceTo)
            return [2 /*return*/]
        }
      })
    })
  }
  var dispatch = react_redux_1.useDispatch()
  var tokenAContract = useContract_1.useErc20Contract(tokenAaddress)
  // console.log(tokenA,'tokenA######')
  var onApprove = index_2['default'](tokenA, tokenAContract, index_3.SwapRouterAddress, 'swap').onApprove
  var _5 = react_1.useState(false),
    requestedApproval = _5[0],
    setRequestedApproval = _5[1]
  var handleApprove = react_1.useCallback(
    function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var e_1
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3])
              setRequestedApproval(true)
              return [4 /*yield*/, onApprove()]
            case 1:
              _a.sent()
              setRequestedApproval(false)
              return [3 /*break*/, 3]
            case 2:
              e_1 = _a.sent()
              console.error(e_1)
              return [3 /*break*/, 3]
            case 3:
              return [2 /*return*/]
          }
        })
    }); }, [onApprove, account])
    var _6 = react_1.useState(''), minimumReceived = _6[0], setMinimumReceived = _6[1]
    var swapRouterContract = useContract_1.useSwapRouterContract()
    react_1.useEffect(function () {
      if (tokenAamount && isChangeTokenA) {
        getAmountsOut()
      }
      if (tokenBamount && isChangeTokenB) {
        getAmountsIn()
      }
      // if (tokenAamount && isChangeTokenA && account) {
      //   setAmountB(tokenAamount)
      // }
      // if (tokenBamount && isChangeTokenB && account) {
      //   setAmountA(tokenBamount)
      // }
    },
    [tokenAamount, tokenBamount],
  )
  var fixDPreciseA = assetBaseInfoObj[tokenA].fixDPrecise
  function getAmountsOut() {
    return __awaiter(this, void 0, void 0, function () {
      var parseAmount, amountsOut, tokenBAmount
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            parseAmount = utils_2.parseUnits(tokenAamount, 18)
            return [4 /*yield*/, swapRouterContract.getAmountsOut(parseAmount, [tokenAaddress, tokenBaddress])]
          case 1:
            amountsOut = _a.sent()
            tokenBAmount = utils_2.formatUnits(amountsOut[1], 18)
            setTokenBamount(utils_1.fixD(tokenBAmount, fixDPreciseA))
            return [2 /*return*/]
        }
      })
    })
  }
  var fixDPreciseB = assetBaseInfoObj[tokenB].fixDPrecise
  function getAmountsIn() {
    return __awaiter(this, void 0, void 0, function () {
      var parseAmount, amountsIn, tokenBAmount
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            parseAmount = utils_2.parseUnits(tokenBamount, 18)
            return [
              4 /*yield*/,
              swapRouterContract.getAmountsIn(parseAmount, [tokenAaddress, tokenBaddress]),
              // console.log(amountsIn.toString(),'amountsIn##')
            ]
          case 1:
            amountsIn = _a.sent()
            tokenBAmount = utils_2.formatUnits(amountsIn[0], 18)
            setTokenAamount(utils_1.fixD(tokenBAmount, fixDPreciseB))
            return [2 /*return*/]
        }
      })
    })
  }
  // function setAmountA(value: string) {
  //   const price = isTab ? Number(value) * priceForm : Number(value) * priceTo
  //   const amountA = price.toString()
  //   setTokenAamount(fixD(amountA, fixDPreciseB))
  // }
  // function setAmountB(value: string) {
  //   const price = isTab ? Number(value) * priceTo : Number(value) * priceForm
  //   const amountB = price.toString()
  //   setTokenBamount(fixD(amountB, fixDPreciseB))
  // }
  var openConfirmOrder = useModal_1['default'](
    react_2['default'].createElement(index_1['default'], {
      openNotificationWithIcon: openNotificationWithIcon,
      tradeInfo: {
        tokenA: tokenA,
        tokenB: tokenB,
        tokenAamount: tokenAamount,
        tokenBamount: tokenBamount,
        // tokenFeeAamount: tokenFeeAamount,
        // tokenFeeBamount: tokenFeeBamount,
        tokenAaddress: tokenAaddress,
        tokenBaddress: tokenBaddress,
        fixDPreciseA: fixDPreciseA,
        fixDPreciseB: fixDPreciseB,
        priceForm: priceForm,
        priceTo: priceTo,
        isTab: isTab,
      },
    }),
  )[0]
  function tabCoin() {
    var templateTokenA = tokenA
    var templateTokenB = tokenB
    var templateTokenAamount = tokenAamount.toString()
    var templateTokenBamount = tokenBamount.toString()
    var templateTokenAaddress = tokenBaddress
    var templateTokenBaddress = tokenAaddress
    dispatch(actions_1.upDateCoinStock({tradeCoinStock: tokenB}))
    dispatch(actions_1.upDateTradeCoinSelect({tradeCoinSelect: tokenA}))
    setTokenBamount(templateTokenAamount)
    setTokenAamount(templateTokenBamount)
    setTokenA(templateTokenB)
    setTokenB(templateTokenA)
    setTokenAaddress(templateTokenAaddress)
    setTokenBaddress(templateTokenBaddress)
    setIsTab(!isTab)
  }
  react_1.useEffect(
    function () {
      tabCoin()
    },
    [tradeState.isTab],
  )
  // 当前代币余额
  // const [selectCoinBalance,setSelectCoinBalance] = useState()
  react_1.useEffect(
    function () {
      if (props.assetName) {
        setTokenB(props.assetName)
        dispatch(actions_1.upDateTradeCoinSelect({tradeCoinSelect: props.assetName}))
      }
      if (props.cAssetName) {
        setTokenA(props.cAssetName)
        dispatch(actions_1.upDateCoinStock({tradeCoinStock: props.cAssetName}))
      }
    },
    [props],
  )
  react_1.useEffect(
    function () {
      if (!commonState.btnOpenConfirm) {
        setTokenBamount('')
        setTokenAamount('')
      }
    },
    [commonState.btnOpenConfirm],
  )
  return react_2['default'].createElement(
    'div',
    {className: 'buy-container'},
    react_2['default'].createElement(
      'div',
      {className: amountActive ? 'amount-active amount' : 'amount'},
      react_2['default'].createElement(
        'div',
        {className: 'amount-header'},
        react_2['default'].createElement('p', {className: 'amount-text'}, 'Pay'),
        react_2['default'].createElement(
          'p',
          {className: 'balance'},
          'Balance ',
          account
            ? commonState.openConfirm
              ? react_2['default'].createElement(antd_1.Skeleton.Input, {style: {width: 100, height: 20}, active: true})
              : tokenA && ((_c = commonState.assetBaseInfoObj[tokenA]) === null || _c === void 0 ? void 0 : _c.balance)
              ? utils_1.fixD(
                  (_d = commonState.assetBaseInfoObj[tokenA]) === null || _d === void 0 ? void 0 : _d.balance,
                  6,
                )
              : '0.0'
            : '0.0',
          react_2['default'].createElement(
            antd_1.Button,
            {
              disabled:
                Number(
                  utils_1.fixD(
                    (_e = commonState.assetBaseInfoObj[tokenA]) === null || _e === void 0 ? void 0 : _e.balance,
                    6,
                  ),
                ) > 0 && account
                  ? false
                  : true,
              onClick: function () {
                var _a
                // setIsChangeTokenA(true)
                setTokenAamount(
                  utils_1.fixD(
                    (_a = commonState.assetBaseInfoObj[tokenA]) === null || _a === void 0 ? void 0 : _a.balance,
                    6,
                  ),
                )
                setIsChangeTokenA(true)
                setIsChangeTokenB(false)
              },
            },
            'MAX',
          ),
        ),
      ),
      react_2['default'].createElement(
        'div',
        {className: 'trade-price'},
        commonState.btnOpenConfirm
          ? react_2['default'].createElement(antd_1.Skeleton.Input, {style: {width: 100, height: 20}, active: true})
          : react_2['default'].createElement(antd_1.Input, {
              placeholder: '0.0',
              value: tokenAamount,
              defaultValue: '',
              bordered: false,
              onChange: function (e) {
                e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,8})?.*$/, '$1')
                setTokenAamount(e.target.value)
                setIsChangeTokenA(true)
                setIsChangeTokenB(false)
              },
              onClick: function () {
                setAmountActive(true)
              },
              onBlur: function () {
                setAmountActive(false)
              },
            }),
        react_2['default'].createElement(
          'div',
          {className: 'select-box'},
          react_2['default'].createElement(
            antd_1.Select,
            // style={{width: 98}}
            {
              // style={{width: 98}}
              dropdownMatchSelectWidth: 120,
              value: tokenA,
              bordered: false,
              onSelect: function (labeledValue) {
                var _a
                setTokenA(labeledValue)
                setTokenAaddress(
                  (_a = commonState.assetBaseInfoObj[labeledValue]) === null || _a === void 0 ? void 0 : _a.address,
                )
                dispatch(actions_1.upDateCoinStock({tradeCoinStock: labeledValue}))
                getPair()
                setIsChangeTokenA(true)
                setIsChangeTokenB(false)
                // setAmountB(tokenAamount)
              },
              suffixIcon: react_2['default'].createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                react_2['default'].createElement('use', {xlinkHref: '#icon-Under'}),
              ),
            },
            commonState.allAssetsListInfo.map(function (ele, index) {
              return ele.name !== 'WMATIC'
                ? react_2['default'].createElement(
                    Option,
                    {
                      value: ele.name,
                      disabled: ele.name == tokenB,
                      className: 'customize-option-label-item',
                      key: index,
                    },
                    react_2['default'].createElement(
                      'div',
                      {className: 'customize-option-label-item'},
                      react_2['default'].createElement('img', {
                        src: require('../../../img/coin/' + ele.name + '.png')['default'],
                        alt: '',
                      }),
                      react_2['default'].createElement('span', null, ele.name),
                    ),
                  )
                : null
            }),
          ),
        ),
      ),
    ),
    react_2['default'].createElement(
      'div',
      {className: 'tab-coin'},
      react_2['default'].createElement('img', {
        onClick: function () {
          tabCoin()
        },
        src:
          !tokenFeeAamount || !tokenFeeBamount
            ? icon_swap_disabled_light_png_1['default']
            : isTab
            ? icon_swap_normal_light_png_1['default']
            : icon_swap_hover_light_png_1['default'],
        alt: '',
      }),
    ),
    react_2['default'].createElement(
      'div',
      {className: collateralActive ? 'amount-active amount' : 'amount'},
      react_2['default'].createElement(
        'div',
        {className: 'amount-header'},
        react_2['default'].createElement('p', null, 'Receive (Estimated)'),
        react_2['default'].createElement(
          'p',
          {className: 'balance'},
          'Balance ',
          account
            ? commonState.openConfirm
              ? react_2['default'].createElement(antd_1.Skeleton.Input, {style: {width: 100, height: 20}, active: true})
              : tokenB && ((_f = commonState.assetBaseInfoObj[tokenB]) === null || _f === void 0 ? void 0 : _f.balance)
              ? utils_1.fixD(
                  (_g = commonState.assetBaseInfoObj[tokenB]) === null || _g === void 0 ? void 0 : _g.balance,
                  6,
                )
              : '0.0'
            : '0.0',
        ),
      ),
      react_2['default'].createElement(
        'div',
        {className: 'trade-price'},
        commonState.btnOpenConfirm
          ? react_2['default'].createElement(antd_1.Skeleton.Input, {style: {width: 100, height: 20}, active: true})
          : react_2['default'].createElement(antd_1.Input, {
              placeholder: '0.0',
              value: tokenBamount,
              defaultValue: '',
              bordered: false,
              onChange: function (e) {
                e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,6})?.*$/, '$1')
                setTokenBamount(e.target.value)
                setIsChangeTokenA(false)
                setIsChangeTokenB(true)
              },
              onClick: function () {
                setCollateralActive(true)
              },
              onBlur: function () {
                setCollateralActive(false)
              },
            }),
        react_2['default'].createElement(
          'div',
          {className: 'select-box'},
          react_2['default'].createElement(
            antd_1.Select,
            {
              value: tokenB,
              bordered: false,
              dropdownMatchSelectWidth: 120,
              onSelect: function (labeledValue) {
                var _a
                setTokenB(labeledValue)
                setTokenBaddress(
                  (_a = commonState.assetBaseInfoObj[labeledValue]) === null || _a === void 0 ? void 0 : _a.address,
                )
                dispatch(actions_1.upDateTradeCoinSelect({tradeCoinSelect: labeledValue}))
                getPair()
                setIsChangeTokenA(false)
                setIsChangeTokenB(true)
              },
              suffixIcon: react_2['default'].createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                react_2['default'].createElement('use', {xlinkHref: '#icon-Under'}),
              ),
            },
            commonState.allAssetsListInfo.map(function (ele, index) {
              return ele.name !== 'WMATIC'
                ? react_2['default'].createElement(
                    Option,
                    {
                      value: ele.name,
                      disabled: ele.name == tokenA,
                      className: 'customize-option-label-item',
                      key: index,
                    },
                    react_2['default'].createElement(
                      'div',
                      {className: 'customize-option-label-item'},
                      react_2['default'].createElement('img', {
                        src: require('../../../img/coin/' + ele.name + '.png')['default'],
                        alt: '',
                      }),
                      react_2['default'].createElement('span', null, ele.name),
                    ),
                  )
                : null
            }),
          ),
        ),
      ),
    ),
    (tokenAamount || tokenBamount) && account
      ? react_2['default'].createElement(
          'div',
          {className: 'tx-fee'},
          react_2['default'].createElement(
            'div',
            {className: 'item'},
            react_2['default'].createElement('div', {className: 'tx-fee-text'}, 'Expected Price'),
            react_2['default'].createElement(
              'div',
              {className: 'tx-fee-price'},
              isTab ? utils_1.fixD(priceTo, 4) + ' ' + tokenB : utils_1.fixD(priceForm, 4) + ' ' + tokenB,
            ),
          ),
          react_2['default'].createElement(
            'div',
            {className: 'item'},
            react_2['default'].createElement('div', {className: 'tx-fee-text'}, 'Minimum Received'),
            react_2['default'].createElement(
              'div',
              {className: 'tx-fee-price'},
              utils_1.fixD(
                Number(tokenBamount) - (Number(tokenBamount) * Number(tradeState.slippageTolerance)) / 100,
                fixDPreciseB,
              ),
              ' ',
              tokenB,
            ),
          ),
          react_2['default'].createElement(
            'div',
            {className: 'item'},
            react_2['default'].createElement('div', {className: 'tx-fee-text'}, 'Slippage Tolerance'),
            react_2['default'].createElement('div', {className: 'tx-fee-price'}, tradeState.slippageTolerance, '%'),
          ),
        )
      : null,
    !account
      ? react_2['default'].createElement(
          antd_1.Button,
          {
            className: 'confirmOrder',
            onClick: function () {
              return onPresentConnectModal()
            },
          },
          'Connect',
        )
      : !pair
      ? react_2['default'].createElement(
          antd_1.Button,
          {className: 'confirmOrder', disabled: true},
          'Insufficient liquidity for this trade.',
        )
      : Number(tokenAamount) >
        Number((_h = commonState.assetBaseInfoObj[tokenA]) === null || _h === void 0 ? void 0 : _h.balance)
      ? react_2['default'].createElement(
          antd_1.Button,
          {
            disabled: true,
            // disabled={tokenFeeAamount > fixD(commonState.assetBaseInfoObj[tokenA]?.balance, 6) ? true : false}
            className: 'confirmOrder',
            onClick: handleApprove,
          },
          'Insufficient balance',
        )
      : !tokenApprove
      ? react_2['default'].createElement(
          antd_1.Button,
          {
            loading: requestedApproval,
            // disabled={tokenFeeAamount > fixD(commonState.assetBaseInfoObj[tokenA]?.balance, 6) ? true : false}
            className: 'confirmOrder',
            onClick: handleApprove,
          },
          'Approve',
        )
      : (!isTab && Number(tokenAamount) > reserves0) || (isTab && Number(tokenAamount) > reserves0)
      ? react_2['default'].createElement(
          antd_1.Button,
          {className: 'confirmOrder', disabled: true},
          'Insufficient Liquidity',
        )
      : // <Button className="confirmOrder" disabled={!tokenAamount || !Number(tokenAamount) > 0} onClick={openConfirmOrder}>
        react_2['default'].createElement(
          antd_1.Button,
          {
            className: 'confirmOrder',
            disabled: !tokenAamount || !Number(tokenAamount) || commonState.btnOpenConfirm,
            onClick: openConfirmOrder,
          },
          'Confirm Order',
        ),
  )
}
exports['default'] = Buy
