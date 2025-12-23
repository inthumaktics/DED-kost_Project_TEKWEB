import { useState } from "react";
import Navbar from "../components/public/Navbar";
import KostCard from "../components/public/KostCard";
import Footer from "../components/public/Footer";

export default function Home() {
        const [kosts] = useState([
        {
        id: 1,
        name: "DED-kost Tlogomas",
        type: "Putra",
        price: 850000,
        address: "Jl. Raya Tlogomas",
        image:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
        facilities: ["WiFi", "KM Dalam", "Parkir"]
        },
        {
        id: 2,
        name: "DED-kost Dinoyo",
        type: "Putri",
        price: 750000,
        address: "Jl. MT Haryono",
        image:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        facilities: ["WiFi", "AC", "Dapur"]
        }
    ]);

    return (
        <>
        <Navbar />

        <section className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold mb-2">
            Temukan Kost Nyamanmu
            </h2>
            <p className="text-gray-500 mb-8">
            Pilihan kost terbaik dekat kampus & pusat kota
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {kosts.map((kost) => (
                <KostCard key={kost.id} kost={kost} />
            ))}
            </div>
        </section>

        <Footer />
        </>
    );
    }
