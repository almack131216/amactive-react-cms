import { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { Table, Button } from "react-bootstrap"
import CrudContext from "../context/CrudContext"
import { buildQuery } from "../context/CrudActions"
import { useCrumb } from "../hooks/useCrumb"
import { useFetchCategoryList } from "../hooks/useFetchList"
import { useDeleteCategory } from "../hooks/useDelete"
import PageTitle from "../components/PageTitle"

function CategoryList() {
  console.log("[P]--CategoryList")
  // 1 CONTEXT functions & props
  const { cxSetActiveCategory, cxSetActiveSubCategory, cxSetBreadcrumbs } = useContext(CrudContext)
  const {breadcrumbArr} = useCrumb({page:'category-list'})
  // 2 FETCH list
  const q = buildQuery({api: "categories"})
  console.log("Q: ", q)
  const { loading, error, categories } = useFetchCategoryList(q, {type: "category"})
  
  // 3 DELETE category  
  const { deleteCategory, deletedId } = useDeleteCategory()
  // 4 USEEFFECT
  useEffect(() => {
    // cxSetActiveCategory({})
    // cxSetActiveSubCategory({})
    cxSetBreadcrumbs(breadcrumbArr)
  }, [])
  
  // RETURNED props from custom hooks
  if (error) return <h1>Error: {error}</h1>
  if (loading) return <h1>Loading...</h1>
  if(deletedId) console.log('deletedId: ', deletedId);

  // XML
  return (
    <>
      <PageTitle title="Categories" addButton={{text: 'add category', slug: `/category/add`}} />
      {categories.length && (
        <>
        {/* <h1>deletedId: {deletedId}</h1> */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              return (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>
                    {
                      category.subcategoryCount > 0 ? <Link to={`/c${category.id}/subcategory/list`}>
                      {category.name}
                    </Link> : category.name
                    }
                    
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
                          type: "category"
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
      </>
      )}
    </>
  )
}

export default CategoryList
