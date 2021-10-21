"use strict";
/** @format */
exports.__esModule = true;
var react_1 = require("react");
require("../../style/Manage/manage.less");
var TradeLeft_1 = require("../../components/Trade/TradeLeft");
var index_1 = require("../../components/Trade/TradeRight/index");
var symbolMock = [
    {
        id: '0',
        iconUrl: '/image/coin/USDT@2x.png',
        name: 'nGOOGL',
        convertUsd: '2808.01',
        isRise: true,
        priceIncrease: '9.02',
        changeRate: '8.06'
    },
    {
        id: '1',
        iconUrl: '/image/coin/USDT@2x.png',
        name: 'nAPPL',
        convertUsd: '149.96',
        isRise: true,
        priceIncrease: '9.02',
        changeRate: '8.06'
    },
    {
        id: '2',
        iconUrl: '/image/coin/USDT@2x.png',
        name: 'nMSFT',
        convertUsd: '708.15',
        isRise: false,
        priceIncrease: '9.02',
        changeRate: '8.06'
    },
    {
        id: '3',
        iconUrl: '/image/coin/USDT@2x.png',
        name: 'nMSFT',
        convertUsd: '708.15',
        isRise: false,
        priceIncrease: '9.02',
        changeRate: '8.06'
    },
    {
        id: '4',
        iconUrl: '/image/coin/USDT@2x.png',
        name: 'nMSFT',
        convertUsd: '708.15',
        isRise: false,
        priceIncrease: '9.02',
        changeRate: '8.06'
    },
];
var SymoblChart = {
    symbolName: '',
    symbolLogo: '',
    premium: '--',
    volume: '43,123.09',
    liquidity: '25,93M'
};
function Trade() {
    return (react_1["default"].createElement("div", { className: "manage-container" },
        react_1["default"].createElement("div", { className: "container-center" },
            react_1["default"].createElement("div", { className: "manage-symbol-trade" },
                react_1["default"].createElement(TradeLeft_1["default"], { SymoblChart: SymoblChart }),
                react_1["default"].createElement(index_1["default"], null)))));
}
exports["default"] = Trade;
