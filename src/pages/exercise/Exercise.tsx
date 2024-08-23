import { useEffect, useState } from 'react';
import Play from '../../assets/Play.svg';
import Rocket from '../../assets/Rocket.svg';
import Button, { ButtonColor } from '../../components/Button/Button';
import Header from '../../components/header/Header';
import { IExercise } from '../../types/IExercise';
import { useParams } from 'react-router-dom';
import getExerciseById from '../../services/mockApi/exercises';
import Timer from '../timer/Timer';


// Renders exercise details & displays the corresponding excercise type
function Exercise() {
    const { id } = useParams<{ id?: string }>();
    const [exercise, setExercise] = useState<IExercise | null>(null);
    const [loading, setLoading] = useState(true);
    const [didStart, setDidStart] = useState(false);

    //API-Call imitation
    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const exerciseId = id ? parseInt(id, 10) : 1;
                const fetchedExercise = await getExerciseById(exerciseId);
                setExercise(fetchedExercise);
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
        <>
            <Header title={
                <div className='flex items-center'>
                    <img src={Rocket} className='w-[24px] h-[24px] mr-2' alt="Rocket icon" />
                    <h1 className='title'>{exercise.title}</h1>
                </div>
            } />
            <div className="sm: flex flex-col mt-[24px] mx-[16px] max-w-3xl md:mx-auto">
                <ExerciseHeader title={exercise.title} />
                {!didStart ? (
                    <ExerciseIntro
                        sessionInfo={exercise.sessionInfo}
                        description={exercise.description}
                        onStart={() => setDidStart(true)}
                    />
                ) : (
                    <ExerciseContent exercise={exercise} />
                )}
            </div>
        </>
    );
}

function ExerciseHeader({ title }: { title: string }) {
    return (
        <div className='flex items-center'>
            <img src={Rocket} className='w-[24px] h-[24px] mr-2' alt="Rocket icon" />
            <h1 className='title'>{title}</h1>
        </div>
    );
}

// Renders the introduction content and the start button
function ExerciseIntro({ sessionInfo, description, onStart }: { sessionInfo: string; description: string; onStart: () => void; }) {
    return (
        <>
            <h2 className='titleDescription mt-[6px]'>{sessionInfo}</h2>
            <p className='body mt-8'>{description}</p>
            <div className='mt-36'>
                <Button
                    title='Start'
                    icon={Play}
                    backgroundColor={ButtonColor.Black}
                    onClick={onStart}
                />
            </div>
        </>
    );
}

// Renders the main exercise content or timer based on exercise type
function ExerciseContent({ exercise }: { exercise: IExercise }) {
    switch (exercise.type) {
        case 'questionsWithTimer':
            return (
                <div className='flex-1 flex items-center justify-center'>
                    <Timer exercise={exercise} />
                </div>
            );
        default:
            return <div>Exercise not implemented yet</div>;
    }
}

export default Exercise;
