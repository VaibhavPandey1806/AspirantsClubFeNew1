import React from 'react';
import { CheckCircle, Clock, BookOpen } from 'lucide-react';

interface CategoryStat {
  name: string;
  total: number;
  correct: number;
  accuracy: number;
  averageTime: number;
}

interface StatsProps {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  averageTime: number;
  categoryStats: CategoryStat[];
  formatTime: (seconds: number) => string;
}

export default function ResponseStats({ 
  totalQuestions,
  correctAnswers,
  accuracy,
  averageTime,
  categoryStats,
  formatTime
}: StatsProps) {
  return (
    <div className="space-y-8">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Questions</p>
              <p className="text-2xl font-bold text-gray-900">{totalQuestions}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Correct Answers</p>
              <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Accuracy</p>
              <p className="text-2xl font-bold text-indigo-600">{accuracy}%</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-full">
              <CheckCircle className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Time</p>
              <p className="text-2xl font-bold text-purple-600">{formatTime(averageTime)}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Category-wise Stats */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Category-wise Performance</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {categoryStats.map((stat) => (
            <div key={stat.name} className="px-6 py-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">{stat.name}</h4>
                <span className="text-sm text-gray-500">
                  {stat.correct} / {stat.total} questions
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${stat.accuracy}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {stat.accuracy}%
                </span>
                <span className="text-sm text-gray-500">
                  avg. {formatTime(stat.averageTime)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}