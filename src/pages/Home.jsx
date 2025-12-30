import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PromoSlider from "@/pages/PromoSlider";
import ContactForm from "@/components/layout/ContactForm";
import { kostDiscountData } from "@/data/kostDiscountData";

// typing words
const typingWords = ["Perfect Kost", "Affordable Kost", "Comfortable Kost"];

const Home = () => {
  /* =======================
     STATE
  ======================= */
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [search, setSearch] = useState("");
  const sliderRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  /* =======================
     DATA
  ======================= */
  const kosts = kostDiscountData;

  const promoToday = kosts
    .filter((kost) => kost.discount > 0)
    .slice(0, 4);

  const previewExplore = kosts.slice(0, 4);

  const filteredKost = kosts.filter((kost) => {
    const keyword = search.toLowerCase();
    return (
      kost.name.toLowerCase().includes(keyword) ||
      kost.city?.toLowerCase().includes(keyword)
    );
  });

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
     HERO SLIDER AUTO SCROLL
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* SEARCH */}
      <div className="py-8 bg-gray-50 shadow-sm">
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
        {/* HERO */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14">
            {/* LEFT */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8">
                Find Your <br />
                <span className="text-primary">{typedText}</span>
              </h1>

              <p className="text-gray-600 mb-10 max-w-md">
                Discover comfortable and affordable living spaces with modern
                facilities and strategic locations.
              </p>

              <div className="flex gap-4">
                <Link
                  to="/explore"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Explore Kost
                </Link>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">
                UP TO 50% OFF
              </h2>

              <div
                ref={sliderRef}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="flex gap-6 overflow-x-auto pb-4"
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
                      <h3 className="font-bold">{kost.name}</h3>
                      <p className="text-sm text-gray-500">{kost.city}</p>

                      <div className="flex gap-2 my-2">
                        <span className="line-through text-gray-400 text-sm">
                          Rp {kost.priceBefore.toLocaleString("id-ID")}
                        </span>
                        <span className="text-primary font-bold">
                          Rp {kost.priceAfter.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <Link
                        to={`/kost/${kost.id}`}
                        className="block text-center border border-primary text-primary py-2 rounded-lg"
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

        {/* PROMO PREVIEW */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <PromoSlider
              title="🔥 Promo Hari Ini"
              subtitle="Diskon terbaik untuk kamu"
              data={promoToday}
            />
          </div>
        </section>

        {/* EXPLORE PREVIEW */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between mb-10">
              <h2 className="text-3xl font-bold">Explore Kost</h2>
              <Link to="/explore" className="text-primary font-semibold">
                See all →
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {previewExplore.map((kost) => (
                <div
                  key={kost.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <img
                    src={kost.image}
                    alt={kost.name}
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold">{kost.name}</h3>
                    <p className="text-sm text-gray-500">{kost.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        
          {/* CONTACT US */}
          <section className="bg-white-50">
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
