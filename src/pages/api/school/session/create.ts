import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";
import { resend, FROM_EMAIL, BASE_URL } from "@/src/lib/resend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });

  try {
    const { aluno_nome, aluno_email, escola_email, data_hora, link_sessao } = req.body || {};
    if (!aluno_nome || !aluno_email || !data_hora || !link_sessao) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    const { data: sessao, error } = await supabase
      .from("sessoes")
      .insert([{ aluno_nome, aluno_email, escola_email, data_hora, link_sessao }])
      .select()
      .single();

    if (error) throw error;

    const when = new Date(data_hora).toLocaleString();
    const feedbackURL = `${BASE_URL}/feedback?sid=${sessao.id}`;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [aluno_email],
      subject: `Sua sessão EmoTeen - ${when}`,
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,Arial">
          <h2>Sessão agendada 🎧</h2>
          <p>Olá, ${aluno_nome}! Sua sessão foi agendada.</p>
          <ul>
            <li><b>Data e hora:</b> ${when}</li>
            <li><b>Link:</b> <a href="${link_sessao}">${link_sessao}</a></li>
          </ul>
          <p>Após a sessão, você poderá avaliar aqui: <a href="${feedbackURL}">${feedbackURL}</a></p>
        </div>
      `,
    });

    // Confirmação para a inbox da EmoTeen
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [process.env.EMOTEEN_INBOX as string],
      subject: `Nova sessão agendada: ${aluno_nome} (${when})`,
      text: `Aluno: ${aluno_nome}\nEmail: ${aluno_email}\nEscola: ${escola_email || "-"}\nQuando: ${when}\nLink: ${link_sessao}\nSessão ID: ${sessao.id}`,
    });

    res.status(200).json({ success: true, sessao_id: sessao.id });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: "Falha ao criar sessão/enviar e-mail" });
  }
}
