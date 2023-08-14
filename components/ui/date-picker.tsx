"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FiCalendar } from "react-icons/fi";

export function DatePicker({
  date,
  onChange,
}: {
  date: Date | null;
  onChange: (date: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <FiCalendar className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          selected={date || undefined}
          onSelect={(e: any) => {
            console.log("date", e);
            onChange(e);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
