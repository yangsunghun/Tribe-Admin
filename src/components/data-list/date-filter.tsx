import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

export type DateFilterType = "registrant" | "editor" | "meetingStart" | "meetingEnd";

interface DateFilterProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  dateFilterOptions: { value: DateFilterType; label: string }[];
  selectedDateFilter: DateFilterType;
  onDateFilterChange: (value: DateFilterType) => void;
}

export function DateFilter({
  dateRange,
  onDateRangeChange,
  dateFilterOptions,
  selectedDateFilter,
  onDateFilterChange
}: DateFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateFilterChange = (value: DateFilterType) => {
    onDateFilterChange(value);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-[150px] justify-between">
            {selectedDateFilter
              ? dateFilterOptions.find((option) => option.value === selectedDateFilter)?.label
              : "날짜 필터"}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[150px] p-0" align="start">
          {dateFilterOptions.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleDateFilterChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn("w-[240px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                </>
              ) : (
                dateRange.from.toLocaleDateString()
              )
            ) : (
              <span>날짜 범위 선택</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="text-caption w-auto p-0" align="start">
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
    </div>
  );
}
