"use strict";
/** @format */
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var useEagerConnect_1 = require("hooks/useEagerConnect");
var Menu_1 = require("components/Menu");
// import Test from './pages/Test'
var Mint_1 = require("./pages/Mint");
var Staking_1 = require("./pages/Staking");
var ComingSoon_1 = require("./pages/ComingSoon");
var Profile_1 = require("./pages/Profile");
var Manage_1 = require("./pages/Manage");
var Trade_1 = require("./pages/Trade");
// import './App.less'
require("./style/base.less");
require("./style/global.less");
require("./style/antdesign.less");
function App() {
    useEagerConnect_1["default"]();
    return (react_1["default"].createElement(react_1.Suspense, { fallback: null },
        react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
            react_1["default"].createElement(Menu_1["default"], null,
                react_1["default"].createElement(react_router_dom_1.Switch, null,
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, strict: true, path: "/", render: function () { return react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/staking" }); } }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, strict: true, path: "/mint", component: Mint_1["default"] }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, strict: true, path: "/staking", component: Staking_1["default"] }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, strict: true, path: "/farm", component: ComingSoon_1["default"] }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, strict: true, path: "/profile", component: Profile_1["default"] }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, strict: true, path: "/manage", component: Manage_1["default"] }),
                    react_1["default"].createElement(react_router_dom_1.Route, { exact: true, strict: true, path: "/trade", component: Trade_1["default"] }))))));
}
exports["default"] = App;
