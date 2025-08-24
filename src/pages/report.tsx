import { useState } from "react";

const Report = () => {
  const [form, setForm] = useState({
    aluno_nome: "",
    aluno_email: "",
    escola_email: "",
    data_hora: "",
    link_sessao: "",
  });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<{ id?: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/session/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw json;
      setOk({ id: json.sessao_id });
      setForm({ aluno_nome: "", aluno_email: "", escola_email: "", data_hora: "", link_sessao: "" });
    } catch (err) {
      console.error(err);
      alert("Falha ao criar/enviar sessão.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "32px auto", padding: 16 }}>
      <h1>Agendar Sessão (EmoTeen)</h1>
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input
          required
          placeholder="Nome do aluno"
          value={form.aluno_nome}
          onChange={(e) => setForm((f) => ({ ...f, aluno_nome: e.target.value }))}
        />
        <input
          required
          type="email"
          placeholder="E-mail do aluno"
          value={form.aluno_email}
          onChange={(e) => setForm((f) => ({ ...f, aluno_email: e.target.value }))}
        />
        <input
          type="email"
          placeholder="E-mail da escola (para encaminhar relatório)"
          value={form.escola_email}
          onChange={(e) => setForm((f) => ({ ...f, escola_email: e.target.value }))}
        />
        <input
          required
          type="datetime-local"
          value={form.data_hora}
          onChange={(e) => setForm((f) => ({ ...f, data_hora: e.target.value }))}
        />
        <input
          required
          placeholder="Link da sessão (Meet/Zoom/WhatsApp)"
          value={form.link_sessao}
          onChange={(e) => setForm((f) => ({ ...f, link_sessao: e.target.value }))}
        />
        <button disabled={sending}>{sending ? "Enviando..." : "Agendar & Notificar"}</button>
      </form>
      {ok?.id && (
        <p style={{ marginTop: 12 }}>
          Sessão criada ✅ ID: <b>{ok.id}</b>
        </p>
      )}
    </div>
  );
};

export default Report;
