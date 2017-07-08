import { AudioRecorder } from 'react-native-audio';

import config from '../config';

const response = {
    success: null,
    message: null,
}

export default class Audio {
    static recordAudio(action) {
        return new Promise(resolve => {
            // How to start recording?
            // How to stop recording?

            // AudioRecorder.prepareRecordingAtPath(action.path, {
            //     SampleRate: 22050,
            //     Channels: 1,
            //     AudioQuality: "Low",
            //     AudioEncoding: "aac"
            // });

            // AudioRecorder.onFinished = (data) => {
            //     console.log(data);
            // }
        });
    }
}