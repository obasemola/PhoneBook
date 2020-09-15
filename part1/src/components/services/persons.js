import axios from 'axios'

const baseURL = 'api/persons';

const getAll = async () => {
  return await axios.get(baseURL)

};

const create = async (newInfo) => {
  return await axios.post(baseURL, newInfo)
};

const remove = async (id) => {
  return await axios.delete(`${baseURL}/${id}`)
}

const update = async (id, newObject) => {
  return await axios.put(`${baseURL}/${id}`, newObject)

}

export default {
  getAll,
  create,
  remove,
  update
}