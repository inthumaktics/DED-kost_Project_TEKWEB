import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Explore = ({ kosts = [] }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 py-16">
          {/* HEADER */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-2">Explore Kost</h1>
            <p className="text-gray-500">
              Temukan kost terbaik sesuai kebutuhanmu
            </p>
          </div>

          {/* GRID LIST */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {kosts.map((kost) => (
              <div
                key={kost.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* IMAGE */}
                <img
                  src={kost.image}
                  alt={kost.name}
                  className="h-48 w-full object-cover"
                />

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">{kost.name}</h3>

                  <p className="text-sm text-gray-500 mb-1">
                    📍 {kost.city || kost.location}
                  </p>

                  <p className="text-sm text-gray-400 mb-3">
                    {kost.address || "Alamat tidak tersedia"}
                  </p>

                  {/* TYPE */}
                  <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {kost.type || "Kost"}
                  </span>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 mb-4">
                    {kost.discount > 0 && (
                      <span className="line-through text-gray-400 text-sm">
                        Rp {kost.priceBefore ? kost.priceBefore.toLocaleString("id-ID") : (kost.price * 1.2).toLocaleString("id-ID")}
                      </span>
                    )}
                    <span className="text-primary font-bold">
                      Rp {kost.price ? kost.price.toLocaleString("id-ID") : (kost.priceAfter ? kost.priceAfter.toLocaleString("id-ID") : "0")}
                    </span>
                  </div>

                  {/* ACTION */}
                  <Link
                    to={`/kost/${kost.id}`}
                    className="block text-center w-full border border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-white text-sm font-semibold"
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;