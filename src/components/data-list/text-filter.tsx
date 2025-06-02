import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState, type FormEvent } from "react";

interface TextFilterProps {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  placeholder?: string;
}

export function TextFilter({ globalFilter, onGlobalFilterChange, placeholder = "검색..." }: TextFilterProps) {
  const [inputValue, setInputValue] = useState(globalFilter);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onGlobalFilterChange(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    onGlobalFilterChange("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="pl-8"
        />
        {inputValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 p-0"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button type="submit" size="sm">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
