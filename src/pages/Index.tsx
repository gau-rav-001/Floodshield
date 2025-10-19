// ------------------------------------------------------------
// 🌊 FloodShield Frontend - Prediction Page
// Author: Gaurav Kumbhare | Roll No: 3062
// ------------------------------------------------------------
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplets, CloudRain, Waves, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import LoadingAnimation from "@/components/LoadingAnimation";
import ParameterInfoModal from "@/components/ParameterInfoModal";
import axios from "axios";

interface PredictionResult {
  prediction: number;
  result: string;
  note?: string;
  error?: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const [formData, setFormData] = useState({
    rainfall: "",
    river_discharge: "",
    water_level: "",
    temperature: "",
    humidity: "",
    soil_type: "",
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

  // 🌐 Use environment variable or fallback to localhost
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await axios.post("/predict", {
      rainfall: parseFloat(formData.rainfall),
      river_discharge: parseFloat(formData.river_discharge),
      water_level: parseFloat(formData.water_level),
      temperature: parseFloat(formData.temperature),
      humidity: parseFloat(formData.humidity),
      soil_type: formData.soil_type,
      elevation: parseFloat(formData.elevation),
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
    });

    const data = response.data;

    if (data.error) toast.error(data.error);
    else {
      setResult(data);
      if (data.prediction === 1) toast.error("🚨 Flood Warning Detected!");
      else toast.success("✅ Area is Safe");
    }
  } catch (error: any) {
    console.error("Prediction Error:", error);
    toast.error("⚠️ Cannot connect to backend. Ensure FastAPI is running at port 8000.");
  } finally {
    setIsLoading(false);
  }
};



  return (
    <>
      <Navigation />
      <div className="min-h-screen py-8 px-4 pt-24">
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
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CloudRain className="w-5 h-5 text-primary" />
                      Environmental Data Input
                    </CardTitle>
                    <CardDescription>
                      Enter current environmental parameters for flood risk analysis
                    </CardDescription>
                  </div>
                  <ParameterInfoModal />
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: "Rainfall (mm)", name: "rainfall", icon: CloudRain },
                      { label: "River Discharge (m³/s)", name: "river_discharge", icon: Waves },
                      { label: "Water Level (m)", name: "water_level", icon: Droplets },
                      { label: "Temperature (°C)", name: "temperature" },
                      { label: "Humidity (%)", name: "humidity" },
                      { label: "Soil Type", name: "soil_type" },
                      { label: "Elevation (m)", name: "elevation" },
                      { label: "Latitude", name: "latitude" },
                      { label: "Longitude", name: "longitude" },
                    ].map(({ label, name, icon: Icon }) => (
                      <div key={name} className="space-y-2">
                        <Label htmlFor={name}>
                          <span className="flex items-center gap-2">
                            {Icon && <Icon className="w-4 h-4" />}
                            {label}
                          </span>
                        </Label>
                        <Input
                          id={name}
                          name={name}
                          type={name === "soil_type" ? "text" : "number"}
                          placeholder={`Enter ${label}`}
                          step="0.01"
                          value={(formData as any)[name]}
                          onChange={handleInputChange}
                          required
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                    ))}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full gradient-ocean text-primary-foreground hover:opacity-90 transition-opacity"
                    size="lg"
                  >
                    {!isLoading ? (
                      <>
                        <Droplets className="mr-2 h-5 w-5" />
                        Predict Flood Risk
                      </>
                    ) : (
                      <>
                        <Droplets className="mr-2 h-5 w-5 animate-bounce" />
                        Analyzing Data...
                      </>
                    )}
                  </Button>
                </form>

                {/* Loading Animation */}
                {isLoading && <LoadingAnimation />}

                {/* Result Display */}
                {result && !isLoading && (
                  <div
                    className={`mt-6 rounded-xl overflow-hidden ${
                      result.prediction === 1 ? "storm-bg" : "sunny-bg"
                    }`}
                  >
                    <Card className="border-0 bg-transparent shadow-[var(--shadow-result)]">
                      <CardContent className="pt-6 relative z-10">
                        <div className="flex items-start gap-4">
                          {result.prediction === 1 ? (
                            <div className="p-3 rounded-full bg-destructive/20 backdrop-blur-sm">
                              <AlertTriangle className="w-8 h-8 text-white" />
                            </div>
                          ) : (
                            <div className="p-3 rounded-full bg-success/20 backdrop-blur-sm">
                              <CheckCircle2 className="w-8 h-8 text-white" />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3
                              className={`text-2xl font-bold mb-2 ${
                                result.prediction === 1
                                  ? "text-white"
                                  : "text-white drop-shadow-md"
                              }`}
                            >
                              {result.prediction === 1
                                ? "🚨 FloodShield Alert: Flood Likely — Take Precautions!"
                                : "✅ Safe Conditions Detected — No Flood Expected"}
                            </h3>
                            <p className="text-white/90">{result.result}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sidebar */}
            <Card className="shadow-[var(--shadow-card)] h-fit sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-accent" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  Our AI model predicts flood risk based on environmental parameters like rainfall,
                  discharge, soil, and elevation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
