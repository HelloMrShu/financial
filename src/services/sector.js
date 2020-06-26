import request from '@/utils/request';
import parseResponse from '@/utils/utils';

export async function querySectors(params) {
	console.log(params);
    return request('/api/sector/list', {
    	method:'GET',
    	data:params
    });	    
}

export async function saveSector(params) {
	return request('/api/sector/save', {
        method: 'POST',
        data: params,
        headers: {
	      'Content-Type': 'application/x-www-form-urlencoded',
	    },
	    requestType: 'form',
    });
}

export async function deleteSector(params) {
	return request('/api/sector/delete', {
        method: 'POST',
        data: params,
    });
}