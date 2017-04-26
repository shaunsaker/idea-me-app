let cloneObject = function (obj) {
    return JSON.parse(JSON.stringify(obj))
}

import utilities from '../utilities';

import initialState from './initialState';

export default function (state = initialState, action) {
    switch (action.type) {

        case 'UPDATE_USER_EMAIL':
            new_state = cloneObject(state);
            new_state.user.email = action.value;
            new_state.user.errorMessage = null;
            return new_state;

        case 'UPDATE_USER_PASSWORD':
            new_state = cloneObject(state);
            new_state.user.password = action.value;
            new_state.user.errorMessage = null;
            return new_state;

        case 'REDIRECT_USER_TO_SIGN_IN':
            new_state = cloneObject(state);
            new_state.user.signInRedirect = true;
            return new_state;

        case 'SIGN_IN_USER':
            new_state = cloneObject(state);
            new_state.user.authenticated = true;
            new_state.user.uid = action.uid;
            new_state.user.errorMessage = null;
            new_state.user.signInRedirect = false;
            return new_state;

        case 'API_SAVE_SUCCESS':
            new_state = cloneObject(state);
            new_state.user.apiSaveSuccess = true;
            new_state.user.errorMessage = null;
            return new_state;

        case 'API_LOAD_SUCCESS':
            new_state = cloneObject(state);

            // In case it is a new user with no data
            if (action.data) {
                new_state.ideas = action.data.ideas;
                new_state.categories = action.data.categories;
            }
            new_state.user.apiLoadSuccess = true;
            new_state.user.errorMessage = null;
            return new_state;

        case 'RESET_API_SAVE_SUCCESS':
            new_state = cloneObject(state);
            new_state.user.apiSaveSuccess = false;
            return new_state;

        case 'USER_ERROR':
            new_state = cloneObject(state);
            new_state.user.errorMessage = action.message;
            return new_state;

        case 'RESET_USER_ERROR':
            new_state = cloneObject(state);
            new_state.user.errorMessage = null;
            return new_state;

        case 'UPDATE_NEW_IDEA_TITLE':
            new_state = cloneObject(state);
            new_state.newIdea.title = action.value;
            new_state.user.errorMessage = null;
            return new_state;

        case 'UPDATE_NEW_IDEA_DESCRIPTION':
            new_state = cloneObject(state);
            new_state.newIdea.description = action.value;
            new_state.user.errorMessage = null;
            return new_state;

        case 'UPDATE_NEW_IDEA_CATEGORY':
            new_state = cloneObject(state);
            new_state.newIdea.categoryId = action.value;
            return new_state;

        case 'UPDATE_NEW_IDEA_PRIORITY':
            new_state = cloneObject(state);
            new_state.newIdea.priorityId = action.value;
            return new_state;

        case 'UPDATE_EDIT_IDEA_TITLE':
            new_state = cloneObject(state);
            new_state.editIdea.title = action.value;
            return new_state;

        case 'UPDATE_EDIT_IDEA_DESCRIPTION':
            new_state = cloneObject(state);
            new_state.editIdea.description = action.value;
            return new_state;

        case 'UPDATE_EDIT_IDEA_CATEGORY':
            new_state = cloneObject(state);
            new_state.editIdea.categoryId = action.value;
            return new_state;

        case 'UPDATE_EDIT_IDEA_PRIORITY':
            new_state = cloneObject(state);
            new_state.editIdea.priorityId = action.value;
            return new_state;

        case 'SET_EDIT_IDEA_ID':
            new_state = cloneObject(state);
            new_state.editIdea.id = action.id;
            return new_state;

        case 'UPDATE_NEW_CATEGORY_VALUE':
            new_state = cloneObject(state);
            new_state.newCategory.value = action.value;
            return new_state;

        case 'ADD_NEW_IDEA':
            new_state = cloneObject(state);
            if (new_state.ideas) {
                new_state.newIdea.title = utilities.firstCharToUppercase(new_state.newIdea.title.trim());
                if (new_state.newIdea.description) {
                    new_state.newIdea.description = utilities.firstCharToUppercase(new_state.newIdea.description.trim());
                }
                new_state.ideas.unshift(new_state.newIdea);
            }
            else {
                new_state.ideas = [new_state.newIdea];
            }
            new_state.newIdea = {
                title: null,
                description: null,
                categoryId: null,
                priorityId: null
            }
            return new_state;

        case 'DELETE_IDEA':
            new_state = cloneObject(state);
            let id;
            new_state.ideas.map((value, index) => {
                if (value.title === action.title) {
                    id = index;
                }
            });
            new_state.ideas.splice(id, 1);
            return new_state;

        case 'ADD_NEW_CATEGORY':
            new_state = cloneObject(state);
            new_state.categories.push(utilities.firstCharToUppercase(new_state.newCategory.value.trim()));
            new_state.newCategory = {
                value: null,
            }
            return new_state;

        case 'DELETE_CATEGORY':
            new_state = cloneObject(state);
            new_state.categories.splice(action.index, 1);

            // update ideas categoryIds
            // set all matching categoryIds to null
            // all categoryIds above index should be decreased by 1
            const ideas = new_state.ideas;
            ideas.map((value, index) => {
                if (value.categoryId === action.index) {
                    value.categoryId = null;
                }
                else if (value.categoryId > action.index) {
                    value.categoryId--;
                }
            });
            return new_state;

        case 'UPDATE_IDEA':
            new_state = cloneObject(state);
            for (let i = 0; i < new_state.ideas.length; i++) {
                if (new_state.ideas[i].title === new_state.editIdea.id) {
                    new_state.ideas[i].title = utilities.firstCharToUppercase(new_state.editIdea.title.trim());
                    if (new_state.ideas[i].description) {
                        new_state.ideas[i].description = utilities.firstCharToUppercase(new_state.editIdea.description.trim());
                    }
                    new_state.ideas[i].categoryId = new_state.editIdea.categoryId;
                    new_state.ideas[i].priorityId = new_state.editIdea.priorityId;
                    break;
                }
            }
            return new_state;

        default:
            return state;
    }
}