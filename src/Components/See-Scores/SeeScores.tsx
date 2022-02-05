import { faFileAlt, faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import authService from "../../Services/auth.service";
import Pagination from "../Pagination/Pagination";
import UserCard from "../UserCard/UserCard";
import UserScoreCard from "../UserScoreCard/UserScoreCard";

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

const UserScoresURL = 'https://localhost:7025/api/UserScores';
const UserProfileURL = 'https://localhost:7025/api/UserProfiles';
const UserScoreURL = 'https://localhost:7025/api/UserScores';

function SeeScores() {
    const [user, setUser] = useState<User>();
    const [userProfile, setUserProfile] = useState<UserProfile>();
    const [userScore, setUserScore] = useState<UserScore[]>();
    const [totalScore, setTotalScore] = useState<number>(0);
    const [totalCorrect, setTotalCorrect] = useState<number>(0);
    const [totalWrong, setTotalWrong] = useState<number>(0);

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

    const getDetailedInfo = async (email: string) => {
        await axios.get(`${UserScoreURL}/GetTotalScoreByEmail/${email}`).then(response => {
            setTotalScore(response.data);
        });

        await axios.get(`${UserScoreURL}/GetTotalCorrectByEmail/${email}`).then(response => {
            setTotalCorrect(response.data);
        });

        await axios.get(`${UserScoreURL}/GetTotalWrongEmail/${email}`).then(response => {
            setTotalWrong(response.data);
        });
    }

    useEffect(() => {
        let user: User = authService.getUser;
        setUser(user);
        getUserScoresByEmail(user.email);
        getUserProfileInfo(user.email);
        getDetailedInfo(user.email);
    }, []);

    return (
        <div className="mt-10">
            <h1 className="header">Scores <FontAwesomeIcon icon={faFileAlt} /></h1>

            <div className="mt-10">
                <div className="flex flex-row h-screen w-full p-2">
                    <div className="w-3/5">
                        <div className="ml-40">
                            <UserCard userProfile={userProfile} user={user} totalScore={totalScore} totalCorrect={totalCorrect} totalWrong={totalWrong} />
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 text-black mt-20">
                            {
                                userScore?.length ?
                                    (
                                        <Pagination data={userScore}
                                            RenderComponent={UserScoreCard}
                                            title="UserScore"
                                            pageLimit={0}
                                            dataLimit={9} />
                                    )
                                    :
                                    <div className="mt-20">
                                        <h5 className="text-4xl text-red-700 font-bold">Whoops!! It seems there's no scores, send a score in order to see your data. <FontAwesomeIcon icon={faSmile}/></h5>
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