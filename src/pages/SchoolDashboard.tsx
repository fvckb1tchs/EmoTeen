import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { School, Users, FileText, TrendingUp, AlertTriangle, Download } from "lucide-react";

interface Student {
  id: string;
  name: string;
  class: string;
  psychologist: string;
  status: "active" | "concern" | "stable" | "inactive";
  totalSessions: number;
  lastSession?: string;
  latestFeedback?: "bem_melhor" | "mais_ou_menos" | "nada_bem";
}

interface Report {
  id: string;
  studentId: string;
  studentName: string;
  sessionDate: string;
  psychologist: string;
  summary: string;
  status: "new" | "read";
  filePath?: string;
}

const SchoolDashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [downloadingReportId, setDownloadingReportId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Alunos
        const { data: studentsData, error: studentsError } = await supabase
          .from("alunos")
          .select("*");
        if (studentsError) throw studentsError;

        const formattedStudents: Student[] = studentsData.map((s: any) => ({
          id: s.id,
          name: s.nome,
          class: s.serie,
          psychologist: s.psicologo,
          status: s.status,
          totalSessions: s.total_sessoes,
          lastSession: s.ultima_sessao,
          latestFeedback: s.feedback,
        }));
        setStudents(formattedStudents);

        // Relatórios
        const { data: reportsData, error: reportsError } = await supabase
          .from("relatorios")
          .select("*");
        if (reportsError) throw reportsError;

        const formattedReports: Report[] = reportsData.map((r: any) => ({
          id: r.id,
          studentId: r.aluno_id,
          studentName: r.aluno_nome,
          sessionDate: r.data_sessao,
          psychologist: r.psicologo,
          summary: r.resumo,
          status: r.status,
          filePath: r.arquivo_path
        }));
        setReports(formattedReports);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMarkAsRead = async (reportId: string) => {
    // Atualiza no Supabase
    const { error } = await supabase
      .from("relatorios")
      .update({ status: "read" })
      .eq("id", reportId);
    if (error) {
      console.error("Erro ao marcar relatório como lido:", error);
      return;
    }

    // Atualiza localmente em tempo real
    setReports(prev =>
      prev.map(r => r.id === reportId ? { ...r, status: "read" } : r)
    );
  };

  const handleDownloadReport = async (filePath?: string, reportId?: string) => {
    if (!filePath) return;
    setDownloadingReportId(reportId || null);
    try {
      const { data, error } = await supabase.storage.from("relatorios").download(filePath);
      if (error) throw error;

      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = filePath.split("/").pop() || "relatorio.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar arquivo:", error);
    } finally {
      setDownloadingReportId(null);
    }
  };

  // Utils para UI
  const getStatusColor = (status: string) => {
    switch(status) {
      case "stable": return "bg-success text-success-foreground";
      case "concern": return "bg-danger text-danger-foreground";
      case "active": return "bg-primary text-primary-foreground"; 
      case "inactive": return "bg-muted text-muted-foreground";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "stable": return "Estável";
      case "concern": return "Atenção";
      case "active": return "Ativo";
      case "inactive": return "Inativo";
      default: return "Indefinido";
    }
  };

  const getFeedbackColor = (feedback?: string) => {
    switch(feedback) {
      case "bem_melhor": return "text-success";
      case "mais_ou_menos": return "text-warning";
      case "nada_bem": return "text-danger";
      default: return "text-muted-foreground";
    }
  };

  const getFeedbackText = (feedback?: string) => {
    switch(feedback) {
      case "bem_melhor": return "Bem melhor";
      case "mais_ou_menos": return "Mais ou menos";
      case "nada_bem": return "Nada bem";
      default: return "Sem feedback";
    }
  };

  const classes = [...new Set(students.map(s => s.class))];
  const filteredStudents = selectedClass === "all" 
    ? students 
    : students.filter(s => s.class === selectedClass);

  const activeStudents = students.filter(s => s.status !== "inactive").length;
  const concernStudents = students.filter(s => s.status === "concern").length;
  const newReports = reports.filter(r => r.status === "new").length;
  const totalSessions = students.reduce((acc, s) => acc + s.totalSessions, 0);

  if (loading) return <p>Carregando dashboard...</p>;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <School className="w-8 h-8 text-primary" />
            Dashboard da Escola
          </h1>
          <p className="text-muted-foreground mt-2">Acompanhe o bem-estar dos seus alunos</p>
        </header>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alunos em Acompanhamento</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeStudents}</div>
              <p className="text-xs text-muted-foreground">De {students.length} alunos cadastrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Casos de Atenção</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-danger">{concernStudents}</div>
              <p className="text-xs text-muted-foreground">Necessitam atenção especial</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos Relatórios</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{newReports}</div>
              <p className="text-xs text-muted-foreground">Aguardando revisão</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Sessões</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSessions}</div>
              <p className="text-xs text-muted-foreground">Sessões realizadas</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Relatórios Recentes */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Relatórios Recentes</CardTitle>
              <CardDescription>Últimos relatórios enviados pelos psicólogos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map(report => (
                  <div key={report.id} className={`p-4 border rounded-lg ${report.status === "new" ? "border-primary bg-primary/5" : ""}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium">{report.studentName}</p>
                          {report.status === "new" && <Badge className="bg-primary text-primary-foreground">Novo</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.psychologist} • {report.sessionDate}</p>
                        <p className="text-sm line-clamp-2">{report.summary}</p>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadReport(report.filePath, report.id)}
                          disabled={downloadingReportId === report.id}
                        >
                          {downloadingReportId === report.id ? "Baixando..." : <><Download className="w-4 h-4 mr-1" /> Download</>}
                        </Button>
                        {report.status === "new" && (
                          <Button size="sm" onClick={() => handleMarkAsRead(report.id)}>Marcar como Lido</Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lista de Alunos */}
          <Card>
            <CardHeader>
              <CardTitle>Alunos por Turma</CardTitle>
              <CardDescription>
                <select className="mt-2 p-2 border rounded" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                  <option value="all">Todas as turmas</option>
                  {classes.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                </select>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredStudents.map(student => (
                  <div key={student.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{student.name}</p>
                      <Badge className={getStatusColor(student.status)}>{getStatusText(student.status)}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{student.class} • {student.psychologist}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>{student.totalSessions} sessões</span>
                      <span className={getFeedbackColor(student.latestFeedback)}>{getFeedbackText(student.latestFeedback)}</span>
                    </div>
                    {student.lastSession && <p className="text-xs text-muted-foreground">Última: {student.lastSession}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas por Turma */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Estatísticas por Turma</CardTitle>
            <CardDescription>Visão geral do acompanhamento por turma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes.map(cls => {
                const classStudents = students.filter(s => s.class === cls);
                const activeCount = classStudents.filter(s => s.status !== "inactive").length;
                const concernCount = classStudents.filter(s => s.status === "concern").length;
                const percentage = classStudents.length > 0 ? (activeCount / classStudents.length) * 100 : 0;

                return (
                  <div key={cls} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{cls}</h3>
                      <span className="text-sm text-muted-foreground">{activeCount}/{classStudents.length}</span>
                    </div>
                    <Progress value={percentage} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Em acompanhamento: {activeCount}</span>
                      {concernCount > 0 && <span className="text-danger">Atenção: {concernCount}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchoolDashboard;
