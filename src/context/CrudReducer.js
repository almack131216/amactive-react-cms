// import { v4 as uuidv4 } from "uuid"

const ACTIONS = {
  SET_ITEMS: "set-items",
  SET_CATEGORIES: "set-categories",
  SET_SUBCATEGORIES: "set-subcategories",
  DELETE_CATEGORY: "delete-category",
  DELETE_SUBCATEGORY: "delete-subcategory",
  DELETE_ITEM: "delete-item",
  SET_PAGETYPE: "set-pageType",
  SET_BREADCRUMBS: "set-breadcrumbs",
  SET_ACTIVE_CATEGORY: "set-activeCategory",
}

const crudReducer = (state, action) => {
  console.log("!!! [REDUCER] !!! ", action.type)
  switch (action.type) {
    case ACTIONS.SET_ITEMS:
      return { ...state, items: action.payload }

    case ACTIONS.SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload }

    case ACTIONS.SET_CATEGORIES:
      return { ...state, categories: action.payload }

    case ACTIONS.SET_SUBCATEGORIES:
      return {
        ...state,
        subcategories: action.payload
      }

    case ACTIONS.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      }

    case ACTIONS.DELETE_SUBCATEGORY:
      return {
        ...state,
        subcategories: state.subcategories.filter(
          (subcategory) => subcategory.id !== action.payload
        ),
      }

    case ACTIONS.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case ACTIONS.SET_PAGETYPE:
      return {
        ...state,
        pageType: action.payload.pageType,
        breadcrumbs: action.payload.breadcrumbs,
      }

    case ACTIONS.SET_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: action.payload,
      }

    default:
      return state
  }
}

export { ACTIONS, crudReducer }
