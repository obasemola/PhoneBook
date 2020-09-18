import axios from 'axios'

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseURL)
};

const create = (newInfo) => {
  return axios.post(baseURL, newInfo)
};

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`)
}

const update = (id, newObject) => {
  return axios.put(`${baseURL}/${id}`, newObject)
}

export default {
  getAll,
  create,
  remove,
  update
}