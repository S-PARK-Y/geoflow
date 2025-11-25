import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, Target, Share2, Search, AlertCircle } from 'lucide-react';

const data = [
  { name: 'Mon', AISOV: 12, Mentions: 24 },
  { name: 'Tue', AISOV: 18, Mentions: 35 },
  { name: 'Wed', AISOV: 15, Mentions: 42 },
  { name: 'Thu', AISOV: 24, Mentions: 55 },
  { name: 'Fri', AISOV: 32, Mentions: 68 },
  { name: 'Sat', AISOV: 28, Mentions: 72 },
  { name: 'Sun', AISOV: 35, Mentions: 89 },
];

const sourceData = [
  { name: 'Zhihu', value: 45 },
  { name: 'CSDN', value: 20 },
  { name: '36Kr', value: 15 },
  { name: 'Official', value: 10 },
  { name: 'Other', value: 10 },
];

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm relative overflow-hidden">
    <div className={`absolute right-0 top-0 p-3 opacity-10 ${color}`}>
      <Icon size={64} />
    </div>
    <div className="relative z-10">
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <div className="mt-2 flex items-baseline">
        <h3 className="text-3xl font-bold text-slate-100">{value}</h3>
        <span className="ml-2 text-sm font-medium text-green-400 flex items-center">
          <ArrowUpRight className="w-3 h-3 mr-1" />
          {change}
        </span>
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="AI Share of Voice" value="35%" change="+7.2%" icon={Target} color="text-indigo-500" />
        <StatCard title="Prompts Tracked" value="1,240" change="+120" icon={Search} color="text-blue-500" />
        <StatCard title="Content Distributed" value="84" change="+12" icon={Share2} color="text-purple-500" />
        <StatCard title="Risks / Errors" value="3" change="-2" icon={AlertCircle} color="text-red-500" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trend */}
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-slate-100 mb-6">AISOV Trend (DeepSeek & Doubao)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorAISOV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                />
                <Area type="monotone" dataKey="AISOV" stroke="#6366f1" fillOpacity={1} fill="url(#colorAISOV)" />
                <Area type="monotone" dataKey="Mentions" stroke="#10b981" fillOpacity={0} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Distribution */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-slate-100 mb-6">Citation Sources</h3>
          <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" width={80} stroke="#94a3b8" />
                <Tooltip cursor={{fill: '#334155'}} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
