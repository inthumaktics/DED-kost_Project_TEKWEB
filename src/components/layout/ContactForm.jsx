import { useState } from "react";

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted");

    // Simulasi kirim pesan
    setIsSubmitted(true);
  };

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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama lengkap"
          disabled={isSubmitted}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
        />

        <input
          type="email"
          placeholder="Email"
          disabled={isSubmitted}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
        />

        <input
          type="text"
          placeholder="Nomor WhatsApp"
          disabled={isSubmitted}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
        />

        <textarea
          rows="4"
          placeholder="Pesan kamu"
          disabled={isSubmitted}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
        />

        <button
          type="submit"
          disabled={isSubmitted}
          className={`w-full py-3 rounded-lg font-semibold transition 
            ${
              isSubmitted
                ? "bg-green-500 text-white cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
        >
          {isSubmitted ? "Pesan Terkirim ✓" : "Kirim Pesan"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
