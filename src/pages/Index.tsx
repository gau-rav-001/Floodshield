import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplets, CloudRain, Waves, Loader2, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface PredictionResult {
  prediction: number;
  message: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  const [formData, setFormData] = useState({
    rainfall: "",
    riverDischarge: "",
    waterLevel: "",
    temperature: "",
    humidity: "",
    soilType: "",
    elevation: "",
    latitude: "",
    longitude: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      // TODO: Replace with your Flask API endpoint
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rainfall: parseFloat(formData.rainfall),
          river_discharge: parseFloat(formData.riverDischarge),
          water_level: parseFloat(formData.waterLevel),
          temperature: parseFloat(formData.temperature),
          humidity: parseFloat(formData.humidity),
          soil_type: formData.soilType,
          elevation: parseFloat(formData.elevation),
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setResult(data);
      
      if (data.prediction === 1) {
        toast.error("Flood Warning Detected!");
      } else {
        toast.success("Area is Safe");
      }
    } catch (error) {
      toast.error("Error connecting to prediction service. Make sure your Flask backend is running.");
      console.error("Prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Waves className="w-12 h-12 text-primary wave-animation" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Flood Risk Prediction System
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Advanced Machine Learning for Early Flood Detection
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Form */}
          <Card className="md:col-span-2 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-primary" />
                Environmental Data Input
              </CardTitle>
              <CardDescription>
                Enter current environmental parameters for flood risk analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rainfall">
                      <span className="flex items-center gap-2">
                        <CloudRain className="w-4 h-4" />
                        Rainfall (mm)
                      </span>
                    </Label>
                    <Input
                      id="rainfall"
                      name="rainfall"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 120.5"
                      value={formData.rainfall}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="riverDischarge">
                      <span className="flex items-center gap-2">
                        <Waves className="w-4 h-4" />
                        River Discharge (m³/s)
                      </span>
                    </Label>
                    <Input
                      id="riverDischarge"
                      name="riverDischarge"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 850.2"
                      value={formData.riverDischarge}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waterLevel">
                      <span className="flex items-center gap-2">
                        <Droplets className="w-4 h-4" />
                        Water Level (m)
                      </span>
                    </Label>
                    <Input
                      id="waterLevel"
                      name="waterLevel"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 5.3"
                      value={formData.waterLevel}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature (°C)</Label>
                    <Input
                      id="temperature"
                      name="temperature"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 28.5"
                      value={formData.temperature}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="humidity">Humidity (%)</Label>
                    <Input
                      id="humidity"
                      name="humidity"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 75.5"
                      value={formData.humidity}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Input
                      id="soilType"
                      name="soilType"
                      type="text"
                      placeholder="e.g., Clay, Sandy, Loam"
                      value={formData.soilType}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="elevation">Elevation (m)</Label>
                    <Input
                      id="elevation"
                      name="elevation"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 150.0"
                      value={formData.elevation}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      type="number"
                      step="0.000001"
                      placeholder="e.g., 28.6139"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      type="number"
                      step="0.000001"
                      placeholder="e.g., 77.2090"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      required
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full gradient-ocean text-primary-foreground hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Data...
                    </>
                  ) : (
                    <>
                      <Droplets className="mr-2 h-5 w-5" />
                      Predict Flood Risk
                    </>
                  )}
                </Button>
              </form>

              {/* Result Display */}
              {result && (
                <Card
                  className={`mt-6 shadow-[var(--shadow-result)] animate-in slide-in-from-bottom duration-500 ${
                    result.prediction === 1
                      ? "border-destructive/50 bg-destructive/5"
                      : "border-success/50 bg-success/5"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      {result.prediction === 1 ? (
                        <div className="p-3 rounded-full bg-destructive/10">
                          <AlertTriangle className="w-8 h-8 text-destructive" />
                        </div>
                      ) : (
                        <div className="p-3 rounded-full bg-success/10">
                          <CheckCircle2 className="w-8 h-8 text-success" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3
                          className={`text-xl font-bold mb-2 ${
                            result.prediction === 1 ? "text-destructive" : "text-success"
                          }`}
                        >
                          {result.prediction === 1 ? "🚨 Flood Alert" : "✅ Safe Zone"}
                        </h3>
                        <p className="text-foreground/80 text-lg">{result.message}</p>
                        {result.prediction === 1 && (
                          <p className="mt-3 text-sm text-muted-foreground">
                            Please take necessary precautions and follow local authority guidelines.
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Info Sidebar */}
          <Card className="shadow-[var(--shadow-card)] h-fit sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-accent" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Data Collection:</strong> System gathers environmental parameters including rainfall, water levels, and geographical data.
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">ML Analysis:</strong> Advanced machine learning model processes data using trained algorithms to identify flood patterns.
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Risk Assessment:</strong> System evaluates flood probability for the next 3 days and generates actionable alerts.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2 text-foreground">Key Features:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Real-time prediction
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Multi-parameter analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Geographical accuracy
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    3-day forecast window
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center py-6 border-t border-primary/10">
          <p className="text-muted-foreground">
            Developed by <strong className="text-primary">Gaurav Kumbhare</strong> | Powered by Machine Learning
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
