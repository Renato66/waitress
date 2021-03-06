export default {
  menu (state) {
    return state.menu
  },
  menuTypes (state) {
    let menuTypes = {}
    for (const index in state.menu) {
      if (menuTypes[state.menu[index].type] === undefined) {
        menuTypes[state.menu[index].type] = []
      }
      menuTypes[state.menu[index].type].push({
        ...state.menu[index],
        id: index
      })
    }
    return menuTypes
  }
}
