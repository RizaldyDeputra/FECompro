import { ScheduleItem } from './ScheduleItem';

interface ScheduleProps {
  onPeriodChange: (period: string) => void;
}

export function Schedule({ onPeriodChange }: ScheduleProps) {
  const handleOptionsClick = (title: string) => {
    console.log(`Options clicked for: ${title}`);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold">Schedule</h2>
        <select 
          className="text-sm border rounded px-2 py-1"
          onChange={(e) => onPeriodChange(e.target.value)}
        >
          <option>Today</option>
          <option>Tomorrow</option>
        </select>
      </div>
      <div className="space-y-4">
        <ScheduleItem 
          time="10:00 AM" 
          title="Group Meeting" 
          onOptionsClick={() => handleOptionsClick("Group Meeting")} 
        />
        <ScheduleItem 
          time="12:30 PM" 
          title="Public Beta Release" 
          onOptionsClick={() => handleOptionsClick("Public Beta Release")} 
        />
        <ScheduleItem 
          time="2:00 PM" 
          title="Client Testing" 
          onOptionsClick={() => handleOptionsClick("Client Testing")} 
        />
      </div>
    </div>
  );
}