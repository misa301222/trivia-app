import { faDesktop, faGamepad, faNewspaper, faPaw, faPeopleArrows, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Questions from '../../resources/images/Questions.jpg';
import QuestionOne from '../../resources/images/Question1.png';
import { Link } from "react-router-dom";
import Cat from "../../resources/svg/Cat";
import Dog from "../../resources/svg/Dog";
import Duck from "../../resources/svg/Duck";
import Sign from "../../resources/svg/Sign";
import SignDuck from "../../resources/svg/SignDuck";

function Home() {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [playCatAnimation, setPlayCatAnimation] = useState<boolean>(false);
    const [playDuckAnimation, setPlayDuckAnimation] = useState<boolean>(false);
    const [playDogAnimation, setPlayDogAnimation] = useState<boolean>(false);

    useEffect(() => {
        console.log("Is Logged In?: " + localStorage.getItem('isLoggedIn'));
        let result = localStorage.getItem('isLoggedIn');
        if (result === 'true') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <div>
            <div className="bg-cover h-screen" style={{
                backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5) 53%, rgba(0, 0, 0, 0.5) 100%), url(${Questions})`,
            }}>

                <div className="flex flex-row justify-center p-40">
                    <div className="border-2 border-cyan-500 backdrop-blur-md rounded-lg h-40 w-2/4 shadow-lg shadow-cyan-500/50 ease-in-out duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/50 hover:border-orange-500 cursor-default">
                        <div className="mb-5">
                            <h1 className="mt-3 header">Hello! Welcome to <span className={`text-amber-500`}>TriviaApp <FontAwesomeIcon icon={faDesktop} /></span></h1>
                        </div>

                        <div className="mb-3">
                            <h3>The place where you can compete against all your friends.</h3>
                            <small className="font-bold text-slate-300">Seriously...</small>
                        </div>
                    </div>
                </div>

                <div className="container backdrop-blur-md rounded-lg mt-20 border-[1px] w-[70rem] h-[20rem] border-gray-400 shadow-gray-400/50 shadow-lg ease-in-out duration-300 hover:scale-110 cursor-default">
                    <div className="flex flex-row justify-evenly">
                        <motion.div
                            animate={{
                                rotate: [0, 0, 200, 0, 0],
                            }}

                            transition={{
                                type: 'spring',
                                repeat: Infinity,
                                duration: 5
                            }}
                            className="mb-5 mt-10 w-1/3">
                            <FontAwesomeIcon icon={faNewspaper} className='text-[3rem]' />
                        </motion.div>

                        <motion.div
                            animate={{
                                rotate: [0, 0, 200, 0, 0],
                            }}

                            transition={{
                                type: 'spring',
                                repeat: Infinity,
                                duration: 5
                            }}
                            className="mb-5 mt-10 w-1/3">
                            <FontAwesomeIcon icon={faPeopleArrows} className='text-[3rem]' />
                        </motion.div>

                        <motion.div
                            animate={{
                                rotate: [0, 0, 200, 0, 0],
                            }}

                            transition={{
                                type: 'spring',
                                repeat: Infinity,
                                duration: 5
                            }}
                            className="mb-5 mt-10 w-1/3">
                            <FontAwesomeIcon icon={faQuestion} className='text-[3rem]' />
                        </motion.div>
                    </div>

                    <div className="flex flex-row justify-evenly">
                        <div className="mb-5 mt-10 w-1/3 p-2">
                            <p className="font-bold text-slate-300">Read Post and socialize with other people!</p>
                        </div>

                        <div className="mb-5 mt-10  w-1/3 p-2">
                            <p className="font-bold text-slate-300">Meet People! Explore all rooms made by our users!</p>
                        </div>

                        <div className="mb-5 mt-10  w-1/3 p-2">
                            <p className="font-bold text-slate-300">With over 1,000,000 Trivias Created you will never get bored!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 mb-20">
                <h1 className="header text-amber-500">There's so much to do here!</h1>
                <h5 className="text-slate-300 font-bold">You will never want to get out again!</h5>

                <div className="flex flex-row w-[60%] m-auto mt-20 bg-neutral-700 shadow-md shadow-black">
                    <div className="w-1/2">
                        <img src={QuestionOne} className='w-[40rem]' />
                    </div>
                    <div className="w-1/2">
                        <div className="flex flex-col">
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <h5 className="header text-slate-200">A lot of fun Answering questions created by you or another user!<br></br>
                                Share the code when creating a room with your friends!</h5>

                            {
                                !isLoggedIn ?
                                    <div>
                                        <h5 className="header text-slate-200">Try it for free!</h5>
                                        <h5 className="font-bold text-blue-400 text-2xl hover:text-blue-500 ease-in-out duration-300"><Link to="/register">Here!</Link></h5>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>

                <div className="mt-40">
                    <h1 className="header text-amber-500">Meet your Friends <FontAwesomeIcon icon={faPaw} /></h1>

                    <div className="mt-10">
                        <div className="bg-neutral-900 p-5 w-10/12 m-auto shadow-md shadow-black">
                            <p className="font-bold text-slate-300 text-3xl w-1/5 m-auto">Demo <FontAwesomeIcon icon={faGamepad} className='text-red-500' /></p>
                            <div className="flex flex-row w-[80%] m-auto">
                                <div className="w-1/3">
                                    <div className="relative">
                                        <Cat selectedAnswer={playCatAnimation} />
                                        {
                                            playCatAnimation ?
                                                <motion.div
                                                    className="absolute top-40 left-64"
                                                    initial={{
                                                        opacity: 0,
                                                        rotate: 0
                                                    }}

                                                    animate={{
                                                        opacity: 1,
                                                        rotate: 45
                                                    }}>
                                                    <Sign />
                                                </motion.div>
                                                : null
                                        }
                                    </div>
                                </div>
                                <div className="w-1/3">
                                    <div className="relative">
                                        <Duck />
                                        {
                                            playDuckAnimation ?
                                                <motion.div
                                                    className="absolute top-40 left-64"
                                                    initial={{
                                                        opacity: 0,
                                                        rotate: 0
                                                    }}

                                                    animate={{
                                                        opacity: 1,
                                                        rotate: 45
                                                    }}>
                                                    <SignDuck />
                                                </motion.div>
                                                : null
                                        }
                                    </div>
                                </div>
                                <div className="w-1/3">
                                    <Dog selectedAnswer={playDogAnimation} />
                                </div>
                            </div>

                            <div className="flex flex-row w-[80%] m-auto">
                                <div className="w-1/3">
                                    <button type="button" onClick={() => setPlayCatAnimation(!playCatAnimation)} style={{
                                        backgroundColor: `${playCatAnimation ? '#f59e0b' : '#cbd5e1'}`
                                    }} className="btn-secondary">Play</button>
                                </div>
                                <div className="w-1/3">
                                    <button type="button" onClick={() => setPlayDuckAnimation(!playDuckAnimation)} style={{
                                        backgroundColor: `${playDuckAnimation ? '#f59e0b' : '#cbd5e1'}`
                                    }} className="btn-secondary">Play</button>
                                </div>
                                <div className="w-1/3">
                                    <button type="button" onClick={() => setPlayDogAnimation(!playDogAnimation)} style={{
                                        backgroundColor: `${playDogAnimation ? '#f59e0b' : '#cbd5e1'}`
                                    }} className="btn-secondary">Play</button>
                                </div>
                            </div>

                            <div className="mt-20">
                                <p className="font-bold text-amber-500 text-xl">You can select from over 3 animals who will accompany you in your trivias!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;