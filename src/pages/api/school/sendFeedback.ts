import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/resend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { studentName, feedback } = req.body;

  if (!studentName || !feedback) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  const subject = `📝 Feedback de sessão - ${studentName}`;
  const html = `
    <h2>Feedback do Aluno</h2>
    <p><strong>Aluno:</strong> ${studentName}</p>
    <p><strong>Avaliação:</strong> ${feedback}</p>
    <br/>
    <small>Enviado automaticamente via EmoTeen</small>
  `;

  // Sempre cai na caixa da EmoTeen (e não direto na escola)
  const result = await sendEmail("emoteen-contato@outlook.com.br", subject, html);

  if (!result) return res.status(500).json({ error: "Erro ao enviar feedback" });
  return res.status(200).json({ success: true, result });
}
