import { useState, useEffect } from 'react';
import axios from 'axios';

function Loans() {
  const [loans, setLoans] = useState([]);
  const [newLoan, setNewLoan] = useState({
    memberId: '',
    bookId: '',
    dueDate: ''
  });
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchLoans();
    fetchMembers();
    fetchBooks();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/loans');
      setLoans(response.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data.filter(book => book.quantity > 0));
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/loans', newLoan);
      setNewLoan({ memberId: '', bookId: '', dueDate: '' });
      fetchLoans();
      fetchBooks();
    } catch (error) {
      console.error('Error creating loan:', error);
    }
  };

  const handleReturn = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/loans/${id}/return`);
      fetchLoans();
      fetchBooks();
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Loans Management</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Issue New Loan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Member</label>
            <select
              value={newLoan.memberId}
              onChange={(e) => setNewLoan({...newLoan, memberId: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Member</option>
              {members.map((member) => (
                <option key={member._id} value={member._id}>{member.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Book</label>
            <select
              value={newLoan.bookId}
              onChange={(e) => setNewLoan({...newLoan, bookId: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Book</option>
              {books.map((book) => (
                <option key={book._id} value={book._id}>{book.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={newLoan.dueDate}
              onChange={(e) => setNewLoan({...newLoan, dueDate: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Issue Loan
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td className="px-6 py-4 whitespace-nowrap">{loan.member?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{loan.book?.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(loan.issueDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(loan.dueDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    loan.returned ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {loan.returned ? 'Returned' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {!loan.returned && (
                    <button 
                      onClick={() => handleReturn(loan._id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Loans;