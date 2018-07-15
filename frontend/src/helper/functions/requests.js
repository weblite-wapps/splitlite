import request from 'superagent'


export default {
  addUser: (username, wisId) => request
    .post('http://localhost:3000/users/add')
    .send({ username, wisId })
    .catch(console.log),

  fetchUsers: wisId => request
    .get('http://localhost:3000/users/fetch')
    .query({ wisId })
    .then(res => res.body)
    .catch(console.log),

  fetchGraph: wisId => request
    .get('http://localhost:3000/graph/fetch')
    .query({ wisId })
    .then(res => res.body)
    .catch(console.log),

  addTrans: transObj => request
    .post('http://localhost:3000/transaction/add')
    .send(transObj)
    .catch(console.log),
}
