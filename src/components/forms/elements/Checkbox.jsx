import { useContext } from "react"
import { FormContext } from "../../../context/FormContext"

const Checkbox = ({ id, label, value }) => {
  const { handleChange } = useContext(FormContext)

  return (
    <div className='mb-3 form-check'>
      <input
        type='checkbox'
        className='form-check-input'
        id='exampleCheck1'
        checked={value}
        onChange={(e) => handleChange(id, e)}
      />
      <label className='htmlForm-check-label' htmlFor='exampleCheck1'>
        {label}
      </label>
    </div>
  )
}

export default Checkbox
