import { useState, useEffect, useContext } from "react"
import CrudContext from "../context/CrudContext"
const axios = require("axios").default

function useFetchCategoryList(url, options) {
  console.log("[useFetch] useFetchCategoryList | url:", url)
  // 1 CONTEXT functions & props
  const {
    categories,
    cxSetCategories,
    cxSetActiveCategory,
    subcategories,
    cxSetSubcategories,
    cxSetActiveSubcategory
  } = useContext(CrudContext)
  // 2 STATES
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // 3 OPTIONS ({type: "category", categoryId: 2})
  const { type } = options
  // 4 LOAD useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url)
        const data = response.data
        console.log("data:", data)

        if (data.length) {
          type === "category" && cxSetCategories(data)
          if (type === "subcategory") {
            cxSetActiveCategory({
              id: data[0].categoryId,
              name: data[0].categoryName,
              slug: data[0].categorySlug,
            })
            cxSetActiveSubcategory({
              id: data[0].id,
              name: data[0].name,
              slug: data[0].slug,
            })
            cxSetSubcategories(data)
          }
        } else {
          type === "category" && cxSetCategories([])
          type === "subcategory" && cxSetSubcategories([])
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

  // RETURN props
  return { loading, error, categories, subcategories }
}

function useFetchItems(url, options) {
  const { items, cxSetItems, cxSetActiveCategory, cxSetActiveSubcategory } =
    useContext(CrudContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url)
        const data = response.data
        console.log("data:", data)

        if (data.length) {
          cxSetActiveCategory({
            id: data[0].categoryId,
            name: data[0].categoryName,
            slug: data[0].categorySlug,
          })
          cxSetActiveSubcategory({
            id: data[0].subcategoryId,
            name: data[0].subcategoryName,
            slug: data[0].subcategorySlug,
          })
          cxSetItems(data)
        } else {
          cxSetItems([])
        }
        setLoading(false)
      } catch (error) {
        console.log("Error: ", error)
        setError(error)
        setLoading(false)
        console.error(error)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { loading, error, items }
}

export { useFetchCategoryList, useFetchItems }
