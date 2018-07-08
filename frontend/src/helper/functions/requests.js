import request from 'superagent'

export default {
  fetchData () {
    return request
      .get('http://localhost:3000/fetch')
      .then(res => { return res.body })
  }
}