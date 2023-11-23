export const useCountStore = defineStore('CountStore', {
  state: () => {
    return {
      count: 0,
    }
  },
  getters: {},
  actions: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCountStore, import.meta.hot))
}
