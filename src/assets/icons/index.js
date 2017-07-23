import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
const glyphMap = {
  "folder": 59648,
  "menu": 59649,
  "google": 59651,
  "facebook": 59659,
  "person": 59667,
  "priority": 59668,
  "error": 59666,
  "lightbulb": 59650,
  "edit": 59652,
  "location_edit": 59653,
  "check": 59654,
  "anonymous": 59655,
  "add": 59656,
  "home": 59657,
  "mail": 59658,
  "location_disabled": 59660,
  "location_inaccurate": 59661,
  "location_accurate": 59662,
  "camera": 59663,
  "chevron_left": 59664,
  "close": 59665,
  "voice": 59670,
  "note": 59671,
  "play": 59669,
  "pause": 59672,
  "refresh": 59673,
};

let Icon = createIconSet(glyphMap, 'IdeaMeAppIcons', 'IdeaMe-Icons.ttf');

export default Icon;

