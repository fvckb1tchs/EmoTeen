import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabase
      .from("relatorios")
      .select("*");

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar relatórios" });
  }
}
