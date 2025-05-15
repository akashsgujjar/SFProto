'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';

// Sample data - replace with real data in production
const productionData = [
  { time: '00:00', units: 45, efficiency: 92, energy: 85 },
  { time: '04:00', units: 38, efficiency: 88, energy: 82 },
  { time: '08:00', units: 52, efficiency: 95, energy: 90 },
  { time: '12:00', units: 48, efficiency: 90, energy: 88 },
  { time: '16:00', units: 55, efficiency: 94, energy: 92 },
  { time: '20:00', units: 42, efficiency: 89, energy: 84 },
];

const defectData = [
  { category: 'Assembly', count: 12 },
  { category: 'Welding', count: 8 },
  { category: 'Painting', count: 5 },
  { category: 'Testing', count: 3 },
];

const qualityData = [
  { name: 'Excellent', value: 65 },
  { name: 'Good', value: 25 },
  { name: 'Average', value: 7 },
  { name: 'Poor', value: 3 },
];

const maintenanceData = [
  { date: 'Mon', preventive: 4, corrective: 1 },
  { date: 'Tue', preventive: 3, corrective: 2 },
  { date: 'Wed', preventive: 5, corrective: 0 },
  { date: 'Thu', preventive: 4, corrective: 1 },
  { date: 'Fri', preventive: 3, corrective: 2 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function FactoryDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const cardBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-50';
  const metricBg = isDarkMode ? 'bg-gray-600' : 'bg-gray-50';

  return (
    <div className={`p-6 ${bgColor} rounded-lg shadow-lg transition-colors duration-200`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${textColor}`}>Factory Analytics Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-lg ${
            isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Production Metrics */}
        <div className={`${cardBg} p-4 rounded-lg`}>
          <h2 className={`text-lg font-semibold mb-4 ${textColor}`}>Production Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#4B5563' : '#E5E7EB'} />
                <XAxis dataKey="time" stroke={isDarkMode ? '#9CA3AF' : '#374151'} />
                <YAxis yAxisId="left" stroke={isDarkMode ? '#9CA3AF' : '#374151'} />
                <YAxis yAxisId="right" orientation="right" stroke={isDarkMode ? '#9CA3AF' : '#374151'} />
                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="units"
                  stroke="#8884d8"
                  name="Units Produced"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#82ca9d"
                  name="Efficiency %"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="energy"
                  stroke="#ffc658"
                  name="Energy Usage %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Defect Analysis */}
        <div className={`${cardBg} p-4 rounded-lg`}>
          <h2 className={`text-lg font-semibold mb-4 ${textColor}`}>Defect Analysis</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={defectData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#4B5563' : '#E5E7EB'} />
                <XAxis dataKey="category" stroke={isDarkMode ? '#9CA3AF' : '#374151'} />
                <YAxis stroke={isDarkMode ? '#9CA3AF' : '#374151'} />
                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }} />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Defect Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quality Distribution */}
        <div className={`${cardBg} p-4 rounded-lg`}>
          <h2 className={`text-lg font-semibold mb-4 ${textColor}`}>Quality Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qualityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {qualityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Maintenance Overview */}
        <div className={`${cardBg} p-4 rounded-lg`}>
          <h2 className={`text-lg font-semibold mb-4 ${textColor}`}>Maintenance Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={maintenanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#4B5563' : '#E5E7EB'} />
                <XAxis dataKey="date" stroke={isDarkMode ? '#9CA3AF' : '#374151'} />
                <YAxis stroke={isDarkMode ? '#9CA3AF' : '#374151'} />
                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }} />
                <Legend />
                <Area type="monotone" dataKey="preventive" stackId="1" stroke="#8884d8" fill="#8884d8" name="Preventive" />
                <Area type="monotone" dataKey="corrective" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Corrective" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className={`${metricBg} p-4 rounded-lg`}>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Total Production</h3>
          <p className={`text-2xl font-bold ${textColor}`}>280 units</p>
        </div>
        <div className={`${metricBg} p-4 rounded-lg`}>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Average Efficiency</h3>
          <p className={`text-2xl font-bold ${textColor}`}>91.3%</p>
        </div>
        <div className={`${metricBg} p-4 rounded-lg`}>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>Total Defects</h3>
          <p className={`text-2xl font-bold ${textColor}`}>28</p>
        </div>
        <div className={`${metricBg} p-4 rounded-lg`}>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Energy Usage</h3>
          <p className={`text-2xl font-bold ${textColor}`}>86.8%</p>
        </div>
      </div>
    </div>
  );
} 