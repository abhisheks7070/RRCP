import { Input } from 'postcss';
import React, { useState } from 'react';
import SinglePlayer from './components/SinglePlayer';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignUp from './components/SignUp';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import GameRoom from './components/GameRoom';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/room/:id" element={<GameRoom />} />
//         <Route path="/" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
const App = () => {



  return (
    <>
      <SinglePlayer />
    </>
  );
};

export default App;
