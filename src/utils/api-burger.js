
export const API_URL = 'https://norma.nomoreparties.space/api'

const checkResponse = (res) => {
    if (!res.ok) {
        throw new Error("Error: GET-запрос вернул status: " + res.status);
    }
    else {
        return res.json();
    }
}

const checkSuccess = (data) => {
    if (data.success) {
        return data;
    }
    else {
        throw new Error("Json вернул success === false" + JSON.stringify(data));
    }
}

export const getIngredientsData = async () => {
    return await fetch(API_URL + "/ingredients")
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            return data.data;
        })
}


export const getOrder = async (data) => {
    return await fetch(API_URL + '/orders', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ingredients": data
        })
    })
        .then(checkResponse)
        .then(checkSuccess)
        .then(data => {
            return data.order
        })
}

export const loginRequest = async (email, password) => {
    return await fetch(API_URL + "/auth/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}

export const registerRequest = async (name, email, password) => {
    return await fetch( API_URL + "/auth/register", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        })
    })
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}

export const logoutRequest = async (refreshToken) => {
    return await fetch(API_URL + "/auth/logout", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token": refreshToken,
        })
    })
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}

export const forgotPasswordRequest = async (email) => {
    return await fetch(API_URL + "/password-reset", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email
        })
    })
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}

export const resetPasswordRequest = async (password, refreshCode) => {
    return await fetch(API_URL + "/password-reset/reset", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "token": refreshCode
        })
    })
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            console.log(data)
            return data;
        })
}

export const changeProfileRequest = async (authToken, email, name, password) => {
    return await fetch(API_URL + "/auth/user ", {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify({
            "email": email,
            "name": name,
            "password": password
        })
    })
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}

export const getProfileInfoRequest = async (authToken) => {
    return await fetch(API_URL + '/auth/user', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + authToken
        }
    })
        .then(checkResponse)
        .then(checkSuccess)
        .then(data => data)
}

export const tokenUser = async (refreshToken) => {
    return await fetch(API_URL + "/auth/token", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token": refreshToken,
        })
    })
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}