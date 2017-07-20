const utilities = {};

/* TIMING */

utilities.getPrettyMinutesFromSeconds = (seconds) => {

    // 126 => 02:06
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds - (minutes * 60);

    // add zero padding for seconds, if necessary
    let zeroPaddingSeconds = '';
    if (remainingSeconds < 10) {
        zeroPaddingSeconds = '0';
    }

    const prettyMinutes = minutes + ':' + zeroPaddingSeconds + remainingSeconds;

    return prettyMinutes;
}

utilities.getPrettyDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    let day = date.getDate();
    day = utilities.addZeroPadding(day);
    let hours = date.getHours();
    hours = utilities.addZeroPadding(day);
    let minutes = date.getMinutes();
    minutes = utilities.addZeroPadding(day);

    let prettyDate = day + ' ' + month + ' ' + year + ', ' + hours + ':' + minutes;
    return prettyDate;
}

/* FILES */

utilities.getFileName = (path) => {
    const pathArray = path.split('/');
    const fileName = pathArray[pathArray.length - 1];

    return fileName;
}

utilities.appendStringToFileName = (fileName, string) => {
    const fileNameArray = fileName.split('.');
    const newFileName = fileNameArray[0] + string + '.' + fileNameArray[1];

    return newFileName;
}

utilities.convertURIsToPaths = (array) => {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        const newValue = value.replace('file:', '');
        newArray.push(newValue);
    }

    return newArray;
}

/* METHODS */

utilities.getInputHeight = (inputWidth, inputLineHeight, charCount) => {
    const charsPerLine = Math.floor(inputWidth / inputLineHeight);
    const numberOfLines = Math.ceil(charCount / charsPerLine);
    const inputHeight = Math.ceil(numberOfLines * inputLineHeight);

    return inputHeight;
}

/* STRINGS */

utilities.firstCharToUppercase = (string) => {
    const trimmedString = string.trim();
    return trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1);
};

// Takes a string and converts each word's first character to uppercase
utilities.prettifyString = (string) => {
    const stringArray = string.split(" ");
    let prettyStringArray = [];

    stringArray.map((value) => {

        // Don't add blank characters
        if (value) {
            prettyStringArray.push(utilities.firstCharToUppercase(value));
        }
    });

    const prettyString = prettyStringArray.join(" ");
    return prettyString;
}

utilities.createUID = () => {
    return Date.now().toString();
}

utilities.prettifyUrl = (url) => {
    const prettyUrl = url.split('//')[1].split('/')[0];

    return prettyUrl;
}

utilities.addZeroPadding = (number) => {
    let zeroPaddedNumber = number.toString();
    if (zeroPaddedNumber < 10) {
        zeroPaddedNumber = '0' + zeroPaddedNumber;
    }
    return zeroPaddedNumber;
}

/* ARRAYS */

utilities.filterArrayByValue = (value, array) => {
    const pattern = new RegExp(value.toLowerCase(), 'g');

    const filteredArray = array.filter((item) => {
        return item.toLowerCase().match(pattern);
    });

    return filteredArray;
}

utilities.getRandomItemFromArray = (array) => {
    const randomNumber = Math.round(Math.random() * (array.length - 1));
    const randomItem = array[randomNumber];
    return randomItem;
};

// Deletes an object that matches a key value pair from an array
utilities.deleteObjectWithKeyValuePairFromArray = (keyValuePair, array) => {
    let newArray = array;
    let index;
    let targetKey;
    let targetValue;

    for (key in keyValuePair) {
        targetKey = key;
        targetValue = keyValuePair[targetKey];
    }

    for (let i = 0; i < array.length; i++) {
        if (array[i][targetKey] === targetValue) {
            index = i;
        }
    }

    newArray.splice(index, 1);

    return newArray;
}

// Takes an array and converts it into an object array with the uid as parent key
utilities.convertArrayToObjectArray = (array) => {
    let objectArray = {}

    for (let i = 0; i < array.length; i++) {
        const uid = array[i].uid;
        objectArray[uid] = array[i];
    }

    return objectArray;
}

/* OBJECTS */

utilities.cloneObject = (object) => {
    return JSON.parse(JSON.stringify(object));
}

// Takes an object array and returns a normal array without the keys
utilities.convertObjectArrayToArray = (objectArray) => {
    let array = [];

    for (key in objectArray) {
        array.push(objectArray[key]);
    }

    return array;
}

// Takes a key value pair and checks to see if that key value pair is present in an object array
utilities.isKeyValuePairPresentInObjectArray = (keyValuePair, objectArray) => {
    let targetKey;
    let targetValue;

    for (key in keyValuePair) {
        targetKey = key;
        targetValue = keyValuePair[targetKey];
    }

    let isKeyValuePairPresent;

    for (key in objectArray) {
        if (objectArray[key][targetKey] === targetValue) {
            isKeyValuePairPresent = true;
        }
    }

    return isKeyValuePairPresent;
}

