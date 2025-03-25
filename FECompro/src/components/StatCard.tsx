interface StatCardProps {
    title: string;
    value: string;
    subtitle: string;
    color?: 'blue' | 'purple' | 'red';
}

export function StatCard({ title, value, subtitle, color = 'blue' }: StatCardProps) {
    const colors = {
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        red: 'bg-red-50 text-red-600',
    };

    return (
        <div className={`bg-white rounded-lg p-6 shadow-sm ${colors[color]}`}>
            <h3 className="text-gray-500 mb-2">{title}</h3>
            <div className="flex items-end gap-2">
                <span className="text-4xl font-semibold">{value}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
        </div>
    );
}