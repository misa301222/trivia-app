import { faDesktop, faNewspaper, faPeopleArrows, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Questions from '../../resources/images/Questions.jpg';

function Home() {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        console.log("Is Logged In?: " + localStorage.getItem('isLoggedIn'));
    }, []);

    return (
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
                        <p className="font-bold text-slate-300">Meet People! Explore all rooms made by our users! Play offline or play online with friends!</p>
                    </div>

                    <div className="mb-5 mt-10  w-1/3 p-2">
                        <p className="font-bold text-slate-300">With over 1,000,000 Trivias Created you will never get bored!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;