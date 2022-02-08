import { useState } from "react"
import { buildQuery } from "../context/CrudActions"
import { useNavigate } from "react-router-dom"
const axios = require("axios").default

const SHARED_PROPS = ({ type, categoryId }) => {
  console.log("[useAdd] SHARED_PROPS > type: ", type)
  switch (type) {
    case "category":
      return {
        success: "CAT !!!",
        navigate: "/category/list",
      }
    case "subcategory":
      return {
        success: "SUBCAT !!!",
        navigate: `/c${categoryId}/subcategory/list`,
      }
    default:
      return {}
  }
}

function useAddCategory() {
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  //   const { id, name, slug } = formData
  const addForm = ({ name, slug, type, categoryId }) => {
    const props = SHARED_PROPS({ type, categoryId })
    setIsSubmitting(true)
    const q = buildQuery({
      api: "insert",
      type: type,
    })
    console.log("[POST] Q: ", q)
    console.log("name: ", name)

    let formDataNew = new FormData()
    formDataNew.append("name", name)
    formDataNew.append("slug", slug)
    formDataNew.append("type", type)
    if(type === 'subcategory' && categoryId){
      formDataNew.append("categoryId", categoryId)
    }

    console.log("formData: ", formDataNew, name)

    const insertData = async () => {
      try {
        await axios
          .post(q, formDataNew)
          .then(function (response) {
            //handle success
            console.log(response)
            if (response.status === 200) {
              alert(`${props.success} added successfully.`)
            }
            setIsSubmitting(false)
            navigate(props.navigate)
          })
          .catch(function (response) {
            //handle error
            console.log(response)
            setIsSubmitting(false)
          })
      } catch (error) {
        console.log("Error: ", error)
        setError(error)
        setLoading(false)
        console.error(error)
      }
    }
    insertData()
  }

  return { addForm, error, loading, isSubmitting }
}

export { useAddCategory }
