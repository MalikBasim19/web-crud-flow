
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      // Fetch the task from Supabase
      const fetchTask = async () => {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("id", id)
          .single();
        
        if (error) {
          toast({
            title: "Error fetching task",
            description: error.message,
            variant: "destructive"
          });
          navigate("/");
          return;
        }

        if (data) {
          setTitle(data.title);
          setIsCompleted(data.status === "completed");
        }
        setLoading(false);
      };

      fetchTask();
    }
  }, [id, isEditMode, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const status = isCompleted ? "completed" : "pending";
    
    try {
      if (isEditMode) {
        // Update task in Supabase
        const { error } = await supabase
          .from("tasks")
          .update({ 
            title, 
            status,
            updated_at: new Date().toISOString() 
          })
          .eq("id", id);
        
        if (error) throw error;
        
        toast({
          title: "Task updated",
          description: "The task has been successfully updated."
        });
      } else {
        // Create new task in Supabase
        const { error } = await supabase
          .from("tasks")
          .insert([{ 
            title, 
            status: "pending" 
          }]);
        
        if (error) throw error;
        
        toast({
          title: "Task created",
          description: "The task has been successfully created."
        });
      }
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: isEditMode ? "Failed to update task" : "Failed to create task",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
    }
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
                  disabled={loading}
                />
              </div>
              
              {isEditMode && (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="completed" 
                    checked={isCompleted} 
                    onCheckedChange={(checked) => setIsCompleted(checked === true)}
                    disabled={loading}
                  />
                  <Label htmlFor="completed">Mark as completed</Label>
                </div>
              )}
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/")}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
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
