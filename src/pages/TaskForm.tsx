
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Temporary mock data until connected to Supabase
const MOCK_TASKS = [
  { id: 1, title: "Complete project proposal", status: "pending", created_at: "2023-05-19T12:00:00" },
  { id: 2, title: "Review code changes", status: "completed", created_at: "2023-05-18T12:00:00" },
  { id: 3, title: "Deploy to production", status: "pending", created_at: "2023-05-20T12:00:00" },
];

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      // This will be replaced with actual Supabase fetch
      const task = MOCK_TASKS.find(task => task.id === parseInt(id as string));
      if (task) {
        setTitle(task.title);
        setIsCompleted(task.status === "completed");
      }
    }
  }, [id, isEditMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This will be replaced with actual Supabase create/update
    toast({
      title: isEditMode ? "Task updated" : "Task created",
      description: `The task has been successfully ${isEditMode ? "updated" : "created"}.`,
    });
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {isEditMode ? "Edit Task" : "Create New Task"}
          </h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title"
                  required
                />
              </div>
              
              {isEditMode && (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="completed" 
                    checked={isCompleted} 
                    onCheckedChange={(checked) => setIsCompleted(checked === true)}
                  />
                  <Label htmlFor="completed">Mark as completed</Label>
                </div>
              )}
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate("/")}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditMode ? "Update Task" : "Create Task"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
