const utilities = {};

/* TIMING */

// Takes seconds as a number and converts it into 'pretty' minutes, eg. 106 => 01:46
utilities.getPrettyMinutesFromSeconds = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds - minutes * 60;

  // add zero padding for seconds, if necessary
  let zeroPaddingSeconds = '';
  if (remainingSeconds < 10) {
    zeroPaddingSeconds = '0';
  }

  const prettyMinutes = minutes + ':' + zeroPaddingSeconds + remainingSeconds;

  return prettyMinutes;
};

// Takes a timestamp and returns a 'pretty' date, eg. 1504613447 => 09 May 2017, 12:10
utilities.getPrettyDate = timestamp => {
  const date = new Date(timestamp);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  let day = date.getDate();
  day = utilities.addZeroPadding(day);
  let hours = date.getHours();
  hours = utilities.addZeroPadding(hours);
  let minutes = date.getMinutes();
  minutes = utilities.addZeroPadding(minutes);

  let prettyDate =
    day + ' ' + month + ' ' + year + ', ' + hours + ':' + minutes;
  return prettyDate;
};

/* FILES */

// Takes a path and returns a file name
utilities.getFileName = path => {
  const pathArray = path.split('/');
  const fileName = pathArray[pathArray.length - 1];

  return fileName;
};

// Appends a string to a file name
utilities.appendStringToFileName = (fileName, string) => {
  const fileNameArray = fileName.split('.');
  const newFileName = fileNameArray[0] + string + '.' + fileNameArray[1];

  return newFileName;
};

// Takes an array of uris and converts them to paths by removing file: prefixes
utilities.convertURIsToPaths = array => {
  let newArray = [];

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    const newValue = value.replace('file:', '');
    newArray.push(newValue);
  }

  return newArray;
};

/* METHODS */

// TO BE REMOVED
utilities.getInputHeight = (inputWidth, inputLineHeight, charCount) => {
  const charsPerLine = Math.floor(inputWidth / inputLineHeight);
  const numberOfLines = Math.ceil(charCount / charsPerLine);
  const inputHeight = Math.ceil(numberOfLines * inputLineHeight);

  return inputHeight;
};

/* STRINGS */

// Takes a string and converts the first letter to uppercase
utilities.firstCharToUppercase = string => {
  const trimmedString = string.trim();
  return trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1);
};

// Takes a string and converts each word's first character to uppercase
utilities.prettifyString = string => {
  const stringArray = string.split(' ');
  let prettyStringArray = [];

  stringArray.map(value => {
    // Don't add blank characters
    if (value) {
      prettyStringArray.push(utilities.firstCharToUppercase(value));
    }
  });

  const prettyString = prettyStringArray.join(' ');
  return prettyString;
};

// Creates a UID using the current unix timestamp
utilities.createUID = () => {
  return Date.now().toString();
};

// Takes a number and returns a zero padded string
utilities.addZeroPadding = number => {
  let zeroPaddedNumber = number.toString();
  if (zeroPaddedNumber < 10) {
    zeroPaddedNumber = '0' + zeroPaddedNumber;
  }
  return zeroPaddedNumber;
};

/* OBJECTS */

// Clones an object
utilities.cloneObject = object => {
  return JSON.parse(JSON.stringify(object));
};

// Returns a random item from a dictionary
utilities.getRandomItemFromDictionary = dictionary => {
  const array = Object.values(dictionary);
  const dictionaryLength = utilities.getLengthOfObject(dictionary);
  const randomNumber = Math.round(Math.random() * (dictionaryLength - 1));
  const randomItem = array[randomNumber];

  return randomItem;
};

// Takes a dictionary and returns an array without the keys
utilities.convertDictionaryToArray = dictionary => {
  let array = [];

  for (key in dictionary) {
    array.push(dictionary[key]);
  }

  return array;
};

// Takes a key value pair and checks to see if that key value pair is present in a dictionary
utilities.isKeyValuePairPresentInDictionary = (keyValuePair, dictionary) => {
  let targetKey;
  let targetValue;

  for (key in keyValuePair) {
    targetKey = key;
    targetValue = keyValuePair[targetKey];
  }

  let isKeyValuePairPresent;

  for (key in dictionary) {
    if (dictionary[key][targetKey] === targetValue) {
      isKeyValuePairPresent = true;
    }
  }

  return isKeyValuePairPresent;
};

