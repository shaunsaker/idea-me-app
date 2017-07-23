import { Dimensions } from 'react-native';
const styleConstants = {};

/* FONT FAMILIES */

styleConstants.primaryFont = {
    fontFamily: 'RobotoCondensed-Regular'
}
styleConstants.secondaryFont = {
    fontFamily: 'Ranga-Regular'
}

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
styleConstants.transBlack = 'rgba(0, 0, 0, 0.75)';

/* DIMENSIONS */

const { width, height } = Dimensions.get('window');

styleConstants.windowWidth = width;
styleConstants.windowHeight = height;
styleConstants.noteCardCell = (width - 122) / 3; // 3 grid incl. padding and margin

export default styleConstants;