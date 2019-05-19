// modules
import request from 'superagent'
// config
import config from '../../config'


export default {
  addUser: (username, wisId) => request
    .post(`${config.server}/users/add`)
    .send({ username, wisId }),

  fetchUsers: wisId => request
    .get(`${config.server}/users/fetch`)
    .query({ wisId })
    .then(res => res.body),

  fetchGraph: wisId => request
    .get(`${config.server}/graph/fetch`)
    .query({ wisId })
    .then(res => res.body),

  addTrans: transObj => request
    .post(`${config.server}/transaction/add`)
    .send(transObj)
}
