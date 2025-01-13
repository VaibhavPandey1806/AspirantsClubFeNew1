import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuestionTimer from '../Timer/QuestionTimer';

interface QuestionHeaderProps {
  onTimerStart: () => void;
  onTimerPause: () => void;
  onTimerTick: (seconds: number) => void;
  isTimerActive: boolean;
  time: number;
}

export default function QuestionHeader({ 
  onTimerStart, 
  onTimerPause, 
  onTimerTick,
  isTimerActive,
  time
}: QuestionHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Questions
      </button>
      <QuestionTimer
        onStart={onTimerStart}
        onPause={onTimerPause}
        onTick={onTimerTick}
        isActive={isTimerActive}
        time={time}
      />
    </div>
  );
}