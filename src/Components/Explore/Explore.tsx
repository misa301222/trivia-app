import { faCompass, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

interface Room {
    roomId: number,
    generatedName: string,
    createdBy: string,
    dateCreated: Date,
    questionQuantity?: number
}

const RoomURL = 'https://localhost:7025/api/Rooms';
const QuestionURL = 'https://localhost:7025/api/Questions';

function Explore() {
    const [lastRooms, setLastRooms] = useState<Room[]>();
    const [rooms, setRooms] = useState<Room[]>();
    const [search, setSearch] = useState<string>('');

    const getLastFiveCreatedRooms = async () => {
        let rooms: Room[];
        await axios.get(`${RoomURL}/GetLastFiveCreatedRooms`).then(response => {
            rooms = response.data;
        });

        if (rooms!) {
            for (let i = 0; i < rooms.length; i++) {
                await axios.get(`${QuestionURL}/GetQuestionsByRoomId/${rooms[i].roomId}`).then(response => {
                    rooms[i].questionQuantity = response.data.length;
                });
            }

            setLastRooms(rooms);
        }
    }

    const handleOnSubmitSearch = async (event: SyntheticEvent) => {
        event.preventDefault();
        let rooms: Room[];
        await axios.get(`${RoomURL}/GetRoomsByEmailLike/${search}`).then(response => {
            rooms = response.data;
        });

        if (rooms!) {
            for (let i = 0; i < rooms.length; i++) {
                await axios.get(`${QuestionURL}/GetQuestionsByRoomId/${rooms[i].roomId}`).then(response => {
                    rooms[i].questionQuantity = response.data.length;
                });
            }

            setRooms(rooms);
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

    const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        getLastFiveCreatedRooms();
    }, []);

    return (
        <div className="container">
            <div className="mt-10">
                <h1 className="header">Explore <FontAwesomeIcon icon={faCompass} /></h1>
            </div>

            <div className="mt-20">
                <h2 className="header text-amber-500">Last Created Rooms</h2>
            </div>

            <div className="flex flex-wrap mt-20 gap-14 mb-40">
                {
                    lastRooms?.map((element: Room, index: number) => (
                        <div key={index}>
                            <div className="h-60 bg-neutral-900 w-56 shadow-md shadow-black cursor-pointer ease-in-out duration-300 hover:scale-110" onClick={() => handleCopiedText(element.generatedName)}>
                                <div className="flex flex-col justify-center">
                                    <div className=" mt-1">
                                        <h5 className="font-bold text-xl text-cyan-500">Room Name</h5>
                                    </div>
                                    <div className="mb-4">
                                        <h5 className="font-bold text-3xl text-slate-300">{element.generatedName}</h5>
                                    </div>

                                    <div className="mb-2">
                                        <h5 className="font-bold text-xl">{element.dateCreated ? moment(element.dateCreated).format('MM/DD/YYYY HH:mm') : null}</h5>
                                    </div>

                                    <div className="p-2">
                                        <h5 className="font-bold text-xl ">By: {element.createdBy}</h5>
                                    </div>

                                    <div className="mt-1">
                                        <h5 className="font-bold text-xl text-red-400">Total Questions: {element.questionQuantity}</h5>
                                    </div>
                                </div>
                            </div>
                            <Link to={`/enterRoom/${element.generatedName}/${element.roomId}`}>
                                <button type="button" disabled={element.questionQuantity! <= 0 ? true : false} className="btn-secondary mt-5">Join Room</button>
                            </Link>
                        </div>
                    ))
                }
            </div>

            <div className="mt-10">
                <h2 className="header text-amber-500">Search by Username</h2>
            </div>

            <form onSubmit={handleOnSubmitSearch} className="w-7/12 m-auto mt-10 h-[7rem] bg-neutral-700 shadow-lg shadow-black flex flex-col align-middle justify-center">
                <div className="flex flex-row justify-evenly">
                    <div className="w-8/12">
                        <input value={search} onChange={handleOnChangeSearch} type='text' maxLength={250} className="form-control w-full" placeholder="Search By User.." />
                    </div>

                    <div className="w-1/12">
                        <button type="submit" className="btn-primary w-8/12"><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                </div>
            </form>

            <div className="flex flex-wrap mt-20 gap-14 overflow-y-auto h-[40rem] mb-40 p-5">
                {
                    rooms?.map((element: Room, index: number) => (
                        <div key={index}>
                            <motion.div
                                initial={{
                                    opacity: 0
                                }}

                                animate={{
                                    opacity: 1
                                }}

                                whileHover={{
                                    scale: 1.1
                                }}

                                transition={{
                                    type: 'spring',
                                }}
                                className="h-60 bg-neutral-900 w-56 shadow-md shadow-black cursor-pointer" onClick={() => handleCopiedText(element.generatedName)}>
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

                                    <div className="p-2">
                                        <h5 className="font-bold text-xl ">{element.createdBy}</h5>
                                    </div>

                                    <div className="mt-2">
                                        <h5 className="font-bold text-xl text-red-400">Total Questions: {element.questionQuantity}</h5>
                                    </div>
                                </div>
                            </motion.div>
                            <Link to={`/enterRoom/${element.generatedName}/${element.roomId}`}>
                                <button type="button" className="btn-secondary mt-5" disabled={element.questionQuantity! <= 0 ? true : false}>Join Room</button>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Explore;