-- Criar tabela de relatórios
CREATE TABLE public.relatorios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id UUID REFERENCES public.alunos(id) ON DELETE CASCADE,
  aluno_nome TEXT NOT NULL,
  data_sessao DATE NOT NULL,
  psicologo TEXT,
  resumo TEXT,
  status TEXT CHECK (status IN ('new','read')) DEFAULT 'new'
);

-- Index para buscas rápidas por aluno
CREATE INDEX idx_relatorios_aluno_id ON public.relatorios(aluno_id);

-- Política RLS básica (se quiser ativar depois)
ALTER TABLE public.relatorios ENABLE ROW LEVEL SECURITY;
