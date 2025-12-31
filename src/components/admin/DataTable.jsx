import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"

const DataTable = ({ kosts, onDeleteKost }) => {
  // Inisialisasi state dengan isOpen: false
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    kostId: null,
    kostData: null,
  })

  const handleDeleteClick = (id) => {
    const kostToDelete = kosts.find(kost => kost.id === id)
    // Hanya membuka modal ketika tombol ditekan
    setDeleteModal({
      isOpen: true,
      kostId: id,
      kostData: kostToDelete,
    })
  }

  const handleConfirmDelete = () => {
    onDeleteKost(deleteModal.kostId)
    setDeleteModal({
      isOpen: false,
      kostId: null,
      kostData: null,
    })
  }

  const handleCancelDelete = () => {
    setDeleteModal({
      isOpen: false,
      kostId: null,
      kostData: null,
    })
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
        {/* ... kode tabel tetap sama ... */}
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nama</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Fasilitas</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kosts.map((kost) => (
                <TableRow key={kost.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={kost.image}
                          alt={kost.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {kost.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{kost.location}</TableCell>
                  <TableCell>
                    <div className="text-sm font-bold text-blue-600">
                      Rp {kost.price.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {kost.facilities.slice(0, 2).map((facility, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {facility}
                        </span>
                      ))}
                      {kost.facilities.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{kost.facilities.length - 2} more
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => console.log(`Edit kost ${kost.id}`)}
                      className="text-blue-600 hover:text-blue-900 mr-4 px-3 py-1 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(kost.id)}
                      className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-600 rounded-lg hover:bg-red-50 transition"
                    >
                      Hapus
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete Confirmation Dialog - PERBAIKAN TAMPILAN */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-100">
                  <svg 
                    className="h-5 w-5 text-red-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.938 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Hapus Kost?</h3>
              </div>
              
              {deleteModal.kostData && (
                <div className="mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                    <div className="flex items-center mb-3">
                      <img
                        className="h-10 w-10 rounded-full object-cover mr-3"
                        src={deleteModal.kostData?.image}
                        alt={deleteModal.kostData?.name}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {deleteModal.kostData?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {deleteModal.kostData?.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Harga:</span>
                        <span className="font-bold text-blue-600">
                          Rp {deleteModal.kostData?.price?.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-2 text-red-600 text-xs">
                        Data akan dihapus permanen dan tidak dapat dikembalikan.
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 text-center">
                    Apakah Anda yakin ingin menghapus kost ini?
                  </p>
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
                >
                  Ya, Hapus Kost
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DataTable