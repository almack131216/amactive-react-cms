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
  const [error, setError] = useState(null)
  const [addFormStatus, setAddFormStatus] = useState(null)
  const navigate = useNavigate()

  //   const { id, name, slug } = formData
  const addForm = ({ name, slug, type, categoryId }) => {
    setLoading(true)
    const props = SHARED_PROPS({ type, categoryId })
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
              setAddFormStatus(true)
              alert(`${props.success} added successfully.`)
            }
            navigate(props.navigate)
          })
          .catch(function (response) {
            //handle error
            console.log(response)
            setAddFormStatus(false)
          })
      } catch (error) {
        console.log("Error: ", error)
        setError(error)        
        console.error(error)
      }
      setLoading(false)
    }
    insertData()
  }

  return { addForm, error, loading, addFormStatus }
}

export { useAddCategory }
