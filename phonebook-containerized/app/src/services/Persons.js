import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const getAll = () => {
    const req = axios.get(BASE_URL);
    return req.then((resp) => resp.data);
};

const create = (newObj) => {
    const req = axios.post(BASE_URL, newObj);
    return req.then((resp) => resp.data);
};

const update = (newObj) => {
    const req = axios.put(`${BASE_URL}/${newObj.id}`, newObj);
    return req.then((resp) => resp.data);
};

const delPerson = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};

export default {
    getAll,
    create,
    update,
    delPerson,
};
