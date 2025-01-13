import React, { useEffect, useState } from 'react';
import { getUserById } from '../../utils/api';
import { User } from '../../types/user';
import Avatar from '../Avatar';

interface QuestionMetaProps {
  topic?: string;
  source?: string;
  submittedBy?: string;
  dateSubmitted?: string;
}

export default function QuestionMeta({ topic, source, submittedBy, dateSubmitted }: QuestionMetaProps) {
  const [submitter, setSubmitter] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSubmitter = async () => {
      if (!submittedBy) return;
      
      try {
        setIsLoading(true);
        const { data } = await getUserById(submittedBy);
        setSubmitter(data);
      } catch (error) {
        console.error('Error fetching submitter details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmitter();
  }, [submittedBy]);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap gap-2">
        {topic && (
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
            {topic}
          </span>
        )}
        {source && (
          <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
            {source}
          </span>
        )}
      </div>
      
      {(submitter || dateSubmitted) && (
        <div className="flex items-center gap-3 text-sm text-gray-600">
          {submitter && (
            <div className="flex items-center gap-2">
              <Avatar name={submitter.name} size="sm" />
              <span>Submitted by {submitter.name}</span>
            </div>
          )}
          {dateSubmitted && (
            <>
              <span className="text-gray-300">•</span>
              <span>{dateSubmitted}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}