import { useState } from "react";
// import { useContext } from "react";
import { Bus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/SearchInput";
import { StepIndicator } from "@/components/StepIndicator";
import { LocationList, LocationItem } from "@/components/LocationList";
import { TransportInfo, TransportData } from "@/components/TransportInfo";
// import LanguageButton from "@/components/LanguageButton";
// import { LanguageContext } from "../context/Language";
// import { texts } from "../i18n/texts";
// Mock data simulando respostas da API

const STEPS = ["Search", "Select", "Results"];

export default function Index() {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);
  
  const [stops, setStops] = useState<LocationItem[]>([]);
  const [selectedStop, setSelectedStop] = useState<LocationItem | null>(null);
  
  const [transportData, setTransportData] = useState<TransportData[]>([]);

  const [totalResults, setTotalResults] = useState(0);
  const [currentQuery, setCurrentQuery] = useState("");
  const [totalStops, setTotalStops] = useState(0);

  //Etapa 1
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`https://localhost:7241/Transport/searchStopPoints/${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Erro na busca de locais');
      }
      const data = await response.json();
      // console.log('Resposta da API:', data); // Para debug
      setTotalResults(data.total);
      setCurrentQuery(data.query);
      // Mapeia os matches para LocationItem
      const locationsData = data.matches.map((match: any) => ({
        id: match.id,
        name: match.name,
        description: match.zone ? `Zone ${match.zone}` : match.modes?.join(', ') || ''
      }));
      setLocations(locationsData);
    } catch (error) {
      // console.error('Error fetching locations:', error);
      setLocations([]);
    }
    
    setIsLoading(false);
    setStep(2);
  };

  //Etapa 2
  const handleSelectLocation = async (location: LocationItem) => {
    setSelectedLocation(location);
    setIsLoading(true);
    
    try {
      const response = await fetch(`https://localhost:7241/Transport/getArrival/${encodeURIComponent(location.id)}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar chegadas');
      }
      const data = await response.json();
      console.log('Resposta da API para chegadas:', data); // Para debug
      setTotalStops(Array.isArray(data) ? data.length : 0);
      // Mapeia os predictions para LocationItem
      const stopsData = Array.isArray(data) ? data.map((prediction: any) => ({
        id: prediction.id,
        name: prediction.stationName,
        description: `${prediction.lineName} → ${prediction.destinationName} (${Math.floor(prediction.timeToStation / 60)} min)`,
        naptanId: prediction.naptanId,
        lineId: prediction.lineId,
        lineName: prediction.lineName
      })) : [];
      setStops(stopsData);
    } catch (error) {
      console.error('Erro ao buscar chegadas:', error);
      setStops([]);
    }
    
    setIsLoading(false);
  };

  //Etapa 3
  const handleSelectStop = async (stop: LocationItem) => {
    setSelectedStop(stop);
    setIsLoading(true);
    setStep(3);
    
    try {
      const response = await fetch(`https://localhost:7241/Transport/getDepartureTime/${encodeURIComponent(stop.naptanId!)}/${encodeURIComponent(stop.lineId!)}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar horários de partida');
      }
      const data = await response.json();
      console.log('Resposta da API para horários:', data); // Para debug
      // Mapeia o array de ArrivalDeparture para TransportData
      const transportData = Array.isArray(data) ? data.filter(item => item && typeof item === 'object').map((item: any) => ({
        id: (item.naptanId || 'unknown') + '-' + (item.estimatedTimeOfArrival || 'unknown'),
        line: (item.lineName || selectedStop?.lineName) || item.destinationName || 'Unknown',
        destination: item.destinationName || 'Unknown',
        isNearby: item.departureStatus === "OnTime",
        estimatedTime: item.minutesAndSecondsToArrival || '',
        distance: 'N/A',
        departureStatus: item.departureStatus || 'Unknown',
        platformName: item.platformName || '',
        scheduledTimeOfArrival: item.scheduledTimeOfArrival || '',
        stationName: item.stationName || '',
        estimatedTimeOfArrival: item.estimatedTimeOfArrival || '',
        estimatedTimeOfDeparture: item.estimatedTimeOfDeparture || '',
        minutesAndSecondsToDeparture: item.minutesAndSecondsToDeparture || ''
      })) : [];
      console.log('TransportData mapeado:', transportData); // Para debug
      setTransportData(transportData);
    } catch (error) {
      console.error('Erro ao buscar horários:', error);
      setTransportData([]);
    }
    
    setIsLoading(false);
  };

  const handleReset = () => {
    setStep(1);
    setSearchQuery("");
    setLocations([]);
    setSelectedLocation(null);
    setStops([]);
    setSelectedStop(null);
    setTransportData([]);
    setTotalResults(0);
    setCurrentQuery("");
    setTotalStops(0);
  };

  const handleBack = () => {
    if (step === 2 && selectedLocation) {
      setSelectedLocation(null);
      setStops([]);
    } else if (step === 2) {
      setStep(1);
      setLocations([]);
    } else if (step === 3) {
      setStep(2);
      setSelectedStop(null);
      setTransportData([]);
    }
  };

  // const { language } = useContext(LanguageContext);
  // const t = texts[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            {/* <LanguageButton /> */}
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Bus className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Public Transport
            </h1>
          </div>
          <p className="text-center text-muted-foreground">
            Find information about public transport near you
          </p>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container max-w-2xl mx-auto px-4 py-8">
        <StepIndicator currentStep={step} steps={STEPS} />

        {/* Step 1: Search */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              isLoading={isLoading}
            />
            <p className="text-sm text-muted-foreground text-center">
              Type the name of a street, avenue, or location to get started
            </p>
          </div>
        )}

        {/* Step 2: Select Location or Stop */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="font-semibold text-foreground">
                  {selectedLocation ? "Select the stop" : "Select the location"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedLocation 
                    ? totalStops > 0 
                      ? `Found ${totalStops} stops for "${selectedLocation.name}"`
                      : `Stops for "${selectedLocation.name}"`
                    : totalResults > 0 
                      ? `Found ${totalResults} results for "${currentQuery}"`
                      : `Results for "${searchQuery}"`
                  }
                </p>
              </div>
            </div>

            {!selectedLocation ? (
              <LocationList
                items={locations}
                onSelect={handleSelectLocation}
                isLoading={isLoading}
                emptyMessage="Nenhuma localidade encontrada"
              />
            ) : (
              <LocationList
                items={stops}
                onSelect={handleSelectStop}
                isLoading={isLoading}
                emptyMessage="No transport stops found"
              />
            )}
          </div>
        )}

        {/* Step 3: Transport Info */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="font-semibold text-foreground">Available Transport Options</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedStop?.name}
                </p>
              </div>
            </div>

            <TransportInfo
              data={transportData}
              onReset={handleReset}
              isLoading={isLoading}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            Real-time public transport information provided by Transport for London (TfL).
          </p>
        </div>
      </footer>
        <div>
          <footer className="text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} - Developed by Fernando Vieira Goya. All rights reserved.
            </p>
            <br></br>
            <a style={{textDecoration: "none", color: "#007bff"}} href="https://www.linkedin.com/in/fernando-vieira-goya-3609aa231/" target="_blank" rel="noreferrer">Linkedin</a>
            <br></br>
            <a style={{textDecoration: "none", color: "#007bff"}} href="https://github.com/Vgoyex" target="_blank" rel="noreferrer">Github</a>
          </footer>
        </div>
    </div>
  );
}
