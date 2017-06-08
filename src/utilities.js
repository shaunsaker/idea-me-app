const utilities = {};

utilities.cloneObject = (object) => {
	return JSON.parse(JSON.stringify(object));
}

utilities.objectToArray = (object) => {
	let array = [];

	for (objectKey in object) {
		array.push(object[objectKey]);
	}

	return array;
}

utilities.filterArrayByValue = (value, array) => {
    const pattern = new RegExp(value.toLowerCase(), 'g');

    const filteredArray = array.filter((item) => {
        return item.toLowerCase().match(pattern);
    });

    return filteredArray;
}

utilities.getRandomItemFromArray = (array) => {
    const randomNumber = Math.round(Math.random() * array.length);
    const randomItem = array[randomNumber];
    return randomItem;
};

utilities.firstCharToUppercase = (string) => {
    const trimmedString = string.trim();
    return trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1);
};

utilities.prettifyUserName = (userName) => {
    const userNameArray = userName.split(" ");
    let prettyUserNameArray = [];

    userNameArray.map((value) => {
        prettyUserNameArray.push(utilities.firstCharToUppercase(value));
    });

    const prettyUserName = prettyUserNameArray.join(" ");
    return prettyUserName;
}

utilities.sortIdeas = (ideas, currentCategory) => {

    // Prioritise our ideas in order of variables below
    let noPriority = [];
    let highPriority = [];
    let mediumPriority = [];
    let lowPriority = [];
    let allIdeas = [];

    ideas.map((value) => {
        if (value.priority === 'High') {
            highPriority.push(value);
        }
        else if (value.priority === 'Medium') {
            mediumPriority.push(value);
        }
        else if (value.priority === 'Low') {
            lowPriority.push(value);
        }
        else {
            noPriority.push(value);
        }
    });

    noPriority.map((value) => {
        allIdeas.push(value);
    });

    highPriority.map((value) => {
        allIdeas.push(value);
    });

    mediumPriority.map((value) => {
        allIdeas.push(value);
    });

    lowPriority.map((value) => {
        allIdeas.push(value);
    });

    // First filter all ideas to return the ideas that match the current category (and increment counter)
    let currentCategoryIdeas = [];

    if (currentCategory === 'All Categories') {
        currentCategoryIdeas = allIdeas;
    }
    else {
        allIdeas.map((value, index) => {
            if (value.category === currentCategory) {
                currentCategoryIdeas.push(value);
            }
        });
    }

    return currentCategoryIdeas;
}

utilities.createNewIdea = (newIdeaTitle, newIdeaDescription, newIdeaCategory, newIdeaPriority) => {
    const title = utilities.firstCharToUppercase(newIdeaTitle);
    let description;

    if (newIdeaDescription) {
        description = utilities.firstCharToUppercase(newIdeaDescription);
    }

    return {
        title,
        description,
        category: newIdeaCategory,
        priority: newIdeaPriority
    }
}

utilities.isIdeaTitlePresent = (newIdeaTitle, ideas) => {
    let ideaTitlePresent = false;

    for (let i = 0; i < ideas.length; i++) {

        if (ideas[i].title === newIdeaTitle) {
            ideaTitlePresent = true;
            break;
        }
    }

    return ideaTitlePresent;
}

utilities.addNewIdea = (newIdea, ideas) => {
    let newIdeas = ideas;

    if (newIdeas) {
        const ideaTitlePresent = utilities.isIdeaTitlePresent(newIdea.title, ideas);

        if (ideaTitlePresent) {
            newIdeas = null;
        }
        else {
            newIdeas.unshift(newIdea);
        }
    }

    // If this is the user's first idea, create a new array containing the idea
    else {
        newIdeas = [newIdea];
    }

    return newIdeas;
}

utilities.editIdea = (editedIdea, ideas, ideaTitle) => {
    let newIdeas = ideas;

    for (let i = 0; i < newIdeas.length; i++) {

        if (newIdeas[i].title === ideaTitle) {
            const ideaTitlePresent = utilities.isIdeaTitlePresent(editedIdea.title, ideas);

            if (ideaTitlePresent) {
                newIdeas = null;
            }
            else {
                newIdeas[i] = editedIdea;
            }

            break;
        }
    }

    return newIdeas;
}

utilities.deleteIdea = (idea, ideas) => {
    let index;
    let newIdeas = ideas;
        
    for (let i = 0; i < ideas.length; i++) {
        if (ideas[i].title === idea.title) {
            index = i;
            break;
        }
    } 

    newIdeas.splice(index, 1);
    return newIdeas;
}

utilities.isCategoryPresent = (newCategory, categories) => {
    let categoryPresent = false;

    for (let i = 0; i < categories.length; i++) {

        if (categories[i] === newCategory) {
            categoryPresent = true;
            break;
        }
    }

    return categoryPresent;
}

utilities.addCategory = (category, categories) => {
    let newCategories = categories;
    const newCategory = utilities.firstCharToUppercase(category);

    if (newCategories) {
        const categoryPresent = utilities.isCategoryPresent(newCategory, categories);

        if (categoryPresent) {
            newCategories = null;
        }
        else {
            newCategories.unshift(newCategory);
        }
    }

    // If this is the user's first category, create a new array containing the category
    else {
        newCategories = [newCategory];
    }

    return newCategories;
}

utilities.deleteCategory = (title, categories) => {
    let newCategories = categories;

    for (let i = 0; i < categories.length; i++) {
        if (categories[i] === title) {
            newCategories.splice(i, 1);
            break;
        }
    }

    return newCategories;
}

export default utilities;