import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Results from "../Results/Results";

interface Question {
    questionName: string,
    firstOption: string,
    secondOption: string,
    thirdOption: string,
    fourthOption: string,
    fifthOption: string,
    sixthOption: string,
    answer: string
    roomId: number
}

interface UserAnswers {
    question: string,
    answer: string,
    isRight: boolean
}

interface UserScore {
    generatedName: string,
    email: string,
    correct: number,
    wrong: number,
    score: number,
    dateSent: Date
}

function SeeResults() {
    let location = useLocation();
    const [questionsFinal, setQuestionsFinal] = useState<Question[]>();
    const [userAnswersFinal, setUserAnswersFinal] = useState<UserAnswers[]>();
    const [userScoreFinal, setUserScoreFinal] = useState<UserScore[]>();

    useEffect(() => {
        let { questions, userAnswersProps, userScore }: any = location?.state;
        setQuestionsFinal(questions as Question[]);
        setUserAnswersFinal(userAnswersProps as UserAnswers[]);
        setUserScoreFinal(userScore as UserScore[]);
        console.log(userScore);
    }, []);

    return (
        <div>
            <Results questionsFinal={questionsFinal} userAnswersFinal={userAnswersFinal} userScoreFinal={userScoreFinal} />
        </div>
    )
}

export default SeeResults;