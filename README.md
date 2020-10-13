## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for development
```
npm run build:dev
```
### Compiles and minifies for test
```
npm run build:test
```
### Compiles and minifies for production
```
npm run build
```
### Lints and fixes files
```
npm run lint
```

## 项目版本迭代步骤
1. 修改 `package.json` 中`version`字段为新的版本号
2. 运行 `npm run changelog` 指令生成版本提交报告
3. 找到主目录下 `CHANGELOG.md` 文件复制对应版本信息到git新建tag的描述中，并创建新的tag（版本）

