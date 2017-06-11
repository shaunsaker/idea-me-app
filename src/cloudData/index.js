import firestack from '../firestack';

const response = {
    success: null,
    message: null,
}

export default class CloudData {
    static loadUserData(action) {
        return new Promise(resolve => { 
            firestack.database.ref('users/' + action.uid).on('value', snapshot => {
                response.success = true;
                response.message = snapshot.val();
                resolve(response);
            }, (error) => {
                response.success = false;
                response.message = error.message;
                resolve(response);
            });
        });
    }

    static saveUserData(action) {

        // Allows us to pass in 'profile' and only update that node
        const nodeRef = action.node || '';

        console.log('Dispatching save at users/' + action.uid + '/' + nodeRef);

        return new Promise(resolve => {
            firestack.database.ref('users/' + action.uid + '/' + nodeRef).update({ 
                ...action.userData,
            })
            .then(() => {
                response.success = true;
                response.message = null;
                resolve(response);
            })
            .catch(error => {
                response.success = false;
                response.message = error.message;
                resolve(response);
            });
        });
    }
}