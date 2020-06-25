import request from '@/utils/request';

export async function querySectors() {
    let data = request('/api/sector/list');
    return data
}

export async function deleteSector(params) {
	return request('/api/sector/delete', {
        method: 'POST',
        data: params,
    });
}

export async function saveSector(params) {
	return request('/api/sector/save', {
        method: 'POST',
        data: params,
    });
}