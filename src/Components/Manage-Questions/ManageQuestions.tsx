import { faPencilAlt, faQuestionCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { motion } from "framer-motion";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";

const RoomURL = 'https://localhost:7025/api/Rooms';
const QuestionURL = 'https://localhost:7025/api/Questions';

interface Room {
    roomId: number
    generatedName: string,
    createdBy: string,
    dateCreated: Date
}

interface Question {
    questionId: number,
    questionName: string,
    firstOption: string,
    secondOption: string,
    thirdOption: string,
    fourthOption: string,
    fifthOption: string,
    sixthOption: string,
    answer: string
    roomId: number
}

function ManageQuestions() {
    const [roomName, setRoomName] = useState<string>();
    const [currentRoom, setCurrentRoom] = useState<Room>();
    const [currentQuestions, setCurrentQuestions] = useState<Question[]>();
    const [newQuestion, setNewQuestion] = useState<Question>({
        questionId: 0,
        questionName: '',
        firstOption: '',
        secondOption: '',
        thirdOption: '',
        fourthOption: '',
        fifthOption: '',
        sixthOption: '',
        answer: '',
        roomId: 0
    });
    const [show, setShow] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showTable, setShowTable] = useState<boolean>(false);
    const [editQuestion, setEditQuestion] = useState<Question>({
        questionId: 0,
        questionName: '',
        firstOption: '',
        secondOption: '',
        thirdOption: '',
        fourthOption: '',
        fifthOption: '',
        sixthOption: '',
        answer: '',
        roomId: 0
    });

    //QUESTION HANDLERS EDIT
    const handleOnChangeEditQuestionName = (event: ChangeEvent<HTMLInputElement>) => {
        setEditQuestion(prev => ({ ...prev, questionName: event.target.value }));
    }

    const handleOnChangeEditFirstOption = (event: ChangeEvent<HTMLInputElement>) => {
        setEditQuestion(prev => ({ ...prev, firstOption: event.target.value }));
    }

    const handleOnChangeEditSecondOption = (event: ChangeEvent<HTMLInputElement>) => {
        setEditQuestion(prev => ({ ...prev, secondOption: event.target.value }));
    }

    const handleOnChangeEditThirdOption = (event: ChangeEvent<HTMLInputElement>) => {
        setEditQuestion(prev => ({ ...prev, thirdOption: event.target.value }));
    }

    const handleOnChangeEditFourthOption = (event: ChangeEvent<HTMLInputElement>) => {
        setEditQuestion(prev => ({ ...prev, fourthOption: event.target.value }));
    }

    const handleOnChangeEditFifthOption = (event: ChangeEvent<HTMLInputElement>) => {
        setEditQuestion(prev => ({ ...prev, fifthOption: event.target.value }));
    }

    const handleOnChangeEditSixthOption = (event: ChangeEvent<HTMLInputElement>) => {
        setEditQuestion(prev => ({ ...prev, sixthOption: event.target.value }));
    }

    const handleOnChangeEditAnswer = (event: ChangeEvent<HTMLInputElement>) => {
        setEditQuestion(prev => ({ ...prev, answer: event.target.value }));
    }

    const handleOnSubmitFormEdit = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (currentRoom) {
            let question: Question = editQuestion;
            question.roomId = currentRoom.roomId;

            let answer: string = question.answer;
            if (answer) {
                if (answer === editQuestion.firstOption || answer === editQuestion.secondOption || answer === editQuestion.thirdOption ||
                    answer === editQuestion.fourthOption || answer === editQuestion.fifthOption || answer === editQuestion.sixthOption) {
                    await axios.put(`${QuestionURL}/${editQuestion.questionId}`, editQuestion).then(response => {
                        console.log(response.data);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Question Edited Succesfully!!!',
                            showConfirmButton: false,
                            timer: 900
                        }).then(() => {
                            setShowEditModal(false);
                        });
                    });

                    await axios.get(`${QuestionURL}/GetQuestionsByRoomId/${currentRoom.roomId}`).then(response => {
                        setCurrentQuestions(response.data);
                    });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Answer is not in options!',
                        showConfirmButton: true,
                    });
                }
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'You must fill the Answer!',
                    showConfirmButton: true,
                });
            }


        }
    }

    const variants = {
        open: { opacity: 1, transform: 'scale(1)' },
        closed: { opacity: 0, transform: 'scale(0)' }
    }

    const handleOpenEditModal = (element: Question) => {
        setEditQuestion(element);
        setShowEditModal(true);
    }

    const handleOnSubmitForm = async (event: SyntheticEvent) => {
        event.preventDefault();
        let roomId: number = 0;
        let email: string = localStorage.getItem('email')!;
        if (email) {
            await axios.get(`${RoomURL}/GetRoomsByGeneratedNameAndEmail/${roomName}/${email}`).then(response => {
                setCurrentRoom(response.data);
                roomId = response.data.roomId;
                setShowTable(true);
            }).catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Whoops!<br> It seems the room name does not exist.<br>Or Maybe you did not create that room!! <br> Please try again :)',
                    showConfirmButton: true,
                }).then(() => {
                    setShowTable(false);
                });
            });

            if (roomId > 0) {
                await axios.get(`${QuestionURL}/GetQuestionsByRoomId/${roomId}`).then(response => {
                    setCurrentQuestions(response.data);
                });
            }
        }
    }

    const handleOnChangeRoomName = (event: ChangeEvent<HTMLInputElement>) => {
        setRoomName(event.target.value);
    }

    //QUESTION HANDLERS
    const handleOnChangeQuestionName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(prev => ({ ...prev, questionName: event.target.value }));
    }

    const handleOnChangeFirstOption = (event: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(prev => ({ ...prev, firstOption: event.target.value }));
    }

    const handleOnChangeSecondOption = (event: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(prev => ({ ...prev, secondOption: event.target.value }));
    }

    const handleOnChangeThirdOption = (event: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(prev => ({ ...prev, thirdOption: event.target.value }));
    }

    const handleOnChangeFourthOption = (event: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(prev => ({ ...prev, fourthOption: event.target.value }));
    }

    const handleOnChangeFifthOption = (event: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(prev => ({ ...prev, fifthOption: event.target.value }));
    }

    const handleOnChangeSixthOption = (event: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(prev => ({ ...prev, sixthOption: event.target.value }));
    }

    const handleOnChangeAnswer = (event: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(prev => ({ ...prev, answer: event.target.value }));
    }

    const handleQuestionFormSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (currentRoom) {

            //CHECK IF ANSWERS IS IN OPTIONS            
            let answer: string = newQuestion.answer;
            if (answer) {
                if (answer === newQuestion.firstOption || answer === newQuestion.secondOption || answer === newQuestion.thirdOption ||
                    answer === newQuestion.fourthOption || answer === newQuestion.fifthOption || answer === newQuestion.sixthOption) {
                    let question: Question = newQuestion;
                    question.roomId = currentRoom.roomId;

                    await axios.post(`${QuestionURL}`, question).then(response => {
                        console.log(response.data);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Question created!',
                            showConfirmButton: false,
                            timer: 900
                        }).then(() => {
                            setShow(false);
                        });
                    });

                    await axios.get(`${QuestionURL}/GetQuestionsByRoomId/${currentRoom.roomId}`).then(response => {
                        setCurrentQuestions(response.data);
                    });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Answer is not in options!',
                        showConfirmButton: true,
                    });
                }
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'You must fill the Answer!',
                    showConfirmButton: true,
                });
            }
        }
    }


    const handleOnClickDeleteQuesiton = async (element: Question) => {
        const elementId: number = element.questionId;

        if (currentRoom) {
            let question: Question = newQuestion;
            question.roomId = currentRoom.roomId;
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
                    await axios.delete(`${QuestionURL}/${elementId}`).then(response => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                    });
                }

                await axios.get(`${QuestionURL}/GetQuestionsByRoomId/${currentRoom.roomId}`).then(response => {
                    setCurrentQuestions(response.data);
                });
            });
        }
    }

    return (
        <div>
            <div className="container">
                <div className="mt-10">
                    <h1 className="header">Manage Questions <FontAwesomeIcon icon={faQuestionCircle} /></h1>
                </div>

                <form onSubmit={handleOnSubmitForm} className="w-2/6 m-auto mt-10 bg-neutral-800 shadow-lg shadow-black p-5">
                    <div className="mb-10 flex flex-row justify-center">
                        <h5 className="text-slate-300 font-bold text-xl p-2">Room Name</h5>
                        <input onChange={handleOnChangeRoomName} className="form-control" maxLength={50} />
                    </div>

                    <div className="mb-3 flex flex-row justify-center">
                        <button type="submit" className="btn-primary">Search</button>
                    </div>
                </form>
            </div>

            <motion.div
                animate={showTable ? 'open' : 'closed'}
                variants={variants}
                className="mt-20" >
                <div className="flex flex-row justify-end mr-28 mb-5">
                    <button onClick={() => setShow(true)} className="btn-primary">Add Question</button>
                </div>
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg w-11/12 m-auto">
                    <table className="min-w-full divide-gray-200">
                        <thead className="bg-neutral-900 text-slate-300">
                            <tr className="h-10">
                                <th>
                                    Question Name
                                </th>

                                <th>
                                    First Option
                                </th>

                                <th>
                                    Second Option
                                </th>

                                <th>
                                    Third Option
                                </th>

                                <th>
                                    FourthOption
                                </th>

                                <th>
                                    FifthOption
                                </th>

                                <th>
                                    SixthOption
                                </th>

                                <th>
                                    Answer
                                </th>

                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                currentQuestions?.map((element: Question, index: number) => (
                                    <tr key={index} className="bg-gray-300 text-black h-12 font-bold text-xl">
                                        <td>
                                            {element.questionName}
                                        </td>

                                        <td>
                                            {element.firstOption}
                                        </td>

                                        <td>
                                            {element.secondOption}
                                        </td>

                                        <td>
                                            {element.thirdOption}
                                        </td>

                                        <td>
                                            {element.fourthOption}
                                        </td>

                                        <td>
                                            {element.fifthOption}
                                        </td>

                                        <td>
                                            {element.sixthOption}
                                        </td>

                                        <td>
                                            {element.answer}
                                        </td>

                                        <td>
                                            <button onClick={() => handleOpenEditModal(element)} className="bg-yellow-600 p-1 rounded-lg m-2 w-9 ease-in-out duration-300 hover:bg-yellow-300"><FontAwesomeIcon icon={faPencilAlt} /></button>
                                            <button onClick={() => handleOnClickDeleteQuesiton(element)} className="bg-red-700 p-1 rounded-lg m-2 w-9 ease-in-out duration-300 hover:bg-red-500"><FontAwesomeIcon icon={faTrashAlt} /></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {show ?
                <motion.div id="modalQuestion" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black/50">
                    <div className="relative px-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-20">
                        <div className="relative bg-[#505d75] rounded-lg shadow dark:bg-gray-700">
                            <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-white lg:text-2xl dark:text-white">
                                    Add a New Question!
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShow(false)}>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleQuestionFormSubmit}>
                                    <div className="mb-4">
                                        <h2 className="font-bold">New Question</h2>
                                    </div>

                                    <div className="mb-4">
                                        <h5 className="font-bold">Question Name</h5>
                                        <input onChange={handleOnChangeQuestionName} className="form-control" type='text' maxLength={150} />
                                    </div>

                                    <div className="mb-4">
                                        <h5 className="font-bold">First Option</h5>
                                        <input onChange={handleOnChangeFirstOption} className="form-control" type='text' maxLength={150} />
                                    </div>

                                    <div className="mb-4">
                                        <h5 className="font-bold">Second Option</h5>
                                        <input onChange={handleOnChangeSecondOption} className="form-control" type='text' maxLength={150} />
                                    </div>

                                    <div className="mb-4">
                                        <h5 className="font-bold">Third Option</h5>
                                        <input onChange={handleOnChangeThirdOption} className="form-control" type='text' maxLength={150} />
                                    </div>

                                    <div className="mb-4">
                                        <h5 className="font-bold">Fourth Option</h5>
                                        <input onChange={handleOnChangeFourthOption} className="form-control" type='text' maxLength={150} />
                                    </div>

                                    <div className="mb-4">
                                        <h5 className="font-bold">Fifth Option</h5>
                                        <input onChange={handleOnChangeFifthOption} className="form-control" type='text' maxLength={150} />
                                    </div>

                                    <div className="mb-4">
                                        <h5 className="font-bold">Sixth Option</h5>
                                        <input onChange={handleOnChangeSixthOption} className="form-control" type='text' maxLength={150} />
                                    </div>

                                    <div className="mb-4">
                                        <h5 className="font-bold">Answer</h5>
                                        <input onChange={handleOnChangeAnswer} className="form-control" type='text' maxLength={150} />
                                    </div>

                                    <div className="mb-4">
                                        <button type="submit" className="btn-primary">Accept</button>
                                    </div>

                                </form>
                            </div>
                            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button onClick={() => setShow(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Close</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
                : null
            }

            {
                showEditModal ?
                    <motion.div id="modalQuestion" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black/50">
                        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-20">
                            <div className="relative bg-[#505d75] rounded-lg shadow dark:bg-gray-700">
                                <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-white lg:text-2xl dark:text-white">
                                        Edit Question
                                    </h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowEditModal(false)}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                                <div className="p-6">
                                    <form onSubmit={handleOnSubmitFormEdit}>
                                        <div className="mb-4">
                                            <h2 className="font-bold">Edit</h2>
                                        </div>

                                        <div className="mb-4">
                                            <h5 className="font-bold">Question Name</h5>
                                            <input value={editQuestion.questionName} onChange={handleOnChangeEditQuestionName} className="form-control" type='text' maxLength={150} />
                                        </div>

                                        <div className="mb-4">
                                            <h5 className="font-bold">First Option</h5>
                                            <input value={editQuestion.firstOption} onChange={handleOnChangeEditFirstOption} className="form-control" type='text' maxLength={150} />
                                        </div>

                                        <div className="mb-4">
                                            <h5 className="font-bold">Second Option</h5>
                                            <input value={editQuestion.secondOption} onChange={handleOnChangeEditSecondOption} className="form-control" type='text' maxLength={150} />
                                        </div>

                                        <div className="mb-4">
                                            <h5 className="font-bold">Third Option</h5>
                                            <input value={editQuestion.thirdOption} onChange={handleOnChangeEditThirdOption} className="form-control" type='text' maxLength={150} />
                                        </div>

                                        <div className="mb-4">
                                            <h5 className="font-bold">Fourth Option</h5>
                                            <input value={editQuestion.fourthOption} onChange={handleOnChangeEditFourthOption} className="form-control" type='text' maxLength={150} />
                                        </div>

                                        <div className="mb-4">
                                            <h5 className="font-bold">Fifth Option</h5>
                                            <input value={editQuestion.fifthOption} onChange={handleOnChangeEditFifthOption} className="form-control" type='text' maxLength={150} />
                                        </div>

                                        <div className="mb-4">
                                            <h5 className="font-bold">Sixth Option</h5>
                                            <input value={editQuestion.sixthOption} onChange={handleOnChangeEditSixthOption} className="form-control" type='text' maxLength={150} />
                                        </div>

                                        <div className="mb-4">
                                            <h5 className="font-bold">Answer</h5>
                                            <input value={editQuestion.answer} onChange={handleOnChangeEditAnswer} className="form-control" type='text' maxLength={150} />
                                        </div>

                                        <div className="mb-4">
                                            <button type="submit" className="btn-primary">Accept</button>
                                        </div>

                                    </form>
                                </div>
                                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                    <button onClick={() => setShowEditModal(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Close</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    : null
            }
        </div>
    )
}

export default ManageQuestions;