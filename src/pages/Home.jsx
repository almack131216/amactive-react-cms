import { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import CrudContext from "../context/CrudContext"

function Home() {
  const { loading, error, categories, cxSetBreadcrumbs } = useContext(CrudContext)

  useEffect(() => {
    cxSetBreadcrumbs({})
  }, [])

  if(loading) return <h3>Loading...</h3>

  return (
    <>
      <h2>Home</h2>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          {
            !categories.length && <Link to='/category/add'>Add Category</Link>            
          }
          {
            categories.length && <Link to='/category/list'>Categories ({categories.length})</Link>
          }
        </li>
      </ul>
    </>
  )
}

export default Home
