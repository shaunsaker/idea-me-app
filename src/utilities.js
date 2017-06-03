const utilities = {};

utilities.firstCharToUppercase = function (string) {
    const trimmedString = string.trim();
    return trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1);
};

utilities.sortIdeas = function (ideas, currentCategory) {

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

utilities.createNewIdea = function (newIdeaTitle, newIdeaDescription, newIdeaCategory, newIdeaPriority) {
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

utilities.isIdeaTitlePresent = function (newIdeaTitle, ideas) {
    let ideaTitlePresent = false;

    for (let i = 0; i < ideas.length; i++) {

        if (ideas[i].title === newIdeaTitle) {
            ideaTitlePresent = true;
            break;
        }
    }

    return ideaTitlePresent;
}

utilities.addNewIdea = function (newIdea, ideas) {
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

utilities.editIdea = function (editedIdea, ideas, ideaTitle) {
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

utilities.isCategoryAlreadyPresent = function (newCategory, categories) {
    let categoryPresent = false;

    for (let i = 0; i < categories.length; i++) {

        if (categories[i] === newCategory) {
            categoryPresent = true;
            break;
        }
    }

    return categoryPresent;
}

export default utilities;