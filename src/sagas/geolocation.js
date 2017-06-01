import { call, put } from 'redux-saga/effects';

import Geolocation from '../geolocation/index';

export function* getUserLocation(action) {

	const userCoordinatesResponse = yield call(Geolocation.getUserCoordinates);
	console.log('userCoordinatesResponse', userCoordinatesResponse);

	if (userCoordinatesResponse.success) {
		const userSuburbResponse = yield call(Geolocation.getUserSuburb, userCoordinatesResponse.message);
		console.log('userSuburbResponse', userSuburbResponse);

		if (userSuburbResponse.success) {
			yield put({
				type: 'SET_CURRENT_LOCATION',
				userLocation: userSuburbResponse.message,
			});
		}
		else {
			yield put({
				type: 'GEOLOCATION_ERROR',
				message: userSuburbResponse.message,
			});
		}
	}
	else {
		yield put({
			type: 'GEOLOCATION_ERROR',
			message: userCoordinatesResponse.message,
		});
	}
}