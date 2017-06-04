const initialState = {
    auth: {
        authenticated: null,
        anonymous: null,
        redirectToWelcomePage: null,
        authErrorMessage: null,

        uid: null,
        userPassword: null,
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
        geolocationError: null,
    },
    appData: {
        currentCategory: 'All Categories',
        priorities: [
            'High',
            'Medium',
            'Low'
        ],
        suburbs: [
            "Athlone",
            "Claremont",
            "Sea Point",
            "Tokai",
            "Observatory",
            "Fish Hoek",
            "Tableview",
            "Kirstenhof",
            "Meadowridge",
            "Constantia",
            "Hout Bay",
            "Noordhoek",
            "Capri",
            "Bellville",
            "Mowbray",
            "Woodstock",
            "Newlands",
            "Rosebank"
        ],
    },
    userData: {
        profile: {
            userName: 'Astrid Saker',
            userEmail: 'astridbradley24@gmail.com',
            userLocation: 'Somerset West, South Africa',
            userPhotoUrl: 'https://firebasestorage.googleapis.com/v0/b/components-66ff5.appspot.com/o/photos%2FET4q9PXVrePF7ubimwoexT7JOx72?alt=media&token=d5db2aca-ba08-4f74-840f-5e4e80fc97a8',
        },
        categories: [
            'App', 'Test', 'Test2', 'Test3', 'Test4', 'App1', 'Test5', 'Test6', 'Test37', 'Test48',
        ],
        ideas: [
            {
                title: 'Test',
                description: 'Test some more',
                category: 'App',
                priority: 'High',
            }
        ],
    },
}

export default initialState;
