import { querySectors } from '@/services/sector';

const Model = {
    namespace: 'sectorList',

    state: {
        total: 0,
        list: [],
    },

    effects: {
        * fetch({ payload }, { call, put }) {
            const response = yield call(querySectors, payload);
            yield put({
                type: 'queryList',
                payload: response,
            });
        },
    },

    reducers: {
        queryList(state, action) {
            const { code, data, total } = action.payload;
            return {
                ...state,
                list: data,
                total:total,
            };
        },
    },
};

export default Model;