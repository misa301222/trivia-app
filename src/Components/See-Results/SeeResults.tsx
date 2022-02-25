import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Results from "../Results/Results";

interface UserAnswers {
    question: string,
    answer: string,
    isRight: boolean,
    userScoreId: number,
    firstoption: string,
    secondOption: string,
    thirdOption: string,
    fourthOption: string,
    fifthOption: string,
    sixthOption: string,
    rightAnswer: string
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
    const [userAnswersFinal, setUserAnswersFinal] = useState<UserAnswers[]>();
    const [userScoreFinal, setUserScoreFinal] = useState<UserScore[]>();

    useEffect(() => {
        let { userAnswersProps, userScore }: any = location?.state;
        setUserAnswersFinal(userAnswersProps as UserAnswers[]);
        setUserScoreFinal(userScore as UserScore[]);
    }, []);

    return (
        <div>
            <Results userAnswersFinal={userAnswersFinal} userScoreFinal={userScoreFinal} />
        </div>
    )
}

export default SeeResults;