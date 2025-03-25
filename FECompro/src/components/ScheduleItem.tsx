interface ScheduleItemProps {
  time: string;
  title: string;
  onOptionsClick: () => void;
}

export function ScheduleItem({ time, title, onOptionsClick }: ScheduleItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16 text-sm text-gray-500">{time}</div>
      <div className="flex-1">
        <div className="font-medium">{title}</div>
      </div>
      <button 
        onClick={onOptionsClick}
        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
      >
        •••
      </button>
    </div>
  );
}