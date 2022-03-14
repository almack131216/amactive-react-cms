import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { useCrumb } from "../../hooks/useCrumb"
import { buildQuery } from "../../context/CrudActions"
import { useFetchCategory } from "../../hooks/useFetchSingle"
import { Form, Button, Row, Col } from "react-bootstrap"
import CrudContext from "../../context/CrudContext"

const axios = require("axios").default

function CategoryEdit() {
  console.log("[P]--CategoryEdit")
  // 1 CONTEXT
  const {
    categories,
    cxSetCategories,
    cxSetActiveCategory,
    cxSetBreadcrumbs,
    activeCategory,
  } = useContext(CrudContext)
  const [categoriesInit, setCategoriesInit] = useState([])
  const params = useParams()
  const { breadcrumbArr } = useCrumb({
    page: "category-edit",
    categoryId: params.categoryId,
  })
  const [formData, setFormData] = useState({})
  // FETCH
  const q = buildQuery({
    api: "categories",
    id: params.categoryId ? params.categoryId : null,
  })
  console.log("Q: ", q)
  const { loading, error, categoryObj } = useFetchCategory(q, {
    type: "category",
  })
  const { id, name, slug } = categoryObj
  // USEEFFECT
  useEffect(() => {
    cxSetBreadcrumbs(breadcrumbArr)
    console.log("cats: ", categories)
  }, [activeCategory])

  // 2Do - form validations
  const onChange = (e) => {
    // console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // RETURNED PROPS
  if (error) return <h1>Error: {error}</h1>
  if (loading) return <h1>Loading...</h1>

  const updateRootCats = (getArr) => {
    const { id, name, slug } = getArr
    console.log("updateRootCats: ", categories, getArr)

    // const newCats = [...categories]
    // newCats.map(obj => {
    //   if(obj.id === getArr.id){
    //     return {...getArr}
    //   }
    //   return obj
    // })
    const newCats = categories.map((obj) => {
      return obj.id === id ? {...obj, name: getArr.name, slug: getArr.slug} : obj
    })
    // newCats.push(getArr)
    console.log("updateRootCats: ", newCats)
    setCategoriesInit(categories)
    cxSetCategories(newCats)
    cxSetActiveCategory(getArr)
  }

  // 2Do - custom hook
  const updateForm = ({ id, name, slug }) => {
    const q = buildQuery({
      api: "update",
      type: "category",
      id,
    })
    console.log("[POST] Q: ", q)
    console.log("name: ", formData.name)

    let formDataNew = new FormData()
    formDataNew.append("id", id)
    formData.name && formDataNew.append("name", formData.name)
    formData.slug && formDataNew.append("slug", formData.slug)
    formDataNew.append("type", "category")

    console.log("formData: ", formDataNew, name)

    axios
      .post(q, formDataNew)
      .then(function (response) {
        //handle success
        console.log(response)
        if (response.status === 200) {
          alert("Category update successfully.")

          const updatedCategory = {
            id: id,
            name: formData.name ? formData.name : name,
            slug: formData.slug ? formData.slug : slug,
          }

          console.log("updatedCategory: ", updatedCategory, categories)
          updateRootCats(updatedCategory)
          // cxSetCategories(newCategories)
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response)
      })
  }

  // XML
  return (
    <>
      <h1>EDIT category</h1>

      <Form>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>
            Name
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              plaintext
              defaultValue={name}
              name='name'
              onChange={(e) => onChange(e)}
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
              defaultValue={slug}
              name='slug'
              onChange={(e) => onChange(e)}
            />
          </Col>
        </Form.Group>
      </Form>

      <Button type='submit' onClick={() => updateForm({ id, name, slug })}>
        update
      </Button>

      <div className='row'>
        <div className='col-sm-4'>
          <h3>Old</h3>
          {categoriesInit.map((obj) => (
            <li key={obj.id} style={ obj.id === id  ? {backgroundColor: 'red',color:"white" } : null}>{obj.name}</li>
          ))}
        </div>
        <div className='col-sm-4'>
          <h3>STATE</h3>
          {categories.map((obj) => (
            <li key={obj.id} style={ obj.id === id  ? {backgroundColor: 'green',color:"white" } : null}>{obj.name}</li>
          ))}
        </div>
      </div>
    </>
  )
}

export default CategoryEdit
