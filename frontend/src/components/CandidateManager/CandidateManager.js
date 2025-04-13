import React, { useEffect, useState } from 'react';
import CandidateForm from '../CandidateForm/CandidateForm';
import CandidateTable from '../CandidateTable/CandidateTable';
import FilterBar from '../FilterBar/FilterBar';
import { getCandidates, deleteCandidate } from '../api/candidateApi';
import './CandidateManager.css';

const CandidateManager = () => {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 10;

  const fetchCandidates = async () => {
    const res = await getCandidates();
    setCandidates(res.data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleDelete = async (id) => {
    await deleteCandidate(id);
    fetchCandidates();
  };

  const filteredCandidates = candidates
    .filter(c => (
      (!filters.gender || c.gender === filters.gender) &&
      (!filters.experience || c.experience === filters.experience) &&
      (!filters.skills || filters.skills.split(',').every(skill => c.skills.includes(skill.trim())))
    ))
    .filter(c => (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    ));

  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * candidatesPerPage,
    currentPage * candidatesPerPage
  );

  return (
    <div className="manager-container">
      <h1>Candidates</h1>
      <CandidateForm onSuccess={fetchCandidates} />
      <input
        type="text"
        placeholder="Search by name, phone, or email"
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <FilterBar filters={filters} setFilters={setFilters} />
      <CandidateTable candidates={paginatedCandidates} onDelete={handleDelete} />
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage * candidatesPerPage >= filteredCandidates.length} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
};

export default CandidateManager;
