import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProductCard = ({ kost }) => {
  const handleWhatsAppRent = () => {
    console.log("Checkout via WhatsApp");
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
          {kost.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-4">
        {/* Price */}
        <div className="text-3xl font-bold text-primary bg-primary/5 p-3 rounded-lg text-center">
          Rp {kost.price.toLocaleString('id-ID')}
          <span className="text-sm font-normal text-gray-600 block">/month</span>
        </div>
        
        {/* Facilities */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Facilities:</h4>
          <div className="flex flex-wrap gap-2">
            {kost.facilities.slice(0, 3).map((facility, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-secondary/80 text-secondary-foreground hover:bg-secondary"
              >
                {facility}
              </Badge>
            ))}
            {kost.facilities.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-xs border-primary/30 text-primary"
              >
                +{kost.facilities.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 flex flex-col space-y-3">
        <Link to={`/detail-produk/${kost.id}`} className="w-full">
          <Button 
            variant="outline" 
            className="w-full border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all"
          >
            View Details
          </Button>
        </Link>
        <Button 
          onClick={handleWhatsAppRent}
          className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
          </svg>
          Rent via WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;