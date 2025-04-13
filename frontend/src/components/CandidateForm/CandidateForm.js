import React, { useState } from 'react';
import axios from 'axios';
import './CandidateForm.css'

const CandidateForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: 'Male',
    experience: '1 Year',
    skills: ''
  });

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/candidates', {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim())
    });
    setFormData({ name: '', phone: '', email: '', gender: 'Male', experience: '1 Year', skills: '' });
    setShowForm(false);
    onSuccess();
  };

  return (
    <div className="form-container">
      <button className="add-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Candidate'}
      </button>

      {showForm && (
        <form className="candidate-form" onSubmit={handleSubmit}>
          <input value={formData.name} placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />
          <input value={formData.phone} placeholder="Phone" onChange={e => setFormData({...formData, phone: e.target.value})} />
          <input value={formData.email} placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
          <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <select value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})}>
            <option>1 Year</option>
            <option>2 Years</option>
            <option>3 Years</option>
          </select>
          <input value={formData.skills} placeholder="Skills (comma separated)" onChange={e => setFormData({...formData, skills: e.target.value})} />
          <button className="submit-button" type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default CandidateForm;
