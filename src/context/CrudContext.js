import { createContext, useEffect, useState, useReducer } from "react"
import { ACTIONS, crudReducer } from "./CrudReducer"
import { buildQuery } from "../context/CrudActions"
import { useFetchCategoryList } from "../hooks/useFetchList"
const axios = require("axios").default

const CrudContext = createContext()

export const CrudProvider = ({ children }) => {
  const initialState = {
    items: [],
    categories: [],
    subcategories: [],
    pageType: "",
    breadcrumbs: [],
    activeCategory: {},
    activeSubcategory: {},
  }

  const [state, dispatch] = useReducer(crudReducer, initialState)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  // 2 FETCH list
  const q = buildQuery({api: "categories"})
  console.log("Q: ", q)
  // const { loading, error, categories } = useFetchCategoryList(q, {type: "category"})

  // useEffect hooks
  useEffect(() => {
    console.log("----------------[useEffect]-[CrudProvider]")
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(q)
        const data = response.data
        console.log("CrudProvider > fetchData:", data)

        if (data.length) {
          cxSetCategories(data)
        } else {
          cxSetCategories([])
        }
        setLoading(false)
      } catch (error) {
        console.log("Error: ", error)
        setError(error)
        setLoading(false)
        console.error(error)
      }
    }

    // TRIGGER function
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cxSetActiveCategory = (getCategoryArr) => {
    // console.log("[CX]---[cxSetActiveCategory]", getCategoryArr)
    dispatch({
      type: ACTIONS.SET_ACTIVE_CATEGORY,
      payload: getCategoryArr,
    })
  }

  const cxSetActiveCategoryById = (getId) => {
    // console.log("[CX]---[cxSetActiveCategoryById]", getId)
    dispatch({
      type: ACTIONS.SET_ACTIVE_CATEGORY_BY_ID,
      payload: getId,
    })
  }

  const cxSetActiveSubcategory = (getSubcategoryArr) => {
    // console.log("[CX]---[cxSetActiveSubcategory]", getCategoryArr)
    dispatch({
      type: ACTIONS.SET_ACTIVE_SUBCATEGORY,
      payload: getSubcategoryArr,
    })
  }

  const cxSetCategories = (getCategories) => {
    // console.log("[CX]---[cxSetCategories]", getCategories)
    dispatch({
      type: ACTIONS.SET_CATEGORIES,
      payload: getCategories,
    })
  }

  const cxSetSubcategories = (getSubcategories) => {
    // console.log("[CX]---[cxSetSubcategories]", getSubcategories)
    dispatch({
      type: ACTIONS.SET_SUBCATEGORIES,
      payload: getSubcategories,
    })
  }

  const cxSetItems = (getItems) => {
    // console.log("[CX]---[cxSetItems]", getItems)
    dispatch({
      type: ACTIONS.SET_ITEMS,
      payload: getItems,
    })
  }

  const cxDeleteCategory = (getId) => {
    // console.log("[CX]---[cxDeleteCategory]", getId)
    dispatch({
      type: ACTIONS.DELETE_CATEGORY,
      payload: getId,
    })
  }

  const cxDeleteSubcategory = (getId) => {
    // console.log("[CX]---[cxDeleteSubcategory]", getId)
    dispatch({
      type: ACTIONS.DELETE_SUBCATEGORY,
      payload: getId,
    })
  }

  const cxDeleteItem = (getId) => {
    // console.log("[CX]---[cxDeleteItem]", getId)
    dispatch({
      type: ACTIONS.DELETE_ITEM,
      payload: getId,
    })
  }

  const cxSetBreadcrumbs = (getCrumbArr) => {
    // console.log("[CX]---[cxSetBreadcrumbs]", getCrumbArr)
    dispatch({
      type: ACTIONS.SET_BREADCRUMBS,
      payload: getCrumbArr,
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
        cxDeleteItem,
        cxSetBreadcrumbs,
        cxSetActiveCategory,
        cxSetActiveCategoryById,
        cxSetActiveSubcategory,
      }}
    >
      {children}
    </CrudContext.Provider>
  )
}

export default CrudContext
