import { Link } from "react-router-dom";

export default function KostCard({ kost }) {
    return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
        <img
        src={kost.image}
        alt={kost.name}
        className="h-48 w-full object-cover"
        />

        <div className="p-4">
        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
            Kost {kost.type}
        </span>

        <h2 className="font-semibold text-lg mt-2">
            {kost.name}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
            {kost.address}
        </p>

        <p className="font-bold text-emerald-600 mt-3">
            Rp {kost.price.toLocaleString()}
        </p>

        <Link
            to={`/detail/${kost.id}`}
            className="block text-center mt-4 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
        >
            Lihat Detail
        </Link>
        </div>
    </div>
    );
}
