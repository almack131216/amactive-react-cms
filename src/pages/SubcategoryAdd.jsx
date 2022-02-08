import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { BREADCRUMBS } from "../context/CrudActions"
import { Form, Button, Row, Col } from "react-bootstrap"
import CrudContext from "../context/CrudContext"
import { useAddSubcategory } from "../hooks/useAdd"

function SubcategoryAdd() {
  const { cxSetActiveCategory, cxSetBreadcrumbs, activeCategory } =
    useContext(CrudContext)
  const [formData, setFormData] = useState({})

  const params = useParams()

  const [categoryId, setCategoryId] = useState(0)

  const { name, slug } = formData

  const { addForm, error, loading, isSubmitting } = useAddSubcategory(
    name,
    slug,
    categoryId
  )

  // Fetch listing to edit
  useEffect(() => {
    let breadcrumbArr = [BREADCRUMBS.CATEGORY_LIST]
    cxSetBreadcrumbs(breadcrumbArr)

    console.log("categoryId: ", categoryId, activeCategory.id)
    setCategoryId(activeCategory.id ? activeCategory.id : params.categoryId)
  }, [])

  if (!categoryId) return <h1>Category not set {activeCategory.id}</h1>

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
      <h1>ADD subcategory</h1>

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
        onClick={() => addForm({ name, slug, categoryId })}
        disabled={isSubmitting}
      >
        add
      </Button>
    </>
  )
}

export default SubcategoryAdd
