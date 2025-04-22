
import React from 'react';
import { Bell, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header: React.FC = () => {
  return (
    <header className="border-b border-border bg-background py-3 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Find facilities or equipment..." 
            className="pl-8 w-full md:w-[300px] bg-background"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" className="hidden md:flex">
          List Your Facility
        </Button>
        <Button variant="ghost" size="icon">
          <Calendar className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-pharma-danger rounded-full"></span>
        </Button>
        <span className="h-6 w-px bg-border mx-2"></span>
        <span className="text-sm font-medium hidden md:inline-block">Today: April 22, 2025</span>
      </div>
    </header>
  );
};

export default Header;
