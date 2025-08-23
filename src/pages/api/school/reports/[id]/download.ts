import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { id } = req.query;

  try {
    // Busca o relatório pelo ID
    const { data, error } = await supabase
      .from("relatorios")
      .select("arquivo_path")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data || !data.arquivo_path) return res.status(404).json({ error: "Arquivo não encontrado" });

    // Gera URL temporário para download
    const { data: fileData, error: urlError } = supabase
      .storage
      .from("relatorios")
      .createSignedUrl(data.arquivo_path, 60); // URL válida por 60 segundos

    if (urlError) throw urlError;

    res.status(200).json({ downloadUrl: fileData.signedUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar link de download" });
  }
}
