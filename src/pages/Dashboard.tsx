import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Activity, AlertCircle, QrCode, Users, LogOut, Plus } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      
      setUser(session.user);
      
      // Fetch user role from database
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();
      
      if (roleError || !roleData) {
        toast.error("Erreur lors de la récupération du rôle");
        await supabase.auth.signOut();
        navigate("/auth");
        return;
      }
      
      setUserRole(roleData.role);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        // Fetch role again when auth state changes
        setTimeout(async () => {
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();
          
          if (roleData) {
            setUserRole(roleData.role);
          }
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: "Administrateur",
      manufacturer: "Fabricant",
      distributor: "Distributeur",
      pharmacy: "Pharmacie",
      patient: "Patient",
    };
    return labels[role] || role;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-light via-background to-secondary">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50 shadow-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-xl font-bold text-primary-foreground">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MedSupply Chain</h1>
              <p className="text-xs text-muted-foreground capitalize">{getRoleLabel(userRole)}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="gap-2 border-border hover:bg-accent hover:text-accent-foreground transition-all"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 animate-fade-up">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Tableau de bord</h2>
          <p className="text-muted-foreground">
            Bienvenue sur votre espace {getRoleLabel(userRole)}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border/50 hover:border-primary/50 transition-all shadow-card hover:shadow-elevated group animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Lots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">124</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50 hover:border-primary/50 transition-all shadow-card hover:shadow-elevated group animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">En transit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">38</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50 hover:border-destructive/50 transition-all shadow-card hover:shadow-elevated group animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Anomalies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-destructive/10 rounded-xl group-hover:bg-destructive/20 transition-colors">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <p className="text-3xl font-bold text-foreground">3</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50 hover:border-primary/50 transition-all shadow-card hover:shadow-elevated group animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Vérifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">89</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-card border-border/50 shadow-card animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle className="text-foreground">Actions rapides</CardTitle>
            <CardDescription>Accédez aux fonctionnalités principales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-28 flex flex-col gap-3 border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                onClick={() => navigate("/verify")}
              >
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
                <span className="font-medium">Scanner un QR code</span>
              </Button>
              
              {(userRole === "manufacturer" || userRole === "admin") && (
                <Button
                  variant="outline"
                  className="h-28 flex flex-col gap-3 border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-medium">Créer un lot</span>
                </Button>
              )}
              
              {userRole === "admin" && (
                <Button
                  variant="outline"
                  className="h-28 flex flex-col gap-3 border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-medium">Gérer les utilisateurs</span>
                </Button>
              )}
              
              <Button
                variant="outline"
                className="h-28 flex flex-col gap-3 border-border hover:border-destructive/50 hover:bg-destructive/5 transition-all group"
              >
                <div className="p-3 bg-destructive/10 rounded-xl group-hover:bg-destructive/20 transition-colors">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <span className="font-medium">Voir les anomalies</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
