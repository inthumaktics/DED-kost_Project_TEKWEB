import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { kostDiscountData } from "@/data/kostDiscountData";

// shadcn UI
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
          <Card
            key={kost.id}
            className="min-w-[280px] overflow-hidden"
          >
            {/* IMAGE */}
            <img
              src={`${import.meta.env.BASE_URL}${kost.image}`}
              alt={kost.name}
              className="h-40 w-full object-cover"
            />

            {/* CONTENT */}
            <CardContent>
              {/* BADGES */}
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="danger">
                  Diskon {kost.discount}%
                </Badge>
                <Badge variant="info">
                  {kost.type}
                </Badge>
              </div>

              <h3 className="font-bold text-lg mb-1">
                {kost.name}
              </h3>

              <p className="text-sm text-gray-500 mb-1">
                📍 {kost.city}
              </p>

              <p className="text-sm text-gray-400 mb-3">
                {kost.address}
              </p>

              {/* PRICE */}
              <div className="flex items-center gap-2 mb-4">
                <span className="line-through text-gray-400 text-sm">
                  Rp{" "}
                  {kost.priceBefore.toLocaleString("id-ID")}
                </span>
                <span className="text-primary font-bold">
                  Rp{" "}
                  {kost.priceAfter.toLocaleString("id-ID")}
                </span>
              </div>

              {/* ACTION */}
              <Link to={`/kost/${kost.id}`}>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    console.log(
                      "View promo kost:",
                      kost.name
                    )
                  }
                >
                  View Detail
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

/* ===== PAGE ===== */
const Promotions = () => {
  // 🔥 Promo Hari Ini
  const promoToday = kostDiscountData.filter(
    (kost) => kost.discount > 0
  );

  // 🎆 Promo Spesial Tahun Baru
  const promoNewYear = kostDiscountData.filter((kost) =>
    kost.tags?.includes("new-year")
  );

  // 📍 Promo Berdasarkan Lokasi
  const promoNearby = kostDiscountData.filter(
    (kost) => kost.city === "Sleman"
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 py-16">
          {/* PAGE HEADER */}
          <div className="mb-14 text-center">
            <h1 className="text-4xl font-bold mb-2">
              Promotions
            </h1>
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
