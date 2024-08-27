import { useEffect, useState } from 'react';
import Play from '../../assets/Play.svg';
import Rocket from '../../assets/Rocket.svg';
import Header from '../../components/header/Header';
import { IExercise } from '../../types/IExercise';
import { useParams } from 'react-router-dom';
import getExerciseById from '../../services/mockApi/exercises';
import QuestionsWithTimer from '../../components/questionsWithTimer/QuestionsWithTimer';
import Button, { ButtonColor } from '../../components/Button/Button';

export default function Exercise() {
    const { id } = useParams<{ id?: string }>();
    const [exercise, setExercise] = useState<IExercise | null>(null);
    const [loading, setLoading] = useState(true);
    const [didStart, setDidStart] = useState(false);
    const [headerTitle, setHeaderTitle] = useState('');

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const exerciseId = id ? parseInt(id, 10) : 1;
                const fetchedExercise = await getExerciseById(exerciseId);
                setExercise(fetchedExercise);
                setHeaderTitle(fetchedExercise?.title ?? "Unknown title");
            } catch (error) {
                console.error('Failed to fetch exercise', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExercise();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!exercise) return <div>Exercise not found</div>;

    return (
        <div className="flex flex-col min-h-screen min-w-full md:mx-auto">
            <Header title={
                <div className="flex items-center">
                    <img src={Rocket} className="w-[24px] h-[24px] mr-2" alt="Rocket icon" />
                    <h1 className="title">{exercise.title}</h1>
                </div>
            } />
            <div className="flex justify-center px-4 mt-[24px] flex-1">
                <div className="flex flex-col flex-1 max-w-3xl">
                    <ExerciseHeader title={headerTitle} />
                    {!didStart ? (
                        <ExerciseIntro
                            sessionInfo={exercise.sessionInfo}
                            description={exercise.description}
                            onStart={() => {
                                setDidStart(true);
                                setHeaderTitle(exercise.subTitle ?? exercise.title);
                            }}
                        />
                    ) : (
                        <QuestionsWithTimer exercise={exercise} />
                    )}
                </div>
            </div>
        </div>
    );
}

function ExerciseHeader({ title }: { title: string }) {
    return (
        <div className="flex items-center">
            <img src={Rocket} className="w-[24px] h-[24px] mr-2" alt="Rocket icon" />
            <h1 className="title">{title}</h1>
        </div>
    );
}

function ExerciseIntro({ sessionInfo, description, onStart }: { sessionInfo: string; description: string; onStart: () => void; }) {
    return (
        <div className="flex flex-col flex-1 justify-between">
            <div>
                <h2 className="titleDescription">{sessionInfo}</h2>
                <p className="body mt-[32px]">{description}</p>
            </div>
            <div className='pb-4'>
                <Button
                    title="Start"
                    icon={Play}
                    backgroundColor={ButtonColor.Black}
                    onClick={onStart}
                />
            </div>
        </div>
    );
}
