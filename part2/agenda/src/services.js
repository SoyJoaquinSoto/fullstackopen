import axios from "axios";
const BASE_URL = "/api/persons";

const getAll = () => {
	const request = axios.get(BASE_URL);
	return request.then((response) => response.data);
};

const create = (newPerson) => {
	const request = axios.post(BASE_URL, newPerson);
	return request.then((response) => response.data);
};

const update = (id, newPerson) => {
	const request = axios.put(`${BASE_URL}/${id}`, newPerson);
	return request.then((response) => response.data);
};

const remove = (id) => {
	const request = axios.delete(`${BASE_URL}/${id}`);
	return request.then((response) => response.data);
};

const services = { getAll, create, update, remove };

export default services;
