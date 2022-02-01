import { createContext, useEffect, useReducer } from "react"
import { ACTIONS, crudReducer } from "./CrudReducer"
import { getCategories, getSubcategories, getItems } from "./CrudActions"

const CrudContext = createContext()

export const CrudProvider = ({ children }) => {
  const initialState = {
    items: [],
    categories: [],
    subcategories: [],
    categoryId: null,
  }

  const [state, dispatch] = useReducer(crudReducer, initialState)
  const { categories, subcategories, items, categoryId } = { ...state }

  // useEffect hooks
  useEffect(() => {
    console.log("----------------")

    const storedCategories = getCategories()
    const storedSubcategories = getSubcategories()
    const storedItems = getItems()

    if (storedCategories) {
      cxSetCategories(storedCategories)
      console.log("[CX]---[useEffect] categories: ", storedCategories)
    }
    
    if (storedSubcategories) {
      cxSetSubcategories(storedSubcategories)
      console.log("[CX]---[useEffect] subcategories: ", storedSubcategories)
    }
    
    if (storedItems) {
      cxSetItems(storedItems)
      console.log("[CX]---[useEffect] categories: ", storedItems)
    }
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

  return (
    <CrudContext.Provider
      value={{
        ...state,
        dispatch,
        ACTIONS,
      }}
    >
      {children}
    </CrudContext.Provider>
  )
}

export default CrudContext
