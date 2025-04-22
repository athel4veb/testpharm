
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/types';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TasksListProps {
  tasks: Task[];
}

const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  // Filter and sort tasks
  const pendingTasks = tasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => {
      // Sort by due date and then by priority
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      
      if (dateA !== dateB) return dateA - dateB;
      
      const priorityValues = { high: 1, medium: 2, low: 3 };
      return priorityValues[a.priority] - priorityValues[b.priority];
    })
    .slice(0, 4);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => {
              const dueDate = new Date(task.dueDate);
              const isOverdue = dueDate < new Date();
              const isDueSoon = !isOverdue && dueDate < new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days
              
              return (
                <div key={task.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-secondary transition-colors">
                  <div className="mt-0.5">
                    {task.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-pharma-success" />
                    ) : task.status === 'in-progress' ? (
                      <Clock className="h-5 w-5 text-pharma-warning" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{task.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          isOverdue ? "text-pharma-danger border-pharma-danger" : 
                          isDueSoon ? "text-pharma-warning border-pharma-warning" : 
                          "text-muted-foreground"
                        )}
                      >
                        {isOverdue ? 'Overdue' : 'Due'}: {dueDate.toLocaleDateString()}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          task.priority === 'high' ? "text-pharma-danger border-pharma-danger" : 
                          task.priority === 'medium' ? "text-pharma-warning border-pharma-warning" : 
                          "text-muted-foreground"
                        )}
                      >
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted-foreground py-4">No pending tasks</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksList;
