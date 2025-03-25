import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { department: 'Engineering', satisfaction: 85, engagement: 78 },
  { department: 'Marketing', satisfaction: 75, engagement: 82 },
  { department: 'Sales', satisfaction: 90, engagement: 88 },
  { department: 'Support', satisfaction: 70, engagement: 75 },
  { department: 'HR', satisfaction: 88, engagement: 85 },
];

export function SentimentOverview() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-semibold text-lg">Employee Sentiment</h2>
          <p className="text-sm text-gray-500">Department Overview</p>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="satisfaction" name="Satisfaction" fill="#4F46E5" />
            <Bar dataKey="engagement" name="Engagement" fill="#818CF8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}