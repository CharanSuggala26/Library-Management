import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function Books() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    quantity: 1
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/books', newBook);
      setNewBook({ title: '', author: '', isbn: '', quantity: 1 });
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting the book:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text text-center bg-gradient-to-r from-pink-500 to-purple-600 ">
          Books Management
        </h1>
      </motion.div>
      
      <motion.div 
        className="bg-white backdrop-blur-lg bg-opacity-90 p-8 rounded-xl shadow-lg mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: 'Title', key: 'title', type: 'text' },
            { label: 'Author', key: 'author', type: 'text' },
            { label: 'ISBN', key: 'isbn', type: 'text' },
            { label: 'Quantity', key: 'quantity', type: 'number', min: 1 }
          ].map((field, index) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
              <input
                type={field.type}
                value={newBook[field.key]}
                onChange={(e) => setNewBook({
                  ...newBook,
                  [field.key]: field.type === 'number' ? parseInt(e.target.value) : e.target.value
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                required
                min={field.min}
              />
            </motion.div>
          ))}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Book
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
          <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
            <tr>
              {['Title', 'Author', 'ISBN', 'Quantity', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.map((book, index) => (
              <motion.tr 
                key={book._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.isbn}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <motion.button 
                    onClick={() => handleDelete(book._id)}
                    className="text-red-500 hover:text-red-700 font-medium transition-colors duration-150"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

export default Books;