import { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import CrudContext from "../context/CrudContext"

function Home() {
  const { cxSetBreadcrumbs } = useContext(CrudContext)

  useEffect(() => {
    cxSetBreadcrumbs({})
  }, [])

  return (
    <>
      <h2>Home</h2>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/category/list'>Categories</Link>
        </li>
      </ul>
    </>
  )
}

export default Home
