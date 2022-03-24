import { useState, useContext } from "react"
import { buildQuery } from "../context/CrudActions"
import CrudContext from "../context/CrudContext"
import { useNavigate } from "react-router-dom"
const axios = require("axios").default

const SHARED_PROPS = ({ type, name, categoryId }) => {
  console.log("[useFormEdit] > SHARED_PROPS > type: ", type)
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
  const {
    showCLG,
    categories,
    cxSetActiveCategoryById,
    activeSubcategory,
    cxSetActiveSubcategory,
    cxSetCategories,
    cxSetActiveCategory,
  } = useContext(CrudContext)
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
    showCLG && console.log("[useFormEdit] > submitForm() > Q: ", q)
    showCLG && console.log("[useFormEdit] > submitForm() > values: ", values)

    let formDataNew = new FormData()
    formDataNew.append("id", id)
    name && formDataNew.append("name", name)
    slug && formDataNew.append("slug", slug)
    type && formDataNew.append("type", type)
    if (type === "subcategory" && categoryId) {
      formDataNew.append("categoryId", categoryId)
    }

    showCLG &&
      console.log(
        "[useFormEdit] > submitForm() > formDataNew: ",
        formDataNew,
        "name: ",
        name,
        "slug: ",
        slug,
        "categoryId: ",
        categoryId
      )

    const updateRootCats = (getArr) => {
      const { id, name, slug } = getArr
      console.log("updateRootCats: ", categories, getArr)

      // const newCats = [...categories]
      // newCats.map(obj => {
      //   if(obj.id === getArr.id){
      //     return {...getArr}
      //   }
      //   return obj
      // })
      const newCats = categories.map((obj) => {
        return obj.id === id
          ? { ...obj, name: getArr.name, slug: getArr.slug }
          : obj
      })
      // newCats.push(getArr)
      console.log("updateRootCats: ", newCats)
      cxSetCategories(newCats)
      cxSetActiveCategory(getArr)
    }

    // updateData
    const updateData = async () => {
      showCLG && console.log("[useFormEdit] > submitForm() > updateData()")

      try {
        await axios
          .post(q, formDataNew)
          .then(function (response) {
            //handle success
            showCLG &&
              console.log(
                "[useFormEdit] > submitForm() > updateData() > RESPONSE: ",
                response
              )
            if (response.status === 200) {
              setFormStatusMsg(props.success)
              setFormStatus(true)
              showCLG &&
                console.log(
                  `[useFormEdit] > submitForm() > updateData() > success: ${props.success}`
                )
              alert(`${props.success}`)

              if (type === "category") {
                const updatedCategory = {
                  id: id,
                  name: formDataNew.name ? formDataNew.name : name,
                  slug: formDataNew.slug ? formDataNew.slug : slug,
                }

                console.log("updatedCategory: ", updatedCategory, categories)
                updateRootCats(updatedCategory)
              }

              if (type === "subcategory") {
                categoryId &&
                  categories.length &&
                  cxSetActiveCategoryById(categoryId)

                const newActiveSubcategory = {
                  id,
                  name: name ? name : activeSubcategory.name,
                  slug: slug ? slug : activeSubcategory.slug,
                  categoryId: categoryId
                    ? categoryId
                    : activeSubcategory.categoryId,
                }

                cxSetActiveSubcategory(newActiveSubcategory)
                categoryId &&
                  !categories.length &&
                  navigate(`/c${categoryId}/subcategory/list`)
              }
            }
            // navigate(props.navigate)
          })
          .catch((error) => {
            //handle error
            showCLG &&
              console.log(
                "[useFormEdit] > submitForm() > updateData() > error.response: ",
                error.response
              )
            if (error.response) {
              showCLG &&
                console.log(
                  "[useFormEdit] > submitForm() > updateData() > error.response.data: ",
                  error.response.data
                )
              showCLG &&
                console.log(
                  "[useFormEdit] > submitForm() > updateData() > error.response.status: ",
                  error.response.status
                )
              // showCLG && console.log(error.response.headers);
            }
            setFormStatusMsg("xxx")
            setFormStatus(false)
            alert(`${props.error}`)
          })
      } catch (err) {
        showCLG &&
          console.log(
            "[useFormEdit] > submitForm() > updateData() > Error: ",
            err
          )
        setFormStatusMsg(err)
        setError(err)
        console.error(err)
      }
      setLoading(false)
    }
    // (END) updateData
    updateData()
  }

  return { submitForm, error, loading, formStatus, formStatusMsg }
}

export { useFormEditCategory }
