// src/lib/resend.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_5Nx4ySV9_HHq4HFfEtZwsSz4KZwHqWmzh");

export async function sendEmail(to: string | string[], subject: string, html: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "EmoTeen <noreply@emoteen.com.br>", // precisa ter domínio verificado no Resend
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Erro ao enviar email:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Falha geral no envio:", err);
    return null;
  }
}
