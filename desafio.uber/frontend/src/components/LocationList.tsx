import { MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LocationItem {
  id: string;
  name: string;
  description?: string;
  naptanId?: string;
  lineId?: string;
  lineName?: string;
}

interface LocationListProps {
  items: LocationItem[];
  onSelect: (item: LocationItem) => void;
  emptyMessage?: string;
  isLoading?: boolean;
}

export function LocationList({ 
  items, 
  onSelect, 
  emptyMessage = "No results found",
  isLoading = false
}: LocationListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="bg-card rounded-xl p-4 shadow-card animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-muted rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className={cn(
            "w-full bg-card rounded-xl p-4 shadow-card",
            "flex items-center gap-4 text-left",
            "hover:ring-2 hover:ring-primary/50 hover:shadow-lg",
            "transition-all duration-200",
            "animate-in fade-in slide-in-from-bottom-2"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-card-foreground truncate">{item.name}</h3>
            {item.description && (
              <p className="text-sm text-muted-foreground truncate">{item.description}</p>
            )}
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </button>
      ))}
    </div>
  );
}
