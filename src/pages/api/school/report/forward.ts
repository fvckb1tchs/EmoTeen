import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";
import { resend, FROM_EMAIL } from "@/src/lib/resend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });

  try {
    const { relatorio_id } = req.body || {};
    if (!relatorio_id) return res.status(400).json({ error: "relatorio_id é obrigatório" });

    const { data: rel, error: rErr } = await supabase
      .from("relatorios").select("*").eq("id", relatorio_id).single();
    if (rErr || !rel) throw rErr || new Error("Relatório não encontrado");

    const { data: sessao, error: sErr } = await supabase
      .from("sessoes").select("*").eq("id", rel.sessao_id).single();
    if (sErr || !sessao) throw sErr || new Error("Sessão não encontrada");

    if (!sessao.escola_email) {
      return res.status(400).json({ error: "Sessão não possui escola_email para encaminhar" });
    }

    const when = new Date(sessao.data_hora).toLocaleString();

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [sessao.escola_email],
      subject: `Relatório de sessão - ${sessao.aluno_nome} (${when})`,
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,Arial">
          <h2>Relatório de Sessão (Encaminhado pela EmoTeen)</h2>
          <p><b>Aluno:</b> ${sessao.aluno_nome}</p>
          <p><b>Psicólogo(a):</b> ${rel.psicologo_nome}</p>
          <p><b>Data/Hora:</b> ${when}</p>
          <hr/>
          <pre style="white-space:pre-wrap;font:inherit">${rel.relatorio}</pre>
        </div>
      `,
    });

    await supabase
      .from("relatorios")
      .update({
        enviado_para: "escola",
        encaminhado_email: sessao.escola_email,
        encaminhado_em: new Date().toISOString(),
      })
      .eq("id", relatorio_id);

    res.status(200).json({ success: true });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: "Falha ao encaminhar relatório" });
  }
}
