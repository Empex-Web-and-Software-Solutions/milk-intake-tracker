import React, { useState } from 'react';
import axios from 'axios';

const BabyProfileForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/baby-profile', { name, age, sex }, {
        headers: { 'Authorization': token }
      });
      onSubmit();
    } catch (error) {
      console.error('Profile creation error:', error);
    }
  };

  return (
    <div>
      <h3>Create Baby Profile</h3>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age in months" />
      <select value={sex} onChange={(e) => setSex(e.target.value)}>
        <option value="">Select Sex</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default BabyProfileForm;
