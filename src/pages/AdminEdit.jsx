    import { useState } from 'react'
    import { useNavigate } from 'react-router-dom'
    import AdminHeader from '../components/admin/AdminHeader'
    import FormData from '../components/admin/FormData'
    import DataTable from '../components/admin/DataTable'
    import { kostData } from '../data/kostData'

    const AdminEditPages = () => {
    const navigate = useNavigate()
    const [kosts, setKosts] = useState(kostData)

    const handleAddKost = (newKost) => {
        setKosts([...kosts, newKost])
        console.log('Kost ditambahkan:', newKost)
    }

    const handleDeleteKost = (id) => {
        setKosts(kosts.filter(kost => kost.id !== id))
        console.log(`Kost dengan ID ${id} dihapus dari state`)
    }

    return (
        <div className="min-h-screen bg-gray-100">
        <AdminHeader />
        
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
            <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                ← Kembali ke Home
            </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <FormData onAddKost={handleAddKost} />
            </div>
            
            <div className="lg:col-span-2">
                <DataTable kosts={kosts} onDeleteKost={handleDeleteKost} />
            </div>
            </div>
        </div>
        </div>
    )
    }

    export default AdminEditPages