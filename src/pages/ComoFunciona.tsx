import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import EmoTeenLogo from "@/components/EmoTeenLogo";
import { ArrowRight, Shield, Heart, Users, UserCheck, MessageSquare, Target, HeadphonesIcon } from "lucide-react";

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
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Dashboard Escola
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 py-12">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Alunos sofrem em silêncio — cada minuto de inação pesa
          </h2>
          <p className="text-xl text-red-700 font-semibold max-w-2xl mx-auto leading-relaxed">
            Ansiedade, depressão, estresse e isolamento são problemas invisíveis que corroem o rendimento e a segurança emocional. Ignorar é permitir que crises aconteçam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/login')}
              size="lg"
              className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90"
            >
              Iniciar Avaliação
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="text-lg px-8 py-6 h-auto"
            >
              Acesso Escolar
              <Shield className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="text-center border-0 shadow-lg bg-white/90 backdrop-blur-md">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500/30 to-red-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl font-bold text-red-700">Sinais de Alerta</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Detecte problemas antes que se tornem crises: cada aluno não monitorado é um risco silencioso para o futuro.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg bg-white/90 backdrop-blur-md">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500/30 to-red-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl font-bold text-red-700">Privacidade Segura</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cada dado é protegido com criptografia total. Silêncios são perigosos, mas informações expostas são inaceitáveis.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg bg-white/90 backdrop-blur-md">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500/30 to-red-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl font-bold text-red-700">Apoio Direcionado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Encaminhamento imediato para psicólogos especializados. Cada minuto sem ação aumenta o risco de danos permanentes.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How it works */}
        <div className="space-y-12 mt-16">
          <div className="text-center space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">Como Funciona</h3>
            <p className="text-lg text-red-700 font-semibold max-w-2xl mx-auto">
              Um processo rápido, seguro e decisivo. Ignorar é aceitar que alunos continuem sofrendo em silêncio.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Step 1 */}
            <Card className="group relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-red-100/20 to-red-200/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <UserCheck className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-red-300/40 rounded-full flex items-center justify-center mx-auto mt-3">
                      <span className="text-red-700 font-bold text-lg">1</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-red-700">Identificação Urgente</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Cada aluno acessa com código da escola, nome e série. Ignorar sinais agora significa crises futuras. Cada segundo conta.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="group relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-red-50/10 to-red-100/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-red-300/40 rounded-full flex items-center justify-center mx-auto mt-3">
                      <span className="text-red-700 font-bold text-lg">2</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-red-700">Triagem Emocional</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      35 perguntas científicas revelam sofrimento silencioso. Cada resposta ignorada é uma oportunidade perdida de intervir antes da crise.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="group relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-red-100/20 to-red-200/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-red-300/40 rounded-full flex items-center justify-center mx-auto mt-3">
                      <span className="text-red-700 font-bold text-lg">3</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-red-700">Resultado Alarmante</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Cada análise revela o nível real de sofrimento. Ignorar agora significa lidar com consequências irreversíveis depois.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="group relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-red-50/10 to-red-100/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <HeadphonesIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-red-300/40 rounded-full flex items-center justify-center mx-auto mt-3">
                      <span className="text-red-700 font-bold text-lg">4</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-red-700">Apoio Profissional Imediato</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      O sistema identifica alunos em risco e encaminha automaticamente para psicólogos especializados. Cada ação agora pode salvar vidas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center pt-12">
            <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-red-100/20 to-red-200/20 rounded-2xl border border-red-400/30">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-red-700">Sua escola não pode esperar</p>
                <p className="text-sm text-red-600">Cada minuto de inação pesa na saúde emocional dos alunos.</p>
              </div>
              <Button 
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white shadow-lg"
              >
                Implementar EmoTeen
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
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
