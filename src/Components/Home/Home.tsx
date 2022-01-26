import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import Questions from '../../resources/images/Questions.jpg';

function Home() {

    useEffect(() => {
        console.log(localStorage.getItem('isLoggedIn'));
    }, []);

    return (
        <div className="bg-cover h-screen" style={{
            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5) 53%, rgba(0, 0, 0, 0.5) 100%), url(${Questions})`,
        }}>

            <div className="flex flex-column justify-center p-40">
                <div className="border-2 border-cyan-500 backdrop-blur-md rounded-lg h-40 w-2/4 shadow-lg shadow-cyan-500/50 ease-in-out duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/50 hover:border-orange-500">
                    <div className="mb-5">
                        <h1 className="mt-3">Hello! Welcome to TriviaApp <FontAwesomeIcon icon={faDesktop} /></h1>
                    </div>

                    <div className="mb-3">
                        <h3>The place where you can compete against all your friends.</h3>
                        <small className="font-bold text-slate-300">Seriously...</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;