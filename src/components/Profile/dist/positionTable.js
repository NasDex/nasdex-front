"use strict";
/** @format */
exports.__esModule = true;
var antd_1 = require("antd");
var tencent_png_1 = require("../../img/coin/tencent.png");
var react_router_dom_1 = require("react-router-dom");
var dataSource = [
    {
        key: '1',
        name: 'nTENCT',
        coin: 'USDC',
        logo: tencent_png_1["default"],
        oraclePrice: '172122.1223',
        oraclePriceUsd: '172122.1223',
        mintAmount: '172122.1223',
        mintAmountUsd: '172122.1223',
        collateral: '172122.1223',
        collateralUsd: '172122.1223',
        collateralRatio: '150',
        riskLevel: 'SAFE'
    },
];
var columns = [
    {
        title: 'Ticker',
        // dataIndex: 'name',
        // key: 'name',
        render: function (text, record) { return (React.createElement("div", { className: "table-cell" },
            React.createElement("img", { src: record.logo, alt: "" }),
            record.name)); }
    },
    {
        title: 'Oracle Price',
        dataIndex: 'age',
        key: 'age',
        render: function (text, record) { return (React.createElement("div", { className: "table-cell" },
            React.createElement("p", { className: "balance" },
                record.oraclePrice,
                " ",
                record.name),
            React.createElement("p", { className: "balance-usd" },
                "$ ",
                record.oraclePriceUsd))); }
    },
    {
        title: 'Mint Amount',
        dataIndex: 'address',
        key: 'address',
        render: function (text, record) { return (React.createElement("div", { className: "table-cell" },
            React.createElement("p", { className: "balance" },
                record.mintAmount,
                " ",
                record.name),
            React.createElement("p", { className: "balance-usd" },
                "$ ",
                record.mintAmountUsd))); }
    },
    {
        title: 'Collateral',
        dataIndex: 'address',
        key: 'address',
        render: function (text, record) { return (React.createElement("div", { className: "table-cell" },
            React.createElement("p", { className: "balance" },
                record.collateral,
                " ",
                record.name),
            React.createElement("p", { className: "balance-usd" },
                "$ ",
                record.collateralUsd))); }
    },
    {
        title: 'Collateral Ratio',
        dataIndex: 'address',
        key: 'address',
        align: 'right',
        render: function (text, record) { return (React.createElement("div", { className: "table-cell" },
            React.createElement("div", { className: "slider-text" },
                React.createElement("p", null,
                    record.collateralRatio,
                    "% ",
                    React.createElement("span", { className: "balance-usd" },
                        "Min:",
                        record.collateralRatio,
                        "%")),
                React.createElement("p", { className: "risk-level" }, record.riskLevel)),
            React.createElement("p", null,
                React.createElement(antd_1.Slider, { disabled: true, className: [
                        'collateral-slider',
                        Number(record.collateralRatio) < 165
                            ? 'collateral-slider-min'
                            : Number(record.collateralRatio) < 200
                                ? 'collateral-slider-middle'
                                : 'collateral-slider-max',
                    ].join(' '), defaultValue: record.collateralRatio, max: 300 })))); }
    },
    {
        title: 'Action',
        dataIndex: 'address',
        key: 'address',
        align: 'right',
        render: function (text, record) { return (React.createElement("div", { className: "table-cell" },
            React.createElement(antd_1.Button, { className: "action-btn" },
                React.createElement(react_router_dom_1.NavLink, { to: "/manage", activeClassName: "active" }, "Manage")))); }
    },
];
var PositionTable = function (props) {
    return React.createElement(antd_1.Table, { dataSource: dataSource, columns: columns, pagination: false });
};
exports["default"] = PositionTable;
