// import { useState, useEffect } from 'react';

// function Books() {
//   const [books, setBooks] = useState([]);
//   const [newBook, setNewBook] = useState({
//     title: '',
//     author: '',
//     isbn: '',
//     quantity: 1
//   });

//   useEffect(() => {
//     // Fetch books from API
//     // This will be implemented when we set up the backend
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add new book API call
//     // This will be implemented when we set up the backend
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-8">Books Management</h1>
      
//       {/* Add Book Form */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Title</label>
//             <input
//               type="text"
//               value={newBook.title}
//               onChange={(e) => setNewBook({...newBook, title: e.target.value})}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Author</label>
//             <input
//               type="text"
//               value={newBook.author}
//               onChange={(e) => setNewBook({...newBook, author: e.target.value})}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">ISBN</label>
//             <input
//               type="text"
//               value={newBook.isbn}
//               onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Quantity</label>
//             <input
//               type="number"
//               value={newBook.quantity}
//               onChange={(e) => setNewBook({...newBook, quantity: parseInt(e.target.value)})}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//           >
//             Add Book
//           </button>
//         </form>
//       </div>

//       {/* Books List */}
//       <div className="bg-white rounded-lg shadow-md">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {books.map((book) => (
//               <tr key={book._id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{book.isbn}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{book.quantity}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <button className="text-red-600 hover:text-red-900">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Books;

import { useState, useEffect } from 'react';
import axios from 'axios';
//import api from '../api/config';

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
    <div>
      <h1 className="text-3xl font-bold mb-8">Books Management</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={newBook.title}
              onChange={(e) => setNewBook({...newBook, title: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              value={newBook.author}
              onChange={(e) => setNewBook({...newBook, author: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ISBN</label>
            <input
              type="text"
              value={newBook.isbn}
              onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              value={newBook.quantity}
              onChange={(e) => setNewBook({...newBook, quantity: parseInt(e.target.value)})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Book
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book._id}>
                <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.isbn}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => handleDelete(book._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Books;