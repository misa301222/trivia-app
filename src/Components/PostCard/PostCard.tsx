import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
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

const UserProfileURL = 'https://localhost:7025/api/UserProfiles';
const FeelingsURL = 'https://localhost:7025/api/Feelings';
const CommentURL = 'https://localhost:7025/api/Comments'

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
            }
        });
    }

    useEffect(() => {
        getUserProfileByEmail();
        getFeelingById(data.feelingId);
        getCommentsByUserPostId(data.userPostId);
        getCurrentUserImage();
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
                            <div className="flex flex-row justify-center mb-8">
                                <div className="bg-neutral-300 p-5">
                                    <img src={data.imageURL} className='w-[25rem]' />
                                </div>
                            </div>
                        ) :
                            null
                    }
                </div>
                <div className="flex flex-row w-1/2 m-auto">

                    <button type="button" className="btn-tertiary">Like</button>



                    <button type="button" onClick={() => setShowNewComment(!showNewComment)} className="btn-tertiary">Comment</button>

                </div>

                <div className="mt-5">
                    {
                        showNewComment ?
                            <div className="container">
                                <form onSubmit={handleOnSubmitNewComment} className="w-full">
                                    <div className="flex flex-row w-1/2 m-auto">
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



                <motion.div layout transition={spring} className="bg-neutral-800/10 rounded-md mt-5 p-2">
                    <div className="flex flex-col align-middle justify-center mb-5">
                        <button onClick={() => setAreCommentsHidden(!areCommentsHidden)} type="button" className="m-auto mb-5 btn-tertiary bg-neutral-900">
                            {areCommentsHidden ? 'Show' : 'Hide'} Comments</button>
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
                                                    <button onClick={async () => deleteCommentById(element)} className="w-[2rem] shadow-md shadow-black bg-red-800 ease-in-out duration-300 hover:bg-red-900 hover:text-slate-300 rounded-md p-1 font-bold ml-auto">
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
                                                    <h5 className="font-bold text-left">{element.commentedBy}</h5>
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
        </div >
    )

}

export default PostCard;