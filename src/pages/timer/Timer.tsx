import { useState, useEffect, useRef } from 'react';
import Button, { ButtonColor } from '../../components/Button/Button';
import PlayIcon from '../../assets/Play.svg';
import PauseIcon from '../../assets/Pause.svg';
import ResetIcon from '../../assets/Restart.svg';
import ReloadIcon from '../../assets/Reload.svg';
import { IExercise } from '../../types/IExercise';
import getRandomIndex from '../../services/getRandomIndex/getRandomIndex';
import React from "react";

interface TimerProps {
    exercise: IExercise;
}

const Timer: React.FC<TimerProps> = ({ exercise }) => {
    const countdownTime = exercise.questions?.secondsPerQuestion ?? 60;
    const [isRunning, setIsRunning] = useState(false);
    const [remainingTime, setRemainingTime] = useState(countdownTime);
    const intervalRef = useRef<number | null>(null);
    const percentage = (remainingTime / countdownTime) * 100;
    const inversePercentage = 100 - percentage;
    const [question, setQuestion] = useState(() =>
        exercise?.questions?.questions.length
            ? getRandomIndex(exercise.questions.questions)
            : ''
    );

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = window.setInterval(() => {
                setRemainingTime(prevTime => {
                    const updatedTime = Math.max(prevTime - 1, 0);
                    if (updatedTime === 0) {
                        clearInterval(intervalRef.current!);
                        setIsRunning(false);
                    }
                    return updatedTime;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    const toggleTimer = () => setIsRunning(prev => !prev);

    const resetTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setRemainingTime(countdownTime);
    };

    const displayNewQuestion = () => {
        if (exercise?.questions?.questions.length) {
            setQuestion(getRandomIndex(exercise.questions.questions));
        }
        resetTimer();
    };

    return (

        <div className="w-full pt-10">
            <div className='flex justify-between items-start'>
                <span>{question}</span>
                <button onClick={displayNewQuestion}>
                    <img src={ReloadIcon} alt="Refresh question" className='h-4 w-4 mt-1.5' />
                </button>
            </div>
            <div className="text-center xlTitle mt-36">
                {remainingTime}s
            </div>
            <div
                className="h-5 bg-softGray rounded-full w-full"
                style={{ backgroundImage: `linear-gradient(to left, #F4F4F5 ${inversePercentage}%, black ${inversePercentage}%)` }}
            />
            <div className="mt-4 flex justify-center gap-4">
                {remainingTime > 0 && (
                    <>
                        {!isRunning ? (
                            <Button
                                title="Start"
                                icon={PlayIcon}
                                onClick={toggleTimer}
                                backgroundColor={ButtonColor.Black}
                            />
                        ) : (
                            <Button
                                title="Pause"
                                icon={PauseIcon}
                                onClick={toggleTimer}
                                backgroundColor={ButtonColor.Gray}
                            />
                        )}
                    </>
                )}
                <Button
                    title="Reset"
                    icon={ResetIcon}
                    onClick={resetTimer}
                    backgroundColor={ButtonColor.Red}
                />
            </div>
        </div>
    );
};

export default Timer;
