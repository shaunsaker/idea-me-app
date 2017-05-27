const initialState = {
    userAuth: {
        authenticated: null,
        signInRedirect: null,
        uid: null,
        email: null,
        password: null,
        userAuthErrorMessage: null,
        anonymous: null,
    },
    app: {
        userErrorMessage: null,
        userSuccessMessage: null,
        errorType: null,
    },
    api: {
        apiSaveSuccess: null,
        apiLoadSuccess: null,
        apiErrorMessage: null,
    },
    storage: {
        storageErrorMessage: null,
        storageSuccess: null,
    },
    geolocation: {
        geolocationErrorMessage: null,
        geolocationSuccess: null,
    },
    appData: {
        priorities: [
            'High',
            'Medium',
            'Low'
        ],
    },
    userData: {
        categories: [

        ],
        ideas: [

        ],
        newIdea: {
            title: null,
            description: null,
            categoryId: null,
            priorityId: null,
        },
        newCategory: {
            value: null,
        },
        editIdea: {
            title: null,
            description: null,
            categoryId: null,
            priorityId: null,
            index: null,
        }
    },
}

export default initialState;
