import { faEnvelope, faMapMarker, faMapMarkerAlt, faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { motion } from "framer-motion";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";

interface UserProfile {
    email: string,
    imageURL: string,
    coverURL: string,
    location: string,
    aboutMeHeader: string,
    aboutMeDescription: string
}

const UserProfileURL = 'https://localhost:7025/api/UserProfiles';

function SearchUsers() {
    const [search, setSearch] = useState('');
    const [userProfiles, setUserProfiles] = useState<UserProfile[] | null>();

    const handleOnSubmitSearch = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (search) {
            await axios.get(`${UserProfileURL}/GetUserProfileByEmailLike/${search}`).then(response => {
                console.log(response.data);
                setUserProfiles(response.data);
            });
        } else {
            setUserProfiles(null);
        }
    }

    const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    return (
        <div className="container">
            <div className="mt-10">
                <h1 className="font-bold">Search Users <FontAwesomeIcon icon={faUsers} /></h1>
            </div>

            <form onSubmit={handleOnSubmitSearch} className="w-7/12 m-auto mt-10 h-[7rem] bg-neutral-700 rounded-lg shadow-lg shadow-black flex flex-col align-middle justify-center">
                <div className="flex flex-row justify-evenly">
                    <div className="w-8/12">
                        <input onChange={handleOnChangeSearch} type='text' maxLength={250} className="form-control w-full" />
                    </div>

                    <div className="w-1/12">
                        <button type="submit" className="btn-primary w-8/12"><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                </div>
            </form>

            <div className="mt-20">
                <div className="flex flex-wrap gap-20">
                    {
                        userProfiles ?
                            userProfiles.map((element: UserProfile, index: number) => (
                                <Link key={index} to={`/seeUserProfile/${element.email}`}>
                                    <motion.div
                                        initial={{
                                            scale: 0
                                        }}

                                        animate={{
                                            scale: 1
                                        }}

                                        whileHover={{
                                            scale: 1.1
                                        }}

                                        transition={{
                                            type: 'spring'
                                        }}
                                        className="h-[24rem] w-[20rem] bg-[#cccccc] shadow-lg shadow-black rounded-lg cursor-pointer">
                                        <div className="h-[10rem] bg-cover flex flex-row rounded-t-lg" style={{ backgroundImage: `url(${element.coverURL})` }}>
                                            <div className="w-full mt-16">
                                                <img src={element.imageURL} className="h-[8rem] w-[10rem] m-auto rounded-md shadow-black shadow-lg" />
                                            </div>
                                        </div>
                                        <div className="mt-12 flex flex-col p-2">
                                            <h5 className="font-bold text-black text-2xl"><FontAwesomeIcon icon={faEnvelope} /> {element.email}</h5>
                                            <h5 className="font-bold text-black"><FontAwesomeIcon icon={faMapMarkerAlt} /> {element.location}</h5>
                                            <h5 className="font-bold text-black">{element.aboutMeHeader}</h5>
                                            <div className="h-[6rem] overflow-y-auto mt-2 p-1">
                                                <p className="font-bold text-black text-sm text-left">{element.aboutMeDescription}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))
                            :
                            <div>

                            </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default SearchUsers;