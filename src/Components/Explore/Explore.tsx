import { faCompass, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Room {
    roomId: number,
    generatedName: string,
    createdBy: string,
    dateCreated: Date
}

const RoomURL = 'https://localhost:7025/api/Rooms';

function Explore() {
    const [lastRooms, setLastRooms] = useState<Room[]>();
    const [rooms, setRooms] = useState<Room[]>();
    const [search, setSearch] = useState<string>('');

    const getLastFiveCreatedRooms = async () => {
        await axios.get(`${RoomURL}/GetLastFiveCreatedRooms`).then(response => {
            setLastRooms(response.data);
        });
    }

    const handleOnSubmitSearch = async (event: SyntheticEvent) => {
        event.preventDefault();

        await axios.get(`${RoomURL}/GetRoomsByEmailLike/${search}`).then(response => {
            setRooms(response.data);
        });

        // setSearch('');
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
                <h2 className="header">Last Created Rooms</h2>
            </div>

            <div className="flex flex-wrap mt-20 gap-14 mb-40">
                {
                    lastRooms?.map((element: Room, index: number) => (
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
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="mt-10">
                <h2 className="header">Search by Username</h2>
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

            <div className="flex flex-wrap mt-20 gap-14">
                {
                    rooms?.map((element: Room, index: number) => (
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
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Explore;