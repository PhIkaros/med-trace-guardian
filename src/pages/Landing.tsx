import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Package, Activity, Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-light via-background to-secondary">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50 shadow-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-xl font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-xl font-bold text-foreground">MedSupply Chain</span>
          </div>
          <Button 
            onClick={() => navigate("/auth")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all hover:shadow-elevated"
          >
            Se connecter
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <Shield className="w-4 h-4" />
            Traçabilité médicale sécurisée
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            La blockchain au service de la{" "}
            <span className="text-primary">santé publique</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Suivez chaque médicament de la fabrication au patient. 
            Garantissez l'authenticité et luttez contre la contrefaçon grâce à Hedera Hashgraph.
          </p>
          
          <div className="flex gap-4 justify-center pt-4">
            <Button 
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all hover:shadow-elevated text-lg px-8 h-12"
            >
              Commencer maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/verify")}
              className="border-border hover:bg-accent hover:text-accent-foreground text-lg px-8 h-12"
            >
              Vérifier un médicament
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Une solution complète de traçabilité
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Intégrez la blockchain Hedera pour une transparence totale de votre chaîne d'approvisionnement
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-card border-border/50 shadow-card hover:shadow-elevated transition-all group animate-fade-in">
            <CardContent className="pt-6">
              <div className="mb-4 p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-colors">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Sécurité maximale</h3>
              <p className="text-muted-foreground">
                Enregistrement immuable sur Hedera Hashgraph pour une traçabilité infalsifiable
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50 shadow-card hover:shadow-elevated transition-all group animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-6">
              <div className="mb-4 p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-colors">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Traçabilité complète</h3>
              <p className="text-muted-foreground">
                Suivez chaque lot de médicament depuis la production jusqu'au patient final
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50 shadow-card hover:shadow-elevated transition-all group animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="pt-6">
              <div className="mb-4 p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-colors">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Détection d'anomalies</h3>
              <p className="text-muted-foreground">
                Intelligence artificielle pour détecter automatiquement les incohérences dans la chaîne
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Pourquoi MedSupply Chain ?
              </h2>
              <div className="space-y-4">
                {[
                  "Authentification instantanée via QR code",
                  "Réduction des risques de contrefaçon",
                  "Conformité réglementaire automatique",
                  "Transparence totale pour tous les acteurs",
                  "Rapports et analytics en temps réel",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-1 bg-primary/20 rounded-full mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-foreground font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-elevated animate-fade-in">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-primary mb-2">99.9%</p>
                    <p className="text-muted-foreground">Taux de disponibilité</p>
                  </div>
                  <div className="text-center">
                    <p className="text-5xl font-bold text-primary mb-2">&lt;2s</p>
                    <p className="text-muted-foreground">Temps de vérification</p>
                  </div>
                  <div className="text-center">
                    <p className="text-5xl font-bold text-primary mb-2">0</p>
                    <p className="text-muted-foreground">Contrefaçons détectées</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-br from-primary to-primary/80 border-none shadow-elevated animate-fade-up">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Prêt à sécuriser votre chaîne d'approvisionnement ?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Rejoignez les acteurs de la santé qui font confiance à MedSupply Chain
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-background hover:bg-background/90 text-foreground shadow-elevated text-lg px-8 h-12"
            >
              Démarrer gratuitement
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">M</span>
              </div>
              <span className="font-semibold text-foreground">MedSupply Chain</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 MedSupply Chain. Propulsé par Hedera Hashgraph.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
