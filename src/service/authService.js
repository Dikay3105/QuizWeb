import axios from "../util/axiosCustomize";

const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email, password, delay: 5000 });
}

const postRegister = (email, username, password) => {
    const form = new FormData();
    form.append('username', username);
    form.append('email', email);
    form.append('password', password);
    return axios.post('api/v1/register', form);
}

const delUser = (id) => {
    return axios.delete('api/v1/participant', { data: { id: id } });
}

const getListUserPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const getListUser = () => {
    return axios.get('api/v1/participant/all');
}

export {
    postLogin,
    postRegister,
};
