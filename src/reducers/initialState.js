const initialState = {
    app: {
        loading: false
    },
    user: {
        authenticated: null,
        uid: null,
        errorMessage: null,
        signInRedirect: null,
        email: null,
        password: null,
        apiSaveSuccess: null,
        apiLoadSuccess: null,
    },
    priorities: [
        'High',
        'Medium',
        'Low'
    ],
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
}

export default initialState;
