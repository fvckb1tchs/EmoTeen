// src/pages/SchoolDashboard.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Student {
  id: string;
  nome: string;
  turma: string;
}

interface Report {
  id: string;
  aluno_id: string;
  conteudo: string;
  created_at: string;
}

export default function SchoolDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Buscar alunos
      const { data: alunos, error: alunosError } = await supabase
        .from("alunos")
        .select("*");

      if (alunosError) console.error("Erro ao buscar alunos:", alunosError);
      else setStudents(alunos || []);

      // Buscar relatórios
      const { data: relatorios, error: relatoriosError } = await supabase
        .from("relatorios")
        .select("*");

      if (relatoriosError) console.error("Erro ao buscar relatórios:", relatoriosError);
      else setReports(relatorios || []);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Carregando dados...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Painel da Escola</h1>

      <section>
        <h2>Alunos</h2>
        {students.length === 0 ? (
          <p>Nenhum aluno encontrado</p>
        ) : (
          <ul>
            {students.map((s) => (
              <li key={s.id}>
                {s.nome} — Turma: {s.turma}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Relatórios</h2>
        {reports.length === 0 ? (
          <p>Nenhum relatório encontrado</p>
        ) : (
          <ul>
            {reports.map((r) => (
              <li key={r.id}>
                Aluno ID: {r.aluno_id} — {r.conteudo} ({new Date(r.created_at).toLocaleDateString()})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
