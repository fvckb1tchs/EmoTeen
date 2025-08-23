import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Brain, School } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"student" | "psychologist" | "school">("student");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // // TODO: Integrar autenticação com backend
    // // Endpoint: POST /api/auth/login
    // // Body: { email, password, userType }
    // // Redirect baseado no userType:
    // // - student -> /student/dashboard
    // // - psychologist -> /psychologist/dashboard  
    // // - school -> /school/dashboard
    console.log("Login attempt:", { email, password, userType });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/20 to-secondary/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">EmoTeen</CardTitle>
          <CardDescription>
            Plataforma de acompanhamento psicológico para adolescentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={userType} onValueChange={(value) => setUserType(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="student" className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                Aluno
              </TabsTrigger>
              <TabsTrigger value="psychologist" className="flex items-center gap-1">
                <Brain className="w-4 h-4" />
                Psicólogo
              </TabsTrigger>
              <TabsTrigger value="school" className="flex items-center gap-1">
                <School className="w-4 h-4" />
                Escola
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={userType} className="mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Entrar como {userType === "student" ? "Aluno" : userType === "psychologist" ? "Psicólogo" : "Escola"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logins;
