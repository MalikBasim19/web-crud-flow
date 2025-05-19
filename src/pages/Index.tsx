
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TaskList from "@/components/TaskList";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <Button onClick={() => navigate("/tasks/new")} className="flex items-center gap-2">
            <Plus size={18} />
            New Task
          </Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Index;
