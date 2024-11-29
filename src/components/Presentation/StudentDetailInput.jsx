import React from 'react';

const StudentDetailInput = ({
  type = 'text',
  id,
  name,
  value,
  onChange,
  options = [],  // Used for 'select' type fields
  required = false,
  label,
  readOnly = false
}) => {
  if (type === 'select') {
    return (
      <tr>
        <th scope="col">{label}</th>
        <th scope="col">
        <select
          id={id}
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}
          >
          <option value="0">Select {label}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        </th>
      </tr>
    );
  }

  return (
    <>
      <tr>
        <th scope="col">{label}</th>
        <th scope="col">
          <input
            type={type}
            id={id}
            name={name}
            className="form-control"
            value={value}
            onChange={onChange}
            required={required}
            readOnly={readOnly}
          />
        </th>
      </tr>
    </>
  );
};

export default StudentDetailInput;
