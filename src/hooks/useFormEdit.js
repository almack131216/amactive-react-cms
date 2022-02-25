import { useState, useContext } from "react"
import { buildQuery } from "../context/CrudActions"
import CrudContext from "../context/CrudContext"
import { useNavigate } from "react-router-dom"
const axios = require("axios").default

const SHARED_PROPS = ({ type, name, categoryId }) => {
  console.log("[useFormAdd] SHARED_PROPS > type: ", type)
  switch (type) {
    case "category":
      return {
        success: `Category updated successfully`,
        navigate: "/category/list",
        error: `There was an error updating this category`,
      }
    case "subcategory":
      return {
        success: `Subcategory updated successfully`,
        navigate: `/c${categoryId}/subcategory/list`,
        error: `There was an error updating this subcategory`,
      }
    default:
      return {}
  }
}

function useFormEditCategory() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formStatus, setFormStatus] = useState(null)
  const [formStatusMsg, setFormStatusMsg] = useState(null)
  const { categories, activeCategory, cxSetActiveCategoryById, cxSetActiveCategory, activeSubcategory, cxSetActiveSubcategory } = useContext(CrudContext)
  const navigate = useNavigate()

  //   const { id, name, slug } = formData
  const submitForm = ({ id, values, type }) => {
    setLoading(true)
    const { name, slug, categoryId } = values
    const props = SHARED_PROPS({ type, name, categoryId })
    const q = buildQuery({
      api: "update",
      type: type,
      id,
    })
    console.log("[POST] Q: ", q)
    console.log("values: ", values)

    let formDataNew = new FormData()
    formDataNew.append("id", id)
    name && formDataNew.append("name", name)
    slug && formDataNew.append("slug", slug)
    type && formDataNew.append("type", type)
    if (type === "subcategory" && categoryId) {
      formDataNew.append("categoryId", categoryId)
    }

    console.log(
      "formDataNew: ",
      formDataNew,
      "name: ",
      name,
      "slug: ",
      slug,
      "categoryId: ",
      categoryId
    )

    const updateData = async () => {
      console.log("updateData")

      try {
        await axios
          .post(q, formDataNew)
          .then(function (response) {
            //handle success
            console.log("RESPONSE: ", response)
            if (response.status === 200) {
              setFormStatusMsg(props.success)
              setFormStatus(true)
              console.log(`${props.success}`)
              alert(`${props.success}`)

              if(type === "subcategory") {
                categoryId && categories.length && cxSetActiveCategoryById(categoryId)

                const newActiveSubcategory = {
                  id,
                  name: name ? name : activeSubcategory.name,
                  slug: slug ? slug : activeSubcategory.slug,
                  categoryId: categoryId ? categoryId : activeSubcategory.categoryId
                }

                cxSetActiveSubcategory(newActiveSubcategory)
                categoryId && !categories.length && navigate(`/c${categoryId}/subcategory/list`)
              }
            }
            // navigate(props.navigate)
          })
          .catch((error) => {
            //handle error
            console.log("Err: ", error.response)
            if (error.response) {
              console.log(error.response.data)
              console.log(error.response.status)
              // console.log(error.response.headers);
            }
            setFormStatusMsg("xxx")
            setFormStatus(false)
            alert(`${props.error}`)
          })
      } catch (err) {
        console.log("Error: ", err)
        setFormStatusMsg(err)
        setError(err)
        console.error(err)
      }
      setLoading(false)
    }
    updateData()
  }

  return { submitForm, error, loading, formStatus, formStatusMsg }
}

export { useFormEditCategory }
