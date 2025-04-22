
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, ChevronLeft, ChevronRight, Home, Building, Database, FileText, Settings, Users, ToggleRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [portalMode, setPortalMode] = useState<'marketplace' | 'pharma'>('marketplace');
  const location = useLocation();
  const { toast } = useToast();

  const marketplaceNavItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Building, label: 'Hospitals', path: '/hospitals' },
    { icon: FileText, label: 'Facilities', path: '/facilities' },
    { icon: Database, label: 'Equipment', path: '/equipment' },
    { icon: Calendar, label: 'My Bookings', path: '/my-bookings' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const pharmaNavItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Healthcare Professionals', path: '/hcps' },
    { icon: Building, label: 'Hospitals', path: '/hospitals' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const navItems = portalMode === 'marketplace' ? marketplaceNavItems : pharmaNavItems;

  const togglePortal = () => {
    const newMode = portalMode === 'marketplace' ? 'pharma' : 'marketplace';
    setPortalMode(newMode);
    toast({
      title: `Switched to ${newMode === 'marketplace' ? 'MedSpace Marketplace' : 'Pharma Sales'} Portal`,
      description: `You are now in ${newMode === 'marketplace' ? 'facility booking' : 'healthcare professional engagement'} mode.`,
    });
  };

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
          {!collapsed && (
            <span className="text-xl font-bold text-pharma-primary">
              {portalMode === 'marketplace' ? 'MedSpace' : 'PharmaSpace'}
            </span>
          )}
          {collapsed && (
            <span className="text-xl font-bold text-pharma-primary">
              {portalMode === 'marketplace' ? 'MS' : 'PS'}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className={cn(
        "px-2 py-2",
        collapsed ? "flex justify-center" : "flex items-center justify-between"
      )}>
        <Button
          variant="outline"
          size={collapsed ? "icon" : "default"}
          onClick={togglePortal}
          className={cn(
            "transition-all duration-300",
            collapsed ? "w-10 h-10" : "w-full"
          )}
        >
          {collapsed ? (
            <ToggleRight className="h-4 w-4" />
          ) : (
            <>
              <ToggleRight className="mr-2 h-4 w-4" />
              Switch to {portalMode === 'marketplace' ? 'Pharma' : 'Marketplace'}
            </>
          )}
        </Button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  location.pathname === item.path 
                    ? "bg-primary text-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed ? "justify-center" : ""
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "space-x-3"
        )}>
          <div className="w-8 h-8 rounded-full bg-pharma-primary text-white flex items-center justify-center">
            <span className="font-semibold">MD</span>
          </div>
          {!collapsed && (
            <div>
              <p className="font-medium">Dr. Smith</p>
              <p className="text-xs text-slate-500">Cardiologist</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
