import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, CloudRain, Waves, Droplets, Thermometer, Wind, Mountain, MapPin } from "lucide-react";

const ParameterInfoModal = () => {
  const parameters = [
    {
      icon: CloudRain,
      name: "Rainfall",
      unit: "mm",
      description: "Amount of precipitation. Higher values indicate increased flood risk.",
    },
    {
      icon: Waves,
      name: "River Discharge",
      unit: "m³/s",
      description: "Volume of water flowing through rivers. Critical indicator of flood potential.",
    },
    {
      icon: Droplets,
      name: "Water Level",
      unit: "m",
      description: "Current height of water bodies. Exceeding normal levels signals danger.",
    },
    {
      icon: Thermometer,
      name: "Temperature",
      unit: "°C",
      description: "Ambient temperature affecting evaporation and rainfall patterns.",
    },
    {
      icon: Wind,
      name: "Humidity",
      unit: "%",
      description: "Moisture content in air. High humidity often precedes heavy rainfall.",
    },
    {
      icon: Mountain,
      name: "Elevation",
      unit: "m",
      description: "Height above sea level. Lower elevations are more flood-prone.",
    },
    {
      icon: MapPin,
      name: "Coordinates",
      unit: "Lat/Long",
      description: "Geographical location for region-specific flood risk assessment.",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Info className="w-4 h-4" />
          Parameter Info
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Info className="w-6 h-6 text-primary" />
            Understanding Input Parameters
          </DialogTitle>
          <DialogDescription>
            Learn what each environmental parameter means and how it affects flood predictions.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {parameters.map((param, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <param.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">
                  {param.name}
                  <span className="text-sm text-muted-foreground ml-2">({param.unit})</span>
                </h3>
                <p className="text-sm text-muted-foreground">{param.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParameterInfoModal;
