import { createContext, useEffect, useReducer } from "react"
import { ACTIONS, crudReducer } from "./CrudReducer"

const CrudContext = createContext()

export const CrudProvider = ({ children }) => {
  const initialState = {
    items: [],
    categories: [],
    subcategories: [],
    categoryId: null,
  }

  const [state, dispatch] = useReducer(crudReducer, initialState)

  // useEffect hooks
  useEffect(() => {
    console.log("----------------[useEffect]-[CX]")
  }, [])

  const cxSetCategories = (getCategories) => {
    console.log("[CX]---[cxSetCategories]", getCategories)
    dispatch({
      type: ACTIONS.SET_CATEGORIES,
      payload: getCategories,
    })
  }

  const cxSetSubcategories = (getSubcategories) => {
    console.log("[CX]---[cxSetSubcategories]", getSubcategories)
    dispatch({
      type: ACTIONS.SET_SUBCATEGORIES,
      payload: getSubcategories,
    })
  }

  const cxSetItems = (getItems) => {
    console.log("[CX]---[cxSetItems]", getItems)
    dispatch({
      type: ACTIONS.SET_ITEMS,
      payload: getItems,
    })
  }

  const cxDeleteCategory = (getId) => {
    console.log("[CX]---[cxDeleteCategory]", getId)
    dispatch({
      type: ACTIONS.DELETE_CATEGORY,
      payload: getId,
    })
  }

  const cxDeleteSubcategory = (getId) => {
    console.log('[CX]---[cxDeleteSubcategory]', getId)
    dispatch({
      type: ACTIONS.DELETE_SUBCATEGORY,
      payload: getId
    })
  }

  const cxDeleteItem = (getId) => {
    console.log('[CX]---[cxDeleteItem]', getId)
    dispatch({
      type: ACTIONS.DELETE_ITEM,
      payload: getId
    })
  }

  return (
    <CrudContext.Provider
      value={{
        ...state,
        dispatch,
        ACTIONS,
        cxSetCategories,
        cxSetSubcategories,
        cxSetItems,
        cxDeleteCategory,
        cxDeleteSubcategory,
        cxDeleteItem
      }}
    >
      {children}
    </CrudContext.Provider>
  )
}

export default CrudContext
