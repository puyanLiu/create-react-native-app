module.exports = {
    getTransformModulePath() {
        return require.resolve('react-native-typescript-transformer');
    },
    getSourceExts() {
        return [ 'ts', 'tsx' ]
    }
};
// 修改package.json 文件 的scripts start
// "start": "react-native start --transformer node_modules/react-native-typescript-transformer/index.js --sourceExts ts,tsx",