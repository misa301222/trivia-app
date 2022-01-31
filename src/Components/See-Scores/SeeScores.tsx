import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../../Services/auth.service";
import UserCard from "../UserCard/UserCard";

interface User {
    email: string,
    fullName: string,
    roles: string
}

interface UserScore {
    userScoreId: number,
    generatedName: string,
    email: string,
    correct: number,
    wrong: number,
    score: number,
    dateSent: Date
}

interface UserProfile {
    email: string,
    imageURL: string,
    coverURL: string,
    Location: string,
    aboutMeHeader: string,
    aboutMeDescription: string
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
const UserScoresURL = 'https://localhost:7025/api/UserScores';
const UserProfileURL = 'https://localhost:7025/api/UserProfiles';
const UserAnswersURL = 'https://localhost:7025/api/UserAnswers';

function SeeScores() {
    let navigate = useNavigate();
    const [user, setUser] = useState<User>();
    const [userProfile, setUserProfile] = useState<UserProfile>();
    const [userScore, setUserScore] = useState<UserScore[]>();
    const [userAnswersFinal, setUserAnswersFinal] = useState<UserAnswers[]>();
    const [questionsFinal, setQuestionsFinal] = useState<Question[]>();

    const getUserScoresByEmail = async (email: string) => {
        await axios.get(`${UserScoresURL}/GetUserScoresByEmail/${email}`).then(response => {
            setUserScore(response.data);
        });
    }

    const getUserProfileInfo = async (userEmail: string) => {
        await axios.get(`${UserProfileURL}/${userEmail}`).then(response => {
            console.log(response.data);
            setUserProfile(response.data);
        });
    }

    const handleOnClickDetails = async (element: UserScore) => {
        let userAnswers: UserAnswers[] = [];
        let questions: Question[] = [];

        await axios.get(`${UserAnswersURL}/GetUserAnswersByUserScoreId/${element.userScoreId}`).then(response => {
            setUserAnswersFinal(response.data);
            userAnswers = response.data;
        });

        let roomId: number = 0;
        await axios.get(`${RoomURL}/GetRoomsByGeneratedName/${element.generatedName}`).then(response => {
            roomId = response.data.roomId;
        })

        await axios.get(`${QuestionURL}/GetQuestionsByRoomId/${roomId}`).then(response => {
            setQuestionsFinal(response.data);
            questions = response.data;
        });

        /*
        return <Navigate to="/seeResults"
            state={{
                userAnswersProps: userAnswers,
                questions: questions,
                userScore: userScore
            }} />
            */
        navigate('/seeResults', {
            state: {
                userAnswersProps: userAnswers,
                questions: questions,
                userScore: element
            }
        });
    }

    useEffect(() => {
        let user: User = authService.getUser;
        setUser(user);
        getUserScoresByEmail(user.email);
        getUserProfileInfo(user.email);
    }, []);

    return (
        <div className="mt-10">
            <h1 className="font-bold">Scores <FontAwesomeIcon icon={faFileAlt} /></h1>

            <div className="mt-10">
                <div className="flex flex-row h-screen w-full p-2">
                    <div className="w-3/5">
                        <div className="ml-40">
                            <UserCard userProfile={userProfile} user={user} />
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 text-black mt-20">
                            {
                                userScore?.length ?
                                    userScore?.map((element: UserScore, index: number) => (
                                        <motion.div
                                            whileHover={{
                                                scale: 1.1
                                            }}
                                            transition={{
                                                type: "spring"
                                            }}
                                            className="h-[24rem] w-[20rem] bg-[#cccccc] border-2 shadow-md shadow-black border-black rounded-lg cursor-pointer" key={index}>
                                            <div className="flex flex-col">
                                                <div className="flex flex-row justify-end">
                                                    <span className="badge">{element.dateSent ? `${moment(element.dateSent).format('MM/DD/YYYY')} at ${moment(element.dateSent).format('HH:mm')}` : null}</span>
                                                </div>

                                                <h2 className="mt-2 font-bold">Score</h2>
                                                <div className="flex flex-row mt-5">
                                                    <div className="w-1/2"><h5 className="font-bold">Score</h5></div>
                                                    <div className="w-1/2"><h5 className="font-bold">{element.score.toFixed(2)} / 100.00</h5></div>
                                                </div>

                                                <div className="flex flex-row mt-5 p-5">
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${element.score.toFixed(2)}%` }}></div>
                                                    </div>
                                                </div>

                                                <div className="rounded-lg bg-neutral-100 border-[1px] border-black/50 w-11/12 m-auto p-3">
                                                    <div className="flex flex-row">
                                                        <div className="w-1/2"><h5 className="font-bold">Correct</h5></div>
                                                        <div className="w-1/2"><h5 className="font-bold">{element.correct}</h5></div>
                                                    </div>

                                                    <div className="flex flex-row">
                                                        <div className="w-1/2"><h5 className="font-bold">Wrong</h5></div>
                                                        <div className="w-1/2"><h5 className="font-bold">{element.wrong}</h5></div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row mt-10 w-[75%] m-auto">
                                                    <div className="w-1/2"><button onClick={async () => handleOnClickDetails(element)} className="btn-primary w-[90%]">Details</button></div>
                                                    <div className="w-1/2"><h5 className="font-bold">2</h5></div>
                                                </div>

                                            </div>
                                        </motion.div>
                                    ))
                                    :
                                    <div className="mt-5">
                                        <h5 className="text-2xl text-red-600 font-bold">Whoops! It seems there's not scores</h5>
                                        <h5 className="text-2xl text-slate-300 font-bold">Scores will appear here eventually, you just need to play a game first.</h5>
                                    </div>
                            }
                        </div>
                    </div>

                    <div className="w-2/5">
                        123
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeeScores;