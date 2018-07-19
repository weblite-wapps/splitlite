import request from 'superagent'
// config
import config from '../../config'


export default {
  addUser: (username, wisId) => request
    .post(`${config.server}/users/add`)
    .send({ username, wisId })
    .catch(console.log),

  fetchUsers: wisId => request
    .get(`${config.server}/users/fetch`)
    .query({ wisId })
    .then(res => res.body)
    .catch(console.log),

  fetchGraph: wisId => request
    .get(`${config.server}/graph/fetch`)
    .query({ wisId })
    .then(res => res.body)
    .catch(console.log),

  addTrans: transObj => request
    .post(`${config.server}/transaction/add`)
    .send(transObj)
    .catch(console.log),
}
