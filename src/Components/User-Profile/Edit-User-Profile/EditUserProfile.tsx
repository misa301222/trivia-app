import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ActivityCategory } from "../../../constants/enums/ActivityCategory";
import authService from "../../../Services/auth.service";

interface User {
    email: string,
    fullName: string,
    roles: string
}

interface UserProfile {
    email: string,
    imageURL: string,
    coverURL: string,
    location: string,
    aboutMeHeader: string,
    aboutMeDescription: string
}

interface Activity {
    activityId: number,
    email: string,
    activityDescription: string,
    category: string,
    dateActivity: Date
}

const UserProfileURL = 'https://localhost:7025/api/UserProfiles';
const ActivitiesURL = 'https://localhost:7025/api/Activities'

function EditUserProfile() {
    const [userProfile, setUserProfile] = useState<UserProfile>({
        email: '',
        imageURL: '',
        coverURL: '',
        location: '',
        aboutMeHeader: '',
        aboutMeDescription: ''
    });

    const getUserProfileByEmail = async (email: string) => {
        await axios.get(`${UserProfileURL}/${email}`).then(response => {
            setUserProfile(response.data);
        });
    }

    const handleOnChangeImageURL = (event: ChangeEvent<HTMLInputElement>) => {
        setUserProfile(prev => ({ ...prev, imageURL: event.target.value }));
    }

    const handleOnChangeCoverURL = (event: ChangeEvent<HTMLInputElement>) => {
        setUserProfile(prev => ({ ...prev, coverURL: event.target.value }));
    }

    const handleOnChangeLocation = (event: ChangeEvent<HTMLInputElement>) => {
        setUserProfile(prev => ({ ...prev, location: event.target.value }));
    }

    const handleOnChangeAboutMeHeader = (event: ChangeEvent<HTMLInputElement>) => {
        setUserProfile(prev => ({ ...prev, aboutMeHeader: event.target.value }));
    }

    const handleOnChangeAboutMeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setUserProfile(prev => ({ ...prev, aboutMeDescription: event.target.value }));
    }

    const handleOnSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        let userProfileEdited: UserProfile = userProfile;
        await axios.put(`${UserProfileURL}/${userProfile.email}`, userProfileEdited).then(response => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'User Profile Edited Successfully!',
                showConfirmButton: false,
                timer: 900
            });
        });

        let activity: Activity = {
            activityId: 0,
            email: authService.getCurrentUser!,
            activityDescription: ActivityCategory.EDITED_USER_PROFILE,
            category: 'USER PROFILE',
            dateActivity: new Date()
        }

        await axios.post(`${ActivitiesURL}/`, activity).then(response => {
            console.log(response);
        });
    }

    useEffect(() => {
        let user: User = authService.getUser;
        getUserProfileByEmail(user.email);
    }, []);

    return (
        <div className="container">
            <div className="mt-10">
                <h1 className="font-bold text-slate-300">Edit User Profile <FontAwesomeIcon icon={faUser} /></h1>
            </div>
            <div className="mt-20">
                <form onSubmit={handleOnSubmit} className="bg-neutral-800 shadow-lg shadow-black p-2 w-9/12 m-auto">
                    <div className="mb-3">
                        <label className="block mb-2 font-bold text-slate-300">Email</label>
                        <input value={userProfile?.email} disabled className="form-control" type='text' />
                    </div>

                    <div className="mb-3">
                        <label className="block mb-2 font-bold text-slate-300">Image URL</label>
                        <input onChange={handleOnChangeImageURL} value={userProfile?.imageURL} maxLength={256} className="form-control" type='text' />
                    </div>

                    <div className="mb-3">
                        <label className="block mb-2 font-bold text-slate-300">Cover URL</label>
                        <input onChange={handleOnChangeCoverURL} value={userProfile?.coverURL} maxLength={256} className="form-control" type='text' />
                    </div>

                    <div className="mb-3">
                        <label className="block mb-2 font-bold text-slate-300">Location</label>
                        <input onChange={handleOnChangeLocation} value={userProfile?.location} maxLength={256} className="form-control" type='text' />
                    </div>

                    <div className="mb-3">
                        <label className="block mb-2 font-bold text-slate-300">About Me (Header)</label>
                        <input onChange={handleOnChangeAboutMeHeader} value={userProfile?.aboutMeHeader} maxLength={50} className="form-control" type='text' />
                    </div>

                    <div className="mb-3">
                        <label className="block mb-2 font-bold text-slate-300">About Me (Description)</label>
                        <textarea onChange={handleOnChangeAboutMeDescription} value={userProfile?.aboutMeDescription} maxLength={250} className="form-control" rows={6} style={{ resize: 'none' }} />
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn-primary">Edit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUserProfile;