import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PromoSlider from "@/pages/PromoSlider";
<<<<<<< HEAD
=======
import { kostDiscountData } from "@/data/kostDiscountData";
import ContactForm from "@/components/layout/ContactForm";
>>>>>>> ef0576f738dfb319f1fc41b5f4c81b8e4327ef41

// typing words
const typingWords = ["Perfect Kost", "Affordable Kost", "Comfortable Kost"];

const Home = ({ kosts = [] }) => {
  /* =======================
     STATE & REF
  ======================= */
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const sliderRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // search
  const [search, setSearch] = useState("");

  /* =======================
     DATA PREVIEW
  ======================= */
  const promoToday = kosts
    .filter((kost) => kost.discount > 0)
    .slice(0, 5);

  const previewExplore = kosts.slice(0, 4);

  /* =======================
     TYPING EFFECT
  ======================= */
  useEffect(() => {
    let charIndex = 0;

    const interval = setInterval(() => {
      setTypedText(typingWords[wordIndex].slice(0, charIndex + 1));
      charIndex++;

      if (charIndex === typingWords[wordIndex].length) {
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
    if (!slider) return;

    const interval = setInterval(() => {
      if (isHovering) return;

      slider.scrollLeft += 1;
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollLeft = 0;
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isHovering]);

  /* =======================
     SEARCH FILTER (HERO PROMO)
  ======================= */
  const filteredKost = kosts.filter((kost) => {
    const keyword = search.toLowerCase();
    return (
      kost.name.toLowerCase().includes(keyword) ||
      (kost.city && kost.city.toLowerCase().includes(keyword)) ||
      (kost.location && kost.location.toLowerCase().includes(keyword))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* ================= SEARCH BAR ================= */}
      <div className="py-8 shadow-sm bg-gray-50">
        <div className="max-w-xl mx-auto px-4">
          <input
            type="text"
            placeholder="Search kost or location..."
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

            {/* RIGHT – HERO PROMO SLIDER */}
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
                {filteredKost.map((kost) => (
                  <div
                    key={kost.id}
                    className="min-w-[280px] bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <img
                      src={kost.image}
                      alt={kost.name}
                      className="h-40 w-full object-cover"
                    />

                    <div className="p-4">
                      <h3 className="font-bold text-lg">{kost.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {kost.city || kost.location}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        {kost.discount > 0 && (
                          <span className="line-through text-gray-400 text-sm">
                            Rp {kost.priceBefore ? kost.priceBefore.toLocaleString("id-ID") : (kost.price * 1.2).toLocaleString("id-ID")}
                          </span>
                        )}
                        <span className="text-primary font-bold">
                          Rp {kost.price ? kost.price.toLocaleString("id-ID") : (kost.priceAfter ? kost.priceAfter.toLocaleString("id-ID") : "0")}
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
            <PromoSlider
              title="🔥 Promo Hari Ini"
              subtitle="Diskon kost terbaik yang sayang dilewatkan"
              data={promoToday}
            />
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
                    src={kost.image}
                    alt={kost.name}
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">
                      {kost.name}
                    </h3>

                    <p className="text-sm text-gray-500 mb-2">
                      📍 {kost.city || kost.location}
                    </p>

                    <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {kost.type || "Kost"}
                    </span>

                    <div className="flex items-center gap-2 mb-3">
                      {kost.discount > 0 && (
                        <span className="line-through text-gray-400 text-sm">
                          Rp {kost.priceBefore ? kost.priceBefore.toLocaleString("id-ID") : (kost.price * 1.2).toLocaleString("id-ID")}
                        </span>
                      )}
                      <span className="text-primary font-bold">
                        Rp {kost.price ? kost.price.toLocaleString("id-ID") : (kost.priceAfter ? kost.priceAfter.toLocaleString("id-ID") : "0")}
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
<<<<<<< HEAD

            </div>
          </div>
        </section>
      </main>
=======
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

>>>>>>> ef0576f738dfb319f1fc41b5f4c81b8e4327ef41

      <Footer />
    </div>
  );
};

export default Home;