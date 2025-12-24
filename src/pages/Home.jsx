    import { useState } from 'react'
    import Navbar from '../components/public/Navbar'
    import Footer from '../components/public/Footer'
    import KostCard from '../components/public/KostCard'
    import { kostData } from '../data/kostData'

    const Home = () => {
    const [kosts] = useState(kostData)

    return (
        <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Temukan Kost Impian Anda
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                Cari dan sewa kost terbaik dengan fasilitas lengkap di lokasi strategis
                </p>
                <div className="max-w-md mx-auto">
                <div className="flex">
                    <input
                    type="text"
                    placeholder="Cari berdasarkan lokasi..."
                    className="flex-grow p-4 rounded-l-lg text-gray-800"
                    />
                    <button className="bg-green-500 text-white px-8 py-4 rounded-r-lg font-semibold hover:bg-green-600 transition">
                    Cari
                    </button>
                </div>
                </div>
            </div>
            </section>

            {/* Katalog Section */}
            <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Kost Tersedia
                </h2>
                <span className="text-gray-600">
                    Menampilkan {kosts.length} properti
                </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {kosts.map((kost) => (
                    <KostCard key={kost.id} kost={kost} />
                ))}
                </div>
            </div>
            </section>
        </main>

        <Footer />
        </div>
    )
    }

    export default Home