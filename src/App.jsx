import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
// import AdminDashboard from './pages/AdminDashboard';
import AdminEdit from './pages/AdminEdit';

function App() {
  return (
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail-produk/:id" element={<Detail />} />
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          <Route path="/admin/edit/:id" element={<AdminEdit />} />
        </Routes>
      </div>
  );
}

export default App;