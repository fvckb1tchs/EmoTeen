import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Logins from "./pages/Logins";
import StudentDashboard from "./pages/StudentDashboard";
import PsychologistDashboard from "./pages/PsychologistDashboard";
import SchoolDashboard from "./pages/SchoolDashboard";
import ConsentimentoResponsavel from "./pages/ConsentimentoResponsavel";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";
// Removida a importação de ComoFunciona

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logins" element={<Logins />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/psychologist-dashboard" element={<PsychologistDashboard />} />
          <Route path="/school-dashboard" element={<SchoolDashboard />} />
          <Route path="/consentimento" element={<ConsentimentoResponsavel />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos-de-uso" element={<TermosUso />} />
          {/* Removida a rota para ComoFunciona */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
