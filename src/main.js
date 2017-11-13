// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import AV from 'leancloud-storage';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

const appId = 'sokeamqmSN87h2vBvnUkM0xC-gzGzoHsz';
const appKey = 'j9p2LRdQWsysjdgoQHIkTm1L';
AV.init({ appId, appKey });

const test = async () => {
    let objId = null;
    const tmp = Date.now();

    // 写的示例
    console.log('writing...');
    const TestObject = AV.Object.extend('TestObject');
    const testObject = new TestObject();
    await testObject.save({ words: `Write: Hello World!${tmp}` })
        .then((testObj) => {
            objId = testObj.id;
            console.log(`objId is ${objId}`);
        }, (error) => {
            console.error(error);
        });

    // 读的示例
    console.log('reading...');
    const query = new AV.Query('TestObject');
    await query.get(objId).then((testObj) => {
        console.log(testObj.toJSON());
    }, (error) => {
        console.error(error);
    });

    // 更新的示例
    console.log('updating...');
    const updateObj = AV.Object.createWithoutData('TestObject', objId);
    updateObj.set('words', 'It has been Update!');
    await updateObj.save();

    // 读的示例
    console.log('reading again...');
    const query2 = new AV.Query('TestObject');
    query2.get(objId).then((testObj) => {
        console.log(testObj.toJSON());
    }, (error) => {
        console.error(error);
    });
};
test();

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});
