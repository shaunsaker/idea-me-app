const utilities = {};

utilities.firstCharToUppercase = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

utilities.sortIdeas = function (ideas, categories, currentCategory) {

    // Prioritise our ideas in order of variables below
    let noPriority = [];
    let highPriority = [];
    let mediumPriority = [];
    let lowPriority = [];
    let allIdeas = [];

    ideas.map((value) => {
        if (value.priorityId === 0) {
            highPriority.push(value);
        }
        else if (value.priorityId === 1) {
            mediumPriority.push(value);
        }
        else if (value.priorityId === 2) {
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

    // First filter all ideas to return the ideas that match this.state.category (and increment counter)
    let currentCategoryIdeas = [];

    allIdeas.map((value, index) => {
        if (currentCategory === 'All' || categories[value.categoryId] === currentCategory) {
            currentCategoryIdeas.push(value);
        }
    });

    return currentCategoryIdeas;
}

export default utilities;
