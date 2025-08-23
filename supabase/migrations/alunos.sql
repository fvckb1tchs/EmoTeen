-- Criar tabela de alunos
CREATE TABLE public.alunos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  turma TEXT NOT NULL,
  psicologo TEXT,
  status TEXT CHECK (status IN ('active','concern','stable','inactive')) DEFAULT 'active',
  total_sessoes INT DEFAULT 0,
  ultima_sessao DATE,
  ultimo_feedback TEXT CHECK (ultimo_feedback IN ('bem_melhor','mais_ou_menos','nada_bem'))
);

-- Index para buscar alunos por turma
CREATE INDEX idx_alunos_turma ON public.alunos(turma);

-- Política RLS básica (se quiser ativar depois)
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;
