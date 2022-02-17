import { faChartLine, faCogs, faComment, faCommentSlash, faDoorClosed, faDoorOpen, faEdit, faEye, faHeart, faHeartBroken, faListUl, faNewspaper, faPlusSquare, faQuestion, faStar, faStarHalfAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ActivityCategory } from "../../constants/enums/ActivityCategory";
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

interface Activity {
    activityId: number,
    email: string,
    activityDescription: string,
    category: string,
    dateActivity: Date
}

const RoomURL = 'https://localhost:7025/api/Rooms';
const UserProfileURL = 'https://localhost:7025/api/UserProfiles';
const UserScoreURL = 'https://localhost:7025/api/UserScores';
const ActivitiesURL = 'https://localhost:7025/api/Activities'

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
    const [activities, setActivities] = useState<Activity[]>();
    const navigate = useNavigate();

    const createNewRoom = async () => {

        if (user?.email) {
            let generatedString: string = Math.random().toString(36).slice(2);

            let newRoom: Room = {
                generatedName: generatedString,
                createdBy: user.email,
                dateCreated: new Date()
            }
            await axios.post(`${RoomURL}`, newRoom).then(response => {
                console.log(response.data);
                setLastRoomCreated(response.data);
            });

            let activity: Activity = {
                activityId: 0,
                email: authService.getCurrentUser!,
                activityDescription: ActivityCategory.CREATED_ROOM,
                category: 'ROOM',
                dateActivity: new Date()
            }

            await axios.post(`${ActivitiesURL}/`, activity).then(response => {
                console.log(response);
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

    const getLastActivities = async (email: string) => {
        await axios.get(`${ActivitiesURL}/GetActivitiesByEmailDescLast/${email}`).then(response => {
            setActivities(response.data);
        })
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
        getLastActivities(user.email);
    }, []);

    return (
        <div className="">
            <div className="flex flex-row mt-9">
                <div className="w-4/12">
                    <h2 className="font-bold text-amber-500">Welcome back {user?.fullName}</h2>
                </div>

                <div className="w-64 h-10 rounded-lg cursor-default shadow-lg shadow-orange-500/50 text-orange-500 bg-neutral-900 ease-in-out duration-300 hover:scale-110 hover:text-cyan-500 hover:shadow-cyan-500/50">
                    <h5 className="pt-1 text-xl font-bold"><FontAwesomeIcon icon={faListUl} /> {user?.roles}</h5>
                </div>
            </div>

            <div className="flex flex-row mt-2">
                <div className="w-4/12">
                    <h5 className="font-bold text-slate-300">{`Today is ${moment(new Date()).format('dddd')} ${moment(new Date()).format('DD')} of ${moment(new Date()).format('MMMM')} of ${moment(new Date()).format('YYYY')}`}</h5>
                </div>
            </div>

            <div className="flex flex-row">
                <div className="flex flex-col pl-20 mt-10 w-3/12">
                    <div className="p-2 bg-neutral-900 shadow-md shadow-black  flex flex-col mb-10 ease-in-out duration-300 cursor-pointer hover:scale-110" onClick={async () => createNewRoom()}>
                        <h1 className="absolute p-1 text-left opacity-10 -z-0"><FontAwesomeIcon icon={faPlusSquare} /></h1>
                        <h2 className="font-bold text-orange-500/80">Create Room</h2>
                        <h5 className="text-neutral-300 font-bold">Create a new Room and Share the room name with your friends!</h5>
                    </div>

                    <div className="p-2 bg-neutral-900 shadow-md shadow-black flex flex-col mb-10 ease-in-out duration-300 cursor-pointer hover:scale-110" onClick={() => setShowJoinRoom(true)}>
                        <h1 className="absolute text-left opacity-10 -z-0"><FontAwesomeIcon icon={faDoorOpen} /></h1>
                        <h2 className="font-bold text-orange-500/80">Join Room</h2>
                        <h5 className="text-neutral-300 font-bold">Join a room! You need the room name</h5>
                    </div>

                    <Link to="/seeRooms" className="mb-10">
                        <div className="p-2 bg-neutral-900 shadow-md shadow-black flex flex-col ease-in-out duration-300 cursor-pointer hover:scale-110">
                            <h1 className="absolute text-left opacity-10 -z-0"><FontAwesomeIcon icon={faEye} /></h1>
                            <h2 className="font-bold text-orange-500/80">See Rooms</h2>
                            <h5 className="text-neutral-300 font-bold">Rooms created by you!</h5>
                        </div>
                    </Link>

                    <Link to="/manageQuestions" className="mb-10">
                        <div className="p-2 bg-neutral-900 shadow-md shadow-black flex flex-col ease-in-out duration-300 cursor-pointer hover:scale-110">
                            <h1 className="absolute text-left p-1 opacity-10 -z-0"><FontAwesomeIcon icon={faQuestion} /></h1>
                            <h2 className="font-bold text-orange-500/80">Manage Questions</h2>
                            <h5 className="text-neutral-300 font-bold">Manage Your Own Room questions!</h5>
                        </div>
                    </Link>

                    <Link to="/seeScores" className="mb-10">
                        <div className="p-2 bg-neutral-900 shadow-md shadow-black flex flex-col ease-in-out duration-300 cursor-pointer hover:scale-110">
                            <h1 className="absolute text-left opacity-10 -z-0"><FontAwesomeIcon icon={faStar} /></h1>
                            <h2 className="font-bold text-orange-500/80">See Scores</h2>
                            <h5 className="text-neutral-300 font-bold">See your past scores!</h5>
                        </div>
                    </Link>

                    <Link to="/config" className="mb-10">
                        <div className="p-2 bg-neutral-900 shadow-md shadow-black flex flex-col ease-in-out duration-300 cursor-pointer hover:scale-110">
                            <h1 className="absolute text-left p-1 opacity-10 -z-0"><FontAwesomeIcon icon={faCogs} /></h1>
                            <h2 className="font-bold text-orange-500/80">Config</h2>
                            <h5 className="text-neutral-300 font-bold">Update your Profile Information and more!</h5>
                        </div>
                    </Link>
                </div>

                <div className="container h-full flex flex-col pl-36">
                    <div className="mr-auto">
                        <UserCard userProfile={userProfile} user={user} totalScore={totalScore} totalCorrect={totalCorrect} totalWrong={totalWrong} />
                    </div>

                    <div className="mt-16">
                        <div className="w-64 h-10 rounded-lg cursor-default shadow-lg shadow-orange-500/50 text-orange-500 bg-neutral-900 ease-in-out duration-300 hover:scale-110 hover:text-cyan-500 hover:shadow-cyan-500/50">
                            <h5 className="pt-1 text-xl font-bold"><FontAwesomeIcon icon={faChartLine} /> Recent Activity</h5>
                        </div>

                        <ul className="mt-10 bg-neutral-900 rounded-lg shadow-black shadow-md w-1/2 mr-auto ml-36 p-2 overflow-y-auto max-h-[16rem]">
                            {

                                activities?.map((element: Activity, index: number) => (
                                    <li key={index} className='flex flex-row justify-around p-1'>
                                        <div className="w-1/3">
                                            <h5 className="font-bold text-amber-500 text-xl">{element.dateActivity ? moment(element.dateActivity).format('MM/DD/YYYY HH:mm') : null}</h5>
                                        </div>
                                        <div className="w-1/3">
                                            {
                                                element.category === 'LIKE' ?
                                                    <FontAwesomeIcon icon={faHeart} className='text-red-700 text-xl' /> :
                                                    null
                                            }

                                            {
                                                element.category === 'UNLIKE' ?
                                                    <FontAwesomeIcon icon={faHeartBroken} className='text-red-700 text-xl' /> :
                                                    null
                                            }

                                            {
                                                element.category === 'SCORE' ?
                                                    <FontAwesomeIcon icon={faStarHalfAlt} className='text-yellow-300 text-xl' /> :
                                                    null
                                            }


                                            {
                                                element.category === 'POST' ?
                                                    element.activityDescription === 'Deleted a Post' ?
                                                        < FontAwesomeIcon icon={faTrashAlt} className='text-emerald-500 text-xl' />
                                                        :
                                                        <FontAwesomeIcon icon={faNewspaper} className='text-emerald-500 text-xl' />
                                                    : null
                                            }

                                            {
                                                element.category === 'COMMENT' ?
                                                    element.activityDescription === 'Deleted a Comment' ?
                                                        <FontAwesomeIcon icon={faCommentSlash} className='text-white text-xl' />
                                                        : <FontAwesomeIcon icon={faComment} className='text-white text-xl' />
                                                    : null
                                            }

                                            {
                                                element.category === 'USER POST' ?
                                                    <FontAwesomeIcon icon={faEdit} className='text-cyan-600 text-xl' />
                                                    : null
                                            }

                                            {
                                                element.category === 'ROOM' ?
                                                    element.activityDescription === 'Deleted a Room' ?
                                                        <FontAwesomeIcon icon={faTrashAlt} className='text-red-700 text-xl' />
                                                        : <FontAwesomeIcon icon={faDoorClosed} className='text-orange-400 text-xl' />
                                                    : null
                                            }

                                        </div>
                                        <div className="w-1/3">
                                            <h5 className="font-bold text-amber-500 text-xl">{element.activityDescription}</h5>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>


            </div>

            {
                show ?
                    <div id="defaultModal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black/50">
                        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-40">
                            <div className="relative bg-[#505d75] rounded-lg shadow dark:bg-gray-700">
                                <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-white lg:text-2xl dark:text-white">
                                        Create a new Room
                                    </h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShow(false)}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="mb-4">
                                        <h1 className="font-bold text-black"><u>Your room Id is:</u></h1>
                                    </div>
                                    <div className="mb-4">
                                        <h5 onClick={() => handleCopyRoomName(lastRoomCreated?.generatedName)} className="font-bold text-slate-200 text-5xl cursor-pointer">{lastRoomCreated?.generatedName}</h5>
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
                            <div className="relative bg-[#505d75] rounded-lg shadow dark:bg-gray-700">
                                <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-white lg:text-2xl dark:text-white">
                                        Join Room
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