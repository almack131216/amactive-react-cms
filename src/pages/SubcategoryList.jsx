import { useEffect, useContext, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { Container, Table, Button } from "react-bootstrap"
import { BREADCRUMBS, buildQuery } from "../context/CrudActions"
import { useFetchSubcategories } from "../hooks/useFetch"
import CrudContext from "../context/CrudContext"

const axios = require("axios").default

function SubcategoryList() {
  // console.log("[P]--SubcategoryList:", subcategories)
  const { cxSetBreadcrumbs } = useContext(CrudContext)
  let breadcrumbArr = [BREADCRUMBS.CATEGORY_LIST]
  const params = useParams()
  const isMounted = useRef(true)

  const q = buildQuery({
    api: "subcategories",
    categoryId: params.categoryId ? params.categoryId : null,
  })

  const { loading, error, subcategories, cxDeleteSubcategory } =
    useFetchSubcategories(q, {})

  useEffect(() => {
    if (!subcategories.length) return
    if (isMounted) {
      breadcrumbArr.push({
        type: "subcategory-list",
        name: subcategories[0].categoryName,
        slug: `/c${subcategories[0].categoryId}/subcategory/list`,
      })

      if (breadcrumbArr.length) {
        console.log("LOAD BREADCRUMBS...", breadcrumbArr)
        cxSetBreadcrumbs(breadcrumbArr)
      }
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted, subcategories])

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

  if (error) {
    return <h1>Error: {error}</h1>
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (subcategories.length) {
    console.log("Subcategories loaded...", subcategories[0].categoryName)
  }

  return (
    <Container>
      <h1>Subcategories</h1>
      <Link to='/subcategory/add'>Add Subcategory</Link>
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
                      to={`/c${subcategory.categoryId}/sc${subcategory.id}/item/list`}
                    >
                      {subcategory.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/c${subcategory.categoryId}/subcategory/edit/${subcategory.id}`}
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
