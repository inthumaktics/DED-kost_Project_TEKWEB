import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { kostDiscountData } from "@/data/kostDiscountData";

const DetailKost = () => {
  const { id } = useParams();

  const kost = kostDiscountData.find(
    (item) => item.id === Number(id)
  );

  if (!kost) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Kost tidak ditemukan 😢
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        <section className="max-w-5xl mx-auto px-4 py-16">
          {/* BACK */}
          <Link
            to="/"
            className="text-primary font-semibold mb-6 inline-block hover:underline"
          >
            ← Kembali ke Home
          </Link>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {/* IMAGE */}
            <img
              src={`${import.meta.env.BASE_URL}${kost.image}`}
              alt={kost.name}
              className="w-full h-full object-cover"
            />

            {/* CONTENT */}
            <div className="p-8">
              {/* NAME */}
              <h1 className="text-3xl font-bold mb-2">
                {kost.name}
              </h1>

              {/* CITY */}
              <p className="text-gray-500 mb-1">
                📍 {kost.city}
              </p>

              {/* ADDRESS */}
              <p className="text-sm text-gray-400 mb-3">
                {kost.address || "Alamat belum tersedia"}
              </p>

              {/* TYPE */}
              <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                {kost.type || "Tipe belum ditentukan"}
              </span>

              {/* DISCOUNT */}
              {kost.discount > 0 && (
                <div className="mb-4">
                  <span className="inline-block bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
                    {kost.discount}% OFF
                  </span>
                </div>
              )}

              {/* PRICE */}
              <div className="flex items-center gap-3 mb-6">
                {kost.discount > 0 && (
                  <span className="line-through text-gray-400">
                    Rp {kost.priceBefore.toLocaleString("id-ID")}
                  </span>
                )}
                <span className="text-2xl font-bold text-primary">
                  Rp {kost.priceAfter.toLocaleString("id-ID")}
                </span>
              </div>

              {/* FACILITIES */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">
                  Facilities
                </h3>

                {kost.facilities && kost.facilities.length > 0 ? (
                  <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    {kost.facilities.map((facility, index) => (
                      <li
                        key={index}
                        className="bg-gray-100 px-3 py-1 rounded-md"
                      >
                        ✓ {facility}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">
                    Fasilitas belum tersedia
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 mb-8">
                Kost nyaman dengan fasilitas lengkap dan lingkungan
                aman. Cocok untuk mahasiswa maupun pekerja dengan
                lokasi strategis di {kost.city}.
              </p>

              {/* ACTION */}
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90">
                Booking Sekarang
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DetailKost;
