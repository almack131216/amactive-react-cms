import { useState, useEffect, useContext } from "react"
import { BREADCRUMBS } from "../context/CrudActions"
import CrudContext from "../context/CrudContext"
const axios = require("axios").default

function useFetchCategories(url, options) {
  const { categories, cxSetCategories, cxSetActiveCategory, subcategories, cxSetSubcategories } = useContext(CrudContext)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const {type} = options
  // const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url)
        const data = response.data
        console.log("data:", data)

        if (data.length) {
          type === "category" && cxSetCategories(data)
          if(type === "subcategory"){
            cxSetActiveCategory({
              id: data[0].categoryId,
              name: data[0].categoryName,
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

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { loading, error, categories, subcategories }
}

function useFetchItems(url, options) {
  const { items, cxSetItems } = useContext(CrudContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url)
        const data = response.data
        console.log("data:", data)

        if (data.length) {
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

export { useFetchCategories, useFetchItems }
