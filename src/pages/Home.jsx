import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PromoSlider from "@/pages/PromoSlider";
import ContactForm from "@/components/layout/ContactForm";
import useKosts from "@/hooks/useKosts";

// typing words
const typingWords = ["Perfect Kost", "Affordable Kost", "Comfortable Kost"];

const Home = () => {
  // GUNAKAN HOOK useKosts UNTUK MENDAPATKAN DATA
  const { kosts, loading, error, searchKost, getPromotionalKosts, getFeaturedKosts } = useKosts();

  /* =======================
     STATE & REF
  ======================= */
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const sliderRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // search
  const [search, setSearch] = useState("");
  const [filteredKost, setFilteredKost] = useState([]);

  /* =======================
     DATA PREVIEW
  ======================= */
  // Gunakan fungsi dari hook untuk mendapatkan data promo - dari MockAPI
  const promoResult = getPromotionalKosts();
  const promoToday = promoResult.success ? promoResult.data.slice(0, 4) : [];

  // Gunakan fungsi dari hook untuk mendapatkan data featured
  const featuredResult = getFeaturedKosts();
  const previewExplore = featuredResult.success ? featuredResult.data : [];

  /* =======================
     TYPING EFFECT
  ======================= */
  useEffect(() => {
    let charIndex = 0;
    const currentWord = typingWords[wordIndex] || typingWords[0];

    const interval = setInterval(() => {
      setTypedText(currentWord.slice(0, charIndex + 1));
      charIndex++;

      if (charIndex === currentWord.length) {
        clearInterval(interval);
        setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % typingWords.length);
          setTypedText("");
        }, 1500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [wordIndex]);

  /* =======================
     AUTO SCROLL SLIDER (HERO)
  ======================= */
  useEffect(() => {
    const slider = sliderRef.current;
    // Ambil hanya 5 data teratas untuk slider
    const displayData = filteredKost.slice(0, 5);
    if (!slider || !displayData || displayData.length === 0) return;

    const interval = setInterval(() => {
      if (isHovering) return;

      slider.scrollLeft += 1;
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollLeft = 0;
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isHovering, filteredKost]);

  /* =======================
     SEARCH FILTER (HERO PROMO)
  ======================= */
  useEffect(() => {
    if (search) {
      const result = searchKost(search);
      setFilteredKost(result.data || []);
    } else {
      setFilteredKost(kosts);
    }
  }, [search, kosts, searchKost]);

  // TAMPILKAN LOADING JIKA DATA SEDANG DIMUAT
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Memuat data kost...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // TAMPILKAN ERROR JIKA ADA
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-primary hover:underline"
          >
            Coba lagi
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // JIKA TIDAK ADA DATA
  if (!kosts || kosts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="text-gray-500 mb-4">Tidak ada data kost tersedia</p>
          <Link 
            to="/explore" 
            className="text-primary hover:underline"
          >
            Jelajahi kost
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Ambil hanya 5 data untuk ditampilkan di slider "UP TO 50% OFF"
  const heroPromoData = filteredKost.slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* ================= SEARCH BAR ================= */}
      <div className="py-8 shadow-sm bg-gray-50">
        <div className="max-w-xl mx-auto px-4">
          <input
            type="text"
            placeholder="Cari kost atau lokasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-full px-6 py-4 text-lg shadow-md focus:outline-primary"
          />
        </div>
      </div>

      <main className="flex-grow">
        {/* ================= HERO ================= */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* LEFT */}
            <div className="lg:-mt-10">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
                Find Your <br />
                <span className="text-primary">{typedText}</span>
              </h1>

              <p className="text-gray-600 text-lg mb-10 max-w-md">
                Discover comfortable and affordable living spaces with modern
                facilities and strategic locations.
              </p>

              <div className="flex gap-4">
                <Link
                  to="/explore"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90"
                >
                  Explore Kost
                </Link>

                <button className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white">
                  Contact via WhatsApp
                </button>
              </div>
            </div>

            {/* RIGHT – HERO PROMO SLIDER (Hanya 5 data) */}
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">
                UP TO 50% OFF
              </h2>

              <div
                ref={sliderRef}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
              >
                {heroPromoData.map((kost) => (
                  <div
                    key={kost.id}
                    className="min-w-[280px] bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <img
                      src={kost.image || "/images/default-kost.png"}
                      alt={kost.name}
                      className="h-40 w-full object-cover"
                      onError={(e) => {
                        e.target.src = "/images/default-kost.png";
                      }}
                    />

                    <div className="p-4">
                      <h3 className="font-bold text-lg">{kost.name || "Kost"}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {kost.city || "Kota"}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        {kost.discount > 0 && kost.priceBefore && (
                          <span className="line-through text-gray-400 text-sm">
                            Rp {Number(kost.priceBefore).toLocaleString("id-ID")}
                          </span>
                        )}
                        <span className="text-primary font-bold">
                          Rp {Number(kost.priceAfter || kost.price || 0).toLocaleString("id-ID")}
                        </span>
                      </div>

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
            </div>
          </div>
        </section>

        {/* ================= PROMOTIONS PREVIEW ================= */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* HEADER SECTION */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-1">🔥 Promo Hari Ini</h2>
                <p className="text-gray-500 text-sm">
                  Diskon kost terbaik yang sayang dilewatkan
                </p>
              </div>

              <Link
                to="/promotions"
                className="text-primary font-semibold hover:underline"
              >
                See all →
              </Link>
            </div>

            {/* PROMO GRID - Sama seperti di Promotions */}
            {promoToday.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {promoToday.map((kost) => (
                  <div
                    key={kost.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    {/* IMAGE - Menggunakan gambar yang sama dengan Promotions */}
                    <img
                      src={kost.image || "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Kost+Image"}
                      alt={kost.name}
                      className="h-36 w-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Kost+Image";
                      }}
                    />

                    {/* CONTENT */}
                    <div className="p-4">
                      <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                        Diskon {kost.discount}%
                      </span>

                      <h3 className="font-semibold text-sm mb-1">
                        {kost.name}
                      </h3>

                      <p className="text-xs text-gray-500 mb-2">
                        📍 {kost.city}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="line-through text-gray-400 text-xs">
                          Rp {kost.priceBefore.toLocaleString("id-ID")}
                        </span>
                        <span className="text-primary font-bold text-sm">
                          Rp {kost.priceAfter.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <Link
                        to={`/kost/${kost.id}`}
                        className="block text-center w-full border border-primary text-primary py-1.5 rounded-lg hover:bg-primary hover:text-white text-xs font-semibold"
                      >
                        View Detail
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-2">📭 Tidak ada promo hari ini</p>
                <Link to="/promotions" className="text-primary text-sm hover:underline">
                  Lihat semua promo →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ================= EXPLORE PREVIEW ================= */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Explore Kost</h2>
                <p className="text-gray-500">
                  Pilihan kost terbaik untuk kamu
                </p>
              </div>

              <Link
                to="/explore"
                className="text-primary font-semibold hover:underline"
              >
                See all →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {previewExplore.map((kost) => (
                <div
                  key={kost.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <img
                    src={kost.image || "/images/default-kost.png"}
                    alt={kost.name}
                    className="h-40 w-full object-cover"
                    onError={(e) => {
                      e.target.src = "/images/default-kost.png";
                    }}
                  />

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">
                      {kost.name || "Kost"}
                    </h3>

                    <p className="text-sm text-gray-500 mb-2">
                      📍 {kost.city || "Kota"}
                    </p>

                    <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {kost.type || "Tipe"}
                    </span>

                    <div className="flex items-center gap-2 mb-3">
                      {kost.discount > 0 && kost.priceBefore && (
                        <span className="line-through text-gray-400 text-sm">
                          Rp {Number(kost.priceBefore).toLocaleString("id-ID")}
                        </span>
                      )}
                      <span className="text-primary font-bold">
                        Rp {Number(kost.priceAfter || kost.price || 0).toLocaleString("id-ID")}
                      </span>
                    </div>

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
          </div>
        </section>

        {/* ================= ABOUT US PREVIEW ================= */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-14 items-center">

              {/* LEFT – TEXT */}
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Tentang DED-Kost
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  DED-Kost adalah platform pencarian kost yang dirancang untuk membantu
                  mahasiswa dan pekerja menemukan hunian terbaik dengan cara yang mudah,
                  cepat, dan transparan.
                </p>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  Kami percaya bahwa mencari tempat tinggal bukan hanya soal harga,
                  tetapi juga kenyamanan, lokasi, dan keamanan.
                </p>

                <Link
                  to="/about"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90"
                >
                  Learn More About Us →
                </Link>
              </div>

              {/* RIGHT – VALUE CARDS */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
                  <p className="text-3xl mb-3">🤝</p>
                  <h4 className="font-semibold mb-1">Kepercayaan</h4>
                  <p className="text-sm text-gray-500">
                    Informasi kost yang jujur dan transparan
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
                  <p className="text-3xl mb-3">⚡</p>
                  <h4 className="font-semibold mb-1">Kemudahan</h4>
                  <p className="text-sm text-gray-500">
                    Pencarian cepat dan penggunaan yang simpel
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
                  <p className="text-3xl mb-3">🎨</p>
                  <h4 className="font-semibold mb-1">Kenyamanan</h4>
                  <p className="text-sm text-gray-500">
                    Desain ramah dan pengalaman menyenangkan
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
                  <p className="text-3xl mb-3">🔒</p>
                  <h4 className="font-semibold mb-1">Keamanan</h4>
                  <p className="text-sm text-gray-500">
                    Data dan privasi pengguna terjaga
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
        
        {/* CONTACT US */}
        <section className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* LEFT TEXT */}
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Hubungi Kami
                </h2>
                <p className="text-gray-600 mb-6">
                  Kami siap membantu kamu menemukan kost terbaik.
                  Silakan isi formulir dan tim DED-Kost akan menghubungi kamu.
                </p>

                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>📧 support@ded-kost.com</li>
                  <li>💬 WhatsApp: +62 812-3456-7890</li>
                  <li>📍 Yogyakarta, Indonesia</li>
                </ul>
              </div>

              {/* RIGHT FORM */}
              <ContactForm />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Home;