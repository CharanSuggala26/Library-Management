// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function Dashboard() {
//   const [stats, setStats] = useState({
//     totalBooks: 0,
//     totalMembers: 0,
//     activeLoans: 0
//   });

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const booksResponse = await axios.get('http://localhost:5000/api/books');
//       const membersResponse = await axios.get('http://localhost:5000/api/members');
//       const loansResponse = await axios.get('http://localhost:5000/api/loans');

//       const activeLoans = loansResponse.data.filter(loan => !loan.returned).length;

//       setStats({
//         totalBooks: booksResponse.data.length,
//         totalMembers: membersResponse.data.length,
//         activeLoans
//       });
//     } catch (error) {
//       console.error('Error fetching dashboard stats:', error);
//       setStats({
//         totalBooks: 0,
//         totalMembers: 0,
//         activeLoans: 0
//       });
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-2">Total Books</h2>
//           <p className="text-3xl font-bold text-blue-600">{stats.totalBooks}</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-2">Total Members</h2>
//           <p className="text-3xl font-bold text-green-600">{stats.totalMembers}</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-2">Active Loans</h2>
//           <p className="text-3xl font-bold text-purple-600">{stats.activeLoans}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BookOpen, Users, BookMarked, ArrowUp } from 'lucide-react';

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

  const statsCards = [
    {
      title: 'Total Books',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      lightColor: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Total Members',
      value: stats.totalMembers,
      icon: Users,
      color: 'from-emerald-500 to-teal-500',
      lightColor: 'from-emerald-50 to-teal-50'
    },
    {
      title: 'Active Loans',
      value: stats.activeLoans,
      icon: BookMarked,
      color: 'from-violet-500 to-purple-500',
      lightColor: 'from-violet-50 to-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-gray-600">Welcome to your library management system</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {statsCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${card.lightColor} opacity-20`}></div>
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${card.lightColor}`}>
                    <card.icon className={`w-6 h-6 bg-gradient-to-br ${card.color} text-white rounded`} />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className={`px-3 py-1 rounded-full bg-gradient-to-r ${card.lightColor} flex items-center gap-1`}
                  >
                    <ArrowUp className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Active</span>
                  </motion.div>
                </div>

                <h2 className="text-lg font-semibold text-gray-700 mb-2">{card.title}</h2>
                
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                  className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${card.color}`}
                >
                  {card.value}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;