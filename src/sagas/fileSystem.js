import { call, put } from 'redux-saga/effects';

import FileSystem from '../fileSystem/index';

import config from '../config';
import utilities from '../utilities';

export function* deleteFile(action) {
    const deleteFileResponse = yield call(FileSystem.deleteFile, action);
    console.log('deleteFileResponse', deleteFileResponse);

    if (deleteFileResponse.success) {

        // Do nothing
    }
    else {
        yield put({
            type: 'FILE_SYSTEM_ERROR',
            message: deleteFileResponse.message,
        });
    }
}