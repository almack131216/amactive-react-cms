import { useEffect, useState, useContext } from "react"
import { useCrumb } from "../hooks/useCrumb"
import { useParams } from "react-router-dom"
import CrudContext from "../context/CrudContext"
import { useFormAddCategory } from "../hooks/useFormAdd"
import useForm from "../hooks/useFormDynamic"
import { FormContext } from "../context/FormContext"
import Element from "../components/forms/elements/Element"
import BtnSubmit from "../components/forms/elements/BtnSubmit"
import formJSON from "../components/forms/data/formAddSubcategory.json"

function SubcategoryAdd() {
  // CONTEXT & props
  const { showCLG, cxSetBreadcrumbs } = useContext(CrudContext)
  const params = useParams()
  const { breadcrumbArr } = useCrumb({
    page: "subcategory-add",
    categoryId: params.categoryId,
  })
  // HOOKS
  const { addForm, error, loading, addFormStatus } = useFormAddCategory()
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
    loadElements && showCLG && console.log("[P]--SubcategoryAdd > forceCategorySelected: ", elements, id);
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
    showCLG && console.log("[P]--SubcategoryAdd > useEffect > params.categoryId: ", params.categoryId);
    // 1 - load fields from JSON
    let loadElements = formJSON[0]
    // 2 - if adding with category in URL
    if(params.categoryId){
      // 2.1 - set default categoryId
      showCLG && console.log("[P]--SubcategoryAdd > useEffect > params.categoryId: ", params.categoryId);
      const newElements = forceCategorySelected(loadElements, params.categoryId)
      setElements(newElements)
    }else{
      // 2.2 - load default fields from JSON
      setElements(loadElements)
    }
    showCLG && console.log("[P]--SubcategoryAdd > useEffect > loadElements: ", loadElements)
    // 3 - set breadcrumbs
    cxSetBreadcrumbs(breadcrumbArr)
  }, [params.categoryId])

  // SET field values to be empty when subcategory is added
  useEffect(() => {
    if (addFormStatus) {
      showCLG && console.log("[P]--SubcategoryAdd > useEffect > --- RESET ---")
      fields.forEach((field) => {
        field.value = ""
      })
    }
  }, [addFormStatus])
  const { fields, page_title, btnAdd } = elements ?? {}

  // Submitting...
  // If form data was added successfully...
  // clear field values
  function addSubcategory() {
    showCLG && console.log("[P]--SubcategoryAdd > addSubcategory > elements: ", elements)
    showCLG && console.log("[P]--SubcategoryAdd > addSubcategory > values: ", values)
    if (values.length === 0) return
    const { name, slug, categoryId } = values
    showCLG && console.log(
      "[P]--SubcategoryAdd > useEffect > addSubcategory >  adding... name: " + name + ", slug: ",
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
            {fields
              ? fields.map((field, i) => (
                  <Element key={i} field={field} error={errors[field.name]} />
                ))
              : null}
            {/* Submit Button */}
            {fields && btnAdd && <BtnSubmit props={btnAdd} canSubmit={true}/>}
          </form>
        </div>
      </FormContext.Provider>
    </>
  )
}

export default SubcategoryAdd
