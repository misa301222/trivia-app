import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import authService from "../../Services/auth.service";

interface Feeling {
    feelingId: number,
    feelingDescription: string,
    feelingImageURL: string
}

const UserProfileURL = 'https://localhost:7025/api/UserProfiles';
const FeelingsURL = 'https://localhost:7025/api/Feelings';

function PostCard({ data }: any) {
    const [imageURL, setImageURL] = useState<string>('');
    const [feeling, setFeeling] = useState<Feeling>();

    const getUserProfileByEmail = async () => {
        await axios.get(`${UserProfileURL}/GetUserProfileByEmail/${data.postedBy}`).then(response => {
            setImageURL(response.data.imageURL);
        });
    }

    const getFeelingById = async (feelingId: number) => {
        await axios.get(`${FeelingsURL}/${feelingId}`).then(response => {
            setFeeling(response.data);
        });
    }

    useEffect(() => {
        getUserProfileByEmail();
        getFeelingById(data.feelingId);
    }, [data]);

    return (
        <div className="shadow-md shadow-black bg-neutral-900 w-full p-5 mb-10">
            <div className="container">
                <div className="flex flex-row mb-10">
                    <div className="w-1/4">
                        <Link to={`/seeUserProfile/${data.postedBy}`}>
                            {/*                             
                            <motion.img
                                whileHover={{
                                    scale: 1.1
                                }}

                                transition={{
                                    type: 'spring'
                                }}
                                src={imageURL} className='h-40 m-auto rounded-full' /> */}
                            <motion.div
                                whileHover={{
                                    scale: 1.1
                                }}
                                transition={{
                                    type: 'spring'
                                }}
                                className='bg-cover w-40 h-40 m-auto rounded-full shadow-md shadow-black'
                                style={{
                                    backgroundImage: `url(${imageURL})`
                                }}>

                            </motion.div>
                        </Link>
                    </div>

                    <div className="w-full">
                        <div className="flex flex-row justify-start">
                            <Link to={`/seeUserProfile/${data.postedBy}`}>
                                <h5 className="text-2xl font-bold text-amber-500 ease-in-out duration-300 hover:text-amber-700">{data.postedBy}</h5>
                            </Link>

                        </div>

                        <div className="flex flex-row justify-start">
                            <small className="font-bold text-slate-300"><u>{moment(data.datePosted).format('MM/DD/YYYY HH:mm')}</u></small>
                        </div>

                        <div className="flex flex-row justify-start">
                            <small className="font-bold text-slate-300">&mdash; Feeling {feeling?.feelingDescription} </small>
                            <img src={feeling?.feelingImageURL} className='w-5 rounded-md ml-2' />
                        </div>
                    </div>
                </div>

                {
                    data.imageURL ?
                        <div className="p-5 w-5/6 flex flex-row justify-start m-auto">
                            <h5 className="font-bold text-slate-300">{data.content}</h5>
                        </div>
                        :
                        <div className="h-60">
                            <div className={`rounded-md p-5 w-5/6 h-40 flex flex-col justify-center m-auto`} style={{ backgroundColor: `${data.backgroundColorHex}` }}>
                                <h5 className="font-bold text-slate-300 text-2xl" style={{ color: `${data.letterColorHex}` }}>{data.content}</h5>
                            </div>
                        </div>
                }

                {
                    data.imageURL ? (
                        <div className="flex flex-row justify-center mb-3">
                            <div className="bg-neutral-300 p-5">
                                <img src={data.imageURL} className='w-[25rem]' />
                            </div>
                        </div>
                    ) :
                        null
                }
            </div >
        </div >
    )

}

export default PostCard;