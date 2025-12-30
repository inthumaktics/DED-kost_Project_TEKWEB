import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { kostDiscountData } from "@/data/kostDiscountData";

/* ===== SLIDER SECTION ===== */
const PromoSlider = ({ title, subtitle, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="mb-16">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

      {/* SLIDER */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {data.map((kost) => (
          <div
            key={kost.id}
            className="min-w-[280px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* IMAGE */}
            <img
              src={`${import.meta.env.BASE_URL}${kost.image}`}
              alt={kost.name}
              className="h-40 w-full object-cover"
            />

            {/* CONTENT */}
            <div className="p-5">
              {/* BADGE */}
              <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                Diskon {kost.discount}%
              </span>

              <h3 className="font-bold text-lg mb-1">{kost.name}</h3>

              <p className="text-sm text-gray-500 mb-1">📍 {kost.city}</p>

              <p className="text-sm text-gray-400 mb-3">{kost.address}</p>

              {/* TYPE */}
              <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {kost.type}
              </span>

              {/* PRICE */}
              <div className="flex items-center gap-2 mb-4">
                <span className="line-through text-gray-400 text-sm">
                  Rp {kost.priceBefore.toLocaleString("id-ID")}
                </span>
                <span className="text-primary font-bold">
                  Rp {kost.priceAfter.toLocaleString("id-ID")}
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
  );
};

/* ===== PAGE ===== */
const Promotions = () => {
  // 🔥 Promo Hari Ini
  const promoToday = kostDiscountData.filter((kost) => kost.discount > 0);

  // 🎆 Promo Spesial Tahun Baru
  const promoNewYear = kostDiscountData.filter((kost) =>
    kost.tags?.includes("new-year")
  );

  // 📍 Promo Berdasarkan Lokasi (contoh)
  const promoNearby = kostDiscountData.filter((kost) => kost.city === "Sleman");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 py-16">
          {/* PAGE HEADER */}
          <div className="mb-14 text-center">
            <h1 className="text-4xl font-bold mb-2">Promotions</h1>
            <p className="text-gray-500">
              Promo kost terbaik yang sayang untuk dilewatkan
            </p>
          </div>

          {/* PROMO SECTIONS */}
          <PromoSlider
            title="🔥 Promo Hari Ini"
            subtitle="Diskon terbaik untuk kamu"
            data={promoToday}
          />

          <PromoSlider
            title="🎆 Promo Spesial Tahun Baru"
            subtitle="Rayakan tahun baru dengan kost nyaman"
            data={promoNewYear}
          />

          <PromoSlider
            title="📍 Promo Kost Terdekat"
            subtitle="Berdasarkan lokasi favoritmu"
            data={promoNearby}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Promotions;
