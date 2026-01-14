import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getKosts } from "@/services/api";

// shadcn UI
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

/* ===== SLIDER SECTION ===== */
const PromoSlider = ({ title, subtitle, data, loading }) => {
  if (loading) {
    return (
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">{title}</h2>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="min-w-[280px] overflow-hidden">
              <div className="h-40 w-full bg-gray-200 animate-pulse"></div>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

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
              src={kost.image || "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Kost+Image"}
              alt={kost.name}
              className="h-40 w-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Kost+Image";
              }}
            />

            {/* CONTENT */}
            <CardContent>
              {/* BADGES */}
              <div className="flex flex-wrap gap-2 mb-2">
                {kost.discount > 0 && (
                  <Badge variant="danger">
                    Diskon {kost.discount}%
                  </Badge>
                )}
                <Badge variant="info">
                  {kost.type || "Campur"}
                </Badge>
              </div>

              <h3 className="font-bold text-lg mb-1">
                {kost.name}
              </h3>

              <p className="text-sm text-gray-500 mb-1">
                📍 {kost.city}
              </p>

              <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                {kost.address}
              </p>

              {/* PRICE */}
              <div className="flex items-center gap-2 mb-4">
                {kost.discount > 0 && kost.priceBefore && (
                  <span className="line-through text-gray-400 text-sm">
                    Rp{" "}
                    {kost.priceBefore.toLocaleString("id-ID")}
                  </span>
                )}
                <span className="text-primary font-bold">
                  Rp{" "}
                  {(kost.priceAfter || kost.price || 0).toLocaleString("id-ID")}
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
  const [promotions, setPromotions] = useState({
    today: [],
    newYear: [],
    nearby: []
  });
  
  const [loading, setLoading] = useState({
    today: true,
    newYear: true,
    nearby: true
  });
  
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading({ today: true, newYear: true, nearby: true });
        setError(null);
        
        console.log("🔄 Mengambil data promo dari MockAPI...");
        
        const allKosts = await getKosts();
        console.log(`✅ Berhasil mengambil ${allKosts.length} data kost`);
        
        // 1. 🔥 Promo Hari Ini - Data dengan diskon > 0 (10 data pertama)
        const promoToday = allKosts
          .filter((kost) => kost.discount > 0)
          .slice(0, 10);
        
        // 2. 🎆 Promo Spesial Tahun Baru - Data dengan diskon >= 40% atau nama mengandung kata kunci
        const promoNewYear = allKosts
          .filter((kost) => {
            const name = (kost.name || '').toLowerCase();
            return (
              kost.discount >= 40 ||
              name.includes('tahun baru') ||
              name.includes('new year') ||
              name.includes('spesial')
            );
          })
          .slice(0, 10);
        
        // 3. 📍 Promo Berdasarkan Lokasi - Data dari Sleman/Yogyakarta
        const promoNearby = allKosts
          .filter((kost) => {
            const city = (kost.city || '').toLowerCase();
            return (
              city.includes('semarang') ||
              city.includes('yogyakarta') ||
              city.includes('bandung')
            );
          })
          .filter((kost) => kost.discount > 0)
          .slice(0, 10);

        setPromotions({
          today: promoToday,
          newYear: promoNewYear,
          nearby: promoNearby
        });
        
        setLoading({ today: false, newYear: false, nearby: false });
        
        console.log(`📊 Promo Hari Ini: ${promoToday.length} data`);
        console.log(`📊 Promo Tahun Baru: ${promoNewYear.length} data`);
        console.log(`📊 Promo Lokasi: ${promoNearby.length} data`);
        
      } catch (err) {
        console.error('❌ Error mengambil data promosi:', err);
        setError(err.message || 'Gagal memuat data promo');
        setLoading({ today: false, newYear: false, nearby: false });
      }
    };
    
    fetchPromotions();
  }, []);

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Gagal Memuat Promo</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const allLoaded = !loading.today && !loading.newYear && !loading.nearby;
  const hasData = allLoaded && (
    promotions.today.length > 0 || 
    promotions.newYear.length > 0 || 
    promotions.nearby.length > 0
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
            data={promotions.today}
            loading={loading.today}
          />

          <PromoSlider
            title="🔥 Promo Spesial"
            subtitle="Rayakan promo spesial dengan kost nyaman"
            data={promotions.newYear}
            loading={loading.newYear}
          />

          <PromoSlider
            title="📍 Promo Kost Terdekat"
            subtitle="Berdasarkan lokasi favoritmu"
            data={promotions.nearby}
            loading={loading.nearby}
          />

        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Promotions;