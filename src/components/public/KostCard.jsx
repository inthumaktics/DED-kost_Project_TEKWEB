    import { Link } from 'react-router-dom'

    const KostCard = ({ kost }) => {
    const handleWhatsApp = () => {
        const message = `Halo, saya tertarik dengan kost ${kost.name} di ${kost.location}. Bisa info lebih lanjut?`
        const url = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img
            src={kost.image}
            alt={kost.name}
            className="w-full h-48 object-cover"
        />
        <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{kost.name}</h3>
            <p className="text-gray-600 mb-4">{kost.location}</p>
            
            <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-blue-600">Rp {kost.price.toLocaleString()}</span>
            <span className="text-gray-500 ml-2">/ bulan</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
            {kost.facilities.slice(0, 3).map((facility, index) => (
                <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                >
                {facility}
                </span>
            ))}
            </div>

            <div className="flex gap-3">
            <Link
                to={`/detail/${kost.id}`}
                className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
                Lihat Detail
            </Link>
            <button
                onClick={handleWhatsApp}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
                Chat WhatsApp
            </button>
            </div>
        </div>
        </div>
    )
    }

    export default KostCard