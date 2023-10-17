import axios from "axios";

const axiosInstance = axios.create({
	baseURL: 'http://localhost:5001'
})

export async function getUserInfo(userId, abortController) {
	try {
		const response = await axiosInstance.post('/api/user', {
			data: {userId: userId},
			signal: abortController ? abortController.signal : null,
		});
		return response.data;
	} catch (error) {
		if (error.name === 'AbortError') {
			console.log('Request was aborted');
		} else {
			console.error('Error fetching data:', error);
		}
		throw error;
	}
}

export async function getTableData(page, limit, abortController) {
	return axiosInstance.get('/api/orders', {
		params: {
			page: page,
			limit: limit
		},
		signal: abortController ? abortController.signal : null
	})
}

export async function getItemInfo(itemId, abortController) {
	return axiosInstance.get('/api/item', {
		params: {id: itemId},
		signal: abortController ? abortController.signal : null
	})
}