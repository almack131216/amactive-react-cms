import { useState, useEffect, useContext } from "react"
import { BREADCRUMBS } from "../context/CrudActions"
import CrudContext from "../context/CrudContext"
const axios = require("axios").default

function useFetchCategories(url, options) {
  const { categories, cxSetCategories } = useContext(CrudContext)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url)
        const data = response.data
        console.log("data:", data)

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

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { loading, error, categories }
}

function useFetchSubcategories(url, options) {
  const { cxSetActiveCategory, subcategories, cxSetSubcategories } =
    useContext(CrudContext)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // const [data, setData] = useState(null)

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
          })
          cxSetSubcategories(data)
        } else {
          cxSetSubcategories([])
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

  return { loading, error, subcategories }
}

export { useFetchCategories, useFetchSubcategories }
