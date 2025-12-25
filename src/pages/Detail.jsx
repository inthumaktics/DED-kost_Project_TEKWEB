import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Detail = () => {
  const { id } = useParams();
  
  const [kostData] = useState([
    {
      id: 1,
      name: "Kost Putri Melati Indah",
      price: 1500000,
      facilities: ["WiFi", "AC", "Private Bathroom", "Kitchen", "Laundry", "Parking"],
      description: "Comfortable and clean kost for female students and workers. Located in a strategic area with easy access to public transportation.",
      address: "Jl. Melati No. 123, Jakarta Selatan",
      rules: ["No smoking", "No pets", "Quiet hours 10 PM - 6 AM", "Visitors allowed until 9 PM"],
      image: null
    },
    {
      id: 2,
      name: "Kost Putra Mawar Residence",
      price: 1200000,
      facilities: ["WiFi", "Fan", "Shared Bathroom", "Kitchen", "Security"],
      description: "Affordable kost for male students with basic facilities and 24-hour security.",
      address: "Jl. Mawar Raya No. 45, Jakarta Timur",
      rules: ["No smoking in rooms", "No loud music", "Clean common areas after use"],
      image: null
    },
    {
      id: 3,
      name: "Kost Campur Anggrek Plaza",
      price: 1800000,
      facilities: ["WiFi", "AC", "Private Bathroom", "Kitchen", "Gym", "Swimming Pool", "24h Security"],
      description: "Premium kost with complete facilities including gym and swimming pool. Perfect for professionals.",
      address: "Jl. Anggrek Plaza No. 78, Jakarta Pusat",
      rules: ["No smoking", "No parties", "Gym hours 6 AM - 10 PM", "Pool hours 7 AM - 9 PM"],
      image: null
    },
    {
      id: 4,
      name: "Kost Putri Dahlia Cozy",
      price: 1000000,
      facilities: ["WiFi", "Fan", "Shared Bathroom", "Kitchen"],
      description: "Budget-friendly kost for female students with cozy atmosphere and friendly environment.",
      address: "Jl. Dahlia No. 12, Jakarta Barat",
      rules: ["No male visitors", "Quiet hours 9 PM - 7 AM", "Keep common areas clean"],
      image: null
    },
    {
      id: 5,
      name: "Kost Putra Sakura Modern",
      price: 2000000,
      facilities: ["WiFi", "AC", "Private Bathroom", "Kitchen", "Laundry", "Parking", "Rooftop"],
      description: "Modern kost with rooftop area for relaxation. Ideal for young professionals and students.",
      address: "Jl. Sakura Modern No. 99, Jakarta Utara",
      rules: ["No smoking in rooms", "Rooftop closes at 11 PM", "Parking space assigned"],
      image: null
    },
    {
      id: 6,
      name: "Kost Putri Tulip Garden",
      price: 1300000,
      facilities: ["WiFi", "AC", "Private Bathroom", "Kitchen", "Garden"],
      description: "Peaceful kost with beautiful garden view. Perfect for those who love nature and tranquility.",
      address: "Jl. Tulip Garden No. 56, Jakarta Selatan",
      rules: ["No smoking", "Garden maintenance together", "Quiet environment"],
      image: null
    }
  ]);

  const kost = kostData.find(k => k.id === parseInt(id));

  const handleWhatsAppRent = () => {
    console.log("Checkout via WhatsApp");
  };

  if (!kost) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Kost Not Found</h1>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/">
              <Button variant="outline" className="mb-4">
                ← Back to Home
              </Button>
            </Link>
          </div>

          {/* Kost Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-gray-900">
                    {kost.name}
                  </CardTitle>
                  <div className="flex items-center text-gray-600 mt-2">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    {kost.address}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {kost.description}
                  </p>
                </CardContent>
              </Card>

              {/* Facilities */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {kost.facilities.map((facility, index) => (
                      <div
                        key={index}
                        className="flex items-center p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/10 hover:border-primary/20 transition-all"
                      >
                        <div className="bg-primary text-white p-2 rounded-lg mr-3">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <Badge variant="secondary" className="text-sm font-medium bg-white border-0 shadow-sm">
                          {facility}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Rules */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">House Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {kost.rules.map((rule, index) => (
                      <li key={index} className="flex items-start p-3 bg-red-50 rounded-lg border border-red-100">
                        <div className="bg-red-500 text-white p-1 rounded-full mr-3 mt-0.5">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="text-center pb-4">
                  <CardTitle>
                    <div className="text-4xl font-bold text-primary mb-2">
                      Rp {kost.price.toLocaleString('id-ID')}
                    </div>
                    <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full inline-block">per month</div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button 
                    onClick={handleWhatsAppRent}
                    className="w-full bg-accent hover:bg-accent/90 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
                    </svg>
                    Rent via WhatsApp
                  </Button>
                  
                  <div className="text-center text-sm text-gray-500 bg-gray-100 p-4 rounded-lg">
                    <div className="font-semibold text-gray-700 mb-1">Quick Contact</div>
                    <p>Contact us through WhatsApp</p>
                    <p>for booking and inquiries</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Detail;