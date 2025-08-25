import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Crie uma variável de ambiente SUPABASE_RESEND_API_KEY no seu projeto Supabase
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
const { data, error } = await supabase.functions.invoke('emoteen-session-notification', {
  body: { name: 'Functions' },
})

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AgendarSessaoRequest {
  alunoNome: string;
  escolaNome: string;
  resultado: "verde" | "amarelo" | "vermelho";
  pontuacao: number;
  dataEnvio: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { alunoNome, escolaNome, resultado, pontuacao, dataEnvio } = await req.json() as AgendarSessaoRequest;

    console.log("Agendando sessão para:", { alunoNome, escolaNome, resultado });

    const emailResponse = await resend.emails.send({
      from: "EmoTeen <onboarding@resend.dev>",
      to: ["emoteen-gerenciamento@outlook.com"],
      subject: `Solicitação de Sessão - ${alunoNome} (${escolaNome})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8B5CF6; text-align: center;">EmoTeen - Solicitação de Sessão</h1>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2>Informações do Aluno</h2>
            <p><strong>Nome:</strong> ${alunoNome}</p>
            <p><strong>Escola:</strong> ${escolaNome}</p>
            <p><strong>Data da Avaliação:</strong> ${new Date(dataEnvio).toLocaleDateString("pt-BR")}</p>
          </div>
          <div style="background-color: ${
            resultado === "vermelho" ? "#fee2e2" : resultado === "amarelo" ? "#fef3c7" : "#d1fae5"
          }; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2>Resultado da Avaliação</h2>
            <p><strong>Classificação:</strong> <span style="color: ${
              resultado === "vermelho" ? "#dc2626" : resultado === "amarelo" ? "#d97706" : "#059669"
            }; font-weight: bold;">${resultado.toUpperCase()}</span></p>
            <p><strong>Pontuação:</strong> ${pontuacao} pontos</p>
          </div>
          <div style="background-color: #e0e7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Próximos Passos</h3>
            <p>A escola solicitou o agendamento de uma sessão para este aluno. Entre em contato para coordenar o atendimento.</p>
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">Este e-mail foi enviado automaticamente pelo sistema EmoTeen</p>
          </div>
        </div>
      `,
    });

    console.log("Email enviado com sucesso:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Erro ao enviar e-mail:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
