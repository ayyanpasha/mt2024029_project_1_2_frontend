import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { changePassword } from '../utils/httpsutil';
import StudentDetailInput from '../components/Presentation/StudentDetailInput';

export default function ChangePassword() {
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const history = useNavigate();

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      alert("Password do not match");
      return;
    }


    try {
      await changePassword(password.oldPassword, password.newPassword);
      history('/login');
    } catch (err) {
      alert('Error updating password:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPassword({
      ...password,
      [name]: value
    });
  };

  const passwordFields = [
    { id: 'oldPassword', name: 'oldPassword', label: 'Old Password' },
    { id: 'newPassword', name: 'newPassword', label: 'New Password' },
    { id: 'confirmPassword', name: 'confirmPassword', label: 'Confirm Password' },
  ];

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title text-center">Change Password</h5>
              <form onSubmit={handleSubmit}>
                {passwordFields.map(({ id, name, label }) => (
                  <StudentDetailInput
                    key={id}
                    type="password"
                    id={id}
                    name={name}
                    value={password[name]}
                    onChange={handleChange}
                    label={label}
                    required
                  />
                ))}

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  Change Password
                </button>
              </form>
              <Link to="/">Details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
