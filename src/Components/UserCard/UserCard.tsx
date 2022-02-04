import { Link } from "react-router-dom";

function UserCard({ userProfile, user, totalScore, totalCorrect, totalWrong }: any) {
    return (
        <Link to={`/seeUserProfile/${userProfile?.email}`}>
            <div className="bg-cover h-80 w-[60rem] shadow-lg shadow-black transition duration-700 hover:scale-110"
                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${userProfile?.coverURL})` }}>
                <div className="flex flex-row">
                    <div className="h-40 w-full flex flex-row">
                        <div className="flex flex-col w-1/4 text-white bg-cover" style={{
                            backgroundImage: `url(${userProfile?.imageURL})`
                        }}>
                            {/* <img src={userProfile?.imageURL} className="rounded-lg" /> */}
                        </div>

                        <div className="flex flex-col w-full mt-3 pl-5">
                            <div>
                                <h5 className="text-left font-bold text-2xl text-slate-300">{user?.fullName}</h5>
                            </div>
                            <div>
                                <h5 className="text-left font-bold text-lg text-slate-200">{user?.email}</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row h-40 w-full">
                    <div className="w-[80%] m-auto bg-neutral-900 rounded-lg p-3 shadow-black shadow-lg">
                        <div className="flex flex-row justify-center mb-3">
                            <h5 className="font-bold text-slate-200"><u>Average Right/Wrong</u></h5>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-cyan-900 mb-2">
                                <div className="bg-cyan-600 h-2.5 rounded-full" style={{ width: `${(totalScore as number * 100).toFixed(2)}%` }}></div>
                            </div>
                            <h5 className="font-bold">{(totalScore as number * 100).toFixed(2)}% / 100%</h5>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default UserCard;