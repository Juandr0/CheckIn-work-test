import { useState } from 'react';
import ReloadIcon from '../../assets/Reload.svg';
import getRandomIndex from '../../services/getRandomIndex/getRandomIndex';
import { IExercise } from '../../types/IExercise';
import Timer from '../../components/timer/Timer';

interface QuestionsWithTimerProps {
    exercise: IExercise;
}

const QuestionsWithTimer: React.FC<QuestionsWithTimerProps> = ({ exercise }) => {
    const [question, setQuestion] = useState(() =>
        exercise?.questions?.questions.length
            ? getRandomIndex(exercise.questions.questions)
            : ''
    );

    const displayNewQuestion = () => {
        if (exercise?.questions?.questions.length) {
            setQuestion(getRandomIndex(exercise.questions.questions));
        }
    };

    return (
        <div>
            <div className='flex items-start justify-between mb-36'>
                <span>{question}</span>
                <button onClick={displayNewQuestion}>
                    <img src={ReloadIcon} alt="Refresh question" className='h-4 w-4 mt-1.5' />
                </button>
            </div>
            <Timer countdownTime={exercise.questions?.secondsPerQuestion ?? 60} />
        </div>


    )
}

export default QuestionsWithTimer

