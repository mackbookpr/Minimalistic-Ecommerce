import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/Register', formData);
      console.log(response.data); // Log response from the backend
      // Optionally, you can handle the response data here (e.g., display success message)
    } catch (error) {
      console.error('Error:', error.response.data); // Log any errors from the backend
      // Optionally, you can handle errors here (e.g., display error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST" action="">
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
