
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, Building, MapPin, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Equipment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  const [equipment] = useState([
    { 
      id: 1, 
      name: 'Portable Ultrasound Machine', 
      hospital: 'Memorial Hospital', 
      location: 'San Francisco, CA', 
      category: 'Diagnostic',
      price: 350,
      image: '/placeholder.svg',
      features: ['High Resolution', 'Portable', 'Battery Operated'],
      description: 'Advanced portable ultrasound system with high-resolution imaging, perfect for bedside examinations and mobile clinics.',
      availability: '24/7'
    },
    { 
      id: 2, 
      name: 'Surgical Microscope', 
      hospital: 'City Medical Center', 
      location: 'Los Angeles, CA', 
      category: 'Surgical',
      price: 500,
      image: '/placeholder.svg',
      features: ['HD Camera', 'Digital Recording', 'Precision Optics'],
      description: 'High-definition surgical microscope with advanced imaging capabilities, ideal for delicate procedures requiring precision.',
      availability: 'Weekdays 8AM-6PM'
    },
    { 
      id: 3, 
      name: 'Portable X-Ray System', 
      hospital: 'Valley General Hospital', 
      location: 'San Diego, CA', 
      category: 'Imaging',
      price: 400,
      image: '/placeholder.svg',
      features: ['Wireless', 'Digital Display', 'Quick Setup'],
      description: 'Mobile X-ray system with wireless capabilities, enabling rapid diagnostic imaging in any clinical environment.',
      availability: '24/7'
    },
    { 
      id: 4, 
      name: 'Dermatology Laser System', 
      hospital: 'University Medical', 
      location: 'Sacramento, CA', 
      category: 'Treatment',
      price: 800,
      image: '/placeholder.svg',
      features: ['Multiple Settings', 'Cooling System', 'Touch Interface'],
      description: 'State-of-the-art dermatological laser system with adjustable settings for various skin conditions and procedures.',
      availability: 'Weekdays 9AM-5PM'
    },
    { 
      id: 5, 
      name: 'Endoscopy System', 
      hospital: 'Coastal Care Hospital', 
      location: 'Santa Barbara, CA', 
      category: 'Diagnostic',
      price: 600,
      image: '/placeholder.svg',
      features: ['HD Imaging', 'Recording Capability', 'Multiple Probes'],
      description: 'Comprehensive endoscopy system with high-definition imaging and recording features for internal examinations.',
      availability: 'Monday-Saturday'
    },
  ]);

  const handleViewDetails = (item) => {
    setSelectedEquipment(item);
    setShowDetailsDialog(true);
  };

  const handleRentNow = (item) => {
    // Store the selected equipment in session storage
    sessionStorage.setItem('selectedEquipment', JSON.stringify(item));
    
    // Navigate to the bookings page with the equipment data
    navigate('/my-bookings', { state: { bookingEquipment: item } });
    
    toast({
      title: "Equipment selected",
      description: `${item.name} has been added to your booking form.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medical Equipment</h1>
          <p className="text-muted-foreground">Rent high-quality equipment from hospitals</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Availability</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Search Equipment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Equipment Category</label>
              <select className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background">
                <option value="">All Categories</option>
                <option value="diagnostic">Diagnostic</option>
                <option value="surgical">Surgical</option>
                <option value="imaging">Imaging</option>
                <option value="treatment">Treatment</option>
                <option value="monitoring">Monitoring</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Enter city or zip"
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Rental Period</label>
              <select className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range (Per Day)</label>
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  placeholder="Min"
                  className="w-1/2"
                />
                <span>-</span>
                <Input 
                  type="number" 
                  placeholder="Max"
                  className="w-1/2"
                />
              </div>
            </div>
            
            <Button className="w-full">Search Equipment</Button>
          </CardContent>
        </Card>
        
        <div className="md:col-span-3 space-y-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search equipment by name, type, or features..."
              className="pl-10 w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {equipment.map((item) => (
              <EquipmentCard 
                key={item.id} 
                item={item} 
                onViewDetails={() => handleViewDetails(item)}
                onRentNow={() => handleRentNow(item)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Equipment Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEquipment?.name}</DialogTitle>
            <DialogDescription>
              {selectedEquipment?.hospital} - {selectedEquipment?.location}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="h-48 bg-slate-100 rounded-md overflow-hidden">
              <img 
                src={selectedEquipment?.image}
                alt={selectedEquipment?.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h4 className="font-medium">Description</h4>
              <p className="text-sm text-slate-600">{selectedEquipment?.description}</p>
            </div>
            
            <div>
              <h4 className="font-medium">Features</h4>
              <ul className="mt-2 space-y-1">
                {selectedEquipment?.features.map((feature, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Availability</p>
                <p className="font-medium">{selectedEquipment?.availability}</p>
              </div>
              <div>
                <p className="text-sm">Price</p>
                <p className="font-bold text-lg">${selectedEquipment?.price}/day</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => handleRentNow(selectedEquipment)}>
                Rent Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const EquipmentCard = ({ item, onViewDetails, onRentNow }) => {
  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48 bg-slate-100 relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md shadow-sm">
          <span className="font-bold text-pharma-primary">${item.price}/day</span>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{item.name}</CardTitle>
        <div className="flex items-center text-sm text-slate-500 gap-1">
          <Building className="h-3.5 w-3.5" />
          <span>{item.hospital}</span>
        </div>
        <div className="flex items-center text-sm text-slate-500 gap-1">
          <MapPin className="h-3.5 w-3.5" />
          <span>{item.location}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {item.category}
          </span>
        </div>
        <ul className="mt-2 space-y-1">
          {item.features.map((feature, index) => (
            <li key={index} className="text-sm flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button variant="outline" size="sm" onClick={onViewDetails}>View Details</Button>
        <Button size="sm" onClick={onRentNow}>Rent Now</Button>
      </CardFooter>
    </Card>
  );
};

export default Equipment;
