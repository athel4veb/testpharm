
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, Building, MapPin, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Facilities = () => {
  const [facilities] = useState([
    { 
      id: 1, 
      name: 'Private Operating Room Suite A', 
      hospital: 'Memorial Hospital', 
      location: 'San Francisco, CA', 
      type: 'Operating Room',
      price: 1200,
      image: '/placeholder.svg',
      features: ['Robotic Surgery Equipment', 'Advanced Monitoring', 'Support Staff Available']
    },
    { 
      id: 2, 
      name: 'Imaging Center - MRI Unit', 
      hospital: 'City Medical Center', 
      location: 'Los Angeles, CA', 
      type: 'Imaging Center',
      price: 800,
      image: '/placeholder.svg',
      features: ['3T MRI Machine', 'Digital Imaging System', 'Technician Optional']
    },
    { 
      id: 3, 
      name: 'Cardiology Procedure Room', 
      hospital: 'Valley General Hospital', 
      location: 'San Diego, CA', 
      type: 'Procedure Room',
      price: 950,
      image: '/placeholder.svg',
      features: ['Cardiac Monitoring', 'Cath Lab Equipment', 'Recovery Area']
    },
    { 
      id: 4, 
      name: 'Dermatology Clinic Space', 
      hospital: 'University Medical', 
      location: 'Sacramento, CA', 
      type: 'Clinic Space',
      price: 500,
      image: '/placeholder.svg',
      features: ['Examination Rooms', 'Procedure Room', 'Reception Area']
    },
    { 
      id: 5, 
      name: 'Laboratory Suite B', 
      hospital: 'Coastal Care Hospital', 
      location: 'Santa Barbara, CA', 
      type: 'Laboratory',
      price: 750,
      image: '/placeholder.svg',
      features: ['Complete Lab Equipment', 'Sample Storage', 'Digital Analysis Tools']
    },
  ]);
  
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (facility) => {
    setSelectedFacility(facility);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medical Facilities</h1>
          <p className="text-muted-foreground">Find and book unused hospital facilities</p>
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
            <CardTitle className="text-lg">Search Facilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Facility Type</label>
              <select className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background">
                <option value="">All Types</option>
                <option value="operating_room">Operating Room</option>
                <option value="imaging">Imaging Center</option>
                <option value="laboratory">Laboratory</option>
                <option value="procedure_room">Procedure Room</option>
                <option value="clinic">Clinic Space</option>
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
              <label className="text-sm font-medium">Price Range</label>
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
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Available Date</label>
              <Input 
                type="date" 
              />
            </div>
            
            <Button className="w-full">Search Facilities</Button>
          </CardContent>
        </Card>
        
        <div className="md:col-span-3 space-y-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search by facility name, hospital, or equipment..."
              className="pl-10 w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilities.map((facility) => (
              <FacilityCard 
                key={facility.id} 
                facility={facility} 
                onViewDetails={() => handleViewDetails(facility)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedFacility && (
        <FacilityDetailsDialog
          facility={selectedFacility}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}
    </div>
  );
};

const FacilityCard = ({ facility, onViewDetails }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Store the selected facility in session storage to access it on the booking page
    sessionStorage.setItem('selectedFacility', JSON.stringify(facility));
    toast({
      title: "Booking initiated",
      description: `You're booking ${facility.name}`,
    });
    navigate('/my-bookings', { state: { bookingFacility: facility } });
  };

  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48 bg-slate-100 relative">
        <img 
          src={facility.image} 
          alt={facility.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md shadow-sm">
          <span className="font-bold text-pharma-primary">${facility.price}/hr</span>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{facility.name}</CardTitle>
        <div className="flex items-center text-sm text-slate-500 gap-1">
          <Building className="h-3.5 w-3.5" />
          <span>{facility.hospital}</span>
        </div>
        <div className="flex items-center text-sm text-slate-500 gap-1">
          <MapPin className="h-3.5 w-3.5" />
          <span>{facility.location}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {facility.type}
          </span>
        </div>
        <ul className="mt-2 space-y-1">
          {facility.features.map((feature, index) => (
            <li key={index} className="text-sm flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button variant="outline" size="sm" onClick={onViewDetails}>View Details</Button>
        <Button size="sm" onClick={handleBookNow}>Book Now</Button>
      </CardFooter>
    </Card>
  );
};

const FacilityDetailsDialog = ({ facility, open, onOpenChange }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBookNow = () => {
    sessionStorage.setItem('selectedFacility', JSON.stringify(facility));
    toast({
      title: "Booking initiated",
      description: `You're booking ${facility.name}`,
    });
    navigate('/my-bookings', { state: { bookingFacility: facility } });
    onOpenChange(false);
  };

  if (!facility) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{facility.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-1 text-sm">
            <Building className="h-3.5 w-3.5" />
            {facility.hospital} | 
            <MapPin className="h-3.5 w-3.5 ml-1" />
            {facility.location}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img 
              src={facility.image} 
              alt={facility.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="mt-3">
              <h3 className="font-semibold">Facility Features</h3>
              <ul className="mt-2 space-y-2">
                {facility.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Pricing</h3>
              <p className="text-2xl font-bold text-pharma-primary mt-1">${facility.price}/hr</p>
              <p className="text-sm text-muted-foreground">Additional charges may apply for extended hours</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Availability</h3>
              <p className="text-sm mt-1">Available for booking Monday through Friday</p>
              <p className="text-sm">Typical hours: 8:00 AM - 6:00 PM</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Type</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                {facility.type}
              </span>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={handleBookNow}>Book Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Facilities;
