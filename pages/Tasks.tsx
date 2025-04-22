
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Clock, Calendar, CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task } from '@/types';
import { tasks, getHcpById, getProductById } from '@/data/mockData';

const Tasks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredTasks(tasks);
    } else {
      const results = tasks.filter(
        task => 
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          task.status.toLowerCase().includes(query) ||
          task.priority.toLowerCase().includes(query)
      );
      setFilteredTasks(results);
    }
  };

  const getRelatedEntityName = (task: Task): string => {
    if (!task.relatedTo) return 'N/A';
    
    switch (task.relatedTo.type) {
      case 'hcp':
        const hcp = getHcpById(task.relatedTo.id);
        return hcp ? hcp.name : 'Unknown HCP';
      case 'product':
        const product = getProductById(task.relatedTo.id);
        return product ? product.name : 'Unknown Product';
      case 'visit':
        const visitHcp = getHcpById(task.relatedTo.id);
        return visitHcp ? `Visit: ${visitHcp.name}` : 'Unknown Visit';
      default:
        return 'N/A';
    }
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return (
          <Badge variant="outline" className="text-pharma-danger border-pharma-danger">
            High
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="outline" className="text-pharma-warning border-pharma-warning">
            Medium
          </Badge>
        );
      case 'low':
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Low
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
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
          <p className="text-muted-foreground">Organize and track your work priorities.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Related To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => {
              const dueDate = new Date(task.dueDate);
              const isOverdue = task.status !== 'completed' && dueDate < new Date();
              
              return (
                <TableRow key={task.id}>
                  <TableCell>
                    {task.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-pharma-success" />
                    ) : task.status === 'in-progress' ? (
                      <Clock className="h-5 w-5 text-pharma-warning" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">{task.description}</div>
                  </TableCell>
                  <TableCell>
                    <div className={cn(
                      "flex items-center",
                      isOverdue && "text-pharma-danger"
                    )}>
                      <Calendar className="mr-2 h-4 w-4" />
                      {dueDate.toLocaleDateString()}
                      {isOverdue && <span className="text-xs ml-2">(Overdue)</span>}
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>{getRelatedEntityName(task)}</TableCell>
                  <TableCell>
                    <Badge variant={task.status === 'completed' ? 'default' : 'outline'}>
                      {task.status === 'todo' ? 'To Do' : 
                       task.status === 'in-progress' ? 'In Progress' : 
                       'Completed'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {task.status !== 'completed' && (
                      <Button variant="outline" size="sm">Mark Complete</Button>
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

export default Tasks;
