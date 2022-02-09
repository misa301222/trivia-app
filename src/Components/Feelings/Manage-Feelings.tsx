import { faLaughBeam, faPencilAlt, faPlusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Feeling {
    feelingId: number,
    feelingDescription: string,
    feelingImageURL: string
}

const FeelingsURL = 'https://localhost:7025/api/Feelings';

function ManageFeelings() {
    const [feelings, setFeelings] = useState<Feeling[]>();
    const [showNewFeeling, setShowNewFeeling] = useState<boolean>(false);
    const [newFeeling, setNewFeeling] = useState<Feeling>({
        feelingId: 0,
        feelingDescription: '',
        feelingImageURL: ''
    });
    const [selectedFeeling, setSelectedFeeling] = useState<Feeling>({
        feelingId: 0,
        feelingDescription: '',
        feelingImageURL: ''
    });

    const getAllFeelings = async () => {
        await axios.get(`${FeelingsURL}`).then(response => {
            setFeelings(response.data)
        });
    }

    const handleOnChangeFeelingDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setNewFeeling(prev => ({ ...prev, feelingDescription: event.target.value }));
    }

    const handleOnChangeFeelingImageURL = (event: ChangeEvent<HTMLInputElement>) => {
        setNewFeeling(prev => ({ ...prev, feelingImageURL: event.target.value }));
    }

    const deleteFeelingById = async (feelingId: number) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${FeelingsURL}/${feelingId}`).then(response => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Feeling Deleted Succesfully!!!',
                        showConfirmButton: false,
                        timer: 900
                    }).then(() => {
                        getAllFeelings();
                    });
                });
            }
        });
    }

    const handleOnSubmitNewFeeling = async (event: SyntheticEvent) => {
        event.preventDefault();
        let feeling: Feeling = newFeeling;
        console.log(feeling);

        await axios.post(`${FeelingsURL}/`, feeling).then(response => {
            console.log(response);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Feeling Added Succesfully!!!',
                showConfirmButton: false,
                timer: 900
            }).then(() => {
                setShowNewFeeling(false);
                getAllFeelings();
            });
        });
    }

    useEffect(() => {
        getAllFeelings();
    }, []);

    return (
        <div className="container">
            <h1 className="header mt-10 mb-10">Manage Feelings <FontAwesomeIcon icon={faLaughBeam} /></h1>

            <div className="flex flex-row justify-end mb-5">
                <button onClick={() => setShowNewFeeling(true)} className="btn-primary w-44"><FontAwesomeIcon icon={faPlusSquare} /> Add New Feeling</button>
            </div>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg w-11/12 m-auto">
                <table className="min-w-full divide-gray-200">
                    <thead className="bg-neutral-900 text-slate-300">
                        <tr className="h-10">
                            <th>Feeling Id</th>

                            <th>Feeling Description</th>

                            <th>Feeling ImageURL</th>

                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            feelings?.map((element: Feeling, index: number) => (
                                <tr key={index} className='bg-gray-300 text-black h-12 font-bold text-xl'>
                                    <td>
                                        {element.feelingId}
                                    </td>

                                    <td>
                                        {element.feelingDescription}
                                    </td>

                                    <td>
                                        {element.feelingImageURL}
                                    </td>

                                    <td className="flex flex-row justify-evenly p-2">
                                        <button type="button" className="bg-yellow-400 hover:bg-amber-700 rounded-lg shadow-md shadow-black w-10 p-1 ease-in-out duration-300"><FontAwesomeIcon icon={faPencilAlt} /></button>
                                        <button type="button" onClick={async () => deleteFeelingById(element.feelingId)} className="bg-red-700 hover:bg-red-800 rounded-lg shadow-md shadow-black w-10 p-1 ease-in-out duration-300"><FontAwesomeIcon icon={faTrashAlt} /></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>

            {
                showNewFeeling ?
                    <div id="modalJoinRoom" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black/50">
                        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-40">
                            <div className="relative bg-[#505d75] rounded-lg shadow dark:bg-gray-700">
                                <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-white lg:text-2xl dark:text-white">
                                        New Feeling
                                    </h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowNewFeeling(false)}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                                <div className="p-6">
                                    <form onSubmit={handleOnSubmitNewFeeling}>
                                        <div className="mb-3">
                                            <label className="block text-start font-bold mb-2">Feeling Description</label>
                                            <input onChange={handleOnChangeFeelingDescription} type='text' className='form-control' maxLength={50} />
                                        </div>

                                        <div className="mb-5">
                                            <label className="block text-start font-bold mb-2">Image URL (Optional)</label>
                                            <input onChange={handleOnChangeFeelingImageURL} type='text' className='form-control' maxLength={256} />
                                        </div>

                                        <div className="mb-3">
                                            <button type="submit" className="btn-primary">Accept</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                    <button onClick={() => setShowNewFeeling(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }

        </div>
    )
}

export default ManageFeelings;