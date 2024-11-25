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
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
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
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
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
    </div>
  );
};

export default StudentDetailInput;
