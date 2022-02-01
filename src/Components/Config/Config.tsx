import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { duration } from "moment";
import { Link } from "react-router-dom";

function Config() {
    return (
        <div className="container">
            <div className="mt-40">
                <div className="flex flex-wrap gap-2">
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
                </div>
            </div>
        </div>
    )
}

export default Config;