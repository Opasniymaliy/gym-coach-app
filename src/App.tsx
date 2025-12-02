import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import Workout1 from "./pages/Workout1";
import Workout2 from "./pages/Workout2";
import Optional from "./pages/Optional";
import NotFound from "./pages/NotFound";
import { workout1Exercises, workout2Exercises, optionalExercises } from "@/data/exercises";

const queryClient = new QueryClient();

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (query: string) => {
    const searchLower = query.toLowerCase();
    
    // Search in all exercises
    const allExercises = [
      { exercises: workout1Exercises, path: "/workout-1" },
      { exercises: workout2Exercises, path: "/workout-2" },
      { exercises: optionalExercises, path: "/optional" },
    ];

    for (const { exercises, path } of allExercises) {
      const foundExercise = exercises.find((ex) =>
        ex.name.toLowerCase().includes(searchLower)
      );

      if (foundExercise) {
        // Navigate to the page
        navigate(path);
        
        // Wait for navigation and then scroll
        setTimeout(() => {
          const element = document.getElementById(foundExercise.id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
        
        return;
      }
    }
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Workout1 />} />
        <Route path="/workout-1" element={<Workout1 />} />
        <Route path="/workout-2" element={<Workout2 />} />
        <Route path="/optional" element={<Optional />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
