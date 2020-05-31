import AsyncStorage from '@react-native-community/async-storage';

const checkResponseStatus = async response => {
	let result = await response.json();
	if (!response.ok) {
		if (response.status === 401) {
			return { ...result, statusCode: response.status };
		}
		return { ...result, statusCode: response.status };
	}
	return { ...result, statusCode: 200 };
};

export const defaultHeaders = {
	Accept: 'application/json',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
	'Content-Type': 'application/json',
};

const getToken = async () => {
	const token = await AsyncStorage.getItem('@Token');
	return token;
};

export const headers = token => {
	if (token) {
		return { ...defaultHeaders, Authorization: `Bearer ${token}` };
	} else {
		return defaultHeaders;
	}
};

export const Request = async (url, authenticated = false, method, data) => {
	let token = await getToken();
	const response = await fetch(url, {
		method: method,
		headers: authenticated ? headers(token) : { ...defaultHeaders },
		body: JSON.stringify(data),
	});
	let result = await checkResponseStatus(response);
	return result;
};
