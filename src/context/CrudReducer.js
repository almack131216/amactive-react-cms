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
  SET_ACTIVE_CATEGORY_BY_ID: "set-activeCategoryById",
  SET_ACTIVE_SUBCATEGORY: "set-activeSubcategory",
}

const crudReducer = (state, action) => {
  state.showCLG && console.log("!!! [REDUCER] !!! ", action.type)
  switch (action.type) {
    case ACTIONS.SET_ITEMS:
      return { ...state, items: action.payload }

    case ACTIONS.SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload }

    case ACTIONS.SET_ACTIVE_CATEGORY_BY_ID:
      return {
        ...state,
        activeCategory: state.categories.find(
          (obj) => obj.id === action.payload
        ),
      }

    case ACTIONS.SET_ACTIVE_SUBCATEGORY:
      return { ...state, activeSubcategory: action.payload }

    case ACTIONS.SET_CATEGORIES:
      // SET options for <select> categoryId
      const categoryOptions = action.payload.map(obj => {
        return {
          label: obj.name,
          slug: obj.slug,
          value: obj.id
        }
      })
      // (END) SET options
      return { ...state, categories: action.payload, selectCategoryOptions: categoryOptions }

    case ACTIONS.SET_SUBCATEGORIES:
      return {
        ...state,
        subcategories: action.payload,
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
