// DataTable.jsx - Tabel untuk menampilkan data (masih statis)
import React from 'react';

const DataTable = () => {
  // Data dummy sesuai tema (contoh untuk Product Store)
  const dummyData = [
    { id: 1, name: "Sony Headphones", category: "Elektronik", price: 5000000, stock: 10 },
    { id: 2, name: "MacBook Air", category: "Laptop", price: 15000000, stock: 5 },
    { id: 3, name: "Nike Air Max", category: "Sepatu", price: 1500000, stock: 20 },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 border-b text-left">ID</th>
            <th className="py-3 px-4 border-b text-left">Nama</th>
            <th className="py-3 px-4 border-b text-left">Kategori</th>
            <th className="py-3 px-4 border-b text-left">Harga</th>
            <th className="py-3 px-4 border-b text-left">Stok</th>
            <th className="py-3 px-4 border-b text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">{item.id}</td>
              <td className="py-3 px-4 border-b">{item.name}</td>
              <td className="py-3 px-4 border-b">{item.category}</td>
              <td className="py-3 px-4 border-b">Rp {item.price.toLocaleString()}</td>
              <td className="py-3 px-4 border-b">{item.stock}</td>
              <td className="py-3 px-4 border-b">
                <button 
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => console.log('Edit item:', item.id)}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => console.log('Hapus item:', item.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;