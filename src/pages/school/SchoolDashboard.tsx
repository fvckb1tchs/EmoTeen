import { useState, useEffect, ChangeEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { School, Users, FileText, TrendingUp, AlertTriangle, Download, Upload, Eye } from "lucide-react";

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
  student_id: string;
  studentName: string;
  sessionDate: string;
  psychologist: string;
  summary: string;
  status: "new" | "read";
  file_path: string;
}

const SchoolDashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewURL, setPreviewURL] = useState<string>("");

  // Buscar alunos e relatórios
  const fetchData = async () => {
    const { data: studentsData } = await supabase.from("students").select("*");
    const { data: reportsData } = await supabase
      .from("reports")
      .select("*, students(name, class)")
      .order("session_date", { ascending: false });

    if (studentsData) setStudents(studentsData);
    if (reportsData) {
      setReports(
        reportsData.map(r => ({
          ...r,
          studentName: r.students?.name || "Desconhecido",
          sessionDate: r.session_date
        }))
      );
    }

    if (studentsData?.length > 0 && !selectedStudent) setSelectedStudent(studentsData[0].id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
      setPreviewURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (!uploadFile || !selectedStudent) return toast.error("Selecione aluno e arquivo.");

    setUploading(true);
    setUploadProgress(0);

    const timestamp = Date.now();
    const fileName = `${selectedStudent}_${timestamp}.pdf`;

    try {
      const { data, error } = await supabase.storage
        .from("relatorios")
        .upload(fileName, uploadFile, {
          cacheControl: "3600",
          upsert: true,
          onUploadProgress: (progressEvent: ProgressEvent) => {
            if (progressEvent.lengthComputable) {
              const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              setUploadProgress(percent);
            }
          }
        });

      if (error) throw error;

      const { error: dbError } = await supabase.from("reports").insert([{
        student_id: selectedStudent,
        session_date: new Date().toISOString().split("T")[0],
        psychologist: "Dra. Responsável",
        summary: "Relatório enviado manualmente.",
        status: "new",
        file_path: data.path
      }]);
      if (dbError) throw dbError;

      toast.success("Relatório enviado com sucesso!");
      setUploadFile(null);
      setPreviewURL("");
      setUploadProgress(0);
      fetchData();
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao enviar o relatório.");
    } finally {
      setUploading(false);
    }
  };

  // Download de relatório
  const handleDownloadReport = async (report: Report) => {
    const { data, error } = await supabase.storage.from("relatorios").download(report.file_path);
    if (error) return toast.error("Erro ao baixar relatório.");

    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.studentName}_${report.sessionDate}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Marcar relatório como lido
  const handleMarkAsRead = async (reportId: string) => {
    const { error } = await supabase.from("reports").update({ status: "read" }).eq("id", reportId);
    if (error) return toast.error("Erro ao marcar como lido.");

    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: "read" } : r));
    toast.success("Relatório marcado como lido!");
  };

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

  const classes = [...new Set(students.map(s => s.class))];
  const filteredStudents = selectedClass === "all" ? students : students.filter(s => s.class === selectedClass);
  const activeStudents = students.filter(s => s.status !== "inactive").length;
  const concernStudents = students.filter(s => s.status === "concern").length;
  const newReports = reports.filter(r => r.status === "new").length;
  const totalSessions = students.reduce((acc, s) => acc + s.totalSessions, 0);

  return (
    <div className="min-h-screen bg-background p-6">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <School className="w-8 h-8 text-primary" />
            Dashboard da Escola
          </h1>
          <p className="text-muted-foreground mt-2">Acompanhe o bem-estar dos seus alunos</p>
        </header>

        {/* Cards */}
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

        {/* Upload */}
        <Card className="max-w-md mx-auto mb-6">
          <CardHeader>
            <CardTitle>Enviar Relatório</CardTitle>
            <CardDescription>Selecione aluno e arquivo PDF</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <select className="w-full p-2 border rounded" value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
              {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.class})</option>)}
            </select>

            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            {previewURL && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Eye className="w-4 h-4" /> Preview do arquivo selecionado
              </div>
            )}

            {uploading && <Progress value={uploadProgress} className="h-2" />}

            <Button onClick={handleUpload} disabled={uploading || !uploadFile}>
              <Upload className="w-4 h-4 mr-1" /> {uploading ? `Enviando ${uploadProgress}%` : "Enviar Relatório"}
            </Button>
          </CardContent>
        </Card>

        {/* Relatórios e alunos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Relatórios Recentes</CardTitle>
              <CardDescription>Últimos relatórios enviados pelos psicólogos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reports.map(r => (
                <div key={r.id} className={`p-4 border rounded-lg ${r.status === "new" ? "border-primary bg-primary/5" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium">{r.studentName}</p>
                        {r.status === "new" && <Badge className="bg-primary text-primary-foreground">Novo</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{r.psychologist} • {r.sessionDate}</p>
                      <p className="text-sm line-clamp-2">{r.summary}</p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleDownloadReport(r)}>
                        <Download className="w-4 h-4 mr-1" /> Download
                      </Button>
                      {r.status === "new" && <Button size="sm" onClick={() => handleMarkAsRead(r.id)}>Marcar como Lido</Button>}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

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
                {filteredStudents.map(s => (
                  <div key={s.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{s.name}</p>
                      <Badge className={getStatusColor(s.status)}>{getStatusText(s.status)}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{s.class} • {s.psychologist}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>{s.totalSessions} sessões</span>
                      <span className="text-muted-foreground">{s.latestFeedback || ""}</span>
                    </div>
                    {s.lastSession && <p className="text-xs text-muted-foreground">Última: {s.lastSession}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;
