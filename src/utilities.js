const utilities = {};

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

/* OBJECTS */

// Takes an object array and returns a normal array without the keys
utilities.convertObjectArrayToArrayOfObjects = (objectArray) => {
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
        newObjectArray = {...objectArray, ...newObject};
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

// Finds a key in a single tier object array and sets its value to null
utilities.setKeysValueToNull = (targetKey, objectArray) => {
    let newObjectArray = objectArray;

    for (key in newObjectArray) {
        if (key === targetKey) {
            newObjectArray[key] = null;
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

// Finds keys with null values in a one/two tier object array and removes them
utilities.findNullKeysAndRemoveFromObjectArray = (objectArray) => {
    let newObjectArray = {};

    for (key in objectArray) {
        if (typeof(objectArray[key] === 'object')) { // it is not null and we can safely assume its not an array (otherwise use Array.isArray())
            newObjectArray[key] = {};

            for (subKey in objectArray[key]) {
                if (objectArray[key][subKey] !== null) {
                    newObjectArray[key][subKey] = objectArray[key][subKey];
                }
            }
        }
        else if (objectArray[key] !== null) {
            newObjectArray[key] = objectArray[key];
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

    for (let i = 0; i < values.length; i++) {
        for (key in objectArray) {
            for (subKey in objectArray[key]) {
                if (subKey === targetKey && objectArray[key][targetKey] === values[i]) {
                    newObjectArray[key] = objectArray[key];
                }
            }
        }
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

export default utilities;