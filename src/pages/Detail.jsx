    import { useState } from 'react'
    import { useParams, useNavigate } from 'react-router-dom'
    import Navbar from '../components/public/Navbar'
    import Footer from '../components/public/Footer'
    import { kostData } from '../data/kostData'

    const Detail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [kost] = useState(kostData.find(k => k.id === parseInt(id)))

    if (!kost) {
        return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Kost tidak ditemukan</h1>
            <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
            Kembali ke Beranda
            </button>
        </div>
        )
    }

    const handleWhatsApp = () => {
        const message = `Halo, saya ingin sewa kost ${kost.name} di ${kost.location}. Bisa info ketersediaan dan cara sewanya?`
        const url = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    return (
        <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow py-12">
            <div className="container mx-auto px-4">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-8 flex items-center text-blue-600 hover:text-blue-800"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali
            </button>

            {/* Kost Details */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                <div className="md:w-1/2">
                    <img
                    src={kost.image}
                    alt={kost.name}
                    className="w-full h-full object-cover"
                    />
                </div>
                
                <div className="md:w-1/2 p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{kost.name}</h1>
                    <div className="flex items-center text-gray-600 mb-6">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{kost.location}</span>
                    </div>

                    <div className="mb-8">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">
                        Rp {kost.price.toLocaleString()} <span className="text-lg font-normal text-gray-600">/ bulan</span>
                    </h3>
                    </div>

                    <div className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Deskripsi</h4>
                    <p className="text-gray-600">{kost.description}</p>
                    </div>

                    <div className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Fasilitas</h4>
                    <div className="flex flex-wrap gap-3">
                        {kost.facilities.map((facility, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full"
                        >
                            {facility}
                        </span>
                        ))}
                    </div>
                    </div>

                    <button
                    onClick={handleWhatsApp}
                    className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition flex items-center justify-center"
                    >
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                    </svg>
                    Sewa via WhatsApp
                    </button>
                </div>
                </div>
            </div>
            </div>
        </main>

        <Footer />
        </div>
    )
    }

    export default Detail