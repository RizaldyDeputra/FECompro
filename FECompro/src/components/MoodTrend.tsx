import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', mood: 7.2 },
  { month: 'Feb', mood: 7.5 },
  { month: 'Mar', mood: 7.8 },
  { month: 'Apr', mood: 7.3 },
  { month: 'May', mood: 7.9 },
  { month: 'Jun', mood: 8.1 },
];

export function MoodTrend() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-semibold text-lg">Mood Trend</h2>
          <p className="text-sm text-gray-500">6-Month Overview</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-600">Average: 7.6</span>
          </div>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[6, 9]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="mood" 
              stroke="#22C55E" 
              strokeWidth={2}
              dot={{ fill: '#22C55E' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}