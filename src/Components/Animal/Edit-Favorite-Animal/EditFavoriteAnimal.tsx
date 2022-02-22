import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import authService from "../../../Services/auth.service";

interface AnimalConfig {
    animalConfigId: number,
    email: string,
    animal: string
}

const AnimalConfigsURL = 'https://localhost:7025/api/AnimalConfigs';

function EditFavoriteAnimal() {
    const [animalConfig, setAnimalConfig] = useState<AnimalConfig>({
        animalConfigId: 0,
        email: '',
        animal: ''
    });

    const getAnimalConfigByEmail = async (email: string) => {
        await axios.get(`${AnimalConfigsURL}/GetAnimalConfigByEmail/${email}`).then(response => {
            setAnimalConfig(response.data);
        })
    }

    const handleOnChangeFavoriteAnimal = (event: ChangeEvent<HTMLSelectElement>) => {
        setAnimalConfig(prev => ({ ...prev, animal: event.target.value }))
    }

    const handleOnSubmitForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        await axios.put(`${AnimalConfigsURL}/${animalConfig.animalConfigId}`, animalConfig).then(response => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Updated Succesfully!',
                showConfirmButton: true,
            });
        });
    }

    useEffect(() => {
        let currentUser = authService.getCurrentUser;
        getAnimalConfigByEmail(currentUser!);
    }, []);

    return (
        <div className="container">
            <h1 className="header mt-10">Animal Config <FontAwesomeIcon icon={faPaw} /></h1>

            <div className="mt-20">
                <form onSubmit={handleOnSubmitForm}>
                    <div className="mb-5">
                        <label className="block text-slate-300 font-bold mb-3">Favorite Animal</label>
                        <select onChange={handleOnChangeFavoriteAnimal} className="form-control text-center" value={animalConfig?.animal}>
                            <option value={"None"}>None</option>
                            <option value={"Cat"}>Cat</option>
                            <option value={"Duck"}>Duck</option>
                        </select>
                    </div>

                    <div>
                        <button type="submit" className="btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditFavoriteAnimal;
