import { Link } from "react-router-dom"

const PageTitle = ({ title, addButton }) => {
  return (
    <>
      <h1 className='d-flex justify-content-between align-items-center'>
        {title}
        {addButton.slug && (
          <Link to={addButton.slug} className='btn btn-sm btn-primary'>
            {addButton.text ? addButton.text : "Button"}
          </Link>
        )}
      </h1>
    </>
  )
}

export default PageTitle
