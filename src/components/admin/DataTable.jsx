import { useState } from 'react'

const DataTable = ({ kosts, onDeleteKost }) => {
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    kostId: null,
    kostData: null,
  })

  const handleDeleteClick = (id) => {
    const kostToDelete = kosts.find(kost => kost.id === id)
    setDeleteModal({
      isOpen: true,
      kostId: id,
      kostData: kostToDelete,
    })
  }

  const handleConfirmDelete = () => {
    onDeleteKost(deleteModal.kostId)
    console.log(`Kost dengan ID ${deleteModal.kostId} dihapus`)
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
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Daftar Kost</h2>
          <p className="text-gray-600">Total: {kosts.length} kost terdaftar</p>
        </div>
          
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fasilitas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {kosts.map((kost) => (
                <tr key={kost.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{kost.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-blue-600">
                      Rp {kost.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity bg-black bg-opacity-40 backdrop-blur-sm"
              onClick={handleCancelDelete}
            />
            
            {/* Modal */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg 
                      className="h-6 w-6 text-red-600" 
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
                  
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-semibold text-gray-900">
                      Hapus Kost?
                    </h3>
                    
                    <div className="mt-2">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-2">
                          <img
                            className="h-8 w-8 rounded-full object-cover mr-3"
                            src={deleteModal.kostData?.image}
                            alt={deleteModal.kostData?.name}
                          />
                          <p className="text-sm font-medium text-gray-900">
                            {deleteModal.kostData?.name}
                          </p>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p><span className="font-medium">Lokasi:</span> {deleteModal.kostData?.location}</p>
                          <p><span className="font-medium">Harga:</span> Rp {deleteModal.kostData?.price?.toLocaleString()}</p>
                          <p className="mt-1 text-red-600">
                            Data akan dihapus permanen dan tidak dapat dikembalikan.
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-4">
                        Apakah Anda yakin ingin menghapus kost ini?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-2xl">
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2.5 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition"
                >
                  Ya, Hapus Kost
                </button>
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition"
                >
                  Batal
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