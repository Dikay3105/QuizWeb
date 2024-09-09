import axios from "../util/axiosCustomize";

const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email, password, delay: 3000 });
}

const postLogOut = (email, refresh_token) => {
    return axios.post('api/v1/logout', { email, refresh_token, delay: 1000 });
}

const postRegister = (email, username, password) => {
    const form = new FormData();
    form.append('username', username);
    form.append('email', email);
    form.append('password', password);
    return axios.post('api/v1/register', form);
}

export {
    postLogin,
    postRegister,
    postLogOut
};
