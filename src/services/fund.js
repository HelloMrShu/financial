import request from '@/utils/request';
import { stringify } from 'qs'

export async function queryFund(params) {
    return request(`/api/fund/list?${stringify(params)}`);
}

export async function saveFund(params) {
	return request('/api/fund/save', {
        method: 'POST',
        data: params,
        headers: {
	      'Content-Type': 'application/x-www-form-urlencoded',
	    },
	    requestType: 'form',
    });
}

export async function deleteFund(params) {
	return request('/api/fund/delete', {
        method: 'POST',
        data: params,
        headers: {
	      'Content-Type': 'application/x-www-form-urlencoded',
	    },
	    requestType: 'form',
    });
}

export async function updateFund(params) {
	return request('/api/fund/update', {
        method: 'POST',
        data: params,
        headers: {
	      'Content-Type': 'application/x-www-form-urlencoded',
	    },
	    requestType: 'form',
    });
}