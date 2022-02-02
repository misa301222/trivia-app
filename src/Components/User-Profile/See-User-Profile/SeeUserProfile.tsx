import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface UserProfile {
    email: string,
    imageURL: string,
    coverURL: string,
    location: string,
    aboutMeHeader: string,
    aboutMeDescription: string
}

interface User {
    fullName: string,
    email: string,
    roles: string[],
    dateCreated: Date
}

const UserProfileURL = 'https://localhost:7025/api/UserProfiles';
const UserScoresURL = 'https://localhost:7025/api/UserScores';
const UserURL = 'https://localhost:7025/api/User';

function SeeUserProfile() {
    const { email } = useParams();
    const [userProfile, setUserProfile] = useState<UserProfile>();
    const [user, setUser] = useState<User>();
    const [totalScore, setTotalScore] = useState<number>(0);
    const [totalCorrect, setTotalCorrect] = useState<number>(0);
    const [totalWrong, setTotalWrong] = useState<number>(0);


    const getUserProfileByEmail = async () => {
        await axios.get(`${UserProfileURL}/${email}`).then(response => {
            setUserProfile(response.data);
        });
    }

    const getDetailedInfo = async () => {
        await axios.get(`${UserScoresURL}/GetTotalScoreByEmail/${email}`).then(response => {
            setTotalScore(response.data);
        });

        await axios.get(`${UserScoresURL}/GetTotalCorrectByEmail/${email}`).then(response => {
            setTotalCorrect(response.data);
        });

        await axios.get(`${UserScoresURL}/GetTotalWrongEmail/${email}`).then(response => {
            setTotalWrong(response.data);
        });
    }

    const getUserByEmail = async () => {
        await axios.get(`${UserURL}/GetCurrentUser/${email}`).then(response => {
            setUser(response.data.dataSet);
        });
    }

    useEffect(() => {
        getUserProfileByEmail();
        getDetailedInfo();
        getUserByEmail();
        // console.log(email);
    }, []);

    return (
        <div className="">
            <div className="bg-cover h-[34rem] static" style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${userProfile?.coverURL})`
            }}>
                <div className="bg-neutral-300 h-[30rem] w-[20rem] inline-block mt-80 rounded-lg">
                    <div className="w-[15rem] h-[15rem] bg-cover bg-center bg-no-repeat rounded-full m-auto relative bottom-16 shadow-md shadow-black" style={{
                        backgroundImage: `url(${userProfile?.imageURL})`
                    }}>
                    </div>

                    <div className="relative bottom-16">
                        <div className="mt-6 mb-3">
                            <h5 className="text-black font-bold text-2xl">{user?.fullName}</h5>
                        </div>

                        <div className="p-1 rounded-lg bg-neutral-100 w-11/12 m-auto shadow-md shadow-black">
                            <div className="columns-3 w-4/5 m-auto text-2xl">
                                <div>
                                    <h5 className="font-bold text-black">{totalCorrect}</h5>
                                </div>

                                <div>
                                    <h5 className="font-bold text-black">{totalWrong}</h5>
                                </div>

                                <div>
                                    <h5 className="font-bold text-black">{(totalScore * 100 as number).toFixed(2)}%</h5>
                                </div>
                            </div>

                            <div className="columns-3 w-4/5 m-auto mt-3">
                                <div>
                                    <h5 className="font-bold text-black/80 text-center">Total Right</h5>
                                </div>

                                <div>
                                    <h5 className="font-bold text-black/80 text-center">Total Wrong</h5>
                                </div>

                                <div>
                                    <h5 className="font-bold text-black/80 text-center">Average</h5>
                                </div>
                            </div>


                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-slate-900 mt-3">
                                <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${(totalScore * 100 as number).toFixed(2)}%` }}></div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SeeUserProfile;