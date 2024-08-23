import { useState } from 'react';
import ReloadIcon from '../../assets/Reload.svg';
import getRandomIndex from '../../services/getRandomIndex/getRandomIndex';
import { IExercise } from '../../types/IExercise';
import Timer from '../timer/Timer';

interface QuestionsWithTimerProps {
    exercise: IExercise;
}

const QuestionsWithTimer: React.FC<QuestionsWithTimerProps> = ({ exercise }) => {
    const [question, setQuestion] = useState(() =>
        exercise?.questions?.questions.length
            ? getRandomIndex(exercise.questions.questions)
            : 'No question found'
    );

    const displayNewQuestion = () => {
        if (exercise?.questions?.questions.length) {
            setQuestion(getRandomIndex(exercise.questions.questions));
        }
    };

    return (
        <div className='flex flex-col flex-1 justify-between w-min-full'>
            <div className='flex items-center justify-between mb-4'>
                <span>{question}</span>
                <button onClick={displayNewQuestion} className='p-1'>
                    <img src={ReloadIcon} alt="Refresh question" className='h-6 w-6' />
                </button>
            </div>
            <div className='pb-4'>
                <Timer countdownTime={exercise.questions?.secondsPerQuestion ?? 60} />
            </div>
        </div>
    );
}

export default QuestionsWithTimer;
