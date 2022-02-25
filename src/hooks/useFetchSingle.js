import { useState, useEffect, useContext } from "react"
import CrudContext from "../context/CrudContext"
const axios = require("axios").default

function useFetchCategory(url, options) {
  // console.log("[useFetch] useFetchCategorySingle | url:", url)
  // 1 CONTEXT functions & props
  const { cxSetActiveCategory, cxSetActiveSubcategory } =
    useContext(CrudContext)
  // 2 STATES
  const [categoryObj, setCategoryObj] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // 3 OPTIONS ({type: "category", categoryId: 2})
  const { type } = options
  // 4 LOAD useEffect
  useEffect(() => {
    const fetchData = async () => {
      // console.log('------> fetchData');
      try {
        const response = await axios.get(url)
        const data = response.data
        console.log(data)

        if (data.length) {
          const dataLite = {
            id: parseInt(data[0].id),
            status: parseInt(data[0].status),
            slug: data[0].slug,
            name: data[0].name,
            categoryId: data[0].categoryId ? parseInt(data[0].categoryId) : null,
            categoryName: data[0].categoryName ? data[0].categoryName : null
          }
          setCategoryObj(dataLite)

          if (type === "category") cxSetActiveCategory(dataLite)
          if (type === "subcategory") {
            cxSetActiveCategory({
              id: data[0].categoryId,
              name: data[0].categoryName,
              slug: data[0].categorySlug,
            })
            cxSetActiveSubcategory(dataLite)
          }
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

  // END return props
  return { loading, error, categoryObj }
}

function useFetchItem(url, options) {
  console.log("[useFetch] useFetchItemSingle | url:", url)
  // 1 CONTEXT functions & props
  const { cxSetActiveCategory, cxSetActiveSubcategory } =
    useContext(CrudContext)
  // 2 STATES
  const [itemObj, setItemObj] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // 3 OPTIONS ({type: "category", categoryId: 2})
  const { type } = options
  // 4 LOAD useEffect
  useEffect(() => {
    const fetchData = async () => {
      console.log('------> fetchData');
      
      try {
        const response = await axios.get(url)
        const data = response.data
        console.log(data)

        if (data.length) {
          const itemLite = {
            id: parseInt(data[0].id),
            status: parseInt(data[0].status),
            slug: data[0].slug,
            name: data[0].name,
            description: data[0].description,
            categoryId: parseInt(data[0].categoryId),
            categoryName: data[0].categoryName,
            subcategoryId: parseInt(data[0].subcategoryId),
            subcategoryName: data[0].subcategoryName,
          }
          console.log(itemLite)
          setItemObj(itemLite)

          cxSetActiveCategory({
            id: data[0].categoryId,
            name: data[0].categoryName,
            slug: data[0].categorySlug,
          })
          cxSetActiveSubcategory({
            id: data[0].subcategoryId,
            name: data[0].subcategoryName,
            slug: data[0].subcategorySlug,
            categoryId: data[0].categoryId,
          })
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

  // END return props
  return { loading, error, itemObj }
}

export { useFetchCategory, useFetchItem }
