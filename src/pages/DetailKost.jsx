import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useKosts from "@/hooks/useKosts";

// shadcn UI
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DetailKost = () => {
  const { id } = useParams();
  const { getKostById, loading, error } = useKosts();
  const [kost, setKost] = useState(null);
  const [detailLoading, setDetailLoading] = useState(true);
  const [detailError, setDetailError] = useState(null);
  const [duration, setDuration] = useState(1);

  // Load kost data when component mounts or id changes
  useEffect(() => {
    const loadKost = async () => {
      if (id) {
        setDetailLoading(true);
        setDetailError(null);
        try {
          const result = await getKostById(id);
          if (result.success) {
            setKost(result.data);
          } else {
            setDetailError(result.error || 'Kost tidak ditemukan');
          }
        } catch (err) {
          setDetailError(err.message || 'Terjadi kesalahan');
        } finally {
          setDetailLoading(false);
        }
      }
    };
    loadKost();
  }, [id, getKostById]);

  // Handle loading state
  if (loading || detailLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">Memuat data kost...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Handle error state
  if (error || detailError) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="text-red-500 text-lg mb-4">Error: {error || detailError}</p>
          <Link to="/" className="text-primary hover:underline">
            Kembali ke Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Handle kost not found
  if (!kost) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="text-gray-500 text-lg mb-4">Kost tidak ditemukan 😢</p>
          <Link to="/" className="text-primary hover:underline">
            Kembali ke Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }


  const pricePerMonth = kost.priceAfter || kost.price || 0;
  const totalPrice = pricePerMonth * duration;

  const handleBooking = () => {
    const phoneNumber = "6283113165020";
    const message = `
Halo, saya tertarik dengan kost berikut:

${kost.name}
${kost.city || kost.location}
Harga/bulan: Rp ${pricePerMonth.toLocaleString("id-ID")}
Durasi sewa: ${duration} bulan
Estimasi total: Rp ${totalPrice.toLocaleString("id-ID")}

Apakah masih tersedia?
    `.trim();

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 py-14">
          {/* BACK */}
          <Link
            to="/"
            className="text-sm font-medium text-gray-500 hover:text-primary mb-8 inline-flex items-center gap-1"
          >
            ← Kembali
          </Link>

          {/* TITLE */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {kost.name}
            </h1>
            <p className="text-gray-500">
              📍 {kost.city || kost.location}
            </p>

            <div className="flex gap-2 mt-4">
              <Badge className="bg-primary/10 text-primary border border-primary/20">
                {kost.type || "Kost"}
              </Badge>
              {kost.discount > 0 && (
                <Badge className="bg-red-50 text-red-600 border border-red-200">
                  {kost.discount}% OFF
                </Badge>
              )}
            </div>
          </div>

          {/* GRID */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-10">
              {/* IMAGE */}
              <Card className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={kost.image || "/images/default-kost.png"}
                  alt={kost.name}
                  className="w-full h-[380px] object-cover"
                  onError={(e) => {
                    e.target.src = "/images/default-kost.png";
                  }}
                />
              </Card>

              {/* FACILITIES */}
              <Card className="rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">
                    Fasilitas
                  </h3>

                  {kost.facilities?.length > 0 ? (
                    <ul className="grid sm:grid-cols-3 gap-4 text-sm">
                      {Array.isArray(kost.facilities) && kost.facilities.map((facility, index) => {
                        const colors = [
                          "bg-blue-50 text-blue-700 border-blue-200",
                          "bg-violet-50 text-violet-700 border-violet-200",
                          "bg-emerald-50 text-emerald-700 border-emerald-200",
                          "bg-amber-50 text-amber-700 border-amber-200",
                        ];

                        return (
                          <li
                            key={index}
                            className={`border ${
                              colors[index % colors.length]
                            } px-4 py-3 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition`}
                          >
                            ✓ {facility}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-gray-400">
                      Fasilitas belum tersedia
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* RIGHT – BOOKING */}
            <div className="lg:sticky lg:top-28 h-fit">
              <Card className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-2xl">
                <CardContent className="p-8">
                  <p className="text-sm text-gray-500 mb-1">
                    Harga per bulan
                  </p>
                  <div className="flex items-center gap-3 mb-6">
                    <p className="text-4xl font-bold text-primary">
                      Rp {pricePerMonth.toLocaleString("id-ID")}
                    </p>
                    {kost.priceBefore && kost.priceBefore > pricePerMonth && (
                      <span className="text-sm text-gray-400 line-through">
                        Rp {kost.priceBefore.toLocaleString("id-ID")}
                      </span>
                    )}
                  </div>

                  {/* DURATION */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">
                      Durasi Sewa
                    </label>
                    <select
                      value={duration}
                      onChange={(e) =>
                        setDuration(Number(e.target.value))
                      }
                      className="w-full rounded-xl border px-4 py-3 focus:outline-primary"
                    >
                      {[1, 3, 6, 12].map((m) => (
                        <option key={m} value={m}>
                          {m} bulan
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    className="w-full text-lg py-6 rounded-2xl shadow-lg"
                    onClick={handleBooking}
                  >
                    Booking via WhatsApp
                  </Button>

                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DetailKost;