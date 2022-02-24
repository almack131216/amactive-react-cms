import { useEffect, useState, useContext } from "react"
import { useCrumb } from "../hooks/useCrumb"
import { useParams } from "react-router-dom"
import { buildQuery } from "../context/CrudActions"
import CrudContext from "../context/CrudContext"
import { useFormEditCategory } from "../hooks/useFormEdit"
import useForm from "../hooks/useFormDynamic"
import { FormContext } from "../context/FormContext"
import Element from "../components/forms/elements/Element"
import BtnSubmit from "../components/forms/elements/BtnSubmit"
import formJSON from "../components/forms/data/formAddSubcategory.json"
import { useFetchCategory } from "../hooks/useFetchSingle"
const axios = require("axios").default

function SubcategoryAdd() {
  // console.log("[P]--SubcategoryEdit")
  // 1 CONTEXT
  const {
    cxSetBreadcrumbs,
    activeCategory,
    activeSubcategory,
    cxSetActiveCategory,
    cxSetActiveSubcategory,
  } = useContext(CrudContext)
  const params = useParams()
  let { breadcrumbArr } = useCrumb({
    page: "subcategory-edit",
    categoryId: activeCategory ? activeCategory.id : null,
    subcategoryId: params.categoryId,
  })
  const [valuesInit, setValuesInit] = useState({})
  const [canSubmit, setCanSubmit] = useState(false)
  // FETCH
  const q = buildQuery({
    api: "subcategories",
    id: params.subcategoryId ? params.subcategoryId : null,
  })
  // console.log("Q: ", q)
  const { loading, error, categoryObj } = useFetchCategory(q, {
    type: "subcategory",
  })
  const { id, name, slug } = categoryObj

  // USEEFFECT
  // useEffect(() => {
  //   cxSetBreadcrumbs(breadcrumbArr)
  // }, [activeSubcategory])

  // HOOKS
  const {
    submitForm,
    error: errorEdit,
    loading: loadingEdit,
    formStatus,
    formStatusMsg
  } = useFormEditCategory()

  // HOOKS
  const {
    handleChange,
    handleSlug,
    elements,
    values,
    errors,
    handleSubmit,
    setElements,
  } = useForm(editSubcategory)

  // SET form field elements

  // SET field values to be empty when subcategory is added
  useEffect(() => {
    // if (formStatus) {
      console.log("------------STATUS")
      
    // }
  }, [formStatusMsg])

  const { fields, page_title_edit, btnUpdate } = elements ?? {}
  const fieldKeys =
    fields &&
    fields.map((item) => {
      return item.name
    })

  // SET form field elements
  useEffect(() => {
    console.log(
      "useEffect: categoryObj=",
      categoryObj,
      Object.keys(categoryObj).length
    )
    // 1 - load fields from JSON
    let loadElements = formJSON[0]
    // 2 - if adding with category in URL
    if (Object.keys(categoryObj).length) {
      console.log("useEffect > forceCategorySelected: ", 12)
      // const newElements = forceCategorySelected(loadElements, 12)

      const newElements = { ...loadElements }
      // make new object of updated object.
      newElements.fields[0].value = categoryObj.name
      newElements.fields[1].value = categoryObj.slug
      newElements.fields[2].value = categoryObj.categoryId
      console.log("newElements: ", newElements)
      setElements(newElements)
      console.log("loadElements: ", loadElements)
      // 3 - set breadcrumbs
      cxSetActiveCategory({
        id: categoryObj.categoryId,
        name: categoryObj.categoryName,
        slug: categoryObj.categorySlug,
      })
      cxSetActiveSubcategory({
        id: categoryObj.id,
        name: categoryObj.name,
        slug: categoryObj.slug,
      })
      setValuesInit({
        name: categoryObj.name,
        slug: categoryObj.slug,
        categoryId: categoryObj.categoryId,
      })
      cxSetBreadcrumbs(breadcrumbArr)
    }
  }, [categoryObj])

  // can submit?
  useEffect(() => {
    console.log("///////")
    values && Object.keys(values).length && isFormValid()
  }, [values, errors])

  function isFormValid() {
    console.log("fieldKeys:", fieldKeys)

    let tmpArr = {}
    let hasChanged = 0
    for (let i = 0, len = fieldKeys.length; i < len; i++) {
      if (
        values[fieldKeys[i]] &&
        values[fieldKeys[i]] !== valuesInit[fieldKeys[i]]
      ) {
        hasChanged++
        // console.log(`${fieldKeys[i]} changed`)
        tmpArr[fieldKeys[i]] = values[fieldKeys[i]]
      } else {
        // console.log(`${fieldKeys[i]} unchanged`)
        tmpArr[fieldKeys[i]] = valuesInit[fieldKeys[i]]
      }
    }

    if (
      hasChanged > 0 &&
      tmpArr !== valuesInit &&
      !Object.keys(errors).length
    ) {
      console.log("FIELDS CHANGED")
      // return false
      setCanSubmit(true)
    } else {
      console.log("NO CHANGE")
      setCanSubmit(false)
    }
    // return true
  }

  // RETURNED PROPS
  if (error) return <h1>Error: {error}</h1>
  if (loading) return <h1>Loading...</h1>

  // Submitting...
  // If form data was added successfully...
  // clear field values
  function editSubcategory() {
    console.log("editSubcategory: ", elements)
    console.log("editSubcategory: values = ", values)
    if (values.length === 0) return
    const { name, slug, categoryId } = values
    console.log(
      "editSubcategory: editing... name: " + name + ", slug: ",
      slug + ", categoryId: ",
      categoryId
    )
    submitForm({ id, values, categoryId, type: "subcategory" })
    setCanSubmit(false)
  }

  if (error) {
    return <h3>There was an error</h3>
  }

  if (errorEdit) {
    return <h3>There was an error updating</h3>
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  if (loadingEdit) {
    return <h3>Updating...</h3>
  }
  // (END) Submitting

  console.log("FIELDS:", fields)
  // XML
  return (
    <>
      <FormContext.Provider
        value={{
          handleChange,
          handleSlug,
          handleSubmit,
          values,
          loading,
          errors,
          fields,
        }}
      >
        <div className='container'>
          <h3>{page_title_edit}</h3>          
          <div role="alert" className="fade alert alert-info show">
            status: {formStatusMsg}
          </div>
          <p>
            id: {id}, name: {name}, slug: {slug}
          </p>
          <form>
            {/* Dynamic Fields */}
            {fields
              ? fields.map((field, i) => (
                  <Element key={i} field={field} error={errors[field.name]} />
                ))
              : null}
            {/* Submit Button */}
            {fields && (
              <p>
                canSubmit: values: {Object.keys(values).length}, errors:{" "}
                {Object.keys(errors).length}
              </p>
            )}
            {fields && btnUpdate && (
              <BtnSubmit props={btnUpdate} canSubmit={canSubmit} />
            )}
          </form>
        </div>
      </FormContext.Provider>
    </>
  )
}

export default SubcategoryAdd
