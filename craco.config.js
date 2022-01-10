/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
const CracoAntDesignPlugin = require('craco-antd')

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
head:{
  title: 'NASDEX',
    description: 'The Premiere Decentralized Exchange on Tokenized Asset Trading',
},
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          // // common
          // '@primary-color': '#005AFF',
          // '@link-color': '#1DA57A',
          // '@text-color': 'rgba(255, 255, 255, 0.5)',
          // '@heading-color': '#fff',
          // '@border-radius-base': '2px',
          // // modal
          // '@modal-content-bg': '#211F26',
          // '@modal-header-bg': '#211F26',
          // '@modal-footer-border-color-split': '#211F26',
          // '@modal-header-border-color-split': '#211F26',
          // '@modal-close-color': 'rgba(255, 255, 255, 0.5)',
          // // btn
          // '@component-background': '#211F26',
          // '@border-color-base': 'rgba(255, 255, 255, 0.1)',
          // '@btn-default-borde': 'rgba(255, 255, 255, 0.2)',
          // '@icon-color-hover': '#fff',
          // '@background-color-base': 'rgba(255, 255, 255, 0.05)',

          // '@up-back': 'rgba(0,90,255, 0.3)', // #005AFF
          // '@up-color': '#00CBFF',
          // '@down-back': '#3E242A',
          // '@down-color': '#FF5073',

          
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

          '@up-back': '#E6EFFF', // #005AFF
          '@up-color': '#005AFF',
          '@down-back': 'rgba(254,12,8, 0.1)',
          '@down-color': '#FF0000',
          '@icon-color': '#909DB4',
          '@icon-color-hover': '#005AFF',
          '@body-background': '#F7F8FB',
          '@menu-active-back': '#F3F7FE',
          '@menu-active-color': '#005AFF',
          '@menu-back': '#FFFFFF',
          '@menu-shadow': 'rgba(186, 200, 224, 0.5)',
          '@input-back': '#F7F7F7',
          '@form-back': '#F2F4FC',
        },
      },
    },
  ],
}
