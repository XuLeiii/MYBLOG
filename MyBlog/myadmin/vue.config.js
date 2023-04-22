const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
//   devServer: {
//     proxy: {
//         '/api': {
//             target: 'http://localhost:3000',   //node.js服务器运行的地址
//             ws: true,
//             changeOrigin: true,
//             pathRewrite: {
//                 '^/api': 'http://localhost:3000'  //路径重写
//             }
//         },
//     }
// }
})
