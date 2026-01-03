import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// shadcn UI
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DetailKost = ({ kosts = [] }) => {
  const { id } = useParams();
  const kost = kosts.find((item) => item.id === Number(id));

  // ===== HANDLE WHATSAPP BOOKING =====
  const handleBooking = () => {
    const phoneNumber = "6281234567890"; // ganti dengan nomor pemilik kost
    const message = `
Halo, saya tertarik dengan kost berikut:

Nama Kost: ${kost.name}
Lokasi: ${kost.city || kost.location}
Harga: Rp ${
      kost.price
        ? kost.price.toLocaleString("id-ID")
        : kost.priceAfter?.toLocaleString("id-ID")
    }

Apakah masih tersedia?
    `.trim();

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

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

  // ===== SAFE PRICE =====
  const priceBefore =
    kost.priceBefore ??
    (kost.price ? kost.price * 1.2 : null);

  const priceAfter =
    kost.price ??
    kost.priceAfter ??
    0;

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

          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* IMAGE */}
              <img
                src={kost.image}
                alt={kost.name}
                className="w-full h-full object-cover"
              />

              {/* CONTENT */}
              <div>
                <CardHeader>
                  <h1 className="text-3xl font-bold">
                    {kost.name}
                  </h1>

                  <p className="text-gray-500 mt-1">
                    📍 {kost.city || kost.location}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {kost.address ||
                      "Alamat belum tersedia"}
                  </p>
                </CardHeader>

                <CardContent>
                  {/* BADGES */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="info">
                      {kost.type || "Tipe belum ditentukan"}
                    </Badge>

                    {kost.discount > 0 && (
                      <Badge variant="danger">
                        {kost.discount}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* PRICE */}
                  <div className="flex items-center gap-3 mb-6">
                    {kost.discount > 0 && priceBefore && (
                      <span className="line-through text-gray-400">
                        Rp{" "}
                        {priceBefore.toLocaleString(
                          "id-ID"
                        )}
                      </span>
                    )}
                    <span className="text-2xl font-bold text-primary">
                      Rp{" "}
                      {Number(priceAfter).toLocaleString(
                        "id-ID"
                      )}
                    </span>
                  </div>

                  {/* FACILITIES */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">
                      Facilities
                    </h3>

                    {kost.facilities &&
                    kost.facilities.length > 0 ? (
                      <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        {kost.facilities.map(
                          (facility, index) => (
                            <li
                              key={index}
                              className="bg-gray-100 px-3 py-1 rounded-md"
                            >
                              ✓ {facility}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-400">
                        Fasilitas belum tersedia
                      </p>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-gray-600 mb-8">
                    {kost.description ||
                      `Kost nyaman dengan fasilitas lengkap dan lingkungan aman. Cocok untuk mahasiswa maupun pekerja dengan lokasi strategis di ${
                        kost.city || kost.location
                      }.`}
                  </p>

                  {/* ACTION */}
                  <Button
                    className="w-full text-lg py-6"
                    onClick={handleBooking}
                  >
                    Booking via WhatsApp
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DetailKost;
