import { faImage, faMapMarkerAlt, faPalette, faSmileWink, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authService from "../../../Services/auth.service";
import PaginationPost from "../../PaginationPost/PaginationPost";
import PostCard from "../../PostCard/PostCard";

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

interface UserPost {
    userPostId: number,
    postTarget: string,
    postedBy: string,
    datePosted: Date,
    content: string,
    imageURL: string,
    backgroundColorHex: string,
    letterColorHex: string,
    feelingId: number
}

interface Feeling {
    feelingId: number,
    feelingDescription: string,
    feelingImageURL: string
}

const UserProfileURL = 'https://localhost:7025/api/UserProfiles';
const UserScoresURL = 'https://localhost:7025/api/UserScores';
const UserURL = 'https://localhost:7025/api/User';
const RoomURL = 'https://localhost:7025/api/Rooms';
const UserPostURL = 'https://localhost:7025/api/UserPosts';
const FeelingsURL = 'https://localhost:7025/api/Feelings';

function SeeUserProfile() {
    const { email } = useParams();
    const [userProfile, setUserProfile] = useState<UserProfile>();
    const [feelings, setFeelings] = useState<Feeling[]>();
    const [selectedFeeling, setSelectedFeeling] = useState<Feeling>({
        feelingId: 1,
        feelingDescription: 'None',
        feelingImageURL: ''
    });
    const [user, setUser] = useState<User>();
    const [totalScore, setTotalScore] = useState<number>(0);
    const [totalCorrect, setTotalCorrect] = useState<number>(0);
    const [totalWrong, setTotalWrong] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);
    const [showFeeling, setShowFeeling] = useState<boolean>(false);
    const [isOwnProfile, setIsOwnProfile] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<UserProfile>();
    const [newUserPost, setNewUserPost] = useState<UserPost>({
        userPostId: 0,
        postTarget: '',
        postedBy: '',
        datePosted: new Date(),
        content: '',
        imageURL: '',
        backgroundColorHex: '#252525',
        letterColorHex: '#cbd5e1',
        feelingId: 1
    });
    const [userPosts, setUserPosts] = useState<UserPost[]>();
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(true);
    const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
    const [rooms, setRooms] = useState<Room[]>();
    const [key, setKey] = useState<string>('profile');

    const variants = {
        open: { opacity: 1 },
        closed: { opacity: 0 }
    }

    const checkIsOwnProfile = async () => {
        const loggedEmail: string = localStorage.getItem('email')!;
        if (loggedEmail.trim() === email?.trim()) {
            setIsOwnProfile(true);
        }

        let currentEmail: string = authService.getCurrentUser!;
        if (currentEmail) {
            await axios.get(`${UserProfileURL}/${currentEmail}`).then(response => {
                setCurrentUser(response.data);
            });
        }
    }

    const getUserProfileByEmail = async () => {
        await axios.get(`${UserProfileURL}/${email}`).then(response => {
            setUserProfile(response.data);
        });
    }

    const getDetailedInfo = async () => {
        await axios.get(`${UserScoresURL}/GetTotalScoreByEmail/${email}`).then(response => {
            setTotalScore(response.data);
        }).catch(err => {
            console.log(err);
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

    const getAllPostsByEmail = async () => {
        await axios.get(`${UserPostURL}/GetAllUserPostsByEmail/${email}`).then(response => {
            setUserPosts(response.data);
        });
    }

    const getAllFeelings = async () => {
        await axios.get(`${FeelingsURL}`).then(response => {
            setFeelings(response.data);
        });
    }

    const handleOnChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewUserPost(prev => ({ ...prev, content: event.target.value }));
    }

    const handleOnChangeImageURL = (event: ChangeEvent<HTMLInputElement>) => {
        setNewUserPost(prev => ({ ...prev, imageURL: event.target.value }))
    }

    const handleOnChangeBackgroundColorHex = (event: ChangeEvent<HTMLInputElement>) => {
        setNewUserPost(prev => ({ ...prev, backgroundColorHex: event.target.value }))
    }

    const handleOnChangeLetterColorHex = (event: ChangeEvent<HTMLInputElement>) => {
        setNewUserPost(prev => ({ ...prev, letterColorHex: event.target.value }))
    }

    const setColorsInitialState = () => {
        setNewUserPost(prev => ({ ...prev, backgroundColorHex: '#252525', letterColorHex: '#cbd5e1' }));
    }

    const handleOnSubmitSendPost = async (event: SyntheticEvent) => {
        event.preventDefault();
        let newPost: UserPost = newUserPost;
        newPost.datePosted = new Date();
        newPost.postedBy = authService.getCurrentUser!;
        newPost.postTarget = email!;
        newPost.feelingId = selectedFeeling?.feelingId!;
        console.log(newPost);

        let blankPost: UserPost = {
            userPostId: 0,
            postTarget: '',
            postedBy: '',
            datePosted: new Date(),
            content: '',
            imageURL: '',
            backgroundColorHex: '#252525',
            letterColorHex: '#cbd5e1',
            feelingId: 1
        }

        let blankFeeling: Feeling = {
            feelingId: 1,
            feelingDescription: 'None',
            feelingImageURL: ''
        }

        await axios.post(`${UserPostURL}`, newPost).then(response => {
            setNewUserPost(blankPost);
            setSelectedFeeling(blankFeeling);
        });

        await axios.get(`${UserPostURL}/GetAllUserPostsByEmail/${email}`).then(response => {
            setUserPosts(response.data);
        });
    }

    useEffect(() => {
        getUserProfileByEmail();
        getDetailedInfo();
        getUserByEmail();
        getRoomsByEmail();
        checkIsOwnProfile();
        getAllPostsByEmail();
        getAllFeelings();
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
                                    <div className="mb-20">
                                        <form onSubmit={handleOnSubmitSendPost}>
                                            <div className="flex flex-row w-1/2 m-auto shadow-md shadow-black p-5">
                                                <div className="w-full flex flex-row h-full justify-center">
                                                    <div className="w-full">
                                                        <div className="flex flex-row justify-end">
                                                            {/* <img src={currentUser?.imageURL} className='rounded-full w-16 h-16 mr-7' /> */}
                                                            <div style={{ backgroundImage: `url(${currentUser?.imageURL})` }} className='bg-cover rounded-full w-[5rem] h-16 mr-7'></div>
                                                            <div className="flex flex-col w-full">
                                                                <textarea className="form-control mb-3" rows={5} style={{
                                                                    resize: 'none',
                                                                    width: '100%',
                                                                }} maxLength={250} onChange={handleOnChangeContent} value={newUserPost.content} placeholder='Type something funny for your friends!' />
                                                                {
                                                                    selectedFeeling?.feelingDescription === 'None' ?
                                                                        null :
                                                                        <div className="flex flex-row mb-3">
                                                                            <h5 className="text-slate-300 font-bold">I'm Feeling: <span className="text-amber-500">{selectedFeeling?.feelingDescription}</span></h5>
                                                                            <img src={selectedFeeling?.feelingImageURL} className='w-7 rounded-md ml-2' />
                                                                        </div>
                                                                }
                                                                <div className="flex flex-row p-2">
                                                                    <div className="w-10/12 flex flex-row justify-start gap-3">
                                                                        <button data-tooltip-target="tooltip-default" style={{ borderColor: '#06b6d4', borderWidth: `${newUserPost.imageURL ? '5px' : '0px'}` }} type="button" onClick={() => setShow(true)} className="btn-secondary w-10"><FontAwesomeIcon icon={faImage} /></button>
                                                                        <div id="tooltip-default" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-black bg-white rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                                                            Post An image
                                                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                                                        </div>
                                                                        <input data-tooltip-target="tooltip-background" type='color' className="rounded-lg w-10 p-1 h-full cursor-pointer" onChange={handleOnChangeBackgroundColorHex} value={newUserPost.backgroundColorHex} />
                                                                        <div id="tooltip-background" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-black bg-white rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                                                            Background Color
                                                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                                                        </div>
                                                                        <input data-tooltip-target="tooltip-text" type='color' className="rounded-lg w-10 p-1 h-full cursor-pointer" onChange={handleOnChangeLetterColorHex} value={newUserPost.letterColorHex} />
                                                                        <div id="tooltip-text" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-black bg-white rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                                                            Text Color
                                                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                                                        </div>
                                                                        <button data-tooltip-target="tooltip-feeling" type="button" onClick={() => setShowFeeling(true)} className="btn-secondary w-10"><FontAwesomeIcon icon={faSmileWink} /></button>
                                                                        <div id="tooltip-feeling" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-black bg-white rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                                                            Feeling
                                                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                                                        </div>
                                                                        <button data-tooltip-target="tooltip-reset" type="button" onClick={() => setColorsInitialState()} className="btn-secondary w-20">Reset</button>
                                                                        <div id="tooltip-reset" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-black bg-white rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                                                            Reset Colors
                                                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <button type="submit" className="btn-secondary">Post</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="">
                                        {
                                            userPosts?.length ? (
                                                <PaginationPost data={userPosts}
                                                    RenderComponent={PostCard}
                                                    pageLimit={0}
                                                    dataLimit={9}
                                                />
                                            )
                                                :
                                                <div className="">
                                                    <h1 className="font-bold text-red-800">It seems there's no posts....</h1>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div >
            </div >

            {show ?
                <div id="modalJoinRoom" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black/50">
                    <div className="relative px-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-40">
                        <div className="relative bg-[#505d75] rounded-lg shadow dark:bg-gray-700">
                            <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-white lg:text-2xl dark:text-white">
                                    New Image
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShow(false)}>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="mb-4">
                                    <h2 className="font-bold">Image URL</h2>
                                </div>

                                <div className="mb-4">
                                    <input value={newUserPost.imageURL} onChange={handleOnChangeImageURL} className="shadow-lg w-6/12 shadow-black/50 border-0 rounded py-2 px-3 bg-zinc-900 text-slate-300 focus:outline-none font-bold" maxLength={256} />
                                </div>

                                <div className="mb-4">
                                    <button type="button" onClick={() => setShow(false)} className="btn-primary">Accept</button>
                                </div>
                            </div>
                            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button onClick={() => setShow(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                : null}

            {
                showFeeling ?
                    <div id="modalJoinRoom" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black/50">
                        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-40">
                            <div className="relative bg-[#505d75] rounded-lg shadow dark:bg-gray-700">
                                <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-white lg:text-2xl dark:text-white">
                                        Feelings
                                    </h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowFeeling(false)}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className="h-80 overflow-y-auto gap-6">
                                        {
                                            feelings?.map((element: Feeling, index: number) => (
                                                <div key={index} onClick={() => setSelectedFeeling(element)} className='h-11 mb-8 bg-neutral-800 shadow-md shadow-black rounded-lg p-1 ease-in-out duration-300 cursor-pointer hover:bg-neutral-600'>
                                                    <div className="flex flex-row justify-start">
                                                        <div className="w-10">
                                                            {
                                                                element.feelingImageURL ?
                                                                    <img src={element.feelingImageURL} className='rounded-md' />
                                                                    : null
                                                            }
                                                        </div>

                                                        <div className="ml-10">
                                                            <h5 className="font-bold">{element.feelingDescription}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div className="mb-4">
                                        <button type="button" onClick={() => setShowFeeling(false)} className="btn-primary">Accept</button>
                                    </div>
                                </div>
                                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                    <button onClick={() => setShowFeeling(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }

        </div >
    )
}

export default SeeUserProfile;