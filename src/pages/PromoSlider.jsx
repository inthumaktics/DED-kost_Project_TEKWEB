import { Link } from "react-router-dom";

const PromoSlider = ({ title, subtitle, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-1">{title}</h2>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>

        <Link
          to="/promotions"
          className="text-primary font-semibold hover:underline"
        >
          See all →
        </Link>
      </div>

      {/* GRID PREVIEW — HANYA 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.slice(0, 4).map((kost) => (
          <div
            key={kost.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* IMAGE */}
            <img
              src={`${import.meta.env.BASE_URL}${kost.image}`}
              alt={kost.name}
              className="h-36 w-full object-cover"
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
    </section>
  );
};

export default PromoSlider;
