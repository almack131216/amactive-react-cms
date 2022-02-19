import { useEffect, useState, useContext } from "react"
import { useCrumb } from "../hooks/useCrumb"
import { useParams } from "react-router-dom"
import CrudContext from "../context/CrudContext"
import { useAddCategory } from "../hooks/useAdd"
import useForm from "../hooks/useFormDynamic"
import { FormContext } from "../context/FormContext"
import Element from "../components/forms/elements/Element"
import BtnSubmit from "../components/forms/elements/BtnSubmit"
import formJSON from "../components/forms/data/formAddSubcategory.json"

function SubcategoryAdd() {
  // 1 CONTEXT & props
  const { cxSetBreadcrumbs } = useContext(CrudContext)
  const params = useParams()
  const { breadcrumbArr } = useCrumb({
    page: "subcategory-add",
    categoryId: params.categoryId,
  })
  const { addForm, error, loading, addFormStatus } = useAddCategory()
  const {
    handleChange,
    handleSlug,
    elements,
    values,
    errors,
    handleSubmit,
    setElements,
    setParentCategoryId
  } = useForm(addSubcategory)

  // SET categoryId
  const forceCategorySelected = (loadElements, id) => {
    loadElements && console.log("forceCategorySelected: ", elements, id);
    if (loadElements && id) {
      const newElements = {...loadElements}
      //find the index of object from array that you want to update
      const objIndex = newElements.fields.findIndex(
        (obj) => obj.name === "categoryId"
      )
      // make new object of updated object.
      newElements.fields[objIndex].value = params.categoryId      
      setParentCategoryId(id)
      return newElements
    }
  }

  // SET form field elements
  useEffect(() => {
    console.log("useEffect", params.categoryId);
    // 1 - load fields from JSON
    let loadElements = formJSON[0]
    // 2 - if adding with category in URL
    if(params.categoryId){
      // 2.1 - set default categoryId
      console.log("useEffect > forceCategorySelected: ", params.categoryId);
      const newElements = forceCategorySelected(loadElements, params.categoryId)
      setElements(newElements)
    }else{
      // 2.2 - load default fields from JSON
      setElements(loadElements)
    }
    console.log("loadElements: ", loadElements)
    // 3 - set breadcrumbs
    cxSetBreadcrumbs(breadcrumbArr)
  }, [params.categoryId])

  // SET field values to be empty when subcategory is added
  useEffect(() => {
    if (addFormStatus) {
      console.log("------------RESET")
      fields.forEach((field) => {
        field.value = ""
      })
    }
  }, [addFormStatus])
  const { fields, page_title, btnSubmit } = elements ?? {}

  // Submitting...
  // If form data was added successfully...
  // clear field values
  function addSubcategory() {
    console.log("addSubcategory: ", elements)
    console.log("addSubcategory: values = ", values)
    if (values.length === 0) return
    const { name, slug, categoryId } = values
    console.log(
      "addSubcategory: adding... name: " + name + ", slug: ",
      slug + ", categoryId: ",
      categoryId
    )
    addForm({ name, slug, categoryId, type: "subcategory" })
  }

  if (error) {
    return <h3>There was an error</h3>
  }

  if (loading) {
    return <h3>Loading...</h3>
  }
  // (END) Submitting

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
          <h3>{page_title}</h3>
          <form>
            {/* Dynamic Fields */}
            {fields ? (
              <>
                <Element field={fields[0]} error={errors[fields[0].name]} />
                <Element field={fields[1]} error={errors[fields[1].name]} />
                <Element field={fields[2]} error={errors[fields[2].name]} />
              </>
            ) : null}
            {/* Submit Button */}
            {btnSubmit && <BtnSubmit props={btnSubmit} />}
          </form>
        </div>
      </FormContext.Provider>
    </>
  )
}

export default SubcategoryAdd
