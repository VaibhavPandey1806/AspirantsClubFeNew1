import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Timer, Check, X } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { Question } from '@/types/api';

type AnswerOptionsProps = {
  question: Question;
  showOptions: boolean;
  isAnswered: boolean;
  selectedAnswer: string | null;
  timer: number;
  onStartAnswer: () => void;
  onSelectAnswer: (option: string) => void;
};

export default function AnswerOptions({
  question,
  showOptions,
  isAnswered,
  selectedAnswer,
  timer,
  onStartAnswer,
  onSelectAnswer,
}: AnswerOptionsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const AnswerOption = ({ option, value }: { option: string; value: string }) => {
    const isSelected = selectedAnswer === option;
    const isCorrectAnswer = question.correctAnswer === option;
    const isCorrect = isSelected && option === question.correctAnswer;
    
    let backgroundColor = COLORS.white;
    if (isAnswered) {
      if (isSelected && isCorrect) {
        backgroundColor = `${COLORS.success}20`;
      } else if (isSelected && !isCorrect) {
        backgroundColor = `${COLORS.error}20`;
      } else if (isCorrectAnswer) {
        backgroundColor = `${COLORS.success}20`;
      }
    }

    return (
      <TouchableOpacity
        style={[
          styles.optionButton,
          { backgroundColor },
          isSelected && !isAnswered && styles.selectedOption
        ]}
        onPress={() => !isAnswered && onSelectAnswer(option)}
        disabled={isAnswered || !showOptions}
      >
        <Text style={[
          styles.optionText,
          isSelected && !isAnswered && styles.selectedOptionText
        ]}>
          {value}
        </Text>
        {isAnswered && isSelected && (
          <View style={[
            styles.resultIcon,
            isCorrect ? styles.correctIcon : styles.incorrectIcon
          ]}>
            {isCorrect ? (
              <Check size={16} color={COLORS.white} />
            ) : (
              <X size={16} color={COLORS.white} />
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {showOptions && (
        <View style={styles.timerContainer}>
          <Timer size={20} color={COLORS.primary} />
          <Text style={styles.timerText}>{formatTime(timer)}</Text>
        </View>
      )}
      
      {!showOptions ? (
        <TouchableOpacity
          style={styles.startButton}
          onPress={onStartAnswer}
        >
          <Text style={styles.startButtonText}>Show Answer Options</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.optionsContainer}>
          <AnswerOption option="A" value={question.optionA} />
          <AnswerOption option="B" value={question.optionB} />
          <AnswerOption option="C" value={question.optionC} />
          <AnswerOption option="D" value={question.optionD} />
        </View>
      )}

      {isAnswered && (
        <View style={[
          styles.resultContainer,
          selectedAnswer === question.correctAnswer ? styles.correctResult : styles.incorrectResult
        ]}>
          <Text style={styles.resultText}>
            {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect!'}
          </Text>
          <Text style={styles.timeText}>
            Time taken: {formatTime(timer)}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    padding: 8,
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 20,
    alignSelf: 'center',
  },
  timerText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.primary,
    marginLeft: 8,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.text,
    flex: 1,
  },
  selectedOptionText: {
    color: COLORS.white,
  },
  resultIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctIcon: {
    backgroundColor: COLORS.success,
  },
  incorrectIcon: {
    backgroundColor: COLORS.error,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  resultContainer: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  correctResult: {
    backgroundColor: `${COLORS.success}15`,
  },
  incorrectResult: {
    backgroundColor: `${COLORS.error}15`,
  },
  resultText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[600],
    marginTop: 4,
  },
});