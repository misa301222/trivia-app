function UserCard({ userProfile, user }: any) {
    return (
        <div className="bg-neutral-900 h-80 w-[60rem] rounded-lg shadow-cyan-500/50 shadow-lg transition duration-700 hover:shadow-orange-500/50 hover:scale-110">
            <div className="flex flex-row">
                <div className="h-40 w-full flex flex-row">
                    <div className="flex flex-col w-1/4 text-white">
                        <img src={userProfile?.imageURL} className="rounded-lg" />
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
                2nd row
            </div>
        </div>
    )
}

export default UserCard;