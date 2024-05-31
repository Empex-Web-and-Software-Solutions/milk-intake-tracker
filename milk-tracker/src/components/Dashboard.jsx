import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BabyProfileForm from './BabyProfileForm';

const Dashboard = () => {
  const [babyProfile, setBabyProfile] = useState(null);
  const [milkIntake, setMilkIntake] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchBabyProfile();
    fetchRecords();
  }, []);

  const fetchBabyProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/baby-profile', {
        headers: { 'Authorization': token }
      });
      setBabyProfile(response.data);
    } catch (error) {
      console.error('Fetch profile error:', error);
    }
  };

  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/milk-intake', {
        headers: { 'Authorization': token }
      });
      setRecords(response.data);
    } catch (error) {
      console.error('Fetch records error:', error);
    }
  };

  const handleIntakeSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/milk-intake', { amount: milkIntake }, {
        headers: { 'Authorization': token }
      });
      setMilkIntake('');
      fetchRecords();
    } catch (error) {
      console.error('Record intake error:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {babyProfile ? (
        <div>
          <h3>Baby Profile</h3>
          <p>Name: {babyProfile.name}</p>
          <p>Age: {babyProfile.age}</p>
          <p>Sex: {babyProfile.sex}</p>
        </div>
      ) : (
        <BabyProfileForm onSubmit={fetchBabyProfile} />
      )}
      <div>
        <h3>Record Milk Intake</h3>
        <input type="number" value={milkIntake} onChange={(e) => setMilkIntake(e.target.value)} placeholder="Amount in ml" />
        <button onClick={handleIntakeSubmit}>Record</button>
      </div>
      <div>
        <h3>Milk Intake Records</h3>
        <ul>
          {records.map(record => (
            <li key={record._id}>{new Date(record.date).toLocaleString()} - {record.amount} ml</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
