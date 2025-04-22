
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Building, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MyBookings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookingFacility, setBookingFacility] = useState(null);
  const [bookingEquipment, setBookingEquipment] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Check if we have a facility from navigation state
    if (location.state?.bookingFacility) {
      setBookingFacility(location.state.bookingFacility);
      setBookingEquipment(null); // Clear equipment if facility is selected
    } else if (location.state?.bookingEquipment) {
      setBookingEquipment(location.state.bookingEquipment);
      setBookingFacility(null); // Clear facility if equipment is selected
    } else {
      // Check if we have data in session storage
      const storedFacility = sessionStorage.getItem('selectedFacility');
      const storedEquipment = sessionStorage.getItem('selectedEquipment');
      
      if (storedFacility) {
        setBookingFacility(JSON.parse(storedFacility));
        setBookingEquipment(null);
      } else if (storedEquipment) {
        setBookingEquipment(JSON.parse(storedEquipment));
        setBookingFacility(null);
      }
    }

    // Load existing bookings from localStorage
    const savedBookings = localStorage.getItem('medspaceBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, [location]);

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    
    if ((!bookingFacility && !bookingEquipment) || !bookingDate || !startTime) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields to complete your booking.",
        variant: "destructive"
      });
      return;
    }

    const isEquipmentBooking = !!bookingEquipment;
    const item = isEquipmentBooking ? bookingEquipment : bookingFacility;
    const totalPrice = item.price * duration;
    
    const newBooking = {
      id: Date.now(),
      type: isEquipmentBooking ? 'equipment' : 'facility',
      itemId: item.id,
      itemName: item.name,
      hospitalName: item.hospital,
      location: item.location,
      bookingDate,
      startTime,
      duration,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('medspaceBookings', JSON.stringify(updatedBookings));
    
    // Clear the current booking form
    setBookingFacility(null);
    setBookingEquipment(null);
    setBookingDate('');
    setStartTime('');
    setDuration(1);
    
    // Clear session storage
    sessionStorage.removeItem('selectedFacility');
    sessionStorage.removeItem('selectedEquipment');
    
    toast({
      title: "Booking confirmed",
      description: `You have successfully booked ${newBooking.itemName} for ${newBooking.bookingDate}`,
    });
  };

  const cancelBooking = (bookingId) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? {...booking, status: 'cancelled'} : booking
    );
    
    setBookings(updatedBookings);
    localStorage.setItem('medspaceBookings', JSON.stringify(updatedBookings));
    
    toast({
      title: "Booking cancelled",
      description: "Your booking has been cancelled successfully."
    });
  };

  const renderBookingForm = () => {
    const item = bookingFacility || bookingEquipment;
    if (!item) return null;

    const isEquipment = !!bookingEquipment;

    return (
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Book {item.name}</CardTitle>
          <CardDescription>{isEquipment ? 'Complete your equipment rental details' : 'Complete your facility booking details'}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitBooking} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{isEquipment ? 'Equipment' : 'Facility'} Information</label>
                <div className="bg-slate-50 p-3 rounded-md">
                  <div className="font-medium">{item.name}</div>
                  <div className="flex items-center text-sm text-slate-500 gap-1 mt-1">
                    <Building className="h-3.5 w-3.5" />
                    <span>{item.hospital}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-500 gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{item.location}</span>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">${item.price}/{isEquipment ? 'day' : 'hr'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Booking Date</label>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                    <Input 
                      type="date" 
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Start Time</label>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-2 text-slate-500" />
                    <Input 
                      type="time" 
                      required
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Duration ({isEquipment ? 'days' : 'hours'})</label>
                  <Input 
                    type="number" 
                    min="1"
                    max={isEquipment ? "30" : "12"}
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <div>
                <p className="text-sm font-medium">Total Price</p>
                <p className="text-xl font-bold">${item.price * duration}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setBookingFacility(null);
                    setBookingEquipment(null);
                    sessionStorage.removeItem('selectedFacility');
                    sessionStorage.removeItem('selectedEquipment');
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Confirm Booking</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground">Manage your facility and equipment bookings</p>
      </div>

      {(bookingFacility || bookingEquipment) && renderBookingForm()}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Bookings</h2>
        
        {bookings.length === 0 ? (
          <div className="bg-slate-50 p-8 rounded-md text-center">
            <p className="text-slate-500">You don't have any bookings yet.</p>
            <div className="flex justify-center gap-4 mt-4">
              <Button 
                onClick={() => navigate('/facilities')}
              >
                Find a Facility
              </Button>
              <Button 
                onClick={() => navigate('/equipment')}
              >
                Find Equipment
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden border-none shadow-sm">
                <div className={`h-2 ${booking.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{booking.itemName}</CardTitle>
                      <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full uppercase">
                        {booking.type}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <CardDescription className="flex flex-col space-y-1">
                    <span>{booking.hospitalName}</span>
                    <span>{booking.location}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span>{booking.bookingDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span>{booking.startTime} ({booking.duration} {booking.type === 'equipment' ? 'day' : 'hour'}{booking.duration > 1 ? 's' : ''})</span>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Total Price</p>
                      <p className="font-bold">${booking.totalPrice}</p>
                    </div>
                    
                    {booking.status === 'confirmed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => cancelBooking(booking.id)}
                        className="mt-2 text-red-500 hover:text-red-700"
                      >
                        Cancel Booking
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
