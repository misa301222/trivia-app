import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


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

const QuestionURL = 'https://localhost:7025/api/Questions';
const UserScoreURL = 'https://localhost:7025/api/UserScores';

function EnterRoom() {
    const { generatedName } = useParams();
    const { roomId } = useParams();
    const [questions, setQuestions] = useState<Question[]>();
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [index, setIndex] = useState<number>(0);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [userAnswers, setUserAnswers] = useState<UserAnswers[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [userScore, setUserScore] = useState<UserScore>();

    const getQuestionsByRoomId = async () => {
        await axios.get(`${QuestionURL}/GetQuestionsByRoomId/${roomId}`).then(response => {
            setQuestions(response.data);
        });
    }

    const showFirstQuestion = () => {
        if (questions) {
            setIsStarted(true);
            setCurrentQuestion(questions[index]);
        }
    }

    const acceptAnswer = async () => {
        setSelectedAnswer('');

        let newElement: UserAnswers;
        newElement = {
            question: currentQuestion?.questionName!,
            answer: selectedAnswer,
            isRight: false
        }
        console.log(userAnswers);
        setUserAnswers(prev => [...prev, newElement]);

        let newIndex: number = index + 1;
        if (newIndex < questions?.length! && questions) {
            setCurrentQuestion(questions[newIndex]);
            setIndex(newIndex);
        }

        if (newIndex === questions?.length) {
            setIsFinished(true);
            let userAnswersFinal: UserAnswers[] = userAnswers;
            userAnswersFinal.push(newElement);
            calculateScore(userAnswersFinal);
        }
    }

    const calculateScore = async (userAnswersFinal: UserAnswers[]) => {
        let correct: number = 0;
        let wrong: number = 0;
        let score: number = 0;
        let dateSent: Date = new Date();
        let userEmail: string = localStorage.getItem('email')!;

        if (questions && userAnswers) {
            for (let i = 0; i < questions.length; i++) {
                if (questions[i].answer.trim() === userAnswersFinal[i].answer.trim()) {
                    correct++;
                    userAnswersFinal[i].isRight = true;
                } else {
                    wrong++;
                    userAnswersFinal[i].isRight = false;
                }
            }
            score = correct / questions.length * 100;
            let finalScore: UserScore = {
                generatedName: generatedName!,
                email: userEmail,
                correct: correct,
                wrong: wrong,
                score: score,
                dateSent: dateSent
            }
            setUserAnswers(userAnswersFinal);
            // console.log(finalScore);
            await axios.post(`${UserScoreURL}`, finalScore).then(response => {
                setUserScore(response.data);
            });
        }
    }

    useEffect(() => {
        getQuestionsByRoomId();
    }, []);

    return (
        <div className="container">
            <div className="font-bold text-slate-300 mt-10">
                <h1>Room: <u>{generatedName}</u></h1>
            </div>

            {questions?.length ?
                <div className="container">
                    {!isStarted ?
                        <div className="mt-10">
                            <button onClick={() => showFirstQuestion()} type="button" className="btn-primary">Start</button>
                        </div> : null
                    }

                    {isStarted ?
                        <motion.div
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1
                            }}

                            transition={{
                                type: 'spring',
                                duration: 2
                            }}

                            className="w-full h-screen mt-10 rounded-lg">
                            <div className="text-slate-100 pt-20">
                                <h1 className="font-bold">Question #{index + 1}</h1>
                            </div>


                            <div className="bg-neutral-900 w-9/12 h-3/6 m-auto p-10 mt-28 rounded-lg shadow-lg shadow-black/90">
                                {
                                    !isFinished ?
                                        <div className="container">
                                            <div className="text-slate-100 mb-16">
                                                <h1 className="font-bold">{currentQuestion?.questionName}</h1>
                                            </div>

                                            <div className="text-slate-300" onClick={() => setSelectedAnswer(currentQuestion ? currentQuestion.firstOption : '')}>
                                                <div className="option-style">
                                                    <h2 className="font-bold">{currentQuestion?.firstOption}</h2>
                                                </div>
                                            </div>

                                            <div className="text-slate-300" onClick={() => setSelectedAnswer(currentQuestion ? currentQuestion.secondOption : '')}>
                                                <div className="option-style">
                                                    <h2 className="font-bold">{currentQuestion?.secondOption}</h2>
                                                </div>
                                            </div>

                                            <div className="text-slate-300" onClick={() => setSelectedAnswer(currentQuestion ? currentQuestion.thirdOption : '')}>
                                                <div className="option-style">
                                                    <h2 className="font-bold">{currentQuestion?.thirdOption}</h2>
                                                </div>
                                            </div>

                                            <div className="text-slate-300" onClick={() => setSelectedAnswer(currentQuestion ? currentQuestion.fourthOption : '')}>
                                                <div className="option-style">
                                                    <h2 className="font-bold">{currentQuestion?.fourthOption}</h2>
                                                </div>
                                            </div>

                                            {
                                                currentQuestion?.fifthOption ?
                                                    <div className="text-slate-300" onClick={() => setSelectedAnswer(currentQuestion ? currentQuestion.fifthOption : '')}>
                                                        <div className="option-style">
                                                            <h2 className="font-bold">{currentQuestion.fifthOption}</h2>
                                                        </div>
                                                    </div>
                                                    : null
                                            }

                                            {currentQuestion?.sixthOption ?
                                                <div className="text-slate-300" onClick={() => setSelectedAnswer(currentQuestion ? currentQuestion.sixthOption : '')}>
                                                    <div className="option-style">
                                                        <h2 className="font-bold">{currentQuestion.sixthOption}</h2>
                                                    </div>
                                                </div>
                                                : null
                                            }
                                        </div>
                                        :
                                        <div>
                                            <h5 className="font-bold text-2xl">Game is finished owo</h5>
                                            <div className="pt-5 w-56 m-auto">
                                                <div className="bg-neutral-800 rounded-lg shadow-lg p-3 ease-in-out duration-300 shadow-orange-500/50 text-orange-500/50 hover:shadow-orange-500 hover:text-orange-500 cursor-default">
                                                    <h2 className="font-bold">Summary</h2>
                                                </div>

                                                <div className="flex flex-row mt-14 bg-neutral-800 rounded-lg p-5">
                                                    <div className="w-2/4">
                                                        <div className="mb-3">
                                                            <h5 className="text-2xl font-bold">Correct</h5>
                                                        </div>

                                                        <div className="mb-3">
                                                            <h5 className="text-2xl font-bold">Wrong</h5>
                                                        </div>

                                                        <div className="mb-3">
                                                            <h5 className="text-2xl font-bold">Score</h5>
                                                        </div>
                                                    </div>

                                                    <div className="w-2/4">
                                                        <div className="mb-3">
                                                            <h5 className="text-2xl font-bold">{userScore?.correct}</h5>
                                                        </div>

                                                        <div className="mb-3">
                                                            <h5 className="text-2xl font-bold">{userScore?.wrong}</h5>
                                                        </div>

                                                        <div className="mb-3">
                                                            <h5 className="text-2xl font-bold">{userScore?.score.toFixed(2)}%</h5>
                                                        </div>
                                                    </div>
                                                </div>


                                                {/* {userAnswers?.map((element: UserAnswers, index: number) => (
                                                    <div className="mb-3" key={index}>
                                                        {element.question} - {index} - {element.answer}
                                                    </div>
                                                ))} */}
                                            </div>
                                        </div>
                                }
                            </div>
                            {!isFinished ?
                                <button disabled={!selectedAnswer} onClick={async () => acceptAnswer()} className="btn-primary mt-20">Next Question</button>
                                :
                                <Link to={{
                                    pathname: '/results',

                                }}
                                    state={{
                                        userAnswersProps: userAnswers,
                                        questions: questions,
                                        userScore: userScore
                                    }}>
                                    <button type="button" className="btn-primary mt-20">See Results</button>
                                </Link>
                            }

                        </motion.div>
                        : null
                    }
                </div>
                :
                <div className="mt-10">
                    <h2 className="text-red-500/80 font-bold"><u>It seems there's no questions.</u></h2>
                    <h2 className="text-slate-300 font-bold mt-10"><u>You can go back by clicking</u><Link className="text-blue-400" to='/dashboard'> <u>here.</u></Link></h2>
                </div>
            }
        </div >
    )
}

export default EnterRoom;