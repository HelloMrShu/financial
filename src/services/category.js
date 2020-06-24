import request from '@/utils/request';

export async function queryIndustry() {
    return request('/api/industry/query');
}

export async function saveIndustry(params) {
    return request('/api/industry/save', {
        method: 'POST',
        data: params,
    });
}

export async function deleteIndustry(params) {
    return request('/api/industry/delete', {
        method: 'POST',
        data: params,
    });
}