import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Users, ArrowUpRight, CheckCircle, Clock } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
          Loans Management
        </h1>
      </motion.div>
      
      <motion.div 
        className="bg-white backdrop-blur-lg bg-opacity-90 p-8 rounded-xl shadow-lg mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-semibold text-gray-800">Issue New Loan</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Member</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={newLoan.memberId}
                onChange={(e) => setNewLoan({...newLoan, memberId: e.target.value})}
                className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ease-in-out"
                required
              >
                <option value="">Select Member</option>
                {members.map((member) => (
                  <option key={member._id} value={member._id}>{member.name}</option>
                ))}
              </select>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Book</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={newLoan.bookId}
                onChange={(e) => setNewLoan({...newLoan, bookId: e.target.value})}
                className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ease-in-out"
                required
              >
                <option value="">Select Book</option>
                {books.map((book) => (
                  <option key={book._id} value={book._id}>{book.title}</option>
                ))}
              </select>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={newLoan.dueDate}
                onChange={(e) => setNewLoan({...newLoan, dueDate: e.target.value})}
                className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ease-in-out"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-violet-600 hover:to-purple-700 transition-all duration-200 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Issue Loan
          </motion.button>
        </form>
      </motion.div>

      <motion.div 
        className="bg-white backdrop-blur-lg bg-opacity-90 rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-violet-50 to-purple-50">
            <tr>
              {['Member', 'Book', 'Issue Date', 'Due Date', 'Status', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loans.map((loan, index) => (
              <motion.tr 
                key={loan._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">{loan.member?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{loan.book?.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(loan.issueDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(loan.dueDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${
                    loan.returned ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {loan.returned ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Returned
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4" />
                        Active
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {!loan.returned && (
                    <motion.button 
                      onClick={() => handleReturn(loan._id)}
                      className="flex items-center gap-1 text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-150"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      Return
                    </motion.button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

export default Loans;