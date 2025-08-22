import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import EmoTeenLogo from "@/components/EmoTeenLogo";
import { ArrowRight, Shield, BarChart3, Lock, AlertCircle, PieChart, HeadphonesIcon } from "lucide-react";

const ComoFunciona = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EmoTeenLogo size="md" />
            <h1 className="text-2xl font-bold text-foreground">EmoTeen</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Dashboard Escola
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Cada dia de inação pesa na vida dos seus alunos
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Ansiedade, estresse e sofrimento silencioso estão aumentando dentro das escolas. A EmoTeen é a ponte entre o problema e a solução, oferecendo suporte psicológico profissional antes que seja tarde demais.
              </p>
            </div>
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90 animate-pulse"
            >
              Não espere — inicie agora a avaliação e proteja seus alunos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Como Funciona */}
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">Como funciona</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Um processo simples e seguro para identificar e apoiar o bem-estar emocional dos alunos
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Passo 1 – Identificação Segura */}
              <Card className="group relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-green-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-800 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Lock className="w-8 h-8 text-white" />
                      </div>
                      <div className="w-8 h-8 bg-blue-800/20 rounded-full flex items-center justify-center mx-auto mt-3">
                        <span className="text-blue-800 font-bold text-lg">1</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold text-foreground">Identificação Segura</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        O aluno acessa com código da escola, nome e série. Totalmente seguro e confidencial — ninguém fora da escola terá acesso.
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        Cada dado protegido é uma vida emocional que você começa a salvar.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Código da escola</span>
                        <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Confidencial</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Passo 2 – Triagem Emocional */}
              <Card className="group relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-yellow-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <AlertCircle className="w-8 h-8 text-white" />
                      </div>
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mt-3">
                        <span className="text-yellow-500 font-bold text-lg">2</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold text-foreground">Triagem Emocional</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        35 perguntas baseadas em evidência científica identificam sinais de sofrimento emocional antes que se tornem crises.
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        Ignorar esses sinais pode custar o rendimento escolar e o bem-estar dos alunos.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium animate-pulse">Baixo</span>
                        <span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full font-medium animate-pulse">Médio</span>
                        <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium animate-pulse">Alto</span>
                      </div>
                      <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-gradient-to-r from-green-500 to-yellow-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Passo 3 – Resultado Personalizado */}
              <Card className="group relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-blue-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <PieChart className="w-8 h-8 text-white" />
                      </div>
                      <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mt-3">
                        <span className="text-green-600 font-bold text-lg">3</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold text-foreground">Resultado Personalizado</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Relatórios claros, objetivos e imediatos sobre o estado emocional de cada aluno.
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        Você não precisa adivinhar — agora é possível agir com precisão e rapidez.
                      </p>
                      <div className="w-32 h-32 mx-auto">
                        ```chartjs
                        {
                          type: "pie",
                          data: {
                            labels: ["Baixo Risco", "Risco Moderado", "Risco Alto"],
                            datasets: [{
                              data: [60, 30, 10],
                              backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
                              borderColor: ["#064E3B", "#B45309", "#991B1B"],
                              borderWidth: 1
                            }]
                          },
                          options: {
                            responsive: true,
                            plugins: {
                              legend: {
                                position: "bottom",
                                labels: {
                                  color: "#1F2937"
                                }
                              }
                            }
                          }
                        }
                        ```
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Passo 4 – Apoio Profissional */}
              <Card className="group relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-red-50 to-orange-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <HeadphonesIcon className="w-8 h-8 text-white" />
                      </div>
                      <div className="w-8 h-8 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mt-3">
                        <span className="text-red-600 font-bold text-lg">4</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold text-foreground">Apoio Profissional</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        A EmoTeen identifica quando um aluno precisa de psicólogo ou terapeuta e permite encaminhamento imediato.
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        Cada dia sem ação é mais um aluno sofrendo em silêncio.
                      </p>
                      <Button
                        onClick={() => navigate("/refer")}
                        className="bg-red-600 hover:bg-red-700 text-white animate-pulse"
                      >
                        Encaminhar Agora
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mensagem Final */}
            <div className="text-center pt-8">
              <div className="inline-flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-red-600/10 to-orange-600/10 rounded-2xl border border-red-600/20">
                <h3 className="text-3xl font-bold text-foreground">Não ignore o sofrimento dos seus alunos</h3>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  A EmoTeen transforma dados em ação. Cada minuto de inação aumenta o risco de problemas emocionais sérios. Com baixo esforço e alta eficácia, sua escola pode oferecer suporte real e imediato.
                </p>
                <Button
                  onClick={() => navigate("/schedule")}
                  size="lg"
                  className="text-lg px-8 py-6 h-auto bg-red-600 hover:bg-red-700 text-white animate-pulse"
                >
                  Agende agora a implementação da EmoTeen
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-lg font-semibold text-foreground">
                  Não espere — a hora de proteger seus alunos é hoje.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <EmoTeenLogo size="sm" />
            <span className="font-semibold text-foreground">EmoTeen</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Promovendo o bem-estar emocional de estudantes com tecnologia segura e cuidadosa.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ComoFunciona;
