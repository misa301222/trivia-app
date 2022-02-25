import { faHammer, faLaughBeam, faPaw, faToolbox, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { duration } from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../Services/auth.service";

interface User {
    email: string,
    fullName: string,
    roles: string
}

function Config() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        let currentUser: User = authService.getUser;
        setUser(currentUser);
    }, []);

    return (
        <div className="container">
            <div className="mt-40">
                {
                    user?.roles === 'ADMINISTRATOR' ?
                        <div className="container-bordered">
                            <div className="bg-black w-[15rem] rounded-lg m-auto p-1 cursor-default">
                                <h5 className="font-bold text-2xl text-orange-500"><FontAwesomeIcon icon={faToolbox} /> Admin Tools</h5>
                            </div>
                            <div className="flex flex-wrap gap-6">
                                <Link to='/userManagment'>
                                    <motion.div
                                        whileHover={{
                                            scale: 1.1
                                        }}

                                        transition={{
                                            type: 'spring',
                                        }}
                                        className="rounded-lg bg-[#cccccc] h-[13rem] w-[13rem] flex flex-col align-middle justify-center cursor-pointer shadow-lg shadow-black">
                                        <div className="">
                                            <FontAwesomeIcon className="text-[6rem] text-neutral-900" icon={faUserPlus} />
                                            <div className="bg-neutral-800 w-11/12 m-auto rounded-lg">
                                                <h5 className="mt-4 font-bold p-1">Account Managment</h5>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>

                                <Link to='/manageFeelings'>
                                    <motion.div
                                        whileHover={{
                                            scale: 1.1
                                        }}

                                        transition={{
                                            type: 'spring',
                                        }}
                                        className="rounded-lg bg-[#cccccc] h-[13rem] w-[13rem] flex flex-col align-middle justify-center cursor-pointer shadow-lg shadow-black">
                                        <div className="">
                                            <FontAwesomeIcon className="text-[6rem] text-neutral-900" icon={faLaughBeam} />
                                            <div className="bg-neutral-800 w-11/12 m-auto rounded-lg">
                                                <h5 className="mt-4 font-bold p-1">Manage Feelings</h5>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </div>
                        </div>
                        : null
                }

                <div className="container-bordered">
                    <div className="bg-black w-[15rem] rounded-lg m-auto p-1 cursor-default">
                        <h5 className="font-bold text-2xl text-cyan-500"><FontAwesomeIcon icon={faHammer} /> General Tools</h5>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <Link to='/editUserProfile'>
                            <motion.div
                                whileHover={{
                                    scale: 1.1
                                }}

                                transition={{
                                    type: 'spring',
                                }}
                                className="rounded-lg bg-[#cccccc] h-[13rem] w-[13rem] flex flex-col align-middle justify-center cursor-pointer shadow-lg shadow-black">
                                <div className="">
                                    <FontAwesomeIcon className="text-[6rem] text-neutral-900" icon={faUser} />
                                    <div className="bg-neutral-800 w-11/12 m-auto rounded-lg">
                                        <h5 className="mt-4 font-bold p-1">Edit Profile Information</h5>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>

                        <Link to='/editFavoriteAnimal'>
                            <motion.div
                                whileHover={{
                                    scale: 1.1
                                }}

                                transition={{
                                    type: 'spring',
                                }}
                                className="rounded-lg bg-[#cccccc] h-[13rem] w-[13rem] flex flex-col align-middle justify-center cursor-pointer shadow-lg shadow-black">
                                <div className="">
                                    <FontAwesomeIcon className="text-[6rem] text-neutral-900" icon={faPaw} />
                                    <div className="bg-neutral-800 w-11/12 m-auto rounded-lg">
                                        <h5 className="mt-4 font-bold p-1">Edit Favorite Animal</h5>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Config;