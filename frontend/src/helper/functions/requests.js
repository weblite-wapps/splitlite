import request from 'superagent'

export default {
  addUser (username, wisId) {
    return request
      .post('http://localhost:3000/users/add')
      .send({ username: username, wisId: wisId })
      .then(res => res)
  },
  fetchUsers (wisId) {
    return request
      .get('http://localhost:3000/users/fetch')
      .query({ wisId: wisId })
      .then(res => res.body)
  },
  fetchGraph (wisId) {
    return request
      .get('http://localhost:3000/graph/fetch')
      .query({ wisId: wisId })
      .then(res => res.body)
  },
  addTrans (transObj) {
    return request
      .post('http://localhost:3000/transaction/add')
      .send(transObj)
      .then(res => res)
  },
}