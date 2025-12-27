import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { kostDiscountData } from "@/data/kostDiscountData";

// typing words
const typingWords = ["Perfect Kost", "Affordable Kost", "Comfortable Kost"];

const Home = () => {
  /* =======================
    STATE & REF
  ======================= */
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const sliderRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // SIMPLE SEARCH STATE
  const [search, setSearch] = useState("");

  /* =======================
    TYPING EFFECT
  ======================= */
  useEffect(() => {
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      setTypedText(typingWords[wordIndex].slice(0, charIndex + 1));
      charIndex++;

      if (charIndex === typingWords[wordIndex].length) {
        clearInterval(typingInterval);

        setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % typingWords.length);
          setTypedText("");
        }, 1500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [wordIndex]);

  /* =======================
    AUTO SCROLL SLIDER
  ======================= */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollInterval = setInterval(() => {
      if (isHovering) return;

      slider.scrollLeft += 1;

      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollLeft = 0;
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, [isHovering]);

  /* =======================
    SEARCH LOGIC
  ======================= */
  const filteredKost = kostDiscountData.filter((kost) => {
    const keyword = search.toLowerCase();

    return (
      kost.name.toLowerCase().includes(keyword) ||
      kost.city.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* ================= SEARCH BAR ================= */}
      <div className="bg-gray-50 py-8 shadow-sm">
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
        {/* ================= HERO SECTION ================= */}
        <section className="bg-gray-50 py-10">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* LEFT SIDE */}
            <div className="lg:-mt-10">
              <h1 className="text-20xl md:text-6xl font-bold leading-tight mb-10">
                Find Your <br />
                <span className="text-primary">{typedText}</span>
              </h1>

              <p className="text-gray-600 text-lg mb-10 max-w-md">
                Discover comfortable and affordable living spaces with modern
                facilities and strategic locations.
              </p>

              <div className="flex gap-4">
                <Link to="/explore">
                  <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90">
                    Explore Kost
                  </button>
                </Link>
                <button className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white">
                  Contact via WhatsApp
                </button>
              </div>
            </div>

            {/* RIGHT SIDE */}
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
                {filteredKost.length > 0 ? (
                  filteredKost.map((kost) => (
                    <div
                      key={kost.id}
                      className="min-w-[280px] bg-white rounded-xl shadow-md overflow-hidden"
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}${kost.image}`}
                        alt={kost.name}
                        className="h-40 w-full object-cover"
                      />

                      <div className="p-4">
                        <h3 className="font-bold text-lg">{kost.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {kost.city}
                        </p>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="line-through text-gray-400 text-sm">
                            Rp {kost.priceBefore.toLocaleString()}
                          </span>
                          <span className="text-primary font-bold">
                            Rp {kost.priceAfter.toLocaleString()}
                          </span>
                        </div>

                    <Link
                          to={`/kost/${kost.id}`}
                          className="block text-center w-full border border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-white text-sm font-semibold">
                          View Detail
                          </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 mt-6">
                    No kost found 😢
                  </p>
                )}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
