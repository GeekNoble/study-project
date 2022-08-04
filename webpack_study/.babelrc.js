// module.exports = {
//   presets: [
//     [
//       "@babel/preset-env",
//       {
//         // useBuiltIns: false 默认值，无视浏览器兼容配置，引入所有 polyfill
//         // useBuiltIns: entry 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill
//         // useBuiltIns: usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
//         useBuiltIns: "entry",
//         corejs: "3.9.1", // 是 core-js 版本号
//         targets: {
//           chrome: "58",
//           ie: "11",
//         },
//       },
//     ],
//   ],
// };

module.exports = {
	presets: [
		[
			"@babel/preset-env", 
			{
				"targets": {
					"browsers": ["last 2 versions"] // 最近 2 个版本的浏览器
				},
				// module: false,  //Tree-shaking 作用是剔除没有使用的代码，以降低包的体积
			}
			// {
      //   module: false,
      //   useBuiltIns: "entry",
      //   corejs: "3.9.1",
      //   targets: {
      //     chrome: "58",
      //     ie: "11",
      //   },
      // },
		]
	],
	plugins: [
	
    // ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es"}] // `style: true` 会加载 less 文件
  ] 
}