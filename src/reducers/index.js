let cloneObject = function (obj) {
    return JSON.parse(JSON.stringify(obj))
}

import utilities from '../utilities';

import initialState from './initialState';

export default function (state = initialState, action) {
    switch (action.type) {

        /* USER AUTH */
        case 'UPDATE_USER_EMAIL':
            new_state = cloneObject(state);
            new_state.userAuth.email = action.value;
            return new_state;

        case 'UPDATE_USER_PASSWORD':
            new_state = cloneObject(state);
            new_state.userAuth.password = action.value;
            return new_state;

        case 'REDIRECT_USER_TO_SIGN_IN':
            new_state = cloneObject(state);
            new_state.userAuth.signInRedirect = true;
            return new_state;

        case 'SIGN_IN_USER':
            new_state = cloneObject(state);
            new_state.userAuth.authenticated = true;
            new_state.userAuth.uid = action.uid;
            new_state.userAuth.signInRedirect = false;
            return new_state;

        case 'SIGN_OUT_USER':
            new_state = cloneObject(state);
            new_state.userAuth.authenticated = false;
            new_state.userAuth.uid = null;
            new_state.userAuth.signInRedirect = true;
            return new_state;

        /* API */
        case 'API_SAVE_SUCCESS':
            new_state = cloneObject(state);
            new_state.api.apiSaveSuccess = true;
            return new_state;

        case 'API_LOAD_SUCCESS':
            new_state = cloneObject(state);

            // In case it is a new user with no data
            if (action.data) {
                new_state.userData.ideas = action.data.ideas;
                new_state.userData.categories = action.data.categories;
            }
            new_state.api.apiLoadSuccess = true;
            return new_state;

        /* APP */
        case 'SET_LOADING_TRUE':
            new_state = cloneObject(state);
            new_state.app.loading = true;
            return new_state;

        case 'SET_LOADING_FALSE':
            new_state = cloneObject(state);
            new_state.app.loading = false;
            new_state.api.apiSaveSuccess = false;
            return new_state;

        /* SUCCESS/ERROR MESSAGES */
        case 'USER_ERROR':
            new_state = cloneObject(state);
            new_state.app.userErrorMessage = action.message;
            return new_state;

        case 'RESET_USER_ERROR':
            new_state = cloneObject(state);
            new_state.app.userErrorMessage = null;
            return new_state;

        case 'API_ERROR':
            new_state = cloneObject(state);
            new_state.api.apiErrorMessage = action.message;
            return new_state;

        case 'RESET_API_ERROR':
            new_state = cloneObject(state);
            new_state.api.apiErrorMessage = null;
            return new_state;

        case 'STORAGE_ERROR':
            new_state = cloneObject(state);
            new_state.storage.storageErrorMessage = action.message;
            return new_state;

        case 'RESET_STORAGE_ERROR':
            new_state = cloneObject(state);
            new_state.storage.storageErrorMessage = null;
            return new_state;

        case 'GEOLOCATION_ERROR':
            new_state = cloneObject(state);
            new_state.geolocation.geolocationErrorMessage = action.message;
            return new_state;

        case 'RESET_GEOLOCATION_ERROR':
            new_state = cloneObject(state);
            new_state.geolocation.geolocationErrorMessage = null;
            return new_state;

        /* USER DATA */
        case 'UPDATE_USER_IDEAS':
            new_state = cloneObject(state);
            new_state.userData.ideas = action.ideas;
            new_state.userData.newIdea.title = null;
            new_state.userData.newIdea.description = null;
            new_state.userData.newIdea.categoryId = null;
            new_state.userData.newIdea.priorityId = null;
            new_state.app.loading = true;
            return new_state;

        case 'UPDATE_USER_CATEGORIES':
            new_state = cloneObject(state);
            new_state.userData.categories = action.categories;
            new_state.userData.newCategory.value = null;
            new_state.app.loading = true;
            return new_state;

        case 'UPDATE_NEW_IDEA_TITLE':
            new_state = cloneObject(state);
            new_state.userData.newIdea.title = action.value;
            return new_state;

        case 'UPDATE_NEW_IDEA_DESCRIPTION':
            new_state = cloneObject(state);
            new_state.userData.newIdea.description = action.value;
            return new_state;

        case 'UPDATE_NEW_IDEA_CATEGORY':
            new_state = cloneObject(state);
            new_state.userData.newIdea.categoryId = action.value;
            return new_state;

        case 'UPDATE_NEW_IDEA_PRIORITY':
            new_state = cloneObject(state);
            new_state.userData.newIdea.priorityId = action.value;
            return new_state;

        case 'UPDATE_EDIT_IDEA_TITLE':
            new_state = cloneObject(state);
            new_state.userData.editIdea.title = action.value;
            return new_state;

        case 'UPDATE_EDIT_IDEA_DESCRIPTION':
            new_state = cloneObject(state);
            new_state.userData.editIdea.description = action.value;
            return new_state;

        case 'UPDATE_EDIT_IDEA_CATEGORY':
            new_state = cloneObject(state);
            new_state.userData.editIdea.categoryId = action.value;
            return new_state;

        case 'UPDATE_EDIT_IDEA_PRIORITY':
            new_state = cloneObject(state);
            new_state.userData.editIdea.priorityId = action.value;
            return new_state;

        case 'SET_EDIT_IDEA_ID':
            new_state = cloneObject(state);
            new_state.userData.editIdea.id = action.id;
            return new_state;

        case 'UPDATE_NEW_CATEGORY_VALUE':
            new_state = cloneObject(state);
            new_state.userData.newCategory.value = action.value;
            return new_state;

        case 'ADD_NEW_CATEGORY':
            new_state = cloneObject(state);
            new_state.userData.categories.push(utilities.firstCharToUppercase(new_state.newCategory.value.trim()));
            new_state.userData.newCategory = {
                value: null,
            }
            return new_state;

        case 'DELETE_CATEGORY':
            new_state = cloneObject(state);
            new_state.userData.categories.splice(action.index, 1);

            // update ideas categoryIds
            // set all matching categoryIds to null
            // all categoryIds above index should be decreased by 1
            const ideas = new_state.userData.ideas;
            ideas.map((value, index) => {
                if (value.categoryId === action.index) {
                    value.categoryId = null;
                }
                else if (value.categoryId > action.index) {
                    value.categoryId--;
                }
            });
            return new_state;

        default:
            return state;
    }
}