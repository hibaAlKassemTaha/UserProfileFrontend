import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getAll,
    addUser,
    editUser,
    uploadImage,
    getImage
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/userProfile/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = user.token;
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function addUser(username, password, firstName, lastName,address, country, isActive, salary, dateofbirth) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, firstName, lastName, address, country, isActive, salary, dateofbirth})
    };

    return fetch(`${config.apiUrl}/userProfile/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // Create user successfully
            

            return user;
        });
}

function editUser(userId, profileimagepath){
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({ profileimagepath })
    };

    return fetch(`${config.apiUrl}/userProfile/${userId}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // Create user successfully
            

            return user;
        });
}


function uploadImage(file) {
    const data = new FormData();
data.append('file_attachment', file);
    const requestOptions = {
        method: 'POST',
        body: data
    };

    return fetch(`${config.apiUrl}/api/uploadProfileImage`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
    

            return user;
        });
}

function getImage(userId) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/userProfile/getProfilePhoto/18`, requestOptions)
        .then(handleResponse)
        .then(file => {    
            return file;
        });
}



function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

