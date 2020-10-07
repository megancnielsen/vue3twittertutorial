import { createStore } from 'vuex'
import { UserModule } from "./User";

export default createStore({
  state: {
  },
  // Mutations are functions that effect the STATE
  // Mutations are conventionally in all caps
  mutations: {
  },
  // Actions are functions that you call throughout your application that call mutations
  actions: {
  },

  modules: {
    User: UserModule
  }
})

// mutations are the only things that affect the state.
// actions run processes and should be the only things running mutations.
// run actions from pages & components
