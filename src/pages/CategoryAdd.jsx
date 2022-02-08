import { useEffect, useState, useContext } from "react"
import { BREADCRUMBS } from "../context/CrudActions"
import { Form, Button, Row, Col } from "react-bootstrap"
import CrudContext from "../context/CrudContext"
import { useAddCategory } from "../hooks/useAdd"

function CategoryAdd() {
  const { cxSetActiveCategory, cxSetBreadcrumbs } = useContext(CrudContext)
  const [formData, setFormData] = useState({})
  const { name, slug } = formData

  const { addForm, error, loading, isSubmitting } = useAddCategory(name, slug)

  // Fetch listing to edit
  useEffect(() => {
    let breadcrumbArr = [BREADCRUMBS.CATEGORY_LIST]
    cxSetBreadcrumbs(breadcrumbArr)
  }, [])

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
      <h1>ADD category</h1>

      <Form>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>
            Name
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              plaintext
              placeholder='Category Name'
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
              placeholder='category-slug'
              name='slug'
              onChange={(e) => onChange(e)}
              value={slug || ""}
            />
          </Col>
        </Form.Group>
      </Form>

      <Button
        type='submit'
        onClick={() => addForm({ name, slug })}
        disabled={isSubmitting}
      >
        add
      </Button>
    </>
  )
}

export default CategoryAdd
