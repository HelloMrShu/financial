import { queryIndustry } from '@/services/category';

const Model = {
    namespace: 'industryListModel',

    state: {
        list: [],
    },

    effects: {
        * fetch({ payload }, { call, put }) {//这个是界面调取接口的名称
            const response = yield call(queryIndustry, payload);//这个testApi就是刚才引入的
            yield put({
                type: 'queryList',
                payload: response,
            });
        },
    },

    reducers: {
        queryList(state, action) {
            return {
                ...state,
                list: action.payload,
            };
        },
    }
};

export default Model;