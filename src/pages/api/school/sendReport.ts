import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/resend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { schoolEmail, studentName, reportContent } = req.body;

  if (!schoolEmail || !reportContent) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  const subject = `📑 Relatório de sessão - ${studentName}`;
  const html = `
    <h2>Relatório de Sessão</h2>
    <p><strong>Aluno:</strong> ${studentName}</p>
    <p>${reportContent}</p>
    <br/>
    <small>Enviado automaticamente via EmoTeen</small>
  `;

  const result = await sendEmail(schoolEmail, subject, html);

  if (!result) return res.status(500).json({ error: "Erro ao enviar relatório" });
  return res.status(200).json({ success: true, result });
}
