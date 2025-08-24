import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Report = () => {
  const [form, setForm] = useState({
    schoolEmail: "",
    studentName: "",
    reportContent: "",
  });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<boolean>(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw json;
      setOk(true);
      setForm({ schoolEmail: "", studentName: "", reportContent: "" });
    } catch (err) {
      console.error(err);
      alert("Falha ao enviar relatório.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enviar Relatório (EmoTeen)</h1>
      <form onSubmit={submit} className="space-y-4">
        <Input
          required
          type="email"
          placeholder="E-mail da escola"
          value={form.schoolEmail}
          onChange={(e) => setForm((f) => ({ ...f, schoolEmail: e.target.value }))}
        />
        <Input
          required
          placeholder="Nome do aluno"
          value={form.studentName}
          onChange={(e) => setForm((f) => ({ ...f, studentName: e.target.value }))}
        />
        <Textarea
          required
          placeholder="Conteúdo do relatório"
          value={form.reportContent}
          onChange={(e) => setForm((f) => ({ ...f, reportContent: e.target.value }))}
          className="min-h-[150px]"
        />
        <Button disabled={sending} type="submit">
          {sending ? "Enviando..." : "Enviar Relatório"}
        </Button>
      </form>
      {ok && (
        <p className="mt-4 text-green-600">
          Relatório enviado com sucesso ✅
        </p>
      )}
    </div>
  );
};

export default Report;
