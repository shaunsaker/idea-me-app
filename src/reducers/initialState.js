const initialState = {
    userAuth: {
        authenticated: null,
        anonymous: null,
        welcomeRedirect: null,
        uid: null,
        email: null,
        password: null,
        userAuthErrorMessage: null,
    },
    app: {
        userErrorMessage: null,
        userSuccessMessage: null,
        errorType: null,
        loading: null,
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
            'App'
        ],
        ideas: [
            {
                title: 'Test',
                description: 'Test some more',
                categoryId: 0,
                priorityId: 0,
            }
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
