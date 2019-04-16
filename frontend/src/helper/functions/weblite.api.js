// W
const { W } = window  

export default vueRoot =>
  W.setHooks({
    wappWillStart(start) {
      /* Load Data */
      // get user
      W.loadData().then(
        ({ user: { name } }) => {
          vueRoot.username = name
          vueRoot.wisId = W.wisId

          vueRoot.addUser()
          start()
        },
      )
    },
  })



