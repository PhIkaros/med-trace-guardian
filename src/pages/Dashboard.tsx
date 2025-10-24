import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Activity, AlertCircle, QrCode, Users, LogOut } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
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
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
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
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  const userRole = user?.user_metadata?.role || "patient";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-navy-base to-navy-darker">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">MedSupply Chain</h1>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Tableau de bord</h2>
          <p className="text-muted-foreground">
            Bienvenue sur votre espace {userRole}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border hover:border-primary/50 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Lots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Package className="w-8 h-8 text-primary" />
                <p className="text-3xl font-bold">124</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">En transit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Activity className="w-8 h-8 text-primary" />
                <p className="text-3xl font-bold">38</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Anomalies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <AlertCircle className="w-8 h-8 text-destructive" />
                <p className="text-3xl font-bold">3</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Vérifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <QrCode className="w-8 h-8 text-primary" />
                <p className="text-3xl font-bold">89</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>Accédez aux fonctionnalités principales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2 border-primary/30 hover:bg-primary/10"
                onClick={() => navigate("/verify")}
              >
                <QrCode className="w-6 h-6 text-primary" />
                <span>Scanner un QR code</span>
              </Button>
              {(userRole === "manufacturer" || userRole === "admin") && (
                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-2 border-primary/30 hover:bg-primary/10"
                >
                  <Package className="w-6 h-6 text-primary" />
                  <span>Créer un lot</span>
                </Button>
              )}
              {userRole === "admin" && (
                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-2 border-primary/30 hover:bg-primary/10"
                >
                  <Users className="w-6 h-6 text-primary" />
                  <span>Gérer les utilisateurs</span>
                </Button>
              )}
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2 border-primary/30 hover:bg-primary/10"
              >
                <Activity className="w-6 h-6 text-primary" />
                <span>Voir les anomalies</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
