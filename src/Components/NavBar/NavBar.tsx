import { faBook, faHome, faSignOutAlt, faTasks, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('isLoggedIn') ? true : false);
    }, [])

    return (
        <nav className="flex items-center justify-between flex-wrap bg-zinc-900 p-6 shadow-lg shadow-black/50">
            <div className="w-44 flex justify-evenly items-center">
                <Link to="/"><span className="font-semibold text-2xl tracking-tight text-cyan-500 ease-in-out duration-300 hover:text-orange-500 hover:text-3xl">TriviaApp <FontAwesomeIcon icon={faBook} /></span></Link>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-lg lg:flex-grow">
                    <div className="p-1 w-fit m-auto">
                        <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 mr-4 p-2 text-slate-300 hover:text-amber-400 ease-in-out duration-300">
                            <h5 className="font-bold "><FontAwesomeIcon icon={faHome} /> Home</h5>
                        </Link>
                        {!isLoggedIn ?
                            <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 mr-4 p-2 text-slate-300 hover:text-amber-400 ease-in-out duration-300">
                                <h5 className="font-bold ">Login</h5>
                            </Link> : null
                        }
                        {isLoggedIn ?
                            <Link to="/dashboard" className="block mt-4 lg:inline-block lg:mt-0 mr-4 p-2 text-slate-300 hover:text-amber-400 ease-in-out duration-300">
                                <h5 className="font-bold "><FontAwesomeIcon icon={faTasks} /> DashBoard</h5>
                            </Link>
                            : null
                        }
                        {isLoggedIn ?
                            <Link to="/searchUsers" className="block mt-4 lg:inline-block lg:mt-0 mr-4 p-2 text-slate-300 hover:text-amber-400 ease-in-out duration-300">
                                <h5 className="font-bold"><FontAwesomeIcon icon={faUserTie} /> Users</h5>
                            </Link>
                            : null
                        }

                        {isLoggedIn ?
                            <Link to="/logout" className="block mt-4 lg:inline-block lg:mt-0 mr-4 p-2 text-slate-300 hover:text-amber-400 ease-in-out duration-300">
                                <h5 className="font-bold "><FontAwesomeIcon icon={faSignOutAlt} /> Logout</h5>
                            </Link>
                            : null
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;