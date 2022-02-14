import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";
import authService from "../../Services/auth.service";

interface User {
    fullName: string,
    email: string,
    password: string
}

function Register() {
    const [user, setUser] = useState<User>({
        fullName: '',
        email: '',
        password: ''
    });

    const handleOnFullNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser(prev => ({ ...prev, fullName: event.target.value }));
    }

    const handleOnEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser(prev => ({ ...prev, email: event.target.value }));
    }

    const handleOnPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser(prev => ({ ...prev, password: event.target.value }));
    }

    const handleOnSubmitForm = async (event: SyntheticEvent) => {
        event.preventDefault();
        let emptyUser: User = {
            fullName: '',
            email: '',
            password: ''
        }
        await authService.registerUser(user.fullName, user.email, user.password).then(response => {
            console.log(response);
            switch (response.data.responseCode) {
                case 1:
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Registered Succesfully!',
                        showConfirmButton: true,
                    }).then(() => {
                        setUser(emptyUser);
                    });
                    break;

                case 2:
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: response.data.dataSet,
                        showConfirmButton: true,
                    });
                    break;
            }
        });
    }


    return (
        <div className="container mt-16 flex flex-col items-center">
            <div className="mb-10">
                <h1 className="header">Create An Account <FontAwesomeIcon icon={faPlusSquare} /></h1>
            </div>

            <form onSubmit={handleOnSubmitForm} className="w-3/5 shadow-lg p-5 bg-neutral-800 shadow-black">
                <div className="mb-5">
                    <label className="block font-bold text-slate-300 mb-2">Full Name</label>
                    <input value={user.fullName} onChange={handleOnFullNameChange} className="form-control" type='text' />
                </div>

                <div className="mb-5">
                    <label className="block font-bold text-slate-300 mb-2">Email</label>
                    <input value={user.email} onChange={handleOnEmailChange} className="form-control" type='email' />
                </div>

                <div className="mb-10">
                    <label className="block font-bold text-slate-300 mb-2">Password</label>
                    <input value={user.password} onChange={handleOnPasswordChange} className="form-control" type='password' />
                </div>

                <div className="mb-5">
                    <button disabled={!user.fullName || !user.email || !user.password} type="submit" className="btn-primary">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;