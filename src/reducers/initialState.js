const initialState = {
    auth: {
        authenticated: null,
        anonymous: null,
        redirectToWelcomePage: null,
        authErrorMessage: null,
    },
    app: {
        userErrorMessage: null,
        userSuccessMessage: null,
        errorType: null,
        retryAction: null,
        loading: false, // needs to be false on initial app load
    },
    api: {
        apiSuccess: null,
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
    user: {
        uid: null,
        email: null,
        password: null,
    },
    userData: {
        categories: [
            'App', 'Test', 'Test2', 'Test3', 'Test4', 'App1', 'Test5', 'Test6', 'Test37', 'Test48', 
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