// Takes a new object, creates a unique id and pushes it to a dictionary
utilities.pushObjectToDictionary = (object, dictionary) => {
  let newObject = {};
  let newDictionary;

  const uid = object.uid;
  newObject[uid] = object;

  if (dictionary) {
    newDictionary = { ...dictionary, ...newObject };
  } else {
    // If the object array was empty/null
    newDictionary = newObject;
  }

  return newDictionary;
};

// Removes an object from a dictionary that matches the uid/key, value or key value pair (if present)
utilities.removeObjectFromDictionary = (uid, dictionary) => {
  let newDictionary = {};

  for (key in dictionary) {
    if (key !== uid) {
      newDictionary[key] = dictionary[key];
    }
  }

  return newDictionary;
};

// Deletes an object from a single tier object array that matches a key
utilities.deleteObjectFromDictionary = (targetKey, dictionary) => {
  let newDictionary = {};

  for (key in dictionary) {
    if (key !== targetKey) {
      newDictionary[key] = dictionary[key];
    }
  }

  return newDictionary;
};

// Finds a key value pair in a two tier object array and sets the keys value to null
utilities.findKeyValuePairAndSetKeysValueToNull = (
  targetKeyValuePair,
  dictionary
) => {
  let targetKey;
  let targetValue;
  let newDictionary = dictionary;

  for (pairKey in targetKeyValuePair) {
    targetKey = pairKey;
    targetValue = targetKeyValuePair[pairKey];
  }

  for (key in newDictionary) {
    for (subKey in newDictionary[key]) {
      if (subKey === targetKey && newDictionary[key][subKey] === targetValue) {
        newDictionary[key][subKey] = null;
      }
    }
  }

  return newDictionary;
};

// Updates a dictionary's object at a given uid
utilities.updateObjectInDictionary = (uid, newObject, dictionary) => {
  let newDictionary = dictionary;

  newDictionary[uid] = newObject;

  return newDictionary;
};

// Returns a new object array filtered by a key value pair
utilities.filterDictionaryByKeyValuePair = (keyValuePair, dictionary) => {
  let targetKey;
  let targetValue;
  let newDictionary = {};

  for (key in keyValuePair) {
    targetKey = key;
    targetValue = keyValuePair[targetKey];
  }

  for (key in dictionary) {
    if (dictionary[key][targetKey] === targetValue) {
      newDictionary[key] = dictionary[key];
    }
  }

  return newDictionary;
};

// Sorts a dictionary on key name and array of values where the first value in the array will be at the top of the object array
utilities.sortDictionaryByKeyAndValues = (dictionary, targetKey, values) => {
  let newDictionary = {};
  let lastSubDictionary = {};

  for (let i = 0; i < values.length; i++) {
    for (key in dictionary) {
      if (dictionary[key].hasOwnProperty(targetKey)) {
        for (subKey in dictionary[key]) {
          if (
            subKey === targetKey &&
            dictionary[key][targetKey] === values[i]
          ) {
            newDictionary[key] = dictionary[key];
          }
        }
      } else {
        lastSubDictionary[key] = dictionary[key];
      }
    }
  }

  if (lastSubDictionary) {
    newDictionary = { ...newDictionary, ...lastSubDictionary };
  }

  return newDictionary;
};

// Returns the length of an object
utilities.getLengthOfObject = object => {
  let counter = 0;

  for (key in object) {
    counter++;
  }

  return counter;
};

// Returns an array of values that match a particular key
utilities.getValuesThatMatchKeyFromDictionary = (targetKey, dictionary) => {
  let valuesArray = [];

  for (key in dictionary) {
    valuesArray.push(dictionary[key][targetKey]);
  }

  return valuesArray;
};

// Returns a dictionary with objects missing in new object array relative to old object array (NOTE: does not account for objects in old array that are not in new array - only added objects to new array)
utilities.getDifferenceBetweenDictionaries = (newDictionary, oldDictionary) => {
  const newDictionaryKeys = Object.keys(newDictionary);
  const oldDictionaryKeys = Object.keys(oldDictionary);
  let foundKey;
  let missingObjects = null;

  for (newKey in newDictionary) {
    foundKey = false;

    for (oldKey in oldDictionary) {
      if (newKey === oldKey) {
        foundKey = true;
      }
    }

    if (!foundKey) {
      if (!missingObjects) {
        missingObjects = {};
      }
      missingObjects[newKey] = newDictionary[newKey];
    }
  }

  return missingObjects;
};

export default utilities;
