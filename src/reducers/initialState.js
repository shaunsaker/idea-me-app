const initialState = {
    auth: {
        authenticated: null,
        anonymous: null,
        redirectToWelcomePage: null,
        authErrorMessage: null,
    },
    app: {
        userSuccessMessage: null,
        userErrorMessage: null,
        errorType: null,
        retryAction: null,
        loading: false, // needs to be false on initial app load
    },
    api: {
        apiSuccess: null,
        apiErrorMessage: null,
    },
    storage: {
        storageSuccess: null,
        storageErrorMessage: null,
    },
    geolocation: {
		currentLocation: null,
        geolocationSuccess: null,
        geolocationErrorMessage: null,
    },
    appData: {
        currentCategory: 'All',
        priorities: [
            'High',
            'Medium',
            'Low'
        ],
        newCategory: {
            value: null,
        },
        newIdea: {
            title: null,
            description: null,
            categoryId: null,
            priorityId: null,
        },
        editIdea: {
            title: null,
            description: null,
            categoryId: null,
            priorityId: null,
            index: null,
        },
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
    },
}

export default initialState;
