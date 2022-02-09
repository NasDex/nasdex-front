"use strict";

var _customizeTheme;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @format */

/* eslint-disable @typescript-eslint/no-var-requires */
var CracoAntDesignPlugin = require('craco-antd');

module.exports = {
  //   devServer: {
  //     proxy: {
  //         '/api': {
  //             target: 'https://web.ifzq.gtimg.cn',
  //             changeOrigin: true,
  //             pathRewrite: {
  //                 "^/api": ''
  //             }
  //         }
  //     },
  // },
  head: {
    title: 'NASDEX',
    description: 'The Premiere Decentralized Exchange on Tokenized Asset Trading'
  },
  plugins: [{
    plugin: CracoAntDesignPlugin,
    options: {
      customizeTheme: (_customizeTheme = {
        '@primary-color': '#005AFF',
        '@link-color': '#1DA57A',
        '@text-color': '#909DB4',
        '@heading-color': '#333333',
        '@border-radius-base': '2px',
        '@modal-content-bg': '#fff',
        '@modal-header-bg': '#fff',
        '@modal-footer-border-color-split': '#fff',
        '@modal-header-border-color-split': '#fff',
        '@modal-close-color': '#909DB4',
        '@component-background': '#fff',
        '@border-color-base': 'rgba(0, 0, 0, 0.05)',
        '@btn-default-borde': 'rgba(0, 0, 0, 0.05)',
        '@icon-color-hover': '#005aff',
        '@background-color-base': '#fff',
        '@up-back': '#E6EFFF',
        '@up-color': '#005AFF',
        '@down-back': 'rgba(254,12,8, 0.1)',
        '@down-color': '#FF0000',
        '@icon-color': '#909DB4'
      }, _defineProperty(_customizeTheme, "@icon-color-hover", '#005AFF'), _defineProperty(_customizeTheme, '@body-background', '#F7F8FB'), _defineProperty(_customizeTheme, '@menu-active-back', '#F3F7FE'), _defineProperty(_customizeTheme, '@menu-active-color', '#005AFF'), _defineProperty(_customizeTheme, '@menu-back', '#FFFFFF'), _defineProperty(_customizeTheme, '@menu-shadow', 'rgba(186, 200, 224, 0.5)'), _defineProperty(_customizeTheme, '@input-back', '#F7F7F7'), _defineProperty(_customizeTheme, '@form-back', '#F2F4FC'), _customizeTheme)
    }
  }]
};