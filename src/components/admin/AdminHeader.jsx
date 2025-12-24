const AdminHeader = () => {
  return (
    <header className="bg-gray-900 text-white p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-300">Welcome, Admin!</span>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader