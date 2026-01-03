import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Explore = ({ kosts = [] }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 py-16">
          {/* HEADER */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-2">
              Explore Kost
            </h1>
            <p className="text-gray-500">
              Temukan kost terbaik sesuai kebutuhanmu
            </p>
          </div>

          {/* GRID LIST */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {kosts.map((kost) => {
              // ===== SAFE PRICE HANDLING =====
              const priceBefore =
                kost.priceBefore ??
                (kost.price ? kost.price * 1.2 : null);

              const priceAfter =
                kost.price ??
                kost.priceAfter ??
                0;

              return (
                <Card key={kost.id} className="overflow-hidden">
                  {/* IMAGE */}
                  <img
                    src={kost.image}
                    alt={kost.name}
                    className="h-48 w-full object-cover"
                  />

                  {/* CONTENT */}
                  <CardContent>
                    <h3 className="font-bold text-lg mb-1">
                      {kost.name}
                    </h3>

                    <p className="text-sm text-gray-500 mb-1">
                      📍 {kost.city || kost.location}
                    </p>

                    <p className="text-sm text-gray-400 mb-3">
                      {kost.address || "Alamat tidak tersedia"}
                    </p>

                    {/* TYPE */}
                    <Badge variant="info" className="mb-3">
                      {kost.type || "Kost"}
                    </Badge>

                    {/* PRICE */}
                    <div className="flex items-center gap-2 mb-4">
                      {kost.discount > 0 && priceBefore && (
                        <span className="line-through text-gray-400 text-sm">
                          Rp{" "}
                          {priceBefore.toLocaleString("id-ID")}
                        </span>
                      )}

                      <span className="text-primary font-bold">
                        Rp{" "}
                        {Number(priceAfter).toLocaleString(
                          "id-ID"
                        )}
                      </span>
                    </div>

                    {/* ACTION */}
                    <Link to={`/kost/${kost.id}`}>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          console.log(
                            "View detail kost:",
                            kost.name
                          )
                        }
                      >
                        View Detail
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;
