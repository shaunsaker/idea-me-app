import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
const glyphMap = {
  "add": 65,
  "check": 66,
  "close": 67,
  "edit-location": 68,
  "face": 69,
  "facebook": 70,
  "google": 71,
  "home": 72,
  "chevron-left": 73,
  "light-bulb": 74,
  "gps-disabled": 75,
  "gps-not-fixed": 76,
  "email": 77,
  "mode-edit": 78,
  "more-vert": 79,
  "gps-fixed": 80,
  "photo-camera": 81,
  "anonymous": 82,
  "error-outline": 83,
};

let Icon = createIconSet(glyphMap, 'IdeaMeAppIcons', 'IdeaMe-App.ttf');

export default Icon;

