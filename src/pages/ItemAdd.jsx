import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { useCrumb } from "../hooks/useCrumb"
import { Form, Button, Row, Col } from "react-bootstrap"
import CrudContext from "../context/CrudContext"
import { useAddCategory } from "../hooks/useAdd"

function ItemAdd() {
  // 1 CONTEXT & props
  const { cxSetBreadcrumbs } = useContext(CrudContext)
  const [formData, setFormData] = useState({})
  const { name, slug } = formData
  const params = useParams()
  const { breadcrumbArr } = useCrumb({
    page: "item-add",
    categoryId: params.categoryId,
    subcategoryId: params.subcategoryId
  })
  const { addForm, error, loading, isSubmitting } = useAddCategory()

  // Fetch listing to edit
  useEffect(() => {
    cxSetBreadcrumbs(breadcrumbArr)
  }, [])

  if (error) {
    return <h3>Error: {error}</h3>
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <>
      <h1>ADD item</h1>
    </>
  )
}

export default ItemAdd
