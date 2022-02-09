/** @format */

'use strict'
/* eslint-disable prettier/prettier */
/** @format */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p]
        }
        return t
    }
    return __assign.apply(this, arguments)
}
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
        function rejected(value) { try { step(generator["throw"](value)) } catch (e) { reject(e) } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
        step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
}
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1] }, trys: [], ops: [] }, f, y, t, g
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this }), g
    function verb(n) { return function (v) { return step([n, v]) } }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.")
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t
            if (y = 0, t) op = [op[0] & 2, t.value]
            switch (op[0]) {
                case 0: case 1: t = op; break
                case 4: _.label++; return { value: op[1], done: false }
                case 5: _.label++; y = op[1]; op = [0]; continue
                case 7: op = _.ops.pop(); _.trys.pop(); continue
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break }
                    if (t[2]) _.ops.pop()
                    _.trys.pop(); continue
            }
            op = body.call(thisArg, _)
        } catch (e) { op = [6, e]; y = 0 } finally { f = t = 0 }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true }
    }
}
exports.__esModule = true
var useModal_1 = require("hooks/useModal")
var react_1 = require("react")
var nas_png_1 = require("../../../../img/stake/nas.png")
var auto_png_1 = require("../../../../img/stake/auto.png")
var tips_2x_png_1 = require("../../../../img/common/tips@2x.png")
var stake_1 = require("../stake")
var unstake_1 = require("../unstake")
var bignumber_1 = require("bignumber.js/bignumber")
var calculator_1 = require("../calculator")
var antd_1 = require("antd")
var useContract_1 = require("constants/hooks/useContract")
var utils_1 = require("ethers/lib/utils")
var hooks_1 = require("hooks")
var utils_2 = require("utils")
var useApproveFarm_1 = require("hooks/autoStake/useApproveFarm")
var useAuth_1 = require("hooks/useAuth")
var WalletModal_1 = require("components/WalletModal")
var index_1 = require("../../../../constants/index")
var nadxVault_json_1 = require("../../../../constants/abis/nadxVault.json")
var masterChef_json_1 = require("../../../../constants/abis/masterChef.json")
var ethers_1 = require("ethers")
var getLibrary_1 = require("utils/getLibrary")
var AutoPool = function (props) {
    var AutoPoolListArray = props.AutoPoolListArray
    return (react_1["default"].createElement("div", null, AutoPoolListArray.map(function (ele, key) { return (react_1["default"].createElement(AutoPoolItem, { autoPoolItem: ele, key: key })) })))
}
var AutoPoolItem = function (props) {
    var _a = useAuth_1["default"](), login = _a.login, logout = _a.logout
    var _b = react_1.useState(''), amount = _b[0], setAmount = _b[1]
    var _c = react_1.useState(''), balance = _c[0], setBalance = _c[1]
    var _d = react_1.useState(false), isApproved = _d[0], setIsApproved = _d[1]
    var _e = react_1.useState(0), totalLiquidity = _e[0], setTotalLiquidity = _e[1]
    var _f = react_1.useState(0), recentNsdxProfit = _f[0], setRecentNsdxProfit = _f[1]
    var _g = react_1.useState(''), totalPendingNSDXRewards = _g[0], setTotalPendingNSDXRewards = _g[1]
    var autoPoolItem = props.autoPoolItem
    var MasterChefContract = useContract_1.useMasterchef()
    var NADXContract = useContract_1.useNSDX()
    var NSDXVaultContract = useContract_1.useNSDXVault()
    var account = hooks_1.useActiveWeb3React().account
    var _h = WalletModal_1.useWalletModal(login, logout, account || undefined), onPresentConnectModal = _h.onPresentConnectModal, onPresentAccountModal = _h.onPresentAccountModal
    var _j = react_1.useState({
        allocPoint: 0,
        lastRewardBlock: ''
    }), poolInfo = _j[0], setPoolInfo = _j[1]
    function getPoolInfo() {
        return __awaiter(this, void 0, void 0, function () {
            var info, provider, library, MasterChefContract, poolInfoItem, NSDXVaultContract, totalNadx, _a, _b
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        info = {}
                        provider = window.ethereum
                        library = getLibrary_1.getLibrary(provider)
                        MasterChefContract = new ethers_1.ethers.Contract(index_1.MasterChefAddress, masterChef_json_1["default"], library)
                        return [4 /*yield*/, MasterChefContract.poolInfo(autoPoolItem.pid)]
                    case 1:
                        poolInfoItem = _c.sent()
                        info.lastRewardBlock = poolInfoItem.lastRewardBlock.toString()
                        info.allocPoint = poolInfoItem.allocPoint.toString()
                        setPoolInfo(info)
                        NSDXVaultContract = new ethers_1.ethers.Contract(index_1.NSDXVaultAddress, nadxVault_json_1["default"], library)
                        _a = Number
                        _b = utils_1.formatUnits
                        return [4 /*yield*/, NSDXVaultContract.balanceOf()]
                    case 2:
                        totalNadx = _a.apply(void 0, [_b.apply(void 0, [_c.sent(), autoPoolItem.decimals])])
                        setTotalLiquidity(totalNadx)
                        return [2 /*return*/]
                }
            })
        })
    }
    function getUserInfo() {
        return __awaiter(this, void 0, void 0, function () {
            var balance, _a, stakedBalance, amountValue, cakeAtLastUserAction, pricePerFullShare, _b, recentNsdxProfit, totalPendingNSDXRewards, _c, totalNadx, _d, _e
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = utils_1.formatUnits
                        return [4 /*yield*/, NADXContract.balanceOf(account)]
                    case 1:
                        balance = _a.apply(void 0, [_f.sent(), autoPoolItem.decimals])
                        setBalance(utils_2.fixD(balance, 4))
                        return [4 /*yield*/, NSDXVaultContract.userInfo(account)]
                    case 2:
                        stakedBalance = _f.sent()
                        amountValue = utils_1.formatUnits(stakedBalance.shares.toString(), autoPoolItem.decimals)
                        cakeAtLastUserAction = utils_1.formatUnits(stakedBalance.cakeAtLastUserAction.toString(), autoPoolItem.decimals)
                        setAmount(utils_2.fixD(amountValue, 4))
                        _b = utils_1.formatUnits
                        return [4 /*yield*/, NSDXVaultContract.getPricePerFullShare()]
                    case 3:
                        pricePerFullShare = _b.apply(void 0, [_f.sent(), autoPoolItem.decimals])
                        recentNsdxProfit = Number(new bignumber_1["default"](amountValue).times(new bignumber_1["default"](pricePerFullShare)).minus(cakeAtLastUserAction))
                        setRecentNsdxProfit(recentNsdxProfit)
                        _c = utils_1.formatUnits
                        return [4 /*yield*/, NSDXVaultContract.calculateTotalPendingNSDXRewards()]
                    case 4:
                        totalPendingNSDXRewards = _c.apply(void 0, [_f.sent(), autoPoolItem.decimals])
                        setTotalPendingNSDXRewards(totalPendingNSDXRewards)
                        _d = Number
                        _e = utils_1.formatUnits
                        return [4 /*yield*/, NSDXVaultContract.balanceOf()]
                    case 5:
                        totalNadx = _d.apply(void 0, [_e.apply(void 0, [_f.sent(), autoPoolItem.decimals])])
                        setTotalLiquidity(totalNadx)
                        return [2 /*return*/]
                }
            })
        })
    }
    function getAllowance() {
        return __awaiter(this, void 0, void 0, function () {
            var result, allowance
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NADXContract.allowance(account, index_1.NSDXVaultAddress)]
                    case 1:
                        result = _a.sent()
                        allowance = Number(utils_1.formatUnits(result.toString(), autoPoolItem.decimals))
                        if (account && allowance <= 0) {
                            setIsApproved(true)
                        }
                        else {
                            setIsApproved(false)
                        }
                        return [2 /*return*/]
                }
            })
        })
    }
    var onApprove = useApproveFarm_1["default"](NADXContract).onApprove
    var _k = react_1.useState(false), requestedApproval = _k[0], setRequestedApproval = _k[1]
    var handleApprove = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
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
                case 3: return [2 /*return*/]
            }
        })
    }) }, [onApprove, account])
    var _l = react_1.useState('0'), apr = _l[0], setApr = _l[1]
    var _m = react_1.useState('0'), apy = _m[0], setApy = _m[1]
    var openCalculatorCard = useModal_1["default"](react_1["default"].createElement(calculator_1["default"], { apr: apr }))[0]
    react_1.useEffect(function () {
        function calculateApr() {
            return __awaiter(this, void 0, void 0, function () {
                var aprP, d365, tvlF, price, day, str
                return __generator(this, function (_a) {
                    tvlF = totalLiquidity
                    price = autoPoolItem.usdPrice
                    day = autoPoolItem.nsdxPerBlock * 43200
                    if (Number(autoPoolItem.nsdxPerBlock) && Number(tvlF)) {
                        aprP =
                            ((day * (poolInfo.allocPoint / autoPoolItem.totalAllocPoint) * price * 365) /
                                (Number(tvlF) * price)) *
                                100
                        str = Number(aprP) ? Number(aprP) / 365 / 100 : 0
                        d365 = (Math.pow((1 + Number(str)), 365) - 1) * 100
                        if (Number(d365) > 100000000) {
                            d365 = Infinity
                        }
                    }
                    else {
                        aprP = Infinity
                    }
                    setApr(utils_2.fixD(aprP, 2))
                    if (d365) {
                        setApy(utils_2.fixD(d365, 2))
                    }
                    return [2 /*return*/]
                })
            })
        }
        if (totalLiquidity) {
            calculateApr()
        }
    }, [totalLiquidity])
    react_1.useEffect(function () {
        var timer
        var getBaseData = function () {
            getPoolInfo()
            if (account) {
                getUserInfo()
                getAllowance()
            }
            return getBaseData
        }
        if (MasterChefContract && NADXContract && NSDXVaultContract) {
            timer = setInterval(getBaseData(), 30000)
        }
        return function () {
            clearInterval(timer)
        }
    }, [account, MasterChefContract, NADXContract, NSDXVaultContract])
    var openStakeCard = useModal_1["default"](react_1["default"].createElement(stake_1["default"], { poolInfo: __assign(__assign({}, autoPoolItem), { balance: balance }) }))[0]
    var openUntakeCard = useModal_1["default"](react_1["default"].createElement(unstake_1["default"], { poolInfo: __assign(__assign({}, autoPoolItem), { amount: amount }) }))[0]
    return (react_1["default"].createElement("div", { className: "liquidity-item" },
        react_1["default"].createElement("div", { className: "liquidity-header" },
            react_1["default"].createElement("div", { className: "liquidity-logo" },
                react_1["default"].createElement("img", { src: nas_png_1["default"], alt: "", className: "nas-auto-logo" }),
                react_1["default"].createElement("div", { className: "liquidity-name liquidity-name-auto" }, "Auto NSDX"),
                react_1["default"].createElement("div", { className: "auto" },
                    react_1["default"].createElement("img", { src: auto_png_1["default"], alt: "" }),
                    react_1["default"].createElement("div", { className: "auto-hover" }, "Any funds you stake in this pool will be automagically harvested and restaked (compounded) for you.")))),
        react_1["default"].createElement("div", { className: "liquidity-bottom liquidity-bottom-auto" },
            react_1["default"].createElement("div", { className: "total-liquidity" },
                react_1["default"].createElement("div", { className: "title" },
                    utils_2.fixD(totalLiquidity, 4),
                    " "),
                react_1["default"].createElement("div", { className: "text" }, "Total Staked (NSDX)")),
            react_1["default"].createElement("div", { className: "apr" },
                react_1["default"].createElement("div", { className: "title" },
                    apy,
                    "%",
                    react_1["default"].createElement("svg", { className: "icon calculator", "aria-hidden": "true", onClick: openCalculatorCard },
                        react_1["default"].createElement("use", { xlinkHref: "#icon-calculator" }))),
                react_1["default"].createElement("div", { className: "text" }, "APY")),
            !account ? react_1["default"].createElement(antd_1.Button, { className: "pc-stake-btn", onClick: function () { return onPresentConnectModal() } }, "Connect") : (!isApproved ? react_1["default"].createElement(antd_1.Button, { className: "pc-stake-btn", onClick: openStakeCard }, "Stake") : react_1["default"].createElement(antd_1.Button, { className: "pc-stake-btn", onClick: function () { return handleApprove() }, loading: requestedApproval }, "Approve"))),
        !account ? react_1["default"].createElement(antd_1.Button, { className: "h5-stake-btn", onClick: function () { return onPresentConnectModal() } }, "Connect") : (!isApproved ? react_1["default"].createElement(antd_1.Button, { className: "h5-stake-btn", onClick: openStakeCard }, "Stake") : react_1["default"].createElement(antd_1.Button, { className: "h5-stake-btn", onClick: function () { return handleApprove() }, loading: requestedApproval }, "Approve")),
        recentNsdxProfit ? (Number(amount) > 0 ? react_1["default"].createElement("span", { className: "line" }) : null) : (Number(amount) > 0 ? react_1["default"].createElement("span", { className: "line" }) : null),
        react_1["default"].createElement("div", { className: "claim-unstake" },
            recentNsdxProfit ? react_1["default"].createElement("div", { className: "claim" },
                react_1["default"].createElement("div", { className: "left" },
                    react_1["default"].createElement("span", null, "Recent NSDX Profit"),
                    react_1["default"].createElement("div", { className: "tip" },
                        react_1["default"].createElement("img", { src: tips_2x_png_1["default"], alt: "", className: "tip-img" }),
                        react_1["default"].createElement("div", { className: "tip-hover" },
                            react_1["default"].createElement("p", null, "0.1% unstaking fee if withdrawn"),
                            react_1["default"].createElement("p", null, "within 72h"),
                            react_1["default"].createElement("p", null, "Performance Fee 2%"))),
                    react_1["default"].createElement("p", null, utils_2.fixD(recentNsdxProfit, 4)))) : null,
            Number(amount) > 0 ? react_1["default"].createElement("div", { className: "claim" },
                react_1["default"].createElement("div", { className: "left" },
                    react_1["default"].createElement("span", null, "Staked"),
                    react_1["default"].createElement("p", null, amount)),
                !account ? react_1["default"].createElement(antd_1.Button, { className: "pc-stake-btn", onClick: function () { return onPresentConnectModal() } }, "Connect") :
                    (!isApproved ? react_1["default"].createElement(antd_1.Button, { className: "pc-stake-btn", onClick: openUntakeCard }, "Unstake") : react_1["default"].createElement(antd_1.Button, { className: "pc-stake-btn", onClick: function () { return handleApprove() }, loading: requestedApproval }, "Approve"))) : null)))
}
exports["default"] = AutoPool
