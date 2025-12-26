import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('isAdminLoggedIn');
      navigate('/admin/login');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <header className="bg-gray-900 text-white p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleGoHome}
            className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Kembali ke Home
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-300">Welcome, Admin!</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;