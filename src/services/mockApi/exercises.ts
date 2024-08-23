
import { IExercise } from '../../types/IExercise';

export default function getExerciseById(id: number): Promise<IExercise | null> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const exercises: IExercise[] = [
                {
                    id: 1,
                    title: "Check In",
                    sessionInfo: "5-10 mins | 2-15 team members",
                    description: "You will be given a question and then go around the room until everyone had a chance to answer it. We will show you a timer so you can make sure to keep the conversation moving. Once everyone (including yourself) has answered the question, just exit the exercise by pressing the back button in the top left.",
                    type: "questionsWithTimer",
                    questions: {
                        secondsPerQuestion: 60,
                        questions: [
                            "If you could describe your current state of mind in three words, what would they be?",
                            "What's one thing you're looking forward to this week?",
                            "If you were a weather phenomenon, what would you be today and why?",
                            "What's one small win you've had recently?",
                            "If you could have any superpower for just today, what would it be?",
                            "What's one thing you've learned in the past week?",
                            "If your mood was a color right now, what color would it be?",
                            "What's one thing you're grateful for today?",
                            "If you could teleport anywhere for your next break, where would you go?",
                            "What's one goal you're working towards right now?"
                        ]
                    }
                },
                {
                    id: 2,
                    title: "Icebreaker Quiz",
                    sessionInfo: "10-15 mins | 4-20 team members",
                    description: "In this exercise, participants will answer a series of fun and light-hearted questions designed to break the ice and encourage interaction. Each person will answer a question, and the group can discuss the answers afterward.",
                    type: "questionsWithTimer",
                    questions: {
                        secondsPerQuestion: 90,
                        questions: [
                            "If you could have dinner with any historical figure, who would it be and why?",
                            "What's the most unusual food you've ever tried?",
                            "If you were stranded on a deserted island, what three items would you want with you?",
                            "What's the best vacation you've ever been on?",
                            "If you could instantly become an expert in any field, what would it be?",
                            "What's your favorite book or movie of all time?",
                            "If you could swap lives with someone for a day, who would it be and why?",
                            "What's a hobby you've always wanted to pick up but haven't yet?",
                            "If you could live in any country for a year, where would it be?",
                            "What's the most interesting thing you've learned recently?"
                        ]
                    }
                },
                {
                    id: 3,
                    title: "Error",
                    sessionInfo: "Exercise not implemented on button click",
                    description: "Error",
                    type: "",
                }
            ];

            const exercise = exercises.find(ex => ex.id === id) || null;

            resolve(exercise);
        }, 300);
    });
}
