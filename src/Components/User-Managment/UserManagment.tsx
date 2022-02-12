import { faExclamationTriangle, faPlusSquare, faSearch, faUsers, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";

interface User {
    fullName: string,
    email: string,
    roles: string[],
    dateCreated: Date
}

interface UserNewOrUpdate {
    fullName: string,
    email: string,
    password: string,
    roles: string[],
}

interface UserProfile {
    email: string,
    imageURL: string,
    coverURL: string,
    location: string,
    aboutMeHeader: string,
    aboutMeDescription: string
}

const UserURL = 'https://localhost:7025/api/User';
const UserProfileURL = 'https://localhost:7025/api/UserProfiles';
const UserScoreURL = 'https://localhost:7025/api/UserScores';

function UserManagment() {
    const [search, setSearch] = useState<string>('');
    const [users, setUsers] = useState<User[]>();
    const [show, setShow] = useState<boolean>(false);
    const [emailDelete, setEmailDelete] = useState<string>('');
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<UserNewOrUpdate>({
        fullName: '',
        email: '',
        password: '',
        roles: ['USER'],
    });
    const [newUserProfile, setNewUserProfile] = useState<UserProfile>({
        email: '',
        imageURL: '',
        coverURL: '',
        location: '',
        aboutMeHeader: '',
        aboutMeDescription: '',
    });

    const handleOnSubmitSearch = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (search) {
            await axios.get(`${UserURL}/GetUserByFullNameLike/${search}`).then(response => {
                console.log(response.data.dataSet);
                setUsers(response.data.dataSet);
            });
        } else {
            await axios.get(`${UserURL}/GetAllUsers`).then(response => {
                console.log(response.data.dataSet);
                setUsers(response.data.dataSet);
            });
        }
    }

    const handleOnChangeFullName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewUser(prev => ({ ...prev, fullName: event.target.value }));
    }

    const handleOnChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setNewUser(prev => ({ ...prev, email: event.target.value }));
    }

    const handleOnChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setNewUser(prev => ({ ...prev, password: event.target.value }));
    }

    const handleOnChangeRole = (event: ChangeEvent<HTMLSelectElement>) => {
        setNewUser(prev => ({ ...prev, roles: [event.target.value] }));
    }

    const handleOnChangeEmailDelete = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailDelete(event.target.value);
    }

    const handleOnSubmitFormAddUser = async (event: SyntheticEvent) => {
        event.preventDefault();
        let userNew: UserNewOrUpdate = newUser;
        await axios.post(`${UserURL}/RegisterUser`, userNew).then(response => {

        });

        let userProfile: UserProfile = newUserProfile;
        userProfile.email = userNew.email;
        await axios.post(`${UserProfileURL}`, userProfile).then(response => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'User Created!',
                showConfirmButton: false,
                timer: 900
            }).then(() => {
                setNewUser({
                    fullName: '',
                    email: '',
                    password: '',
                    roles: ['USER']
                });

                setNewUserProfile({
                    email: '',
                    imageURL: '',
                    coverURL: '',
                    location: '',
                    aboutMeHeader: '',
                    aboutMeDescription: '',
                });

                setShow(false);
            });
        });
    }

    const handleOnSubmitFormDeleteUser = async (event: SyntheticEvent) => {
        event.preventDefault();
        let emailToDelete: string = emailDelete;

        const response = await axios.get(`${UserURL}/GetCurrentUser/${emailToDelete}`);
        switch (response.data.responseCode) {
            case 1:
                await axios.delete(`${UserScoreURL}/DeleteAllUserScoresByEmail/${emailToDelete}`).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });

                await axios.delete(`${UserProfileURL}/${emailToDelete}`).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });

                await axios.delete(`${UserURL}/DeleteUserByEmail/${emailToDelete}`).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });

                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'User Deleted!',
                    showConfirmButton: true
                });
                break;

            case 2:
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'User Not found!',
                    showConfirmButton: true
                });
                break;
        }
    }

    const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    return (
        <div className="container">
            <div className="mt-10">
                <h1 className="header">User Managment <FontAwesomeIcon icon={faUsers} /></h1>
            </div>

            <div className="flex flex-row justify-evenly mt-10">
                <motion.div
                    whileHover={{
                        scale: 1.1
                    }}
                    transition={{
                        type: 'spring'
                    }}
                    className="h-[8rem] w-[25rem] bg-neutral-900 rounded-lg shadow-lg shadow-black cursor-pointer"
                    onClick={() => setShow(true)}>
                    <div className="flex flex-row h-[8rem]">
                        <div className="w-1/3">
                            <div className="p-1">
                                <FontAwesomeIcon icon={faPlusSquare} className="text-[7rem] text-slate-300" />
                            </div>
                        </div>

                        <div className="w-2/3 p-3">
                            <div className="">
                                <h5 className="font-bold text-xl text-cyan-500"><u>Create A New User</u></h5>
                            </div>

                            <div className="mt-6">
                                <h5 className="font-bold text-slate-300">Create a new User, with custom roles.</h5>
                            </div>
                        </div>

                    </div>
                </motion.div>

                <motion.div
                    whileHover={{
                        scale: 1.1
                    }}
                    transition={{
                        type: 'spring'
                    }}
                    className="h-[8rem] w-[25rem] bg-neutral-900 rounded-lg shadow-lg shadow-black cursor-pointer"
                    onClick={() => setShowDelete(true)}>
                    <div className="flex flex-row h-[8rem]">
                        <div className="w-1/3">
                            <div className="p-1">
                                <FontAwesomeIcon icon={faUserSlash} className="text-[7rem] text-slate-300" />
                            </div>
                        </div>

                        <div className="w-2/3 p-3">
                            <div className="">
                                <h5 className="font-bold text-xl text-red-500"><u>Delete A User</u></h5>
                            </div>

                            <div className="mt-6">
                                <h5 className="font-bold text-red-400"><FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500" /> Delete user, this operation is not reversible.</h5>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>

            <div className="mt-14">
                <div className="container-bordered">
                    <form onSubmit={handleOnSubmitSearch} className="">
                        <div className="columns-2">
                            <div>
                                <label className="font-bold text-slate-200 mr-5">Full Name</label>
                                <input onChange={handleOnChangeSearch} className="form-control-secondary" />
                                <h5 className="ml-16 text-[13px] font-bold text-gray-400">Leave empty if you want to do a General Search.</h5>
                            </div>

                            <div>
                                <button type="submit" className="btn-primary"><FontAwesomeIcon icon={faSearch} /></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg w-11/12 m-auto">
                    <table className="min-w-full divide-gray-200">
                        <thead className="bg-neutral-900 text-slate-300">
                            <tr className="h-10">
                                <th>
                                    Full Name
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Roles
                                </th>

                                <th>
                                    Date Created
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users?.map((element: User, index: number) => (
                                <tr key={index} className="bg-gray-300 text-black h-12 font-bold text-xl">
                                    <td>
                                        {element.fullName}
                                    </td>

                                    <td>
                                        {element.email}
                                    </td>

                                    <td>
                                        {element.roles}
                                    </td>

                                    <td>
                                        {element.dateCreated ? `${moment(element.dateCreated).format('MM/DD/YYYY')} at ${moment(element.dateCreated).format('hh:mm')}` : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {
                show ? <div id="defaultModal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black/50">
                    <div className="relative px-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-40">
                        <div className="relative bg-[#505d75] rounded-lg shadow dark:bg-gray-700">
                            <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-white lg:text-2xl dark:text-white">
                                    Create a New Account
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShow(false)}>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <form onSubmit={handleOnSubmitFormAddUser}>
                                    <div className="mb-5">
                                        <label className="block font-bold text-slate-300">Full Name</label>
                                        <input onChange={handleOnChangeFullName} className="form-control" type='text' maxLength={250} />
                                    </div>

                                    <div className="mb-5">
                                        <label className="block font-bold text-slate-300">Email</label>
                                        <input onChange={handleOnChangeEmail} className="form-control" type='email' maxLength={250} />
                                    </div>

                                    <div className="mb-5">
                                        <label className="block font-bold text-slate-300">Password</label>
                                        <input onChange={handleOnChangePassword} className="form-control" type='password' maxLength={250} />
                                    </div>

                                    <div className="mb-5">
                                        <label className="block font-bold text-slate-300">Role</label>
                                        <select className="form-control text-center" onChange={handleOnChangeRole} defaultValue={'USER'}>
                                            <option value={'USER'}>USER</option>
                                            <option value={'ADMINISTRATOR'}>ADMINISTRATOR</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <button type="submit" className="btn-primary">Accept</button>
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button onClick={() => setShow(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Close</button>
                            </div>
                        </div>
                    </div>
                </div> : null
            }

            {
                showDelete ? <div id="defaultModal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black/50">
                    <div className="relative px-4 w-full max-w-2xl h-full md:h-auto mx-auto mt-40">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                                    Delete an Account
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowDelete(false)}>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <form onSubmit={handleOnSubmitFormDeleteUser}>
                                    <div className="mb-5">
                                        <label className="block font-bold text-slate-300">Email</label>
                                        <input onChange={handleOnChangeEmailDelete} className="form-control" type='text' maxLength={250} />
                                    </div>

                                    <div className="mb-5">
                                        <h5 className="font-bold text-xl text-slate-300">For security reasons you <u>MUST</u> enter the email you want to delete. </h5>
                                        <h5 className="text-red-400 font-bold"><FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500" />This operation is irreversible.<FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500" /></h5>
                                    </div>

                                    <div className="mb-3">
                                        <button type="submit" className="btn-primary">Accept</button>
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button onClick={() => setShowDelete(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Close</button>
                            </div>
                        </div>
                    </div>
                </div> : null
            }

        </div>
    )
}

export default UserManagment;