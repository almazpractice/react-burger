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

