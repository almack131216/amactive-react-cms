import { useEffect, useState, useContext } from "react"
import { useCrumb } from "../hooks/useCrumb"
import CrudContext from "../context/CrudContext"
import { useAddCategory } from "../hooks/useAdd"
import useForm from "../hooks/useFormDynamic"
import { FormContext } from "../context/FormContext"
import Element from "../components/forms/elements/Element"
import BtnSubmit from "../components/forms/elements/BtnSubmit"
import formJSON from "../components/forms/data/formAddCategory.json"

function CategoryAdd() {
  // 1 CONTEXT & props
  const { cxSetBreadcrumbs } = useContext(CrudContext)
  const { breadcrumbArr } = useCrumb({
    page: "category-add",
  })
  const { addForm, error, loading, addFormStatus } = useAddCategory()
  const { handleChange, handleSlug, elements, values, errors, handleSubmit, setElements } =
    useForm(addCategory)

  // SET form field elements
  useEffect(() => {
    cxSetBreadcrumbs(breadcrumbArr)
    setElements(formJSON[0])
  }, [])

  // SET field values to be empty when category is added
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
  function addCategory() {
    console.log("addCategory: ", elements)
    console.log("addCategory: values = ", values)
    if (values.length === 0) return
    const { name, slug } = values
    console.log("addCategory: adding... name: " + name + ", slug: ", slug)
    addForm({ name, slug, type: "category" })
  }

  if (addFormStatus) {
    console.log("------------RESET")
    fields.forEach((field) => {
      field.value = ""
    })
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
            {btnSubmit && <BtnSubmit props={btnSubmit} />}
          </form>
        </div>
      </FormContext.Provider>
    </>
  )
}

export default CategoryAdd
