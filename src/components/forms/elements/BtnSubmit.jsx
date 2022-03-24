import { useContext } from "react"
import { FormContext } from "../../../context/FormContext"

const BtnSubmit = ({ props, canSubmit }) => {
  const { handleSubmit } = useContext(FormContext)

  // fields &&
  //   console.log("values: ", Object.keys(values).length, values, fields.length)
  // fields && console.log("errors: ", Object.keys(errors).length, errors)

  return (
    <div className='form-group row'>
      <label htmlFor={props.name} className='col-sm-3 col-form-label'>
        Submit
      </label>
      <div className={`col-sm-9`}>
        <button
          onClick={(e) => handleSubmit(e)}
          type='submit'
          className={props.classes}
          disabled={!canSubmit}
        >
          {props.label}
        </button>

        {/* <p>{`values: ${Object.keys(values).length}, ${values}, ${fields.length}`}</p>
        <p>{`errors: ${Object.keys(errors).length}, ${errors}`}</p> */}
        {/* <p>{`loading: ${loading}`}</p> */}
      </div>
    </div>
  )
}

export default BtnSubmit
