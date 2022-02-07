import { useEffect, useState } from "react";

function PaginationPost({ data, RenderComponent, pageLimit, dataLimit }: any) {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState<number>(1);

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

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill(undefined).map((_, idx) => start + idx + 1);
    };

    // useEffect(() => {
    //     setShowData(getPaginatedData);
    //     changePage();
    //     console.log('pagination post');
    //     console.log(showData);
    // }, [data]);

    return (
        <div className="mb-40">
            <h1 className="header mb-10">Past Posts</h1>

            <div className="flex flex-wrap gap-10 ml-20">
                {getPaginatedData().map((d: any, idx: any) => (
                    <RenderComponent key={idx} data={d} />
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