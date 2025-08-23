import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, TrendingUp, MessageCircle, Clock } from "lucide-react";
import StudentFeedbackModal from "@/components/student/StudentFeedbackModal";

interface Session {
  id: string;
  date: string;
  psychologist: string;
  status: "completed" | "pending" | "scheduled";
  feedbackGiven: boolean;
}

interface EmotionalData {
  date: string;
  mood: "bem_melhor" | "mais_ou_menos" | "nada_bem";
}

const StudentDashboard = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [emotionalProgress, setEmotionalProgress] = useState<EmotionalData[]>([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    // // TODO: Buscar dados do backend
    // // Endpoint: GET /api/student/sessions
    // // Endpoint: GET /api/student/emotional-data
    // // Headers: { Authorization: `Bearer ${token}` }
    
    // Mock data
    setSessions([
      {
        id: "1",
        date: "2024-01-15",
        psychologist: "Dra. Maria Silva",
        status: "completed",
        feedbackGiven: false
      },
      {
        id: "2", 
        date: "2024-01-22",
        psychologist: "Dra. Maria Silva",
        status: "scheduled",
        feedbackGiven: false
      }
    ]);

    setEmotionalProgress([
      { date: "2024-01-01", mood: "mais_ou_menos" },
      { date: "2024-01-08", mood: "bem_melhor" },
      { date: "2024-01-15", mood: "bem_melhor" }
    ]);
  }, []);

  const handleFeedbackSubmit = (sessionId: string, feedback: any) => {
    // // TODO: Enviar feedback para backend
    // // Endpoint: POST /api/student/feedback
    // // Body: { sessionId, mood, comment }
    console.log("Feedback submitted:", { sessionId, feedback });
    
    setSessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? { ...session, feedbackGiven: true }
          : session
      )
    );
    setShowFeedbackModal(false);
  };

  const getMoodColor = (mood: string) => {
    switch(mood) {
      case "bem_melhor": return "bg-success";
      case "mais_ou_menos": return "bg-warning";
      case "nada_bem": return "bg-danger";
      default: return "bg-muted";
    }
  };

  const getMoodText = (mood: string) => {
    switch(mood) {
      case "bem_melhor": return "Bem melhor";
      case "mais_ou_menos": return "Mais ou menos";
      case "nada_bem": return "Nada bem";
      default: return "Não informado";
    }
  };

  const completedSessions = sessions.filter(s => s.status === "completed").length;
  const totalSessions = sessions.length;
  const progressPercent = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Heart className="w-8 h-8 text-primary" />
            Meu Acompanhamento
          </h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe seu progresso e sessões de apoio psicológico
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Próxima Sessão */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Próxima Sessão
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sessions.find(s => s.status === "scheduled") ? (
                <div>
                  <p className="font-medium">
                    {sessions.find(s => s.status === "scheduled")?.date}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {sessions.find(s => s.status === "scheduled")?.psychologist}
                  </p>
                  <Badge className="mt-2 bg-primary-light text-primary-dark">
                    Agendada
                  </Badge>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Nenhuma sessão agendada
                </p>
              )}
            </CardContent>
          </Card>

          {/* Progresso Geral */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Progresso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sessões concluídas</span>
                  <span>{completedSessions}/{totalSessions}</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Continue participando das sessões!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Estado Emocional */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-warning" />
                Feedback Pendente
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sessions.filter(s => s.status === "completed" && !s.feedbackGiven).length > 0 ? (
                <div>
                  <p className="text-sm mb-3">
                    Você tem {sessions.filter(s => s.status === "completed" && !s.feedbackGiven).length} feedback(s) pendente(s)
                  </p>
                  <Button 
                    size="sm" 
                    onClick={() => {
                      const pendingSession = sessions.find(s => s.status === "completed" && !s.feedbackGiven);
                      if (pendingSession) {
                        setSelectedSession(pendingSession);
                        setShowFeedbackModal(true);
                      }
                    }}
                  >
                    Dar Feedback
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Todos os feedbacks foram enviados!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Histórico de Sessões */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Sessões</CardTitle>
            <CardDescription>
              Suas sessões de acompanhamento psicológico
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div>
                      <p className="font-medium">{session.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.psychologist}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={session.status === "completed" ? "default" : "secondary"}
                    >
                      {session.status === "completed" ? "Concluída" : 
                       session.status === "scheduled" ? "Agendada" : "Pendente"}
                    </Badge>
                    {session.status === "completed" && !session.feedbackGiven && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedSession(session);
                          setShowFeedbackModal(true);
                        }}
                      >
                        Dar Feedback
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Evolução Emocional */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Minha Evolução Emocional</CardTitle>
            <CardDescription>
              Seu progresso emocional ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emotionalProgress.map((entry, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className={`w-4 h-4 rounded-full ${getMoodColor(entry.mood)}`}></div>
                  <div className="flex-1">
                    <p className="font-medium">{entry.date}</p>
                    <p className="text-sm text-muted-foreground">
                      Como me senti: {getMoodText(entry.mood)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <StudentFeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        session={selectedSession}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};

export default StudentDashboard;
