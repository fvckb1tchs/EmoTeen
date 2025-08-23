import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Calendar, Users, FileText, TrendingUp, AlertTriangle } from "lucide-react";
import SessionReportModal from "@/components/psychologist/SessionReportModal";

interface Student {
  id: string;
  name: string;
  school: string;
  lastSession?: string;
  nextSession?: string;
  status: "active" | "concern" | "stable";
  totalSessions: number;
}

interface Session {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: "completed" | "scheduled" | "pending_report";
  reportSubmitted: boolean;
}

const PsychologistDashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    // // TODO: Buscar dados do backend
    // // Endpoint: GET /api/psychologist/students
    // // Endpoint: GET /api/psychologist/sessions  
    // // Headers: { Authorization: `Bearer ${token}` }
    
    // Mock data
    setStudents([
      {
        id: "1",
        name: "Ana Silva",
        school: "Escola Municipal João XXIII",
        lastSession: "2024-01-15",
        nextSession: "2024-01-22",
        status: "stable",
        totalSessions: 8
      },
      {
        id: "2",
        name: "Carlos Oliveira", 
        school: "Colégio Estadual Santos Dumont",
        lastSession: "2024-01-12",
        status: "concern",
        totalSessions: 12
      }
    ]);

    setSessions([
      {
        id: "1",
        studentId: "1", 
        studentName: "Ana Silva",
        date: "2024-01-15",
        status: "pending_report",
        reportSubmitted: false
      },
      {
        id: "2",
        studentId: "1",
        studentName: "Ana Silva", 
        date: "2024-01-22",
        status: "scheduled",
        reportSubmitted: false
      }
    ]);
  }, []);

  const handleReportSubmit = (sessionId: string, report: any) => {
    // // TODO: Enviar relatório para backend
    // // Endpoint: POST /api/psychologist/session-report
    // // Body: { sessionId, summary, observations, evolution, recommendations }
    console.log("Report submitted:", { sessionId, report });
    
    setSessions(prev =>
      prev.map(session =>
        session.id === sessionId
          ? { ...session, status: "completed", reportSubmitted: true }
          : session
      )
    );
    setShowReportModal(false);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "stable": return "bg-success text-success-foreground";
      case "concern": return "bg-warning text-warning-foreground"; 
      case "active": return "bg-primary text-primary-foreground";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "stable": return "Estável";
      case "concern": return "Atenção";
      case "active": return "Ativo";
      default: return "Não definido";
    }
  };

  const pendingReports = sessions.filter(s => s.status === "pending_report").length;
  const todaySessions = sessions.filter(s => s.date === new Date().toISOString().split('T')[0]).length;
  const concernStudents = students.filter(s => s.status === "concern").length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary" />
            Dashboard do Psicólogo
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie seus pacientes e sessões de acompanhamento
          </p>
        </header>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacientes Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">
                Em acompanhamento ativo
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessões Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todaySessions}</div>
              <p className="text-xs text-muted-foreground">
                Agendadas para hoje
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Relatórios Pendentes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{pendingReports}</div>
              <p className="text-xs text-muted-foreground">
                Aguardando relatório
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Casos de Atenção</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-danger">{concernStudents}</div>
              <p className="text-xs text-muted-foreground">
                Necessitam atenção especial
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sessões Pendentes */}
          <Card>
            <CardHeader>
              <CardTitle>Sessões Pendentes de Relatório</CardTitle>
              <CardDescription>
                Sessões concluídas que precisam de relatório
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessions.filter(s => s.status === "pending_report").map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{session.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        Sessão de {session.date}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedSession(session);
                        setShowReportModal(true);
                      }}
                    >
                      Criar Relatório
                    </Button>
                  </div>
                ))}
                {sessions.filter(s => s.status === "pending_report").length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    Todos os relatórios estão em dia!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Lista de Pacientes */}
          <Card>
            <CardHeader>
              <CardTitle>Meus Pacientes</CardTitle>
              <CardDescription>
                Estudantes em acompanhamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{student.name}</p>
                        <Badge className={getStatusColor(student.status)}>
                          {getStatusText(student.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {student.school}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {student.totalSessions} sessões realizadas
                      </p>
                      {student.nextSession && (
                        <p className="text-xs text-primary">
                          Próxima: {student.nextSession}
                        </p>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Próximas Sessões */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Agenda da Semana</CardTitle>
            <CardDescription>
              Suas próximas sessões agendadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessions.filter(s => s.status === "scheduled").map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div>
                      <p className="font-medium">{session.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.date} - Sessão de acompanhamento
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">Agendada</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <SessionReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        session={selectedSession}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
};

export default PsychologistDashboard;
