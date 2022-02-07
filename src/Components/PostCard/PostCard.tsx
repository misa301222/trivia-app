import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../Services/auth.service";

const UserProfileURL = 'https://localhost:7025/api/UserProfiles';
const UserPostURL = 'https://localhost:7025/api/UserPosts';

function PostCard({ data }: any) {
    const [imageURL, setImageURL] = useState<string>('');
    const [isOwnPost, setIsOwnPost] = useState<boolean>(false)

    const getUserProfileByEmail = async () => {
        await axios.get(`${UserProfileURL}/GetUserProfileByEmail/${data.postedBy}`).then(response => {
            setImageURL(response.data.imageURL);
        });

        if (data.postedBy === authService.getCurrentUser) {
            setIsOwnPost(true);
        }
    }

    const deletePost = async () => {
        await axios.delete(`${UserPostURL}/${data.userPostId}`).then(response => {
            console.log(response);
        });
    }


    useEffect(() => {
        getUserProfileByEmail();
    }, [data]);

    return (
        <div className="shadow-md shadow-black w-full p-5 mb-10">
            <div className="container">
                <div className="flex flex-row mb-10">
                    <div className="w-1/4">
                        <Link to={`/seeUserProfile/${data.postedBy}`}>
                            <motion.img
                                whileHover={{
                                    scale: 1.1
                                }}

                                transition={{
                                    type: 'spring'
                                }}
                                src={imageURL} className='h-40 m-auto' />
                        </Link>
                    </div>

                    <div className="w-full">
                        <div className="flex flex-row justify-start">
                            <Link to={`/seeUserProfile/${data.postedBy}`}>
                                <h5 className="font-bold text-amber-500 ease-in-out duration-300 hover:text-amber-700">{data.postedBy}</h5>
                            </Link>
                            {isOwnPost ?
                                <button type="button" onClick={async () => deletePost()} className="bg-red-700 rounded-md p-1 font-bold ml-auto">Delete Post</button>
                                : null
                            }
                        </div>

                        <div className="flex flex-row justify-start">
                            <small className="font-bold text-slate-300">{moment(data.datePosted).format('MM/DD/YYYY HH:mm')}</small>
                        </div>
                    </div>
                </div>

                {
                    data.imageURL ?
                        <div className="p-5 w-5/6 flex flex-row justify-start m-auto">
                            <h5 className="font-bold">{data.content}</h5>
                        </div>
                        :
                        <div className="h-60">
                            <div className={`p-5 w-5/6 h-40 flex flex-col justify-center m-auto`} style={{ backgroundColor: `${data.backgroundColorHex}` }}>
                                <h5 className="font-bold text-slate-300 text-2xl" style={{ color: `${data.letterColorHex}` }}>{data.content}</h5>
                            </div>
                        </div>
                }

                {
                    data.imageURL ? (
                        <div className="flex flex-row justify-center mb-3">
                            <img src={data.imageURL} className='w-[50rem]' />
                        </div>
                    ) :
                        null
                }
            </div >
        </div >
    )

}

export default PostCard;