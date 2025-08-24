import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FeedbackPage() {
  const router = useRouter();
  const { sid, r, ok } = router.query;
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(!!ok);

  async function send(resposta: "bem_melhor" | "igual" | "nada_bem") {
    if (!sid) { alert("Link inválido"); return; }
    setSending(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessao_id: sid, resposta }),
      });
      if (!res.ok) throw await res.json();
      setDone(true);
    } catch (e) {
      console.error(e);
      alert("Falha ao registrar feedback");
    } finally {
      setSending(false);
    }
  }

  useEffect(() => {
    if (r && ok) setDone(true);
  }, [r, ok]);

  if (done) {
    const label =
      r === "bem_melhor" ? "Bem melhor" :
      r === "igual" ? "Igual" :
      r === "nada_bem" ? "Nada bem" : "Enviado";
    return (
      <div style={{ maxWidth: 560, margin: "48px auto", padding: 16, textAlign: "center" }}>
        <h1>Obrigado pelo seu feedback 💙</h1>
        {r && <p>Sua resposta: <b>{label}</b></p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 560, margin: "48px auto", padding: 16, textAlign: "center" }}>
      <h1>Como você se sentiu após a sessão?</h1>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
        <button disabled={sending} onClick={() => send("bem_melhor")}>Bem melhor</button>
        <button disabled={sending} onClick={() => send("igual")}>Igual</button>
        <button disabled={sending} onClick={() => send("nada_bem")}>Nada bem</button>
      </div>
    </div>
  );
}
