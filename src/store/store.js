import Vue from 'vue'
import Vuex from 'vuex'
// 导入状态管理
Vue.use(Vuex);

// 局部导入
import { addLocalInfo, getTotalCount, updateLocalInfo, deleteLocalInfo, updateLocalIds } from '../common/localStorageTool.js'

const store = new Vuex.Store({
    state: {
        buyCount: 0
    },
    getters: {
        getBuyCount(state) {
            if (state.buyCount > 0) {
                return state.buyCount;
            } else {
                return getTotalCount();
            }

        }
    },
    mutations: {
        addCount(state, goodsObj) {
            state.buyCount = addLocalInfo(goodsObj);
        },
        updateCount(state, goodsObj) {
            state.buyCount = updateLocalInfo(goodsObj);
        },
        deleteCount(state, goodsObj) {
            state.buyCount = deleteLocalInfo(goodsObj);
        },
        updateCounts(state, goodsObj) {
            state.buyCount = updateLocalIds(goodsObj);
        }
    }
})

export default store