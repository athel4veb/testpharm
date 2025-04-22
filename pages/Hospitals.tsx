
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';

const Hospitals = () => {
  const hospitals = [
    { id: 1, name: 'Memorial Hospital', location: 'San Francisco, CA', facilitiesCount: 12, rating: 4.8 },
    { id: 2, name: 'City Medical Center', location: 'Los Angeles, CA', facilitiesCount: 8, rating: 4.6 },
    { id: 3, name: 'Valley General Hospital', location: 'San Diego, CA', facilitiesCount: 15, rating: 4.7 },
    { id: 4, name: 'University Medical', location: 'Sacramento, CA', facilitiesCount: 20, rating: 4.9 },
    { id: 5, name: 'Coastal Care Hospital', location: 'Santa Barbara, CA', facilitiesCount: 6, rating: 4.5 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hospital Partners</h1>
          <p className="text-muted-foreground">Browse our network of hospital partners</p>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Find Hospitals</CardTitle>
            <div className="relative w-[240px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search hospitals..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hospital Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-center">Available Facilities</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hospitals.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell className="font-medium">{hospital.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                      {hospital.location}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{hospital.facilitiesCount}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                        {hospital.rating}/5.0
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm">View Facilities</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Hospital</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 bg-slate-200"></div>
            <div className="p-4">
              <h3 className="text-xl font-bold">Memorial Hospital</h3>
              <p className="text-sm text-slate-500 mb-2">San Francisco, CA</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Operating Rooms:</span>
                  <span className="font-medium">6 Available</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Imaging Centers:</span>
                  <span className="font-medium">3 Available</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Laboratory Spaces:</span>
                  <span className="font-medium">2 Available</span>
                </div>
                <Button className="w-full mt-3">View All Facilities</Button>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">About Memorial Hospital</h3>
            <p className="mb-4">
              Memorial Hospital is a leading healthcare institution in San Francisco, providing high-quality medical facilities and equipment for healthcare professionals. With a strong focus on innovation and patient care, Memorial Hospital offers state-of-the-art facilities that can be rented by physicians and specialists.
            </p>
            <p className="mb-4">
              Their available facilities include fully-equipped operating rooms, modern imaging centers with the latest technology, specialized laboratory spaces, and clinic rooms designed for various medical specialties.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button variant="outline">Contact Hospital</Button>
              <Button>Browse Available Facilities</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hospitals;
