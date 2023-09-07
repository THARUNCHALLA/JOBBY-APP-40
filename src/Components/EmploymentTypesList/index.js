import './index.css'

const EmploymentTypesList = props => {
  const {User1, checkboxEvent} = props
  const {label, employmentTypeId} = User1

  const checkbox12 = () => {
    checkboxEvent(label)
  }

  return (
    <li className="list1">
      <input
        type="checkbox"
        className="CheckBox1"
        id={employmentTypeId}
        value={label}
        onChange={checkbox12}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default EmploymentTypesList
