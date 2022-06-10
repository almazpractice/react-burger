export const getAuthToken = () => {
    return localStorage.getItem('token')
}

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
}

export const saveTokens = (accessToken, refreshToken) => {
    if (accessToken.indexOf('Bearer') === 0) {
        accessToken = accessToken.split('Bearer ')[1];
    }
    localStorage.setItem('token', accessToken)
    localStorage.setItem('refreshToken', refreshToken);
}

export const clearTokens = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken');
}