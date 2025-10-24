import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, QrCode, Activity, CheckCircle } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-navy-base to-navy-darker text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-xl font-bold">MedSupply Chain</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#mission" className="hover:text-primary transition-colors">Mission</a>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#impact" className="hover:text-primary transition-colors">Impact</a>
          </div>
          <Link to="/auth">
            <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Se connecter
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                  Expert Pharmaceutique Certifié
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Sécurité et <span className="text-primary">Traçabilité</span> des Médicaments
              </h1>
              <p className="text-lg text-muted-foreground">
                Garantir l'authenticité de chaque médicament grâce à une traçabilité complète et infalsifiable, 
                de la production à la distribution.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/auth">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all">
                    Découvrir l'expertise →
                  </Button>
                </Link>
                <Link to="/verify">
                  <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                    Voir la démo
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 pt-6">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Traçabilité de bout en bout</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Protection contre la contrefaçon</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Conformité réglementaire totale</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center animate-scale-in">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center animate-glow">
                  <div className="w-48 h-48 bg-primary rounded-2xl flex items-center justify-center">
                    <Shield className="w-32 h-32 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-card border-2 border-primary rounded-2xl px-6 py-3">
                  <p className="text-sm font-semibold text-primary">100% Sécurisé</p>
                  <p className="text-xs text-muted-foreground">Technologie blockchain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 px-6 bg-gradient-to-b from-transparent to-card/30">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Une Mission Essentielle</h2>
            <p className="text-lg text-muted-foreground">
              Protéger les patients en garantissant l'intégrité de la chaîne d'approvisionnement pharmaceutique mondiale
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Notre Mission</h3>
              <p className="text-muted-foreground">
                Assurer la traçabilité complète et infalsifiable des médicaments, de leur fabrication jusqu'à leur délivrance au patient.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Notre Engagement</h3>
              <p className="text-muted-foreground">
                Lutter efficacement contre la contrefaçon pharmaceutique et protéger la santé publique.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Notre Approche</h3>
              <p className="text-muted-foreground">
                Détecter et résoudre les anomalies logistiques en temps réel grâce à des technologies de pointe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Services</h2>
            <p className="text-lg text-muted-foreground">
              MedSupply Chain combine blockchain, IA et design intuitif pour une protection maximale
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Blockchain Hedera</h3>
              <p className="text-muted-foreground mb-4">
                Enregistrement immuable de chaque transaction sur un réseau décentralisé haute performance
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Données impossibles à modifier</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Consensus rapide</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Faible coût énergétique</span>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Intelligence Artificielle</h3>
              <p className="text-muted-foreground mb-4">
                Détection automatique des anomalies dans la chaîne d'approvisionnement
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Analyse en temps réel</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Prédiction des risques</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Alertes automatiques</span>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Traçabilité instantanée</h3>
              <p className="text-muted-foreground mb-4">
                Vérification en quelques secondes via QR code ou numéro de lot
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Scan mobile</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Résultats immédiats</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Historique complet</span>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Sécurité maximale</h3>
              <p className="text-muted-foreground mb-4">
                Protection multi-niveaux contre les contrefaçons et fraudes
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Cryptographie avancée</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Authentification multi-facteurs</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Audit permanent</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="impact" className="py-20 px-6 bg-gradient-to-t from-card/30 to-transparent">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl p-12 border border-primary/30 text-center">
            <h2 className="text-4xl font-bold mb-4">Prêt à sécuriser votre chaîne d'approvisionnement ?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Rejoignez les professionnels de santé qui font confiance à MedSupply Chain pour protéger leurs patients
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all">
                Essayer maintenant →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 MedSupply Chain. Tous droits réservés.</p>
          <p className="text-sm mt-2">Sécuriser la santé, un médicament à la fois.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
