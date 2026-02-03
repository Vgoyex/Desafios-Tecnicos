import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export function SearchInput({ 
  value, 
  onChange, 
  onSearch, 
  isLoading, 
  placeholder = "Enter the name of a street, avenue..." 
}: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      onSearch();
    }
  };

  return (
    <div className="flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-12 h-14 text-base bg-card border-border shadow-card rounded-xl focus-visible:ring-primary"
        />
      </div>
      <Button 
        onClick={onSearch}
        disabled={isLoading || !value.trim()}
        className="h-14 px-6 rounded-xl gradient-primary hover:opacity-90 transition-opacity"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          "Search"
        )}
      </Button>
    </div>
  );
}
