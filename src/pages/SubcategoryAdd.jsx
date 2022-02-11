import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { useCrumb } from "../hooks/useCrumb"
import { Form, Button, Row, Col } from "react-bootstrap"
import CrudContext from "../context/CrudContext"
import { useAddCategory } from "../hooks/useAdd"

function SubcategoryAdd() {
  const { cxSetActiveCategory, cxSetBreadcrumbs, activeCategory } =
    useContext(CrudContext)
  const params = useParams()
  const { breadcrumbArr } = useCrumb({
    page: "subcategory-add",
    categoryId: params.categoryId,
  })
  const [formData, setFormData] = useState({})
  const [categoryId, setCategoryId] = useState(null)

  const { name, slug } = formData

  const { addForm, error, loading, isSubmitting } = useAddCategory()

  // Fetch listing to edit
  useEffect(() => {
    cxSetBreadcrumbs(breadcrumbArr)
    setCategoryId(params.categoryId)
    console.log("categoryId: ", categoryId, params.categoryId)
  }, [])

  if (!categoryId) return <h1>Category not set {params.categoryId}</h1>

  if (error) {
    return <h3>Error: {error}</h3>
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  const onChange = (e) => {
    // console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <h1>ADD subcategory, cat: {categoryId}</h1>

      <Form>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>
            Name
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              plaintext
              placeholder='Subcategory Name'
              name='name'
              onChange={(e) => onChange(e)}
              value={name || ""}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>
            Slug
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              plaintext
              placeholder='subcategory-slug'
              name='slug'
              onChange={(e) => onChange(e)}
              value={slug || ""}
            />
          </Col>
        </Form.Group>
      </Form>
      <Form.Control readOnly plaintext name='categoryId' value={categoryId} />
      <Button
        type='submit'
        onClick={() => addForm({ name, slug, categoryId, type: "subcategory" })}
        disabled={isSubmitting}
      >
        add
      </Button>
    </>
  )
}

export default SubcategoryAdd
