
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Calendar, CheckCircle, Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Visit } from '@/types';
import { visits, getHcpById } from '@/data/mockData';

const Visits: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVisits, setFilteredVisits] = useState<Visit[]>(visits);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredVisits(visits);
    } else {
      const results = visits.filter(visit => {
        const hcp = getHcpById(visit.hcpId);
        return (
          hcp?.name.toLowerCase().includes(query) ||
          hcp?.organization.toLowerCase().includes(query) ||
          visit.notes.toLowerCase().includes(query) ||
          visit.outcome.toLowerCase().includes(query)
        );
      });
      setFilteredVisits(results);
    }
  };

  const renderStatusBadge = (status: Visit['status']) => {
    switch (status) {
      case 'planned':
        return (
          <Badge variant="outline" className="text-pharma-primary border-pharma-primary">
            <Clock className="mr-1 h-3 w-3" />
            Planned
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="text-pharma-success border-pharma-success">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      case 'canceled':
        return (
          <Badge variant="outline" className="text-pharma-danger border-pharma-danger">
            <X className="mr-1 h-3 w-3" />
            Canceled
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Visit Management</h1>
          <p className="text-muted-foreground">Schedule, track, and manage your HCP visits.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Visit
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search visits..."
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
              <TableHead>Date</TableHead>
              <TableHead>HCP</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Products Discussed</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Follow-up</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVisits.map((visit) => {
              const hcp = getHcpById(visit.hcpId);
              const visitDate = new Date(visit.date);
              const followUpDate = visit.followUpDate ? new Date(visit.followUpDate) : null;
              
              return (
                <TableRow key={visit.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {visitDate.toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{hcp?.name}</TableCell>
                  <TableCell>{hcp?.organization}</TableCell>
                  <TableCell>{renderStatusBadge(visit.status)}</TableCell>
                  <TableCell>{visit.productsDiscussed.length}</TableCell>
                  <TableCell className="max-w-xs truncate">{visit.notes}</TableCell>
                  <TableCell>
                    {followUpDate ? (
                      <div className="text-xs font-medium">
                        {followUpDate.toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">None scheduled</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Visits;
