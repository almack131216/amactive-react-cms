import { useContext } from "react"
// import Breadcrumb from "react-bootstrap/Breadcrumb"
import { Link } from "react-router-dom"
import CrudContext from "../context/CrudContext"

function Breadcrumbs() {
  const { breadcrumbs } = useContext(CrudContext)
  return (
    <>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>Home</Link>
          </li>
          {breadcrumbs.length > 0 &&
            breadcrumbs.map((bc, index) => {
              return (
                <li className='breadcrumb-item' key={index}>
                    {
                        index === breadcrumbs.length - 1 ? bc.name : <Link to={bc.slug}>{bc.name}</Link>
                    }                  
                </li>
              )
            })}
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumbs
