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
import formCategoryJSON from "../components/forms/data/formAddCategory.json"
import formSubcategoryJSON from "../components/forms/data/formAddSubcategory.json"
import { useFetchCategory } from "../hooks/useFetchSingle"

function SubcategoryEdit({page}) {
  // console.log("[P]--[SubcategoryEdit]")
  const type = page === 'category-edit' ? "category" : "subcategory"
  // 1 CONTEXT
  const {
    showCLG,
    activeCategory,
    activeSubcategory,
    cxSetBreadcrumbs,
    cxSetActiveCategory,
    cxSetActiveSubcategory,
  } = useContext(CrudContext)

  // FETCH
  const params = useParams()
  const pageProps = {
    categoryId: params.categoryId ? params.categoryId : null,
    subcategoryId: params.subcategoryId ? params.subcategoryId : null,
    api: params.categoryId ? "categories" : "subcategories",
    apiId: params.categoryId ? params.categoryId : params.subcategoryId,
    jsonData: params.categoryId ? formCategoryJSON[0] : formSubcategoryJSON[0],
  }
  console.log('page: ', page);
  let { breadcrumbArr } = useCrumb({
    page,
    categoryId: pageProps.categoryId,
    subcategoryId: pageProps.subcategoryId,
  })

  const [canSubmit, setCanSubmit] = useState(false)
  // FETCH
  const q = buildQuery({
    page,
    api: pageProps.api,
    id: pageProps.apiId,
  })
  const { loading, error, categoryObj } = useFetchCategory(q, {
    type, page
  })
  const { id, name, slug } = categoryObj

  // HOOKS
  const {
    submitForm,
    error: formError,
    loading: formLoading,
    formStatus,
    formStatusMsg,
  } = useFormEditCategory()

  // HOOKS
  const {
    handleChange,
    handleSlug,
    elements,
    values,
    valuesInit,
    errors,
    handleSubmit,
    setElements,
    highlightFieldChange,
    isFormValid,
    setCategoryObjInit,
    setFieldKeysInit,
  } = useForm(editSubcategory)
  // PROPS from hooks
  const { fields, page_title_edit, btnUpdate } = elements ?? {}

  // USEEFFECT
  // SET form field elements
  useEffect(() => {
    showCLG &&
      console.log(
        "[P]--[useEffect] > categoryObj=",
        categoryObj,
        Object.keys(categoryObj).length
      )
    // 1 - load fields from JSON
    let loadElements = pageProps.jsonData
    // 2 - if adding with category in URL
    if (Object.keys(categoryObj).length) {
      showCLG && console.log("[P]--[useEffect] > forceCategorySelected: ", 12)
      // const newElements = forceCategorySelected(loadElements, 12)

      const newElements = { ...loadElements }
      const { id, name, slug, categoryId, categoryName, categorySlug } =
        categoryObj
      // make new object of updated object.
      newElements.fields[0].value = name
      newElements.fields[1].value = slug
      if (page === "category-edit") {
        // 3 - set breadcrumbs
        cxSetActiveCategory({
          id: id,
          name: name,
          slug: slug,
        })
        cxSetActiveSubcategory({})
        setFieldKeysInit(["name", "slug"])
      }
      if (page === "subcategory-edit") {
        newElements.fields[2].value = categoryId
        // 3 - set breadcrumbs
        cxSetActiveCategory({
          id: categoryId,
          name: categoryName,
          slug: categorySlug,
        })
        cxSetActiveSubcategory({
          id: id,
          name: name,
          slug: slug,
          categoryId: categoryId,
        })
        setFieldKeysInit(["name", "slug", "categoryId"])
      }
      showCLG && console.log("[P]--[useEffect] > newElements: ", newElements)
      showCLG && console.log("[P]--[useEffect] > loadElements: ", loadElements)
      setElements(newElements)
      setCategoryObjInit(categoryObj)      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryObj])

  // set breadcrumbs
  useEffect(() => {
    cxSetBreadcrumbs(breadcrumbArr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, activeSubcategory])

  // can submit?
  useEffect(() => {
    showCLG && console.log("[P]--[useEffect] > isFormValid()")
    setCanSubmit(isFormValid())
    values && Object.keys(values).length && isFormValid()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, errors])

  // Submitting...
  // If form data was added successfully...
  // clear field values
  function editSubcategory() {
    showCLG &&
      console.log("[P]--[editSubcategory] > editSubcategory: ", elements)
    showCLG && console.log("[P]--[editSubcategory] > values = ", values)
    if (!canSubmit) return
    // const { name, slug, categoryId } = values
    showCLG &&
      console.log(
        "[P]--[editSubcategory] > editing... name: " + values.name + ", slug: ",
        values.slug + ", categoryId: ",
        values.categoryId
      )
    submitForm({
      id,
      values,
      type,
    })
    setCanSubmit(false)
  }
  // (END) Submitting

  // RETURNED PROPS
  if (error) return <h1>Error: {error}</h1>
  if (loading) return <h3>Loading...</h3>
  if (formError) return <h3>There was an error updating</h3>
  if (formLoading) return <h3>Updating...</h3>
  if (!valuesInit) return <h3>Loading Object...</h3>

  showCLG && console.log("[P]-- FIELDS:", fields)
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
          {formStatusMsg ? (
            <div role='alert' className='fade alert alert-info show'>
              status: {formStatusMsg}
            </div>
          ) : null}
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

            {fields && btnUpdate && (
              <BtnSubmit props={btnUpdate} canSubmit={canSubmit} />
            )}
            <hr />
            {fields && (
              <div className='row'>
                <div className='col-sm-4'>
                  <h3>FORM</h3>
                  <ul>
                    <li>canSubmit: {canSubmit === true ? "yes" : "no"}</li>
                    <li>values: {Object.keys(values).length}</li>
                    <li>
                      errors: {Object.keys(errors).length},{" "}
                      {Object.keys(errors).map((err, index) => {
                        return index === 0 ? err : `, ${err}`
                      })}
                    </li>
                    <li>loading: {loading}</li>
                  </ul>
                </div>
                <div className='col-sm-4'>
                  <h3>Old</h3>
                  <ul>
                    <li>name: {valuesInit.name}</li>
                    <li>slug: {valuesInit.slug}</li>
                    {page === "subcategory-edit" && (
                      <li>categoryId: {valuesInit.categoryId}</li>
                    )}
                  </ul>
                </div>
                <div className='col-sm-4'>
                  <h3>STATE</h3>
                  <ul>
                    <li>
                      name:{" "}
                      {highlightFieldChange(
                        fields[0].value,
                        valuesInit.name,
                        errors.name
                      )}
                    </li>
                    <li>
                      slug:{" "}
                      {highlightFieldChange(
                        fields[1].value,
                        valuesInit.slug,
                        errors.slug
                      )}
                    </li>
                    {page === "subcategory-edit" && (
                      <li>
                        categoryId:{" "}
                        {highlightFieldChange(
                          fields[2].value,
                          valuesInit.categoryId,
                          errors.categoryId
                        )}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </form>
        </div>
      </FormContext.Provider>
    </>
  )
}

export default SubcategoryEdit
