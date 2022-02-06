import { useEffect, useState, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { Container, Table, Button } from "react-bootstrap"
import { buildQuery } from "../context/CrudActions"
import CrudContext from "../context/CrudContext"

const axios = require("axios").default

function SubcategoryList() {
  const { subcategories, cxSetSubcategories, cxDeleteSubcategory } =
    useContext(CrudContext)
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false)

  console.log("[P]--SubcategoryList:", subcategories)
  const params = useParams()

  useEffect(() => {
    const fetchSubcategories = async () => {
      const q = buildQuery({
        api: "subcategories",
        categoryId: params.categoryId ? params.categoryId : null,
      })
      console.log("Q: ", q)

      try {
        const response = await axios.get(q)
        const data = response.data
        console.log(data)

        if (data.length) {
          cxSetSubcategories(data)
          setLoading(false)
        } else {
          cxSetSubcategories([])
        }
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    }

    fetchSubcategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteSubcategory = ({ name, id }) => {
    // `Are you sure want to delete?\r\n${name}\r\n\r\nThis category has ${subcategoryCount} subcategories and ${itemCount} items.
    const q = buildQuery({
      api: "delete",
      type: "subcategory",
      id,
    })
    console.log("Q: ", q)

    if (
      window.confirm(
        `Are you sure want to delete?\r\n${name}\r\n\r\nThis subcategory may have items attached.`
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
            alert("Subcategory deleted successfully")
            cxDeleteSubcategory(id)
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
      <h1>Subcategories</h1>
      {subcategories.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((subcategory, index) => {
              return (
                <tr key={index}>
                  <td>{subcategory.id}</td>
                  <td>
                    <Link
                      to={`/items/c${subcategory.categoryId}/sc${subcategory.id}`}
                    >
                      {subcategory.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/subcategory/edit/${subcategory.id}`}
                      className='btn btn-outline-primary btn-sm'
                    >
                      Edit
                    </Link>

                    <Button
                      variant='outline-danger'
                      size='sm'
                      onClick={() =>
                        deleteSubcategory({
                          name: subcategory.name,
                          id: subcategory.id,
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

export default SubcategoryList
