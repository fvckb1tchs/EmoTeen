import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";
import { resend, FROM_EMAIL, EMOTEEN_INBOX, AUTO_FORWARD } from "@/src/lib/resend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });

  try {
    const { sessao_id, psicologo_nome, relatorio } = req.body || {};
    if (!sessao_id || !psicologo_nome || !relatorio) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    const { data: sessao, error: sErr } = await supabase
      .from("sessoes").select("*").eq("id", sessao_id).single();
    if (sErr || !sessao) throw sErr || new Error("Sessão não encontrada");

    // 1) grava relatório marcando destino lógico = emoteen
    const { data: novoRel, error: rErr } = await supabase
      .from("relatorios")
      .insert([{ sessao_id, psicologo_nome, relatorio, enviado_para: "emoteen" }])
      .select()
      .single();
    if (rErr) throw rErr;

    // 2) envia e-mail para inbox da EmoTeen
    const when = new Date(sessao.data_hora).toLocaleString();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [EMOTEEN_INBOX],
      subject: `Relatório recebido - ${sessao.aluno_nome} (${when})`,
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,Arial">
          <h2>Relatório de Sessão</h2>
          <p><b>Aluno:</b> ${sessao.aluno_nome}</p>
          <p><b>Psicólogo(a):</b> ${psicologo_nome}</p>
          <p><b>Data/Hora:</b> ${when}</p>
          <hr/>
          <pre style="white-space:pre-wrap;font:inherit">${relatorio}</pre>
        </div>
      `,
    });

    // 3) opcional: auto-encaminhar para escola (se configurado)
    if (AUTO_FORWARD && sessao.escola_email) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [sessao.escola_email],
        subject: `Relatório de sessão - ${sessao.aluno_nome} (${when})`,
        html: `
          <div style="font-family:system-ui,Segoe UI,Roboto,Arial">
            <h2>Relatório de Sessão (Encaminhado pela EmoTeen)</h2>
            <p><b>Aluno:</b> ${sessao.aluno_nome}</p>
            <p><b>Psicólogo(a):</b> ${psicologo_nome}</p>
            <p><b>Data/Hora:</b> ${when}</p>
            <hr/>
            <pre style="white-space:pre-wrap;font:inherit">${relatorio}</pre>
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
        .eq("id", novoRel.id);
    }

    // marca sessão como realizada
    await supabase.from("sessoes").update({ status: "realizada" }).eq("id", sessao_id);

    res.status(200).json({ success: true, relatorio_id: novoRel.id });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: "Falha ao registrar/enviar relatório" });
  }
}
