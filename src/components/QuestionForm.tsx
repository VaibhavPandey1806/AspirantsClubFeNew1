import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionForm } from '../hooks/useQuestionForm';
import FormError from './common/FormError';
import SuccessPopup from './common/SuccessPopup';
import QuestionFormHeader from './QuestionForm/QuestionFormHeader';
import QuestionInput from './QuestionForm/QuestionInput';
import OptionsInput from './QuestionForm/OptionsInput';
import CategorySelect from './QuestionForm/CategorySelect';
import CorrectAnswerSelect from './QuestionForm/CorrectAnswerSelect';
import SubmitButton from './common/SubmitButton';

export default function QuestionForm() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const {
    formData,
    categories,
    topics,
    sources,
    selectedCategory,
    selectedTopic,
    selectedSource,
    newCategory,
    newTopic,
    newSource,
    isSubmitting,
    error,
    handleSubmit: submitQuestion,
    handleInputChange,
    handleCategorySelect,
    handleTopicSelect,
    handleSourceSelect,
    handleAddNewCategory,
    handleAddNewTopic,
    handleAddNewSource
  } = useQuestionForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitQuestion(e);
    if (success) {
      setShowSuccess(true);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate('/submitted-questions');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <QuestionFormHeader />
      
      {error && <FormError message={error} />}
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
        <QuestionInput
          value={formData.questionText}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
        
        <OptionsInput
          options={formData}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
        
        <CategorySelect
          categories={categories}
          topics={topics}
          sources={sources}
          selectedCategory={selectedCategory}
          selectedTopic={selectedTopic}
          selectedSource={selectedSource}
          newCategory={newCategory}
          newTopic={newTopic}
          newSource={newSource}
          onCategorySelect={handleCategorySelect}
          onTopicSelect={handleTopicSelect}
          onSourceSelect={handleSourceSelect}
          onAddCategory={handleAddNewCategory}
          onAddTopic={handleAddNewTopic}
          onAddSource={handleAddNewSource}
          disabled={isSubmitting}
        />
        
        <CorrectAnswerSelect
          value={formData.correctAnswer}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
        
        <SubmitButton
          isSubmitting={isSubmitting}
          text="Submit Question"
          loadingText="Submitting..."
        />
      </form>

      <SuccessPopup 
        isOpen={showSuccess} 
        onClose={handleCloseSuccess}
      />
    </div>
  );
}