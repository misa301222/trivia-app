import { faFire, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ActivityCategory } from "../../../constants/enums/ActivityCategory";
import authService from "../../../Services/auth.service";

interface Activity {
    activityId: number,
    email: string,
    activityDescription: string,
    category: string,
    dateActivity: Date
}

const RoomURL = 'https://localhost:7025/api/Rooms';
const ActivitiesURL = 'https://localhost:7025/api/Activities'
const QuestionURL = 'https://localhost:7025/api/Questions';

interface Room {
    roomId: string,
    generatedName: string,
    createdBy: string,
    dateCreated: Date,
    questionQuantity?: number
}

interface User {
    email: string,
    fullName: string,
    roles: string
}

function SeeRooms() {
    const [roomsCreatedByUser, setRoomsCreatedByUser] = useState<Room[]>();
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [roomToDelete, setRoomToDelete] = useState<string>('');

    const showDeleteModal = () => {
        setRoomToDelete('');
        setShowDelete(true);
    }

    const getRoomsCreatedByUser = async () => {
        let user: User = authService.getUser;
        if (user?.email) {
            let email: string = user.email;
            let rooms: Room[];
            await axios.get(`${RoomURL}/GetRoomsByEmail/${email}`).then(response => {
                rooms = response.data;
            });

            if (rooms!) {
                for (let i = 0; i < rooms.length; i++) {
                    await axios.get(`${QuestionURL}/GetQuestionsByRoomId/${rooms[i].roomId}`).then(response => {
                        rooms[i].questionQuantity = response.data.length;
                    });
                }

                setRoomsCreatedByUser(rooms);
            }

        }
    }

    const handleCopiedText = (generatedName: string) => {
        navigator.clipboard.writeText(generatedName);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Room Name Copied to Clipboard!',
            showConfirmButton: false,
            timer: 900
        });
    }

    const handleOnChangeRoomToDelete = (event: ChangeEvent<HTMLInputElement>) => {
        setRoomToDelete(event.target.value);
    }

    const handleOnSubmitDeleteRoom = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (roomToDelete) {
            let room: Room = {
                roomId: '',
                generatedName: '',
                dateCreated: new Date,
                createdBy: ''
            };

            await axios.get(`${RoomURL}/GetRoomsByGeneratedName/${roomToDelete}`).then(response => {
                room = response.data;
            });

            if (room.roomId) {
                await axios.delete(`${QuestionURL}/DeleteQuestionsByRoomId/${room.roomId}`);
                await axios.delete(`${RoomURL}/${room.roomId}`);

                let activity: Activity = {
                    activityId: 0,
                    email: authService.getCurrentUser!,
                    activityDescription: ActivityCategory.DELETED_ROOM,
                    category: 'ROOM',
                    dateActivity: new Date()
                }

                await axios.post(`${ActivitiesURL}/`, activity).then(response => {
                    console.log(response);
                });

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Room Deleted Succesfully!',
                    showConfirmButton: true,
                }).then(() => {
                    setRoomToDelete('');
                    getRoomsCreatedByUser();
                });

            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'That Room does not exists!',
                    showConfirmButton: true,
                });
            }
        }
    }

    useEffect(() => {
        getRoomsCreatedByUser();
    }, []);

    return (
        <div>
            <div className="container mt-10">
                <div className="flex flex-col items-center">
                    <div className="bg-neutral-900 h-14 w-1/4 rounded-lg shadow-lg shadow-cyan-500/50 ease-in-out duration-300 hover:shadow-orange-500/50 hover:scale-110 cursor-default">
                        <h2 className="font-bold p-2 text-slate-300">Rooms Created By You</h2>
                    </div>

                    <div className="mt-10">
                        <small className="font-bold text-slate-200"><u>Click any card to copy the Room Name.</u></small>
                    </div>

                    <div className="flex flex-row justify-end w-full">
                        <button onClick={() => showDeleteModal()} className="font-bold bg-red-800 p-2 rounded-lg shadow-md shadow-black ease-in-out duration-300 hover:text-neutral-200 hover:bg-red-900">Delete Room</button>
                    </div>
                </div>

                <div className="flex flex-wrap mt-20 gap-14">
                    {
                        roomsCreatedByUser?.length ?
                            roomsCreatedByUser.map((element: Room, index: number) => (
                                <div key={index} className="h-60 bg-neutral-900 w-56 shadow-md shadow-black cursor-pointer ease-in-out duration-300 hover:scale-110" onClick={() => handleCopiedText(element.generatedName)}>
                                    <div className="flex flex-col justify-center">
                                        <div className=" mt-1">
                                            <h5 className="font-bold text-xl text-cyan-500">Room Name</h5>
                                        </div>
                                        <div className="mb-4">
                                            <h5 className="font-bold text-3xl text-slate-300">{element.generatedName}</h5>
                                        </div>

                                        <div className="mb-4">
                                            <h5 className="font-bold text-xl">{element.dateCreated ? moment(element.dateCreated).format('MM/DD/YYYY HH:mm') : null}</h5>
                                        </div>

                                        <div className="mt-16">
                                            <h5 className="font-bold text-xl">Total Questions: {element.questionQuantity}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div className="container">
                                <h2 className="text-red-500/90 font-bold text-center">Whoops!!! It seems there's no rooms.</h2>
                                <br></br>
                                <div className="flex flex-row justify-center w-2/4 m-auto gap-14 ease-in-out duration-300 text-red-500/60 hover:text-orange-500">
                                    <FontAwesomeIcon icon={faFire} style={{ fontSize: '4em' }} />
                                    <FontAwesomeIcon icon={faFire} style={{ fontSize: '4em' }} />
                                    <FontAwesomeIcon icon={faFire} style={{ fontSize: '4em' }} />
                                </div>
                            </div>
                    }

                </div>
            </div>

            {
                showDelete ?
                    <div id="modalJoinRoom" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black/50">
                        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-40">
                            <div className="relative bg-[#505d75] rounded-lg shadow dark:bg-gray-700">
                                <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-white lg:text-2xl dark:text-white">
                                        Delete Room
                                    </h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowDelete(false)}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                                <div className="p-6">
                                    <form onSubmit={handleOnSubmitDeleteRoom}>
                                        <div className="mb-3">
                                            <label className="block font-bold text-slate-300 text-2xl">Room Name</label>
                                            <input value={roomToDelete} onChange={handleOnChangeRoomToDelete} className='form-control' type='text' maxLength={250} />
                                        </div>

                                        <div className="mb-3">
                                            <button disabled={!roomToDelete.length} className="btn-danger"><FontAwesomeIcon icon={faTrash} /> Delete</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                    <button onClick={() => setShowDelete(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }

        </div>
    )
}

export default SeeRooms;