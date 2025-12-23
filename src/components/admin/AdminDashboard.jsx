// AdminDashboard.jsx - Halaman utama admin
import React from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable from '../../components/admin/DataTable';
import FormData from '../../components/admin/FormData';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom kiri: Tabel data */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Data Produk/Event/Kost</h2>
              <DataTable />
            </div>
          </div>

          {/* Kolom kanan: Form input */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Tambah Data Baru</h2>
              <FormData />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;