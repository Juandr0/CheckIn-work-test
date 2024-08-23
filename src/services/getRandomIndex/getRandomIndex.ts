type GetRandomIndexFunction = (questions: string[]) => string;

const getRandomIndex: GetRandomIndexFunction = (questions) => {
    if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("Invalid input: please provide a non-empty array.");
    }
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
};

export default getRandomIndex;
