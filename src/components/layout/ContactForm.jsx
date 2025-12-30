const ContactForm = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* HEADER */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-1">
          Hubungi Kami
        </h3>
        <p className="text-gray-500 text-sm">
          Punya pertanyaan atau butuh bantuan? Kirim pesan ke DED-Kost
        </p>
      </div>

      {/* FORM */}
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Nama lengkap"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="text"
          placeholder="Nomor WhatsApp"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <textarea
          rows="4"
          placeholder="Pesan kamu"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
          onClick={(e) => {
            e.preventDefault();
            console.log("Contact form submitted");
          }}
        >
          Kirim Pesan
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
