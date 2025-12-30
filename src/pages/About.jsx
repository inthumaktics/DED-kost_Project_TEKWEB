import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/layout/ContactForm";


const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-r from-primary to-blue-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tentang DED-Kost
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-white/90">
              Platform pencarian kost yang dirancang untuk membantu mahasiswa
              dan pekerja menemukan hunian terbaik dengan cara yang mudah,
              cepat, dan transparan.
            </p>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Siapa Kami?</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                DED-Kost adalah aplikasi web yang dikembangkan sebagai solusi
                digital untuk mempermudah pencarian kost. Kami memahami bahwa
                mencari tempat tinggal bukan hanya soal harga, tapi juga
                kenyamanan, lokasi, dan keamanan.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Oleh karena itu, DED-Kost hadir dengan fitur eksplorasi, promo
                menarik, dan detail kost yang transparan untuk membantu pengguna
                membuat keputusan terbaik.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-6xl mb-4">🏠</p>
              <h3 className="font-semibold text-lg mb-2">
                Hunian Nyaman untuk Semua
              </h3>
              <p className="text-gray-500 text-sm">
                Kami percaya setiap orang berhak mendapatkan tempat tinggal yang
                layak dan nyaman.
              </p>
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="border rounded-xl p-8 hover:shadow-md transition">
                <h3 className="text-2xl font-bold mb-3">🎯 Visi</h3>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi platform pencarian kost yang terpercaya dan menjadi
                  pilihan utama bagi mahasiswa serta pekerja di berbagai kota di
                  Indonesia.
                </p>
              </div>

              <div className="border rounded-xl p-8 hover:shadow-md transition">
                <h3 className="text-2xl font-bold mb-3">🚀 Misi</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Menyediakan informasi kost yang akurat</li>
                  <li>Mempermudah pencarian berdasarkan kebutuhan</li>
                  <li>Menyajikan promo dan penawaran terbaik</li>
                  <li>Menghadirkan pengalaman pengguna yang nyaman</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-2">Nilai yang Kami Pegang</h2>
            <p className="text-gray-500">
              Prinsip yang menjadi dasar pengembangan DED-Kost
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-3xl mb-3">🤝</p>
              <h4 className="font-semibold mb-1">Kepercayaan</h4>
              <p className="text-sm text-gray-500">
                Informasi yang jujur dan transparan
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-3xl mb-3">⚡</p>
              <h4 className="font-semibold mb-1">Kemudahan</h4>
              <p className="text-sm text-gray-500">
                Akses cepat dan penggunaan yang simpel
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-3xl mb-3">🎨</p>
              <h4 className="font-semibold mb-1">Kenyamanan</h4>
              <p className="text-sm text-gray-500">
                Desain yang ramah dan menyenangkan
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-3xl mb-3">🔒</p>
              <h4 className="font-semibold mb-1">Keamanan</h4>
              <p className="text-sm text-gray-500">
                Data dan pengalaman pengguna yang aman
              </p>
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

export default AboutUs;
