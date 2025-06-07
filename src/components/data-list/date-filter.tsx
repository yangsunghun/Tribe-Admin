import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type FormEvent } from "react";
import type { DateRange } from "react-day-picker";

export type DateFilterType = "registrant" | "editor" | "meetingStart" | "meetingEnd";

interface DateFilterProps {
  selectedDateFilter: DateFilterType;
  onDateFilterChange: (value: DateFilterType) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  dateFilterOptions: Array<{ value: DateFilterType; label: string }>;
}

export function DateFilter({
  selectedDateFilter,
  onDateFilterChange,
  dateRange,
  onDateRangeChange,
  dateFilterOptions
}: DateFilterProps) {
  const handleDateFilterChange = (value: DateFilterType) => {
    onDateFilterChange(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleDateFilterChange(selectedDateFilter);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Select value={selectedDateFilter} onValueChange={onDateFilterChange}>
        <SelectTrigger className="h-8 w-[150px]">
          <SelectValue placeholder="날짜 필터 선택" />
        </SelectTrigger>
        <SelectContent>
          {dateFilterOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("h-8 w-[200px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>날짜를 선택하세요</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </form>
  );
}
