const SalaryRangesList = props => {
  const {User1, RadioBox} = props
  const {label, salaryRangeId} = User1

  const radio = () => {
    RadioBox(label.split(' '))
  }

  return (
    <li className="list1">
      <input
        type="radio"
        className="CheckBox1"
        id={salaryRangeId}
        value={salaryRangeId}
        name="salary-radio"
        onChange={radio}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryRangesList
