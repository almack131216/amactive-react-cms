import { useState, useContext } from "react"
import { buildQuery } from "../context/CrudActions"
import { useNavigate } from "react-router-dom"
import CrudContext from "../context/CrudContext"
const axios = require("axios").default

const SHARED_PROPS = ({ type, name, categoryId }) => {
  // console.log("[useFormAdd] SHARED_PROPS > type: ", type)
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
  const { cxFetchCategories } = useContext(CrudContext)
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
    // console.log("[useFormAdd] > useFormAddCategory() > Q: ", q)
    // console.log("[useFormAdd] > useFormAddCategory() > name: ", name)

    let formDataNew = new FormData()
    formDataNew.append("name", name)
    formDataNew.append("slug", slug)
    formDataNew.append("type", type)
    if (type === "subcategory" && categoryId) {
      formDataNew.append("categoryId", categoryId)
    }

    console.log(
      "[useFormAdd] > useFormAddCategory() > formData > categoryId: ",
      categoryId,
      ", name: ",
      name
    )

    const insertData = async () => {
      try {
        await axios
          .post(q, formDataNew)
          .then(function (response) {
            // handle success
            // console.log(
            //   "[useFormAdd] > useFormAddCategory() > response: ",
            //   response
            // )
            if (response.status === 200) {
              // console.log(
              //   `[useFormAdd] > useFormAddCategory() > success: ${props.success}`
              // )
              if (type === "category") {
                cxFetchCategories();
                console.log('LOAD INIT CATS');
              }

              setAddFormStatus(true)
              alert(`${props.success}`)
            }
            navigate(props.navigate)
          })
          .catch(function (response) {
            // handle error
            // console.log(
            //   "[useFormAdd] > useFormAddCategory() > catch() > response: ",
            //   response
            // )
            setAddFormStatus(false)
          })
      } catch (error) {
        // console.log(
        //   "[useFormAdd] > useFormAddCategory() > catch() > Error: ",
        //   error
        // )
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
