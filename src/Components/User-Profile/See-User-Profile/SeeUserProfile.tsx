import { faMapMarkerAlt, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
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

interface Room {
    generatedName: string,
    createdBy: string,
    dateCreated: Date
}

const UserProfileURL = 'https://localhost:7025/api/UserProfiles';
const UserScoresURL = 'https://localhost:7025/api/UserScores';
const UserURL = 'https://localhost:7025/api/User';
const RoomURL = 'https://localhost:7025/api/Rooms';

function SeeUserProfile() {
    const { email } = useParams();
    const [userProfile, setUserProfile] = useState<UserProfile>();
    const [user, setUser] = useState<User>();
    const [totalScore, setTotalScore] = useState<number>(0);
    const [totalCorrect, setTotalCorrect] = useState<number>(0);
    const [totalWrong, setTotalWrong] = useState<number>(0);
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(true);
    const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
    const [rooms, setRooms] = useState<Room[]>();
    const [key, setKey] = useState<string>('profile');

    const variants = {
        open: { opacity: 1 },
        closed: { opacity: 0 }
    }

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

    const getRoomsByEmail = async () => {
        await axios.get(`${RoomURL}/GetRoomsByEmail/${email}`).then(response => {
            setRooms(response.data);
        });
    }

    const handleOpenTab = (tabName: string) => {
        setKey(tabName);
        if (tabName === 'profile') {
            setIsProfileOpen(true);
            setIsDashboardOpen(false);
        } else {
            setIsProfileOpen(false);
            setIsDashboardOpen(true);
        }
    }

    useEffect(() => {
        getUserProfileByEmail();
        getDetailedInfo();
        getUserByEmail();
        getRoomsByEmail();
        // console.log(email);
    }, []);

    return (
        <div className="">
            <div className="bg-cover h-[34rem] static" style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${userProfile?.coverURL})`
            }}>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 100
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}

                    viewport={{
                        once: true
                    }}

                    transition={{
                        duration: 2,
                        type: 'spring',
                        bounce: 0.8
                    }}
                    className="backdrop-blur-sm bg-slate-300/50 h-[30rem] w-[20rem] inline-block mt-80 rounded-lg">
                    <div className="w-[15rem] h-[15rem] bg-cover bg-center bg-no-repeat rounded-full m-auto relative bottom-16 shadow-md shadow-black" style={{
                        backgroundImage: `url(${userProfile?.imageURL})`
                    }}>
                        <motion.div
                            whileHover={{
                                scale: 1.3
                            }}

                            transition={{
                                type: 'spring'
                            }}
                            className="rounded-lg relative top-2/3 left-full w-fit p-2 bg-slate-300 backdrop-blur-sm shadow-lg shadow-black cursor-default">
                            <h5 className="text-black font-bold"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-700" /> {userProfile?.location}</h5>
                        </motion.div>
                    </div>

                    <div className="relative bottom-16">
                        <div className="mt-6 mb-3">
                            <h5 className="text-black font-bold text-2xl">{user?.fullName}</h5>
                        </div>

                        <div className="p-3 rounded-lg bg-neutral-100 w-11/12 m-auto shadow-md shadow-black">
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
                </motion.div>

                <div className={`mt-40 pb-40`}>
                    <div className="container">
                        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                            <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                                <li className="mr-2" role="presentation">
                                    <button onClick={() => handleOpenTab('profile')} className={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 ${key === 'profile' ? 'activeTab' : ''}`} type="button">Profile</button>
                                </li>
                                <li className="mr-2" role="presentation">
                                    <button onClick={() => handleOpenTab('dashboard')} className={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 ${key === 'dashboard' ? 'activeTab' : ''}`} type="button">Dashboard</button>
                                </li>
                            </ul>
                        </div>
                        <div id="myTabContent">
                            <motion.div
                                animate={isProfileOpen ? 'open' : 'closed'}
                                variants={variants}

                                className={`p-4 h-[100vh] ${key === 'profile' ? 'fade' : 'hidden'}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="container">
                                    <motion.h1
                                        initial={{
                                            opacity: 0,
                                            x: 300
                                        }}

                                        whileInView={{
                                            opacity: 1,
                                            x: 0
                                        }}

                                        viewport={{
                                            once: true
                                        }}
                                        transition={{
                                            duration: 1,
                                            type: 'spring',
                                            bounce: 0.4
                                        }}
                                        className="font-bold text-red-700 bg-neutral-900 rounded-lg p-5 mb-10 shadow-lg shadow-black">{userProfile?.aboutMeHeader}</motion.h1>

                                    <motion.div
                                        initial={{
                                            scale: 0,
                                            opacity: 0,
                                            x: 0
                                        }}

                                        whileInView={{
                                            scale: 1,
                                            opacity: 1,
                                            x: 0
                                        }}

                                        viewport={{
                                            once: true
                                        }}
                                        transition={{
                                            duration: 1,
                                            type: 'spring',
                                            bounce: 0.4
                                        }}
                                        className="bg-gradient-to-r from-neutral-900 to-orange-900/30 w-1/2 m-auto p-5 shadow-lg shadow-black">
                                        <p className="text-left font-bold text-slate-100">{userProfile?.aboutMeDescription}</p>
                                    </motion.div>
                                </div>

                                {
                                    rooms?.length ?
                                        <div className="container mt-20">
                                            <motion.h1
                                                initial={{
                                                    opacity: 0,
                                                    x: 100
                                                }}

                                                whileInView={{
                                                    opacity: 1,
                                                    x: 0
                                                }}

                                                viewport={{
                                                    once: true
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    type: 'spring',
                                                    bounce: 0.4
                                                }}
                                                className="font-bold text-slate-300 bg-neutral-900 rounded-lg p-5 mb-10 shadow-lg shadow-black m-auto">Rooms Created</motion.h1>

                                            <div className="flex flex-wrap gap-10">
                                                {
                                                    rooms?.map((element: Room, index: number) => (
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                                x: 100
                                                            }}

                                                            whileInView={{
                                                                opacity: 1,
                                                                x: 0
                                                            }}

                                                            viewport={{
                                                                once: true
                                                            }}

                                                            transition={{
                                                                duration: 1,
                                                                type: 'spring',
                                                                bounce: 0.4
                                                            }}
                                                            key={index} className="h-[10rem] w-[10rem]  bg-gradient-to-br from-neutral-900 to-orange-900/30  shadow-lg shadow-black p-3">
                                                            <div className="text-slate-300 flex flex-col">
                                                                <h5 className="font-bold text-xl"><u>Room Name</u></h5>
                                                                <h5 className="font-bold">{element.generatedName}</h5>
                                                                <h5 className="font-bold mt-4 p-1"><u>Created on:</u> {moment(element.dateCreated).format('MM/DD/YYYY')}</h5>
                                                            </div>
                                                        </motion.div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        : null
                                }
                            </motion.div>

                            <motion.div
                                animate={isDashboardOpen ? 'open' : 'closed'}
                                variants={variants}
                                className={`h-[100vh] ${key === 'dashboard' ? 'fade' : 'hidden'} p-4`} id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                                <div className="container">

                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

            </div >
        </div >
    )
}

export default SeeUserProfile;