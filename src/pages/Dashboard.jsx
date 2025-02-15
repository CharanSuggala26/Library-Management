import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    activeLoans: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const booksResponse = await axios.get('http://localhost:5000/api/books');
      const membersResponse = await axios.get('http://localhost:5000/api/members');
      const loansResponse = await axios.get('http://localhost:5000/api/loans');

      const activeLoans = loansResponse.data.filter(loan => !loan.returned).length;

      setStats({
        totalBooks: booksResponse.data.length,
        totalMembers: membersResponse.data.length,
        activeLoans
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setStats({
        totalBooks: 0,
        totalMembers: 0,
        activeLoans: 0
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Books</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.totalBooks}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Members</h2>
          <p className="text-3xl font-bold text-green-600">{stats.totalMembers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Active Loans</h2>
          <p className="text-3xl font-bold text-purple-600">{stats.activeLoans}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;