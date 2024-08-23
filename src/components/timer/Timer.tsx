import { useState, useEffect, useRef } from 'react';
import Button, { ButtonColor } from '../button/Button';
import PlayIcon from '../../assets/Play.svg';
import PauseIcon from '../../assets/Pause.svg';
import ResetIcon from '../../assets/Restart.svg';
import React from "react";

interface ITimer {
    countdownTime: number
}

const Timer: React.FC<ITimer> = ({ countdownTime }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [remainingTime, setRemainingTime] = useState(countdownTime);
    const intervalRef = useRef<number | null>(null);
    const percentage = (remainingTime / countdownTime) * 100;
    const inversePercentage = 100 - percentage;


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

    return (

        <div className="w-full pt-10">
            <div className="text-center xlTitle">
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
