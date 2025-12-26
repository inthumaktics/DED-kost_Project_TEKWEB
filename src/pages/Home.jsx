import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { kostDiscountData } from "@/data/kostDiscountData";

// typing words
const typingWords = ["Perfect Kost", "Affordable Kost", "Comfortable Kost"];

const Home = () => {
  /* =======================
    STATE & REF (PALING ATAS)
     ======================= */
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const sliderRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

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
    AUTO-SCROLL SLIDER
     ======================= */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollSpeed = 1;

    const scrollInterval = setInterval(() => {
      if (isHovering) return;

      slider.scrollLeft += scrollSpeed;

      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth
      ) {
        slider.scrollLeft = 0;
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, [isHovering]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* LEFT SIDE */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Find Your <br />
                <span className="text-primary">{typedText}</span>
              </h1>

              <p className="text-gray-600 text-lg mb-10 max-w-md">
                Discover comfortable and affordable living spaces with modern
                facilities and strategic locations.
              </p>

              <div className="flex gap-4">
                <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90">
                  Explore Kost
                </button>
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
                {kostDiscountData.map((kost) => (
                  <div
                    key={kost.id}
                    className="min-w-[280px] bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <img
                      src={`$(import.meta.env.BASE_URL}${kost.image}`}
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

                      <button className="w-full border border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-white text-sm font-semibold">
                        View Detail
                      </button>
                    </div>
                  </div>
                ))}
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
