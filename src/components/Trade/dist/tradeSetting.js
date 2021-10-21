"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
require("../../style/Trade/tradeSetting.less");
var defaultOnDismiss = function () { return null; };
var slippageArr = ['0.1', '0.5', '1'];
var TradeSetting = function (_a) {
    var _b = _a.onDismiss, onDismiss = _b === void 0 ? defaultOnDismiss : _b;
    var _c = react_1.useState('0'), slippageNum = _c[0], setSlippageNum = _c[1];
    return (React.createElement(antd_1.Modal, { title: "Setting", width: 376, footer: null, visible: true, onOk: onDismiss, onCancel: onDismiss },
        React.createElement("div", { className: "trade-setting" },
            React.createElement("div", { className: "trade-setting-content" },
                React.createElement("div", { className: "slippage-tolerance" }, "Slippage tolerance"),
                React.createElement("div", { className: "input-content" },
                    slippageArr.map(function (ele, key) { return (React.createElement("div", { className: ['slippage-item', ele === slippageNum ? 'slippage-item-active' : null].join(' '), key: key, onClick: function () { return setSlippageNum(ele); } },
                        ele,
                        "%")); }),
                    React.createElement(antd_1.Input, { suffix: "%" }))),
            React.createElement("div", { className: "trade-setting-alert" }, "Slippage must be within 2 decimal points"))));
};
exports["default"] = TradeSetting;
