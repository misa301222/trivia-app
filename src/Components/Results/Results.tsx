import { faCheckDouble, faPollH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

interface Question {
    questionName: string,
    firstOption: string,
    secondOption: string,
    thirdOption: string,
    fourthOption: string,
    fifthOption: string,
    sixthOption: string,
    answer: string
    roomId: number
}

function Results({ questionsFinal, userAnswersFinal, userScoreFinal }: any) {    
    return (
        <div className="container">
            <h1 className="mt-16 header">Results <FontAwesomeIcon icon={faPollH} /> </h1>
            <h5 className="font-bold mt-10 text-slate-200">Sent on <u>{userScoreFinal?.dateSent ? `${moment(userScoreFinal.dateSent).format('MM/DD/YYYY HH:mm')}` : null}</u></h5>
            <div className="container">
                {
                    questionsFinal?.map((element: Question, index: number) => (
                        <div key={index} className="container text-black w-2/4 mt-10">
                            <div className="bg-white rounded-lg p-2 flex flex-col">
                                <div className="flex flex-row justify-end">
                                    <span className="badge">Question #{index + 1}</span>
                                </div>
                                <h5 className="text-2xl font-bold">{element.questionName}</h5>
                            </div>

                            <div className="mt-5 mb-16">
                                {
                                    element.firstOption ?
                                        <div className={`bg-slate-200/60 rounded-md p-3 font-bold border-2 ${userAnswersFinal![index].answer.trim() === element.firstOption.trim() && userAnswersFinal![index].answer.trim() === element.answer.trim() ? 'border-4 border-green-900 bg-green-500/75' : `${element.firstOption.trim() === element.answer.trim() ? 'border-4 border-red-900 bg-red-500/75' : 'border-black'}`}`}>
                                            <div className="">
                                                <h5>{element.firstOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.secondOption ?
                                        <div className={`bg-slate-200/60 rounded-md p-3 font-bold border-2 ${userAnswersFinal![index].answer.trim() === element.secondOption.trim() && userAnswersFinal![index].answer.trim() === element.answer.trim() ? 'border-4 border-green-900 bg-green-500/75' : `${element.secondOption.trim() === element.answer.trim() ? 'border-4 border-red-900 bg-red-500/75' : 'border-black'}`}`}>
                                            <div className="">
                                                <h5>{element.secondOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.thirdOption ?
                                        <div className={`bg-slate-200/60 rounded-md p-3 font-bold border-2 ${userAnswersFinal![index].answer.trim() === element.thirdOption.trim() && userAnswersFinal![index].answer.trim() === element.answer.trim() ? 'border-4 border-green-900 bg-green-500/75' : `${element.thirdOption.trim() === element.answer.trim() ? 'border-4 border-red-900 bg-red-500/75' : 'border-black'}`}`}>

                                            <div className="">
                                                <h5>{element.thirdOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.fourthOption ?
                                        <div className={`bg-slate-200/60 rounded-md p-3 font-bold border-2 ${userAnswersFinal![index].answer.trim() === element.fourthOption.trim() && userAnswersFinal![index].answer.trim() === element.answer.trim() ? 'border-4 border-green-900 bg-green-500/75' : `${element.fourthOption.trim() === element.answer.trim() ? 'border-4 border-red-900 bg-red-500/75' : 'border-black'}`}`}>

                                            <div className="">
                                                <h5>{element.fourthOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.fifthOption ?
                                        <div className={`bg-slate-200/60 rounded-md p-3 font-bold border-2 ${userAnswersFinal![index].answer.trim() === element.fifthOption.trim() && userAnswersFinal![index].answer.trim() === element.answer.trim() ? 'border-4 border-green-900 bg-green-500/75' : `${element.fifthOption.trim() === element.answer.trim() ? 'border-4 border-red-900 bg-red-500/75' : 'border-black'}`}`}>

                                            <div className="">
                                                <h5>{element.fifthOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.sixthOption ?
                                        <div className={`bg-slate-200/60 rounded-md p-3 font-bold border-2 ${userAnswersFinal![index].answer.trim() === element.sixthOption.trim() && userAnswersFinal![index].answer.trim() === element.answer.trim() ? 'border-4 border-green-900 bg-green-500/75' : `${element.sixthOption.trim() === element.answer.trim() ? 'border-4 border-red-900 bg-red-500/75' : 'border-black'}`}`}>

                                            <div className="">
                                                <h5>{element.sixthOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }
                                <div className="bg-white rounded-lg border-2 border-black font-bold p-2">
                                    <h5>The right answer was {element.answer} <FontAwesomeIcon icon={faCheckDouble} /></h5>
                                    <h5>You answered <u>{userAnswersFinal![index].answer}</u></h5>
                                    <h5>So you are {userAnswersFinal![index].isRight ? `RIGHT!` : `WRONG!`}</h5>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Results;