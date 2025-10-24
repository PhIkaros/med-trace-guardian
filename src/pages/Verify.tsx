import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, CheckCircle, MapPin, Calendar, Package } from "lucide-react";
import { Link } from "react-router-dom";

const Verify = () => {
  const [batchId, setBatchId] = useState("");
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    // Simulation de vérification
    if (batchId.trim()) {
      setVerified(true);
    }
  };

  const mockData = {
    batchId: "MED2025-A1234",
    productName: "Paracétamol 500mg",
    manufacturer: "PharmaCorp Industries",
    status: "Authentique",
    timeline: [
      { step: "Fabrication", location: "Paris, France", date: "2025-01-15", status: "completed" },
      { step: "Contrôle qualité", location: "Paris, France", date: "2025-01-16", status: "completed" },
      { step: "Distribution", location: "Lyon, France", date: "2025-01-18", status: "completed" },
      { step: "Pharmacie", location: "Marseille, France", date: "2025-01-20", status: "current" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-navy-base to-navy-darker">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-xl font-bold">MedSupply Chain</span>
          </Link>
          <Link to="/auth">
            <Button variant="outline">Se connecter</Button>
          </Link>
        </div>
      </header>

      {/* Verify Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card border-border mb-8">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Vérifier un médicament</CardTitle>
                  <CardDescription>Entrez le numéro de lot ou scannez le QR code</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input
                  placeholder="Ex: MED2025-A1234"
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  className="bg-input border-border"
                />
                <Button
                  onClick={handleVerify}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
                >
                  Vérifier
                </Button>
              </div>
            </CardContent>
          </Card>

          {verified && (
            <div className="space-y-6 animate-fade-in">
              {/* Status Card */}
              <Card className="bg-card border-border border-primary/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary mb-1">Médicament Authentique</h3>
                      <p className="text-muted-foreground">Ce lot a été vérifié sur la blockchain Hedera</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product Info */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Informations du produit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Produit</p>
                      <p className="font-semibold">{mockData.productName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Fabricant</p>
                      <p className="font-semibold">{mockData.manufacturer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Numéro de lot</p>
                      <p className="font-semibold">{mockData.batchId}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Historique de traçabilité</CardTitle>
                  <CardDescription>Parcours complet du médicament</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockData.timeline.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              item.status === "completed"
                                ? "bg-primary/20 text-primary"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            {item.status === "completed" ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <span className="w-3 h-3 bg-primary-foreground rounded-full"></span>
                            )}
                          </div>
                          {index < mockData.timeline.length - 1 && (
                            <div className="w-0.5 h-12 bg-border mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <h4 className="font-semibold mb-1">{item.step}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {item.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {item.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
