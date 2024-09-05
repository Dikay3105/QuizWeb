import axios from "../util/axiosCustomize";

const postCreateNewUser = (email, username, password, role, image) => {
    const form = new FormData();
    form.append('email', email);
    form.append('username', username);
    form.append('password', password);
    form.append('role', role);
    form.append('userImage', image);
    return axios.post('api/v1/participant', form);
}

const putUpdateUser = (id, username, role, image) => {
    const form = new FormData();
    form.append('id', id);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    return axios.put('api/v1/participant', form);
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
    postCreateNewUser,
    getListUser,
    getListUserPaginate,
    putUpdateUser,
    delUser
};
