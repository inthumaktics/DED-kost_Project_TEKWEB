    import { useParams } from "react-router-dom";
    import Navbar from "../components/public/Navbar";

    const dummyData = [
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
    ];

    export default function Detail() {
    const { id } = useParams();
    const kost = dummyData.find((k) => k.id == id);

    const whatsappMessage = encodeURIComponent(
        `Halo, saya tertarik dengan ${kost.name} dengan harga Rp ${kost.price}`
    );

    return (
        <>
        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-12">
            <img
            src={kost.image}
            className="rounded-xl w-full h-80 object-cover"
            />

            <h1 className="text-3xl font-bold mt-6">
            {kost.name}
            </h1>

            <p className="text-gray-500 mt-1">{kost.address}</p>

            <p className="text-emerald-600 font-bold text-xl mt-4">
            Rp {kost.price.toLocaleString()} / bulan
            </p>

            <div className="mt-6">
            <h3 className="font-semibold mb-2">Fasilitas:</h3>
            <ul className="list-disc list-inside text-gray-600">
                {kost.facilities.map((f, i) => (
                <li key={i}>{f}</li>
                ))}
            </ul>
            </div>

            <a
            href={`https://wa.me/6281234567890?text=${whatsappMessage}`}
            target="_blank"
            className="inline-block mt-8 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
            Hubungi via WhatsApp
            </a>
        </div>
        </>
    );
    }
