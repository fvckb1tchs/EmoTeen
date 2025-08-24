import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";
import { resend, FROM_EMAIL, EMOTEEN_INBOX } from "@/src/lib/resend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!["GET","POST"].includes(req.method || "")) {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const sid = (req.method === "GET" ? req.query.sid : req.body.sessao_id) as string;
    const r = (req.method === "GET" ? req.query.r : req.body.resposta) as string;
    if (!sid || !r) return res.status(400).json({ error: "Parâmetros ausentes" });
    if (!["bem_melhor","igual","nada_bem"].includes(r)) {
      return res.status(400).json({ error: "Resposta inválida" });
    }

    const { data: sessao, error: sErr } = await supabase
      .from("sessoes").select("*").eq("id", sid).single();
    if (sErr || !sessao) throw sErr || new Error("Sessão não encontrada");

    await supabase.from("feedbacks").insert([{ sessao_id: sid, resposta: r }]);

    // avisa a inbox EmoTeen
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [EMOTEEN_INBOX],
      subject: `Feedback do aluno - ${sessao.aluno_nome}`,
      text: `Sessão: ${sid}\nAluno: ${sessao.aluno_nome}\nResposta: ${r}`,
    });

    if (req.method === "GET") {
      res.writeHead(302, { Location: `/feedback?ok=1&r=${r}` });
      return res.end();
    }

    res.status(200).json({ success: true });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: "Falha ao registrar feedback" });
  }
}
