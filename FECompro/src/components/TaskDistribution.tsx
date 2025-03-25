import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Clock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface TaskDistributionProps {
    onPeriodChange: (period: string) => void;
}

const data = [
    { name: 'In Progress', value: 35, color: '#4F46E5', icon: Clock },
    { name: 'Completed', value: 45, color: '#22C55E', icon: CheckCircle2 },
    { name: 'Pending', value: 15, color: '#EAB308', icon: AlertCircle },
    { name: 'Cancelled', value: 5, color: '#EF4444', icon: XCircle },
];

const CustomLegend = ({ payload }: any) => {
    return (
        <div className="grid grid-cols-2 gap-4 mt-6">
            {payload.map((entry: any, index: number) => {
                const IconComponent = data[index].icon;
                return (
                    <div key={entry.value} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="p-2 rounded-full" style={{ backgroundColor: entry.color + '15' }}>
                            <IconComponent size={20} style={{ color: entry.color }} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">{entry.value}</p>
                            <p className="text-xs text-gray-500">{data[index].value}%</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 shadow-lg rounded-lg border">
                <p className="text-sm font-medium">{payload[0].name}</p>
                <p className="text-sm text-gray-500">{payload[0].value}% of tasks</p>
            </div>
        );
    }
    return null;
};

export function TaskDistribution({ onPeriodChange }: TaskDistributionProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(null);
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Task Distribution</h2>
                    <p className="text-sm text-gray-500">Overview of task status</p>
                </div>
                <select
                    className="text-sm border rounded-lg px-3 py-2 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => onPeriodChange(e.target.value)}
                >
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                </select>
            </div>

            <div className="h-[300px] flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius="50%"
                            outerRadius="70%"
                            paddingAngle={0}
                            dataKey="value"
                            labelLine={false}
                            label={({ name, percent, x, y, midAngle, innerRadius, outerRadius }) => {
                                const show = activeIndex !== null;
                                const RADIAN = Math.PI / 180;
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                const labelX = x + radius * Math.cos(-midAngle * RADIAN);
                                const labelY = y + radius * Math.sin(-midAngle * RADIAN);

                                return show ? (
                                    <text
                                        x={labelX}
                                        y={labelY}
                                        fill="white"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className="text-xs font-bold"
                                    >
                                        {`${name}\n${(percent * 100).toFixed(0)}%`}
                                    </text>
                                ) : null;
                            }}
                            labelPosition="inside"
                            onMouseEnter={onPieEnter}
                            onMouseLeave={onPieLeave}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    className="transition-all duration-300 hover:opacity-80"
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={<CustomLegend />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}