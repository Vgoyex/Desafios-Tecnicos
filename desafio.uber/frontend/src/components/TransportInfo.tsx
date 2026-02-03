import { Bus, Clock, MapPin, CheckCircle2, AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface TransportData {
  id: string;
  line: string;
  destination: string;
  isNearby: boolean;
  estimatedTime?: string;
  distance?: string;
  departureStatus?: string;
  platformName?: string;
  scheduledTimeOfArrival?: string;
  stationName?: string;
  estimatedTimeOfArrival?: string;
  estimatedTimeOfDeparture?: string;
  minutesAndSecondsToDeparture?: string;
}

interface TransportInfoProps {
  data: TransportData[];
  onReset: () => void;
  isLoading?: boolean;
}

export function TransportInfo({ data, onReset, isLoading = false }: TransportInfoProps) {
  const formatTime = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-card rounded-2xl p-6 shadow-card animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-muted rounded-xl" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-muted rounded w-1/3" />
                <div className="h-4 bg-muted rounded w-2/3" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <Bus className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground mb-6">Nenhum transporte encontrado</p>
        <Button onClick={onReset} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Nova busca
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((transport, index) => (
        <div
          key={`${transport.id}-${index}`}
          className={cn(
            "bg-card rounded-2xl p-6 shadow-card",
            "animate-in fade-in slide-in-from-bottom-2",
            "border-l-4",
            transport.departureStatus === "OnTime" ? "border-l-green-500" :
            transport.departureStatus === "Delayed" ? "border-l-warning" : "border-l-muted"
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start gap-4">
            <div className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
              transport.departureStatus === "OnTime" ? "bg-green-500/10" :
              transport.departureStatus === "Delayed" ? "bg-warning/10" : "bg-muted/10"
            )}>
              <Bus className={cn(
                "h-7 w-7",
                transport.departureStatus === "OnTime" ? "text-green-500" :
                transport.departureStatus === "Delayed" ? "text-warning" : "text-muted-foreground"
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-card-foreground">{transport.line}</h3>
                <span className={cn(
                  "inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                  transport.departureStatus === "OnTime" 
                    ? "bg-green-500/10 text-green-500" 
                    : transport.departureStatus === "Delayed"
                    ? "bg-warning/10 text-warning"
                    : "bg-muted/10 text-muted-foreground"
                )}>
                  {transport.departureStatus === "OnTime" ? (
                    <>
                      <CheckCircle2 className="h-3 w-3" />
                      On time
                    </>
                  ) : transport.departureStatus === "Delayed" ? (
                    <>
                      <AlertCircle className="h-3 w-3" />
                      Delayed
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3 w-3" />
                      {transport.departureStatus || "Desconhecido"}
                    </>
                  )}
                </span>
              </div>
              {/* <p className="text-muted-foreground mb-3">{transport.destination}</p> */}
              {transport.stationName && (
                <p className="text-muted-foreground mb-3">Station: {transport.stationName}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm">
                {/* {transport.estimatedTime && (
                  // <div className="flex items-center gap-1.5 text-muted-foreground">
                  //   <Clock className="h-4 w-4" />
                  //   <p>Tempo estimado:</p>
                  //   <span>{transport.estimatedTime}</span>
                  // </div>
                )} */}
                {transport.distance && transport.distance !== "N/A" && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{transport.distance}</span>
                  </div>
                )}
                {transport.platformName && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="font-medium">Platform:</span>
                    <span>{transport.platformName}</span>
                  </div>
                )}
                {transport.estimatedTimeOfArrival && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Arrival: {formatTime(transport.estimatedTimeOfArrival)}</span>
                  </div>
                )}
                {transport.estimatedTimeOfDeparture && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Departure: {formatTime(transport.estimatedTimeOfDeparture)}</span>
                  </div>
                )}
                {/* {transport.minutesAndSecondsToDeparture && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Tempo estimado até a partida: {transport.minutesAndSecondsToDeparture}</span>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="pt-4 flex justify-center">
        <Button onClick={onReset} variant="outline" className="gap-2 rounded-xl">
          <RotateCcw className="h-4 w-4" />
          New Search
        </Button>
      </div>
    </div>
  );
}
