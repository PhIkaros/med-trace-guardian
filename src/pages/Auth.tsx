import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, Loader2 } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        // Check if user has a role assigned
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        if (roleError) {
          toast.error("Aucun rôle assigné. Contactez l'administrateur.");
          await supabase.auth.signOut();
          setLoading(false);
          return;
        }

        toast.success("Connexion réussie !");
        navigate("/dashboard");
      } else {
        if (!role) {
          toast.error("Veuillez sélectionner un rôle");
          setLoading(false);
          return;
        }

        // Sign up the user
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });
        
        if (error) throw error;
        
        if (data.user) {
          // Insert role into user_roles table
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert([{
              user_id: data.user.id,
              role: role as "admin" | "manufacturer" | "distributor" | "pharmacy" | "patient",
            }]);

          if (roleError) throw roleError;

          // Insert profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: email,
              full_name: fullName || null,
            });

          if (profileError) throw profileError;

          toast.success("Compte créé avec succès ! Connexion automatique...");
          
          // Auto login after signup
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInError) throw signInError;
          
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-light via-background to-secondary flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-elevated border-border/50 animate-fade-in">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-glow">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center font-bold">
            {isLogin ? "Connexion" : "Créer un compte"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? "Accédez à votre espace MedSupply Chain"
              : "Rejoignez la plateforme de traçabilité médicale"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Nom complet</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border-border"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="border-border"
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="border-border">
                    <SelectValue placeholder="Sélectionnez votre rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="manufacturer">Fabricant</SelectItem>
                    <SelectItem value="distributor">Distributeur</SelectItem>
                    <SelectItem value="pharmacy">Pharmacie</SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all hover:shadow-elevated"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Chargement...
                </>
              ) : (
                isLogin ? "Se connecter" : "Créer mon compte"
              )}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setRole("");
                setFullName("");
              }}
              className="text-sm text-primary hover:underline font-medium transition-colors"
            >
              {isLogin
                ? "Pas encore de compte ? Créer un compte"
                : "Déjà inscrit ? Se connecter"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
