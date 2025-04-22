
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from '@/components/ui/table';

interface TopHCP {
  hcpId: string;
  name: string;
  value: number;
}

interface TopHCPsTableProps {
  data: TopHCP[];
}

const TopHCPsTable: React.FC<TopHCPsTableProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Top HCPs by Value</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Potential Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((hcp) => (
              <TableRow key={hcp.hcpId}>
                <TableCell>{hcp.name}</TableCell>
                <TableCell className="text-right">${hcp.value.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopHCPsTable;
