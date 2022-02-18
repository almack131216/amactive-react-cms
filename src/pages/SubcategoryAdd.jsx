import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { useCrumb } from "../hooks/useCrumb"
import useForm from "../hooks/useForm"
import CrudContext from "../context/CrudContext"
import { useAddCategory } from "../hooks/useAdd"
import { Form, Button } from "react-bootstrap"

function SubcategoryAdd() {
  const { cxSetActiveCategory, cxSetBreadcrumbs, activeCategory } =
    useContext(CrudContext)

  const params = useParams()
  const { breadcrumbArr } = useCrumb({
    page: "subcategory-add",
    categoryId: params.categoryId,
  })

  const formLogin = () => {
    console.log("FORM submitted")
    console.log("FORM values: ", values)
    setFormData(values)
    // addForm({ categoryId: parentCategoryId, name, slug, type: 'subcategory' })
  }
  const { setParentCategory, handleChange, values, errors, handleSubmit } = useForm(formLogin)
  const [formData, setFormData] = useState({
    parentCategoryId: params.categoryId ? params.categoryId : 0,
    name: "",
    slug: "",
  })
  const [categoryId, setCategoryId] = useState(null)
  const [canSubmit, setCanSubmit] = useState(true)
  const { parentCategoryId, name, slug } = formData

  const { addForm, error, loading, isSubmitting } = useAddCategory()

  // Fetch listing to edit
  useEffect(() => {
    cxSetBreadcrumbs(breadcrumbArr)
    setCategoryId(params.categoryId)
    setParentCategory(params.categoryId)
    console.log("categoryId: ", categoryId, params.categoryId)
  }, [])

  useEffect(() => {
    console.log("FORM DATA: ", formData);
  }, [formData])

  // if (!categoryId) return <h1>Category not set {params.categoryId}</h1>

  if (error) {
    return <h3>Error: {error}</h3>
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  if (errors) {
    console.log("Errors: ", errors)
  }

  return (
    <>
      <h1>ADD subcategory, cat: {categoryId} > {parentCategoryId}</h1>

      <Form onSubmit={handleSubmit}>
        <fieldset>

            <Form.Group className='mb-3' controlId='formBasicSelect'>
              <Form.Label>Parent Category</Form.Label>
              <Form.Select onChange={handleChange} name='parentCategoryId' defaultValue={categoryId} value={values.parentCategoryId}>
                <option value={2}>Classic Cars For Sale</option>
                <option value={10}>History</option>
                <option value={4}>Press / Media</option>
                <option value={12}>Staff</option>
                <option value={0}>Choose</option>
              </Form.Select>
              <Form.Text className='text-muted'>
                You must choose a parent category to proceed
              </Form.Text>
            </Form.Group>


          {categoryId || values.parentCategoryId ? (
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Subcategory Name</Form.Label>
              <Form.Control
                type='text'
                minLength='4'
                name='name'
                value={values.name ? values.name : ''}
                autoComplete='off'
                placeholder='Enter name'
                onChange={handleChange}
                className={errors.name && 'is-invalid'}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </Form.Group>
          ) : null}

          {(categoryId || values.parentCategoryId) && values.name && !errors.name ? (
            <Form.Group className='mb-3' controlId='formBasicSlug'>
              <Form.Label>Friendly URL (Slug)</Form.Label>
              <Form.Control
                type='text'
                minLength='4'
                name='slug'
                value={values.slug ? values.slug : ''}
                autoComplete='off'
                placeholder='enter-url-friendly-name'
                onChange={handleChange}
                className={errors.slug && 'is-invalid'}
              />
              {errors.slug && <div className="invalid-feedback">{errors.slug}</div>}
            </Form.Group>
          ) : null}

          <Button type='submit' disabled={!canSubmit}>
            Submit
          </Button>

          <ul>
            <li>parentCategoryId: {values.parentCategoryId} / {formData.parentCategoryId}</li>
            <li>name: {name} / {formData.name} / {values.name}</li>
            <li>slug: {slug} / {formData.slug}</li>

          </ul>
        </fieldset>
      </Form>
    </>
  )
}

export default SubcategoryAdd
