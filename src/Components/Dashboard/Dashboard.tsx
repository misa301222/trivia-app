import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import authService from "../../Services/auth.service";
import UserCard from "../UserCard/UserCard";

interface User {
    email: string,
    fullName: string,
    roles: string
}

interface Room {
    generatedName: string,
    createdBy: string,
    dateCreated: Date
}

interface UserProfile {
    email: string,
    imageURL: string,
    coverURL: string,
    Location: string,
    aboutMeHeader: string,
    aboutMeDescription: string
}

const RoomURL = 'https://localhost:7025/api/Rooms';
const UserProfileURL = 'https://localhost:7025/api/UserProfiles';
const UserScoreURL = 'https://localhost:7025/api/UserScores';

function Dashboard() {
    const [user, setUser] = useState<User | null>();
    const [show, setShow] = useState<boolean>(false);
    const [showJoinRoom, setShowJoinRoom] = useState<boolean>(false);
    const [joinRoomName, setJoinRoomName] = useState<string>();
    const [lastRoomCreated, setLastRoomCreated] = useState<Room>();
    const [userProfile, setUserProfile] = useState<UserProfile>();
    const [totalScore, setTotalScore] = useState<number>(0);
    const [totalCorrect, setTotalCorrect] = useState<number>(0);
    const [totalWrong, setTotalWrong] = useState<number>(0);
    const navigate = useNavigate();

    const createNewRoom = async () => {

        if (user?.email) {

            let generatedString: string = Math.random().toString(36).slice(2);
            console.log(generatedString);

            let newRoom: Room = {
                generatedName: generatedString,
                createdBy: user.email,
                dateCreated: new Date()
            }
            await axios.post(`${RoomURL}`, newRoom).then(response => {
                console.log(response.data);
                setLastRoomCreated(response.data);
            });

            setShow(true);
        }
    }

    const handleCopyRoomName = (generatedName?: string) => {
        if (generatedName) {
            navigator.clipboard.writeText(generatedName);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Room Name Copied to Clipboard!',
                showConfirmButton: false,
                timer: 900
            });
        }
    }

    const handleOnChangeJoinRoomName = (event: ChangeEvent<HTMLInputElement>) => {
        setJoinRoomName(event.target.value);
    }

    const handleJoinRoomFormSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        let roomName: string = joinRoomName!;
        await axios.get(`${RoomURL}/GetRoomsByGeneratedName/${roomName}`).then(response => {
            console.log(response.data);
            navigate(`/enterRoom/${roomName}/${response.data.roomId}`);
        }).catch(err => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Whoops!<br> It seems the room name does not exist. <br> Please try again :)',
                showConfirmButton: true,
            });
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
        getUserProfileInfo(user.email);
        getDetailedInfo(user.email);
    }, []);

    return (
        <div className="">
            <div className="flex flex-row mt-9">
                <div className="w-4/12">
                    <h2 className="font-bold text-neutral-300">Welcome back {user?.fullName}</h2>
                </div>

                <div className="w-64 h-10 rounded-lg cursor-default shadow-lg shadow-orange-500/50 text-orange-500 bg-neutral-900 ease-in-out duration-300 hover:scale-110 hover:text-cyan-500 hover:shadow-cyan-500/50">
                    <h5 className="pt-1 text-xl font-bold"><FontAwesomeIcon icon={faListUl} /> {user?.roles}</h5>
                </div>
            </div>

            <div className="flex flex-row mt-2">
                <div className="w-4/12">
                    <h5 className="font-bold text-neutral-200">{`Today is ${moment(new Date()).format('dddd')} ${moment(new Date()).format('DD')} of ${moment(new Date()).format('MMMM')} of ${moment(new Date()).format('YYYY')}`}</h5>
                </div>
            </div>

            <div className="flex flex-row">
                <div className="flex flex-col pl-20 mt-10 w-3/12">
                    <div className="h-20 bg-neutral-900 rounded-lg flex flex-col mb-10 ease-in-out duration-300 cursor-pointer hover:scale-110" onClick={async () => createNewRoom()}>
                        <h2 className="font-bold text-neutral-300">Create Room</h2>
                        <h5 className="text-neutral-200">Create a new Room, Share the room name with your friends!</h5>
                    </div>

                    <div className="h-20 bg-neutral-900 rounded-lg flex flex-col mb-10 ease-in-out duration-300 cursor-pointer hover:scale-110" onClick={() => setShowJoinRoom(true)}>
                        <h2 className="font-bold text-neutral-300">Join Room</h2>
                        <h5 className="text-neutral-200">Join a room! You need the room name</h5>
                    </div>

                    <Link to="/seeRooms">
                        <div className="h-20 bg-neutral-900 rounded-lg flex flex-col mb-10 ease-in-out duration-300 cursor-pointer hover:scale-110">
                            <h2 className="font-bold text-neutral-300">See Rooms</h2>
                            <h5 className="text-neutral-200">Rooms created by you!</h5>
                        </div>
                    </Link>

                    <Link to="/manageQuestions">
                        <div className="h-20 bg-neutral-900 rounded-lg flex flex-col mb-10 ease-in-out duration-300 cursor-pointer hover:scale-110">
                            <h2 className="font-bold text-neutral-300">Manage Questions</h2>
                            <h5 className="text-neutral-200">Manage Your Own Room questions!</h5>
                        </div>
                    </Link>

                    <Link to="/seeScores">
                        <div className="h-20 bg-neutral-900 rounded-lg flex flex-col mb-10 ease-in-out duration-300 cursor-pointer hover:scale-110">
                            <h2 className="font-bold text-neutral-300">See Scores</h2>
                            <h5 className="text-neutral-200">See your past scores!</h5>
                        </div>
                    </Link>

                    <Link to="/config">
                        <div className="h-20 bg-neutral-900 rounded-lg flex flex-col mb-10 ease-in-out duration-300 cursor-pointer hover:scale-110">
                            <h2 className="font-bold text-neutral-300">Config</h2>
                            <h5 className="text-neutral-200">...</h5>
                        </div>
                    </Link>
                </div>

                <div className="container h-full flex flex-col pl-36">
                    <UserCard userProfile={userProfile} user={user} totalScore={totalScore} totalCorrect={totalCorrect} totalWrong = {totalWrong} />
                </div>
            </div>

            {
                show ?
                    <div id="defaultModal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black/50">
                        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-40">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                                        Terms of Service
                                    </h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShow(false)}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="mb-4">
                                        <h1 className="font-bold text-slate-300"><u>Your room Id is:</u></h1>
                                    </div>
                                    <div className="mb-4">
                                        <h5 onClick={() => handleCopyRoomName(lastRoomCreated?.generatedName)} className="font-bold text-slate-200 text-5xl">{lastRoomCreated?.generatedName}</h5>
                                        <small className="text-gray-300 font-bold">Click to copy</small>
                                    </div>
                                </div>
                                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                    <button onClick={() => setShow(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }

            {
                showJoinRoom ?
                    <div id="modalJoinRoom" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black/50">
                        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-40">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                                        Terms of Service
                                    </h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowJoinRoom(false)}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                                <div className="p-6">
                                    <form onSubmit={handleJoinRoomFormSubmit}>
                                        <div className="mb-4">
                                            <h2 className="font-bold">Room Name</h2>
                                        </div>

                                        <div className="mb-4">
                                            <input onChange={handleOnChangeJoinRoomName} className="shadow-lg w-6/12 shadow-black/50 border-0 rounded py-2 px-3 bg-zinc-900 text-slate-300 focus:outline-none font-bold" maxLength={30} />
                                        </div>

                                        <div className="mt-10">
                                            <button disabled={!joinRoomName} type="submit" className="disabled:opacity-75 disabled:bg-blue-900 bg-blue-900 ease-in-out duration-300 hover:bg-slate-900 w-36 h-10 font-bold shadow-lg shadow-black/50 rounded-lg">JOIN</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                    <button onClick={() => setShowJoinRoom(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }

        </div >
    )
}

export default Dashboard;