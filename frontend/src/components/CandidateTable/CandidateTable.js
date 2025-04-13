import React from 'react';
import axios from 'axios';
import './CandidateTable.css'

const CandidateTable = ({ candidates, fetchCandidates }) => {
    const handleDelete = async (id) => {
        console.log(id)
        const confirm = window.confirm('Are you sure you want to delete this candidate?');
        if (!confirm) return;
      
        try {
          await axios.delete(`http://localhost:5000/api/candidates/${id}`);
          fetchCandidates();
        } catch (error) {
          console.error('Error deleting candidate:', error);
        }
      };
      
        

  return (
    <table className="candidate-table">
      <thead>
        <tr>
          <th>Name</th><th>Phone</th><th>Email</th><th>Gender</th><th>Experience</th><th>Skills</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate) => (
          <tr key={candidate.id}>
            <td>{candidate.name}</td>
            <td>{candidate.phone}</td>
            <td>{candidate.email}</td>
            <td>{candidate.gender}</td>
            <td>{candidate.experience}</td>
            <td>{candidate.skills}</td>
            <td>
            <button onClick={() => handleDelete(candidate.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CandidateTable;
