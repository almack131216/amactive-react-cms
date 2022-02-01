import { v4 as uuidv4 } from "uuid"

const ACTIONS = {
  SET_ITEMS: "set-items",
  SET_CATEGORIES: "set-categories",
  SET_SUBCATEGORIES: "set-subcategories",
}

const crudReducer = (state, action) => {
  console.log("!!! [REDUCER] !!! ", action.type)
  switch (action.type) {
    case ACTIONS.SET_ITEMS:
      return { ...state, items: action.payload }

    case ACTIONS.SET_CATEGORIES:
      return { ...state, categories: action.payload }

    case ACTIONS.SET_SUBCATEGORIES:
      return { ...state, subcategories: action.payload }

    default:
      return state
  }
}

export { ACTIONS, crudReducer }
