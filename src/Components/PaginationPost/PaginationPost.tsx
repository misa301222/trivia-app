import { faMinusCircle, faPaste } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import authService from "../../Services/auth.service";


const UserPostURL = 'https://localhost:7025/api/UserPosts';

function PaginationPost({ data, RenderComponent, pageLimit, dataLimit }: any) {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState<number>(1);
    const navigate = useNavigate();

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event: any) {
        const pageNumber = Number(event.target.textContext);
        setCurrentPage(pageNumber);
    }

    const deletePost = async (userPostId: number) => {
        Swal.fire({
            title: 'Delete post?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${UserPostURL}/${userPostId}`).then(response => {
                    Swal.fire(
                        'Deleted!',
                        'The post was deleted successfully!',
                        'success'
                    ).then(() => {
                        navigate(0);
                    });
                });
            }
        })
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill(undefined).map((_, idx) => start + idx + 1);
    };

    return (
        <div className="mb-40">
            <h1 className="header mb-2 text-amber-500">Posts <FontAwesomeIcon icon={faPaste} /></h1>
            <hr className="mb-10"></hr>

            <div className="">
                {getPaginatedData().map((element: any, index: any) => (
                    <div key={index} className='w-full'>
                        {(element.postedBy === authService.getCurrentUser) ?
                            <div className="flex flex-row justify-end mb-2">
                                <button type="button" onClick={async () => deletePost(element.userPostId)}
                                    className="w-[3rem] shadow-md shadow-black bg-red-800 ease-in-out duration-300 hover:bg-red-900 hover:text-slate-300 rounded-md p-1 font-bold ml-auto">
                                    <FontAwesomeIcon icon={faMinusCircle} /></button>
                            </div>
                            : null
                        }
                        <RenderComponent key={index} data={element} />
                    </div>
                ))}
            </div>

            <div className="flex flex-row justify-evenly w-1/2 m-auto mt-20">
                <button disabled={currentPage === 1} onClick={goToPreviousPage} className={`btn-secondary`}>Previous</button>

                {
                    // getPaginationGroup().map((item, index) => (
                    //     <button key={index} onClick={changePage} className={`paginationItem ${currentPage === item ? 'active' : null}`}><span>{item}</span></button>
                    // ))
                }

                <button disabled={currentPage === pages} onClick={goToNextPage} className={`btn-secondary ${currentPage === pages ? 'disabled' : ''}`}>Next</button>
            </div>
        </div>
    )
}

export default PaginationPost;