
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Temporary mock data until connected to Supabase
const MOCK_TASKS = [
  { id: 1, title: "Complete project proposal", status: "pending", created_at: "2023-05-19T12:00:00" },
  { id: 2, title: "Review code changes", status: "completed", created_at: "2023-05-18T12:00:00" },
  { id: 3, title: "Deploy to production", status: "pending", created_at: "2023-05-20T12:00:00" },
];

const TaskList = () => {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const navigate = useNavigate();
  const { toast } = useToast();

  // This will be replaced with actual Supabase delete call
  const handleDelete = (id: number) => {
    // Remove task from local state for now
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been successfully deleted.",
    });
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-500">No tasks found. Create your first task!</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status}
                  </span>
                </TableCell>
                <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/tasks/edit/${task.id}`)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(task.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TaskList;
