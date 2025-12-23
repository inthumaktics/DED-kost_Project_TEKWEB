// AdminHeader.jsx - Header untuk dashboard admin
import React from 'react';

const AdminHeader = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Kelola data produk/event/kost Anda di sini
        </p>
      </div>
    </header>
  );
};

export default AdminHeader;