import { faComment, faComments, faHeart, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ActivityCategory } from "../../constants/enums/ActivityCategory";
import authService from "../../Services/auth.service";

interface Feeling {
    feelingId: number,
    feelingDescription: string,
    feelingImageURL: string
}

interface Comment {
    commentId: number,
    userPostId: number,
    commentedBy: string,
    commentContent: string,
    imageURL: string,
    dateComment: Date,
    commentedByImageURL?: string,
    canEdit?: boolean
}

interface UserLike {
    email: string,
    userPostId: number
}

interface Activity {
    activityId: number,
    email: string,
    activityDescription: string,
    category: string,
    dateActivity: Date
}

const UserProfileURL = 'https://localhost:7025/api/UserProfiles';
const FeelingsURL = 'https://localhost:7025/api/Feelings';
const CommentURL = 'https://localhost:7025/api/Comments'
const UserLikeURL = 'https://localhost:7025/api/UserLikes'
const ActivitiesURL = 'https://localhost:7025/api/Activities'

function PostCard({ data }: any) {
    const [imageURL, setImageURL] = useState<string>('');
    const [currentImageURL, setCurrentImageURL] = useState<string>('');
    const [feeling, setFeeling] = useState<Feeling>();
    const [showNewComment, setShowNewComment] = useState<boolean>(false);
    const [newComment, setNewComment] = useState<Comment>({
        commentId: 0,
        userPostId: data.userPostId,
        commentedBy: '',
        commentContent: '',
        imageURL: '',
        dateComment: new Date()
    });
    const [comments, setComments] = useState<Comment[]>();
    const [areCommentsHidden, setAreCommentsHidden] = useState<boolean>(true);
    const [likes, setLikes] = useState<UserLike[]>([]);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [showLikeModal, setShowLikeModal] = useState<boolean>(false);

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    }

    const getUserProfileByEmail = async () => {
        await axios.get(`${UserProfileURL}/GetUserProfileByEmail/${data.postedBy}`).then(response => {
            setImageURL(response.data.imageURL);
        });
    }

    const getCurrentUserImage = async () => {
        let currentUser = authService.getCurrentUser;
        await axios.get(`${UserProfileURL}/GetUserProfileByEmail/${currentUser}`).then(response => {
            setCurrentImageURL(response.data.imageURL);
        });
    }

    const getFeelingById = async (feelingId: number) => {
        await axios.get(`${FeelingsURL}/${feelingId}`).then(response => {
            setFeeling(response.data);
        });
    }

    const handleOnChangeCommentContent = (event: ChangeEvent<HTMLInputElement>) => {
        setNewComment(prev => ({ ...prev, commentContent: event.target.value }));
    }

    const getCommentsByUserPostId = async (userPostId: number) => {
        let comments: Comment[] = [];
        await axios.get(`${CommentURL}/GetCommentsByUserPostId/${userPostId}`).then(response => {
            // setComments(response.data);
            comments = response.data;
            // console.log(userPostId, response.data);
        });

        let currentUser = authService.getCurrentUser;

        if (comments) {
            for (let i = 0; i < comments!.length; i++) {
                await axios.get(`${UserProfileURL}/GetUserProfileByEmail/${comments![i].commentedBy}`).then(response => {
                    comments[i].commentedByImageURL = response.data.imageURL;
                });
                comments[i].canEdit = false;
                if (currentUser === comments[i].commentedBy || currentUser === data.postTarget) {
                    comments[i].canEdit = true;
                }
            }
            setComments(comments);
            // console.log(comments);
        }
        // console.log(comments);
    }

    const handleOnSubmitNewComment = async (event: SyntheticEvent) => {
        event.preventDefault();
        let currentUser = authService.getCurrentUser;

        let comment: Comment = newComment;
        comment.userPostId = data.userPostId;
        comment.commentedBy = currentUser!;
        comment.dateComment = new Date();

        await axios.post(`${CommentURL}/`, comment).then(response => {
            console.log(response);
        });

        let activity: Activity = {
            activityId: 0,
            email: authService.getCurrentUser!,
            activityDescription: ActivityCategory.CREATED_COMMENT,
            category: 'COMMENT',
            dateActivity: new Date()
        }

        await axios.post(`${ActivitiesURL}/`, activity).then(response => {
            console.log(response);
        });

        getCommentsByUserPostId(data.userPostId);
        setNewComment(prev => ({ ...prev, commentContent: '' }))
        setAreCommentsHidden(false);
    }

    const deleteCommentById = async (element: Comment) => {
        Swal.fire({
            title: 'Delete post?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${CommentURL}/${element.commentId}`).then(() => {
                    Swal.fire(
                        'Deleted!',
                        'The post was deleted successfully!',
                        'success'
                    ).then(() => {
                        getCommentsByUserPostId(element.userPostId);
                    });
                });

                let activity: Activity = {
                    activityId: 0,
                    email: authService.getCurrentUser!,
                    activityDescription: ActivityCategory.DELETED_COMMENT,
                    category: 'COMMENT',
                    dateActivity: new Date()
                }

                await axios.post(`${ActivitiesURL}/`, activity).then(response => {
                    console.log(response);
                });
            }
        });
    }

    const checkIsLiked = async (userPostId: number) => {
        let email = authService.getCurrentUser;
        if (email) {
            await axios.get(`${UserLikeURL}/GetLikeByEmailAndUserPostId/${email}/${userPostId}`).then(response => {
                if (response.data) {
                    setIsLiked(true);
                }
            });
        }
    }

    const handleLikeUserPostId = async (userPostId: number) => {
        let email = authService.getCurrentUser;
        if (email) {
            let exists: boolean = false;
            await axios.get(`${UserLikeURL}/GetLikeByEmailAndUserPostId/${email}/${userPostId}`).then(response => {
                if (response.data) {
                    exists = true;
                }
            });

            if (exists) {
                await axios.delete(`${UserLikeURL}/DeleteUserLikeByEmailAndUserPostId/${email}/${userPostId}`).then(response => {
                    setIsLiked(false);
                });

                let activity: Activity = {
                    activityId: 0,
                    email: authService.getCurrentUser!,
                    activityDescription: ActivityCategory.UNLIKE,
                    category: 'UNLIKE',
                    dateActivity: new Date()
                }

                await axios.post(`${ActivitiesURL}/`, activity).then(response => {
                    console.log(response);
                });

            } else {
                let userLike: UserLike = {
                    email: email,
                    userPostId: userPostId
                };

                await axios.post(`${UserLikeURL}/`, userLike).then(response => {
                    setIsLiked(true);
                });

                let activity: Activity = {
                    activityId: 0,
                    email: authService.getCurrentUser!,
                    activityDescription: ActivityCategory.LIKE,
                    category: 'LIKE',
                    dateActivity: new Date()
                }

                await axios.post(`${ActivitiesURL}/`, activity).then(response => {
                    console.log(response);
                });
            }

            getAllUserLikesByUserPostId(userPostId);
        }
    }

    const getAllUserLikesByUserPostId = async (userPostId: number) => {
        await axios.get(`${UserLikeURL}/GetAllUserLikesByUserPostId/${userPostId}`).then(response => {
            setLikes(response.data);
        });
    }

    useEffect(() => {
        getUserProfileByEmail();
        getFeelingById(data.feelingId);
        getCommentsByUserPostId(data.userPostId);
        getCurrentUserImage();
        checkIsLiked(data.userPostId);
        getAllUserLikesByUserPostId(data.userPostId);
        console.log('d: ' + JSON.stringify(data));
    }, [data]);

    return (
        <div>
            <div className="shadow-md shadow-black bg-neutral-900 w-full p-5 mb-10">
                <div className="container">
                    <div className="flex flex-row mb-10">
                        <div className="w-1/4">
                            <Link to={`/seeUserProfile/${data.postedBy}`}>
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

                            {
                                feeling?.feelingDescription !== 'None' ?
                                    <div className="flex flex-row justify-start">
                                        <small className="font-bold text-slate-300">&mdash; Feeling {feeling?.feelingDescription} </small>
                                        <img src={feeling?.feelingImageURL} className='w-5 rounded-md ml-2' />
                                    </div>
                                    : null
                            }
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
                            <div className="flex flex-row justify-center mb-8">
                                <div className="bg-neutral-300 p-5">
                                    <img src={data.imageURL} className='w-[25rem]' />
                                </div>
                            </div>
                        ) :
                            null
                    }
                </div>


                <div className="bg-neutral-900 p-3">
                    <div className=" border-t-2 border-neutral-600 border-b-2 p-2">
                        <div className="flex flex-row w-1/2 m-auto">
                            <button type="button" onClick={async () => handleLikeUserPostId(data.userPostId)} className="btn-tertiary ease-in-out duration-300 hover:text-cyan-400" style=
                                {{
                                    color: `${isLiked ? '#00FFFF' : ''}`,
                                    borderColor: `${isLiked ? '#00FFFF' : ''}`
                                }}><FontAwesomeIcon icon={faHeart} /> Like</button>
                            <button type="button" onClick={() => setShowNewComment(!showNewComment)} className="btn-tertiary ease-in-out duration-300 hover:text-cyan-400">
                                <FontAwesomeIcon icon={faComment} /> Comment</button>
                        </div>

                        {
                            likes?.length > 0 ?
                                <div className="mt-2">
                                    <h5 onClick={() => setShowLikeModal(true)} className="font-bold text-amber-500 ease-in-out duration-300 hover:text-cyan-500 cursor-pointer"><FontAwesomeIcon icon={faHeart} /> See Likes </h5>
                                </div>
                                : null
                        }
                    </div>

                    <div className="mt-5">
                        {
                            showNewComment ?
                                <div className="container">
                                    <form onSubmit={handleOnSubmitNewComment} className="w-full">
                                        <div className="flex flex-row w-1/2 m-auto bg-neutral-900 p-2 shadow-md shadow-black">
                                            <div className="w-14 h-14 rounded-full bg-cover mr-10" style={{ backgroundImage: `url(${currentImageURL})` }}>
                                            </div>

                                            <div className="w-9/12 flex flex-col justify-center">
                                                <input value={newComment.commentContent} onChange={handleOnChangeCommentContent} className="form-control w-full" maxLength={256} placeholder='Type what you are thinking...' />
                                            </div>

                                            <div className="w-1/12 flex flex-col justify-center">
                                                <button type="submit" className="btn-primary w-4/5">Send</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                : null
                        }
                    </div>



                    <motion.div layout transition={spring} className="rounded-md mt-5 p-2">
                        <div className="flex flex-col align-middle justify-center mb-5">
                            <button onClick={() => setAreCommentsHidden(!areCommentsHidden)} type="button" className="m-auto mb-5 ease-in-out duration-300 hover:text-cyan-400 btn-tertiary bg-neutral-900">
                                <FontAwesomeIcon icon={faComments} />
                                {areCommentsHidden ? ' Show' : ' Hide'} Comments</button>
                            <div className="w-5/6 m-auto border-b border-[1px] border-slate-600 mb-3"></div>
                        </div>

                        {
                            !areCommentsHidden ?
                                comments?.length ?
                                    comments.map((element: Comment, index: number) => (
                                        <div
                                            key={index}>
                                            {
                                                element.canEdit ?
                                                    <div className="flex flex-row justify-end w-1/2 m-auto mb-2">
                                                        <button onClick={async () => deleteCommentById(element)} className="font-bold text-xl text-red-600 hover:text-red-800 ease-in-out duration-300 ml-auto">
                                                            <FontAwesomeIcon icon={faMinusCircle} /></button>
                                                    </div>
                                                    : null
                                            }
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    duration: 2.2,
                                                    type: 'spring'
                                                }}
                                                className="flex flex-row w-1/2 m-auto mb-5 bg-neutral-900 p-2 rounded-lg shadow-md shadow-black">
                                                <div className="w-14 h-14 rounded-full bg-cover mr-10" style={{ backgroundImage: `url(${element.commentedByImageURL})` }}>
                                                </div>

                                                <div className="flex flex-col w-full">

                                                    <div className="font-bold text-amber-500 ease-in-out duration-300 hover:text-amber-700 cursor-pointer">
                                                        <Link to={`/seeUserProfile/${element.commentedBy}`}>
                                                            <h5 className="font-bold text-left">{element.commentedBy}</h5>
                                                        </Link>
                                                    </div>

                                                    <div className="">
                                                        <h5 className="text-slate-300 text-left font-bold">{element.commentContent}</h5>
                                                    </div>

                                                    <div className="flex flex-row justify-end w-full">
                                                        <small className="text-slate-300 text-left font-bold">{element.dateComment ? moment(element.dateComment).format('MM/DD/YYYY HH:mm') : null} </small>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    ))
                                    : <div>
                                        <h5 className="text-2xl font-bold text-red-700">It seems there's no comments</h5>
                                    </div>
                                :
                                null
                        }
                    </motion.div>

                </div>

            </div>

            {
                showLikeModal ?
                    <div id="modalJoinRoom" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black/50">
                        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-40">
                            <div className="relative bg-[#505d75] rounded-lg shadow dark:bg-gray-700">
                                <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-black lg:text-2xl dark:text-white">
                                        <FontAwesomeIcon icon={faHeart} /> Liked By
                                    </h3>
                                    <button type="button" className="text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowLikeModal(false)}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                                <div className="p-6 overflow-y-auto max-h-96">
                                    <ul>
                                        {
                                            likes.map((element: UserLike, index: number) => (
                                                <Link to={`/seeUserProfile/${element.email}`} key={index}>
                                                    <li className='font-bold text-amber-400 hover:text-amber-500'>
                                                        {element.email}
                                                    </li>
                                                </Link>
                                            ))
                                        }
                                    </ul>
                                </div>

                                <div className="mt-5 mb-5">
                                    <h5 className="text-xl text-amber-500 font-bold">Total Likes: {likes.length}</h5>
                                </div>
                                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                    <button onClick={() => setShowLikeModal(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Close</button>
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

export default PostCard;