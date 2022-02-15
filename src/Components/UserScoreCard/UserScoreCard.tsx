import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserScore {
    userScoreId: number,
    generatedName: string,
    email: string,
    correct: number,
    wrong: number,
    score: number,
    dateSent: Date
}

interface UserAnswers {
    question: string,
    answer: string,
    isRight: boolean,
    userScoreId: number
}

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

const RoomURL = 'https://localhost:7025/api/Rooms';
const QuestionURL = 'https://localhost:7025/api/Questions';
const UserAnswersURL = 'https://localhost:7025/api/UserAnswers';

function UserScoreCard({ data }: any) {
    const { userScoreId, generatedName, email, correct, wrong, score, dateSent }: UserScore = data;
    let navigate = useNavigate();

    const handleOnClickDetails = async (userScoreId: number, generatedName: string, email: string, correct: number, wrong: number, score: number, dateSent: Date) => {
        let userAnswers: UserAnswers[] = [];
        let questions: Question[] = [];

        await axios.get(`${UserAnswersURL}/GetUserAnswersByUserScoreId/${userScoreId}`).then(response => {
            userAnswers = response.data;
        });

        console.log(userAnswers);

        let roomId: number = 0;
        await axios.get(`${RoomURL}/GetRoomsByGeneratedName/${generatedName}`).then(response => {
            roomId = response.data.roomId;
        })

        // await axios.get(`${QuestionURL}/GetQuestionsByRoomId/${roomId}`).then(response => {
        //     questions = response.data;
        // });

        const element: UserScore = {
            userScoreId: userScoreId,
            generatedName: generatedName,
            email: email,
            correct: correct,
            wrong: wrong,
            score: score,
            dateSent: dateSent
        }

        navigate('/seeResults', {
            state: {
                userAnswersProps: userAnswers,
                userScore: element
            }
        });
    }

    return (
        <motion.div
            whileHover={{
                scale: 1.1
            }}
            transition={{
                type: "spring"
            }}
            className="h-[24rem] w-[20rem] bg-neutral-900 border-2 shadow-md shadow-black border-black cursor-pointer text-slate-200">
            <div className="flex flex-col">
                <div className="flex flex-row justify-end">
                    <span className="badge">{dateSent ? `${moment(dateSent).format('MM/DD/YYYY')} at ${moment(dateSent).format('HH:mm')}` : null}</span>
                </div>

                <h2 className="mt-2 font-bold">Score</h2>
                <div className="flex flex-row mt-5">
                    <div className="w-1/2"><h5 className="font-bold">Score</h5></div>
                    <div className="w-1/2"><h5 className="font-bold">{score.toFixed(2)} / 100.00</h5></div>
                </div>

                <div className="flex flex-row mt-5 p-5">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-cyan-600 h-2.5 rounded-full" style={{ width: `${score.toFixed(2)}%` }}></div>
                    </div>
                </div>

                <div className="rounded-lg bg-neutral-800 shadow-md shadow-black border-[1px] border-black/50 w-11/12 m-auto p-3">
                    <div className="flex flex-row">
                        <div className="w-1/2"><h5 className="font-bold">Correct</h5></div>
                        <div className="w-1/2"><h5 className="font-bold">{correct}</h5></div>
                    </div>

                    <div className="flex flex-row">
                        <div className="w-1/2"><h5 className="font-bold">Wrong</h5></div>
                        <div className="w-1/2"><h5 className="font-bold">{wrong}</h5></div>
                    </div>
                </div>

                <div className="flex flex-row mt-10 w-[75%] m-auto">
                    <div className="w-1/2"><button onClick={async () => handleOnClickDetails(userScoreId, generatedName, email, correct, wrong, score, dateSent)} className="btn-primary w-[90%]">Details</button></div>
                    <div className="w-1/2"><h5 className="font-bold"><FontAwesomeIcon icon={faCat} className='text-4xl text-amber-500' /></h5></div>
                </div>

            </div>
        </motion.div>
    )
}

export default UserScoreCard;