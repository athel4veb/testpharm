
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Building, Calendar, FileText } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to MedSpace</h1>
        <p className="text-muted-foreground">Find and book medical facilities and equipment</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-full bg-white shadow-md border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Find What You Need</CardTitle>
            <CardDescription>Search for facilities or equipment near you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Enter location or specialty"
                  className="pl-9 w-full"
                />
              </div>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select className="w-full h-10 pl-9 pr-4 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none appearance-none">
                  <option value="">Type of Facility</option>
                  <option value="operating_room">Operating Room</option>
                  <option value="imaging">Imaging Center</option>
                  <option value="laboratory">Laboratory</option>
                  <option value="clinic">Clinic Space</option>
                </select>
              </div>
              <Button type="submit" className="w-full">Search Now</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-pharma-primary" />
              <span>Available Facilities</span>
            </CardTitle>
            <CardDescription>Book entire spaces for procedures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Access operating rooms, imaging centers, lab spaces and more.</p>
            <Button variant="outline" className="w-full">Browse Facilities</Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-pharma-primary" />
              <span>Medical Equipment</span>
            </CardTitle>
            <CardDescription>Rent specialized equipment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Find the latest diagnostic and treatment equipment from trusted hospitals.</p>
            <Button variant="outline" className="w-full">Browse Equipment</Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-pharma-primary" />
              <span>My Schedule</span>
            </CardTitle>
            <CardDescription>View your upcoming bookings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Manage your facility and equipment rentals in one place.</p>
            <Button variant="outline" className="w-full">View Schedule</Button>
          </CardContent>
        </Card>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Featured Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <FacilityCard key={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

// Create an Input component specifically for our dashboard
const Input = ({ className, ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

// Sample facility card component
const FacilityCard = () => {
  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all border border-slate-200">
      <div className="h-40 bg-slate-200"></div>
      <div className="p-4">
        <h3 className="font-semibold">Memorial Hospital OR Suite</h3>
        <p className="text-sm text-slate-500">San Francisco, CA</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-pharma-primary">$1,200/hr</span>
          <Button size="sm" variant="outline">View Details</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
