
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Visit } from '@/types';
import { getHcpById } from '@/data/mockData';

interface UpcomingVisitsCardProps {
  visits: Visit[];
}

const UpcomingVisitsCard: React.FC<UpcomingVisitsCardProps> = ({ visits }) => {
  // Sort visits by date (most recent first) and take only planned visits
  const upcomingVisits = visits
    .filter(visit => visit.status === 'planned')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Visits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingVisits.length > 0 ? (
            upcomingVisits.map((visit) => {
              const hcp = getHcpById(visit.hcpId);
              const visitDate = new Date(visit.date);
              
              return (
                <div key={visit.id} className="flex items-start gap-4 p-3 rounded-md hover:bg-secondary transition-colors">
                  <div className="min-w-10 h-10 bg-secondary rounded-md flex flex-col items-center justify-center">
                    <span className="text-xs font-bold">{visitDate.toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-sm font-bold">{visitDate.getDate()}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{hcp?.name}</h4>
                    <p className="text-sm text-muted-foreground">{hcp?.organization}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {visit.notes.length > 60 ? visit.notes.substring(0, 60) + '...' : visit.notes}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted-foreground py-4">No upcoming visits scheduled</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingVisitsCard;
