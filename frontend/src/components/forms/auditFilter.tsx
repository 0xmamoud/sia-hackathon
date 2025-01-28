import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, X } from 'lucide-react';
import { format, parseISO, startOfDay, isEqual } from 'date-fns';

export function AuditFilter({ nameFilter, setNameFilter, dateFilter, setDateFilter }) {
  const handleClearDate = (e) => {
    e.stopPropagation();
    setDateFilter(null);
  };

  return (
    <Card className="p-6 text-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name-filter" className='text-xl'>Audit Name</Label>
          <Input
            id="name-filter"
            placeholder="Filter by name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className='text-xl'>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal relative"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFilter ? format(dateFilter, 'PPP') : 'Pick a date'}
                {dateFilter && (
                  <X
                    className="h-4 w-4 absolute right-2 hover:text-destructive cursor-pointer"
                    onClick={handleClearDate}
                  />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
}
