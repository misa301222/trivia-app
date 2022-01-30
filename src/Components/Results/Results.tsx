import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

function Results() {
    // let { questions, userAnswersProps, userScore }: any = useLocation().state;
    // let location = useLocation();
    // let { questions, userAnswersProps, userScore }: any = useLocation().state; 
    let location = useLocation();

    const [questionsFinal, setQuestionsFinal] = useState<Question[]>();
    const [userAnswersFinal, setUserAnswersFinal] = useState<UserAnswers[]>();
    const [userScoreFinal, setUserScoreFinal] = useState<UserScore[]>();

    useEffect(() => {
        let { questions, userAnswersProps, userScore }: any = location?.state;
        setQuestionsFinal(questions as Question[]);
        setUserAnswersFinal(userAnswersProps as UserAnswers[]);
        setUserScoreFinal(userScore as UserScore[]);
        console.log(userAnswersProps);
    }, []);

    return (
        <div className="container">
            <h1 className="mt-20">Results</h1>
            <div className="container">
                {
                    questionsFinal?.map((element: Question, index: number) => (
                        <div key={index} className="container text-black w-2/4 mt-10">
                            <div className="bg-white rounded-lg p-2 flex flex-col">
                                <div className="flex flex-row justify-end">
                                    <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-slate-300 bg-cyan-900 rounded-full">Question #{index + 1}</span>
                                </div>
                                <h5 className="text-2xl font-bold">{element.questionName}</h5>
                            </div>

                            <div className="mt-5 mb-10">
                                {
                                    element.firstOption ?
                                        // <div className={`bg-stone-400 rounded-md p-3 border-2 ${userAnswersFinal![index].answer === element.firstOption && userAnswersFinal![index].answer === element.answer ? 'border-4 border-green-300' : 'border-black'}`}>
                                        <div className={`bg-stone-400 rounded-md p-3 border-2 ${userAnswersFinal![index].answer.trim() === element.firstOption.trim() && userAnswersFinal![index].answer.trim() === element.answer.trim() ? 'border-4 border-green-300' : `${element.firstOption.trim() === element.answer.trim() ? 'border-4 border-red-500' : 'border-black'}`}`}>
                                            <div className="">
                                                <h5>{element.firstOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.secondOption ?
                                        <div className={`bg-stone-400 rounded-md p-3 border-2 ${userAnswersFinal![index].answer.trim() === element.secondOption.trim() && userAnswersFinal![index].answer.trim() === element.answer.trim() ? 'border-4 border-green-300' : `${element.secondOption.trim() === element.answer.trim() ? 'border-4 border-red-500' : 'border-black'}`}`}>
                                            <div className="">
                                                <h5>{element.secondOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.thirdOption ?
                                        <div className={`bg-stone-400 rounded-md p-3 border-2 ${userAnswersFinal![index].answer.trim() === element.thirdOption.trim() && userAnswersFinal![index].answer.trim() === element.answer.trim() ? 'border-4 border-green-300' : `${element.thirdOption.trim() === element.answer.trim() ? 'border-4 border-red-500' : 'border-black'}`}`}>

                                            <div className="">
                                                <h5>{element.thirdOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.fourthOption ?
                                        <div className={`bg-stone-400 rounded-md p-3 border-2 ${userAnswersFinal![index].answer.trim() === element.fourthOption.trim() && userAnswersFinal![index].answer.trim() === element.answer.trim() ? 'border-4 border-green-300' : `${element.fourthOption.trim() === element.answer.trim() ? 'border-4 border-red-500' : 'border-black'}`}`}>

                                            <div className="">
                                                <h5>{element.fourthOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.fifthOption ?
                                        <div className={`bg-stone-400 rounded-md p-3 border-2 ${userAnswersFinal![index].answer.trim() === element.fifthOption.trim() && userAnswersFinal![index].answer.trim() === element.answer.trim() ? 'border-4 border-green-300' : `${element.fifthOption.trim() === element.answer.trim() ? 'border-4 border-red-500' : 'border-black'}`}`}>

                                            <div className="">
                                                <h5>{element.fifthOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.sixthOption ?
                                        <div className={`bg-stone-400 rounded-md p-3 border-2 ${userAnswersFinal![index].answer.trim() === element.sixthOption.trim() && userAnswersFinal![index].answer.trim() === element.answer.trim() ? 'border-4 border-green-300' : `${element.sixthOption.trim() === element.answer.trim() ? 'border-4 border-red-500' : 'border-black'}`}`}>

                                            <div className="">
                                                <h5>{element.sixthOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }
                                <div className="bg-white rounded-lg border-2 border-black font-bold p-2">
                                    <h5>The right answer was {element.answer} <FontAwesomeIcon icon={faCheckDouble} /></h5>
                                    <h5>You answered <u>{userAnswersFinal![index].answer}</u></h5>
                                    <h5>So you are {userAnswersFinal![index].isRight ? 'RIGHT!' : 'WRONG!'}</h5>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Results;