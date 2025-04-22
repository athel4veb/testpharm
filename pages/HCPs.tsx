
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Star, Phone, MapPin } from 'lucide-react';

// Mock data for healthcare professionals
const hcps = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    organization: "Heart Care Center",
    city: "San Francisco",
    state: "CA",
    rating: 5,
    potentialValue: 50000,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    organization: "Brain & Spine Institute",
    city: "Los Angeles",
    state: "CA",
    rating: 4,
    potentialValue: 35000,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Oncologist",
    organization: "Cancer Treatment Center",
    city: "San Diego",
    state: "CA",
    rating: 5,
    potentialValue: 75000,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Pediatrician",
    organization: "Children's Hospital",
    city: "Sacramento",
    state: "CA",
    rating: 3,
    potentialValue: 25000,
  },
  {
    id: 5,
    name: "Dr. Lisa Park",
    specialty: "Dermatologist",
    organization: "Skin Care Clinic",
    city: "Santa Barbara",
    state: "CA",
    rating: 4,
    potentialValue: 40000,
  },
];

const HCPs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHcps, setFilteredHcps] = useState(hcps);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredHcps(hcps);
    } else {
      const results = hcps.filter(
        hcp => 
          hcp.name.toLowerCase().includes(query) ||
          hcp.specialty.toLowerCase().includes(query) ||
          hcp.organization.toLowerCase().includes(query) ||
          hcp.city.toLowerCase().includes(query) ||
          hcp.state.toLowerCase().includes(query)
      );
      setFilteredHcps(results);
    }
  };

  const renderRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "fill-pharma-warning text-pharma-warning" : "text-muted-foreground"} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Healthcare Professionals</h1>
          <p className="text-muted-foreground">Manage your HCP relationships and track engagement.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New HCP
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, specialty, organization, or location..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {/* Could add filters here */}
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHcps.map((hcp) => (
              <TableRow key={hcp.id}>
                <TableCell className="font-medium">{hcp.name}</TableCell>
                <TableCell>{hcp.specialty}</TableCell>
                <TableCell>{hcp.organization}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                    {hcp.city}, {hcp.state}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    {renderRatingStars(hcp.rating)}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Phone className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>${hcp.potentialValue.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HCPs;
