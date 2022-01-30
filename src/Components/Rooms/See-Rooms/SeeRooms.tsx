import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import authService from "../../../Services/auth.service";

const RoomURL = 'https://localhost:7025/api/Rooms';

interface Room {
    generatedName: string,
    createdBy: string,
    dateCreated: Date
}

interface User {
    email: string,
    fullName: string,
    roles: string
}

function SeeRooms() {
    const [roomsCreatedByUser, setRoomsCreatedByUser] = useState<Room[]>();

    const getRoomsCreatedByUser = async () => {
        let user: User = authService.getUser;
        if (user?.email) {
            let email: string = user.email;
            await axios.get(`${RoomURL}/GetRoomsByEmail/${email}`).then(response => {
                setRoomsCreatedByUser(response.data);
                // console.log(response.data);
            });
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
                </div>

                <div className="flex flex-wrap mt-20 gap-14">
                    {
                        roomsCreatedByUser?.length ?
                            roomsCreatedByUser.map((element: Room, index: number) => (
                                <div key={index} className="h-60 bg-neutral-600 w-56 rounded-lg shadow-lg shadow-black cursor-pointer ease-in-out duration-300 hover:scale-110" onClick={() => handleCopiedText(element.generatedName)}>
                                    <div className="flex flex-col justify-center">
                                        <div className=" mt-1">
                                            <h5 className="font-bold text-xl text-sky-200">Room Name</h5>
                                        </div>
                                        <div className="mb-4">
                                            <h5 className="font-bold text-3xl text-slate-300">{element.generatedName}</h5>
                                        </div>

                                        <div className="mb-4">
                                            <h5 className="font-bold text-xl">{element.dateCreated ? moment(element.dateCreated).format('MM/DD/YYYY HH:mm') : null}</h5>
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

        </div>
    )
}

export default SeeRooms;