// Takes a new object, creates a unique id and pushes it to an object array
utilities.pushObjectToObjectArray = (object, objectArray) => {
    let newObject = {};
    let newObjectArray;

    const uid = object.uid;
    newObject[uid] = object;

    if (objectArray) {
        newObjectArray = { ...objectArray, ...newObject };
    }

    // If the object array was empty/null
    else {
        newObjectArray = newObject;
    }

    return newObjectArray;
}

// Removes an object from an object array that matches the uid/key, value or key value pair (if present)
utilities.removeObjectFromObjectArray = (uid, objectArray) => {
    let newObjectArray = {};

    for (key in objectArray) {
        if (key !== uid) {
            newObjectArray[key] = objectArray[key];
        }
    }

    return newObjectArray;
}

// Deletes an object from a single tier object array that matches a key
utilities.deleteObjectFromObjectArray = (targetKey, objectArray) => {
    let newObjectArray = {};

    for (key in objectArray) {
        if (key !== targetKey) {
            newObjectArray[key] = objectArray[key];
        }
    }

    return newObjectArray;
}

// Finds a key value pair in a two tier object array and sets the keys value to null
utilities.findKeyValuePairAndSetKeysValueToNull = (targetKeyValuePair, objectArray) => {
    let targetKey;
    let targetValue;
    let newObjectArray = objectArray;

    for (pairKey in targetKeyValuePair) {
        targetKey = pairKey;
        targetValue = targetKeyValuePair[pairKey];
    }

    for (key in newObjectArray) {
        for (subKey in newObjectArray[key]) {
            if (subKey === targetKey && newObjectArray[key][subKey] === targetValue) {
                newObjectArray[key][subKey] = null;
            }
        }

    }

    return newObjectArray;
}

// Updates an object array's object at a given uid
utilities.updateObjectInObjectArray = (uid, newObject, objectArray) => {
    let newObjectArray = objectArray;

    newObjectArray[uid] = newObject;

    return newObjectArray;
}

// Returns a new object array filtered by a key value pair
utilities.filterObjectArrayByKeyValuePair = (keyValuePair, objectArray) => {
    let targetKey;
    let targetValue;
    let newObjectArray = {};

    for (key in keyValuePair) {
        targetKey = key;
        targetValue = keyValuePair[targetKey];
    }

    for (key in objectArray) {
        if (objectArray[key][targetKey] === targetValue) {
            newObjectArray[key] = objectArray[key];
        }
    }

    return newObjectArray;
}

// Sorts an object array on key name and array of values where the first value in the array will be at the top of the object array
utilities.sortObjectArrayByKeyAndValues = (objectArray, targetKey, values) => {
    let newObjectArray = {};
    let lastSubObjectArray = {};

    for (let i = 0; i < values.length; i++) {
        for (key in objectArray) {
            if (objectArray[key].hasOwnProperty(targetKey)) {
                for (subKey in objectArray[key]) {
                    if (subKey === targetKey && objectArray[key][targetKey] === values[i]) {
                        newObjectArray[key] = objectArray[key];
                    }
                }
            }
            else {
                lastSubObjectArray[key] = objectArray[key];
            }
        }
    }

    if (lastSubObjectArray) {
        newObjectArray = { ...newObjectArray, ...lastSubObjectArray };
    }

    return newObjectArray;
}

utilities.getLengthOfObject = (object) => {
    let counter = 0;

    for (key in object) {
        counter++;
    }

    return counter;
};

utilities.getValuesThatMatchKeyFromObjectArray = (targetKey, objectArray) => {
    let valuesArray = [];

    for (key in objectArray) {
        valuesArray.push(objectArray[key][targetKey]);
    }

    return valuesArray;
}

// Returns an object array with objects missing in new object array relative to old object array (NOTE: does not account for objects in old array that are not in new array - only added objects to new array)
utilities.getDifferenceBetweenObjectArrays = (newObjectArray, oldObjectArray) => {
    const newObjectArrayKeys = Object.keys(newObjectArray);
    const oldObjectArrayKeys = Object.keys(oldObjectArray);
    let foundKey;
    let missingObjects = null;

    /*

    NEW

    {
        1: {},
        2: {},
        3: {},
        4: {},
    }

    OLD

    {
        1: {},
        2: {},
    }

    */

    for (newKey in newObjectArray) {
        foundKey = false;

        for (oldKey in oldObjectArray) {
            if (newKey === oldKey) {
                foundKey = true;
            }
        }

        if (!foundKey) {
            if (!missingObjects) {
                missingObjects = {};
            }
            missingObjects[newKey] = newObjectArray[newKey];
        }
    }

    return missingObjects;
}

export default utilities;