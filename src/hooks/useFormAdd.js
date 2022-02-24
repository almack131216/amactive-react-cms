import { useState } from "react"
import { buildQuery } from "../context/CrudActions"
import { useNavigate } from "react-router-dom"
const axios = require("axios").default

const SHARED_PROPS = ({ type, name, categoryId }) => {
  console.log("[useFormAdd] SHARED_PROPS > type: ", type)
  switch (type) {
    case "category":
      return {
        success: `Category '${name}' added successfully`,
        navigate: "/category/list",
      }
    case "subcategory":
      return {
        success: `Subcategory '${name}' added successfully`,
        navigate: `/c${categoryId}/subcategory/list`,
      }
    default:
      return {}
  }
}

function useFormAddCategory() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [addFormStatus, setAddFormStatus] = useState(null)
  const navigate = useNavigate()

  //   const { id, name, slug } = formData
  const addForm = ({ name, slug, type, categoryId }) => {
    setLoading(true)
    const props = SHARED_PROPS({ type, name, categoryId })
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
            console.log("RESPONSE: ", response)
            if (response.status === 200) {
              setAddFormStatus(true)
              console.log(`${props.success}`)
              alert(`${props.success}`)
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

export { useFormAddCategory }
