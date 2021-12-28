

export default function reducer(state = {}, action) {
    switch (action.type) {
      case "SET_PROFILE":
        return { user: action.payload }
    //   case REMOVE_USER:
    //     return { user: null }
      default:
        return state;
    }
  }
