import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Container, Table, Button } from "react-bootstrap"
import { buildQuery } from "../context/CrudActions"
import CrudContext from "../context/CrudContext"

const axios = require("axios").default

function CategoryList() {
  const { categories, cxSetCategories, cxDeleteCategory } =
    useContext(CrudContext)
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false)
  console.log("[P]--CategoryList:", categories)

  useEffect(() => {
    setLoading(true)

    const fetchCategories = async () => {
      const q = buildQuery({
        api: "categories",
      })
      console.log("Q: ", q)

      try {
        const response = await axios.get(q)
        const data = response.data
        console.log(data)

        if (data.length) {
          cxSetCategories(data)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    }

    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteCategory = ({ name, id }) => {
    // `Are you sure want to delete?\r\n${name}\r\n\r\nThis category has ${subcategoryCount} subcategories and ${itemCount} items.
    const q = buildQuery({
      api: "delete",
      type: "category",
      id,
    })
    console.log("Q: ", q)

    if (
      window.confirm(
        `Are you sure want to delete?\r\n${name}\r\n\r\nThis category may have items attached.`
      )
    ) {
      axios({
        method: "post",
        url: q,
      })
        .then(function (response) {
          //handle success
          console.log(response)
          if (response.status === 200) {
            alert("Category deleted successfully")
            cxDeleteCategory(id)
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response)
        })
    }
  }

  return (
    <Container>
      <h1>Categories</h1>
      {categories.length && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{category.id}</td>
                  <td>
                    <Link to={`/subcategories/c${category.id}`}>
                      {category.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      variant='outline-danger'
                      size='sm'
                      to={`/category/edit/${category.id}`}
                      className='btn btn-outline-primary btn-sm'
                    >
                      Edit
                    </Link>
                    <Button
                      variant='outline-danger'
                      size='sm'
                      onClick={() =>
                        deleteCategory({
                          name: category.name,
                          id: category.id,
                          // subcategoryCount: category.subcategoryCount,
                          // itemCount: category.itemCount
                        })
                      }
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default CategoryList
