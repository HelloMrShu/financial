import { querySectors } from '@/services/sector';

const Model = {
    namespace: 'sectorList',

    state: {
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
            return {
                ...state,
                list: action.payload,
            };
        },
    },
};

export default Model;