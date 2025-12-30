const useCheckout = () => {
  
  /* WHATSAPP CHECKOUT SESUAI DENGAN DATA KOST DI APLIKASI*/
  const handleWhatsAppCheckout = (kost, userData = {}) => {
    // Ganti 'product' → 'kost'
    // Ganti 'priceAfter' → sesuai field di data kost Anda
    
    // Default message untuk kost
    const defaultMessage = `Halo, saya tertarik dengan ${kost.name} di ${kost.city} dengan harga Rp ${kost.priceAfter?.toLocaleString('id-ID') || kost.price?.toLocaleString('id-ID')}.`;
    
    // Jika ada userData, buat pesan lebih detail
    let message = defaultMessage;
    if (userData.name || userData.phone || userData.note) {
      message = `Halo, saya ingin memesan:
      
🏠 *${kost.name}*
📍 ${kost.city}, ${kost.address || ''}
💰 Harga: Rp ${kost.priceAfter?.toLocaleString('id-ID') || kost.price?.toLocaleString('id-ID')}
${kost.discount > 0 ? `🎁 Diskon: ${kost.discount}%` : ''}

📝 *Data Pemesan:*
• Nama: ${userData.name || 'Belum diisi'}
• No. HP: ${userData.phone || 'Belum diisi'}
• Tanggal Masuk: ${userData.checkInDate || 'Belum ditentukan'}
• Durasi: ${userData.duration || '1 bulan'}
• Catatan: ${userData.note || 'Tidak ada'}

Apakah kost ini masih tersedia?`.trim();
    }

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "6281234567890"; 
    
    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  /* TAMBAH FUNGSI QUICK CHECKOUT
     UNTUK TOMBOL "BOOKING SEKARANG" DI DETAILKOST.JSX
 */
  const handleQuickCheckout = (kost) => {
    const phoneNumber = "628123456789";
    const message = `Halo, saya tertarik dengan ${kost.name} di ${kost.city} (Rp ${kost.priceAfter?.toLocaleString('id-ID') || kost.price?.toLocaleString('id-ID')}). Bisa info lebih lanjut?`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return {
    handleWhatsAppCheckout,
    handleQuickCheckout 
  };
};

export default useCheckout;