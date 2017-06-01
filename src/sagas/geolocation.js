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
			let message;

			// Display more informative error message
			if (userSuburbResponse.message === 'Service not Available') {
				message = 'Geolocation service not available';
			}
			else {
				message = userSuburbResponse.message;
			}

			yield put({
				type: 'GEOLOCATION_ERROR',
				message: message,
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