import { useContext } from "react"
import { FormContext } from "../../../context/FormContext"

const BtnSubmit = ({ props }) => {
  const { handleSubmit, errors, values, fields, loading } = useContext(FormContext)

  fields &&
    console.log("values: ", Object.keys(values).length, values, fields.length)
  fields && console.log("errors: ", Object.keys(errors).length, errors)

  return (
    <div className='form-group row'>
      <label htmlFor={props.name} className='col-sm-2 col-form-label'>
        Submit
      </label>
      <div className={`col-sm-10`}>
        <button
          onClick={(e) => handleSubmit(e)}
          type='submit'
          className={props.classes}
          disabled={
            Object.keys(values).length !== fields.length ||
            Object.keys(errors).length !== 0 ||
            loading === true
              ? true
              : false
          }
        >
          {props.label}-{Object.keys(errors)}-{Object.keys(errors).length}
        </button>

        <p>{`values: ${Object.keys(values).length}, ${values}, ${fields.length}`}</p>
        <p>{`errors: ${Object.keys(errors).length}, ${errors}`}</p>
        <p>{`loading: ${loading}`}</p>
      </div>
    </div>
  )
}

export default BtnSubmit
