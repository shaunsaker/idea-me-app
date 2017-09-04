import { Dimensions, Platform } from 'react-native';

import config from '../config';

const styleConstants = {};

/* FONT FAMILIES */

styleConstants.primaryFont = {
    fontFamily: 'RobotoCondensed-Regular',
};
styleConstants.secondaryFont = {
    fontFamily: 'Ranga-Regular',
};

/* FONT SIZES */

styleConstants.largeFont = 32;
styleConstants.regularFont = 18;
styleConstants.smallFont = 16;
styleConstants.verySmallFont = 12;
styleConstants.iconFont = 18;

/* COLOURS */

styleConstants.primary = '#393140';
styleConstants.transPrimary = 'rgba(57, 49, 64, 0.75)';
styleConstants.secondary = '#fdd835';
styleConstants.danger = '#d32f2f';
styleConstants.success = '#00ff00';
styleConstants.white = '#f4f7fd';
styleConstants.realWhite = '#ffffff';
styleConstants.lightGrey = '#b0b3cf';
styleConstants.grey = '#808092';
styleConstants.black = '#000000';
styleConstants.transBlack = 'rgba(0, 0, 0, 0.75)';

/* DIMENSIONS */

let { width, height } = Dimensions.get('window');
width = config.testing.dimensions ? 320 : width;
height = config.testing.dimensions ? 480 : height;

styleConstants.windowWidth = width;
styleConstants.windowHeight = height;
styleConstants.noteCardCell = (width - 122) / 3; // 3 grid incl. padding and margin

/* SHADOWS */

// Elevation does not work on Android V4 so we add a border as a fallback
const isEarlyAndroid = Platform.OS === 'Android' && Platform.Version <= 19;

styleConstants.smallShadow = {
    elevation: 2,
    borderWidth: isEarlyAndroid ? 1 : 0,
    borderColor: isEarlyAndroid ? styleConstants.lightGrey : null,

    // iOS
    shadowColor: styleConstants.black,
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
        height: 1,
        width: 0,
    },
};

styleConstants.regularShadow = {
    elevation: 6,
    borderWidth: isEarlyAndroid ? 1 : 0,
    borderColor: isEarlyAndroid ? styleConstants.lightGrey : null,

    // iOS
    shadowColor: styleConstants.black,
    shadowOpacity: 0.33,
    shadowRadius: 2,
    shadowOffset: {
        height: 1,
        width: 0,
    },
};

styleConstants.largeShadow = {
    elevation: 12,
    borderWidth: isEarlyAndroid ? 1 : 0,
    borderColor: isEarlyAndroid ? styleConstants.lightGrey : null,

    // iOS
    shadowColor: styleConstants.black,
    shadowOpacity: 0.33,
    shadowRadius: 4,
    shadowOffset: {
        height: 2,
        width: 0,
    },
};

export default styleConstants;
