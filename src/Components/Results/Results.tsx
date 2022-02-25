import { faCheckDouble, faPollH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

interface UserAnswers {
    question: string,
    answer: string,
    isRight: boolean,
    userScoreId: number,
    firstOption: string,
    secondOption: string,
    thirdOption: string,
    fourthOption: string,
    fifthOption: string,
    sixthOption: string,
    rightAnswer: string
}

function Results({ userAnswersFinal, userScoreFinal }: any) {
    return (
        <div className="container">
            <h1 className="mt-16 header">Results <FontAwesomeIcon icon={faPollH} /> </h1>
            <h5 className="font-bold mt-10 text-slate-200">Sent on <u>{userScoreFinal?.dateSent ? `${moment(userScoreFinal.dateSent).format('MM/DD/YYYY HH:mm')}` : null}</u></h5>
            <div className="container">
                {
                    userAnswersFinal?.map((element: UserAnswers, index: number) => (
                        <div key={index} className="container text-black w-2/4 mt-10">
                            <div className="bg-white rounded-lg p-2 flex flex-col">
                                <div className="flex flex-row justify-end">
                                    <span className="badge">Question #{index + 1}</span>
                                </div>
                                <h5 className="text-2xl font-bold">{element.question}</h5>
                            </div>

                            <div className="mt-5 mb-16">
                                {
                                    element.firstOption ?
                                        <div className={`bg-slate-200/60 rounded-md p-3 font-bold border-2 ${element.answer === element.rightAnswer.trim() && element.firstOption.trim() === element.rightAnswer.trim() ? 'border-4 border-green-900 bg-green-500/75' : `${element.firstOption.trim() === element.rightAnswer.trim() ? 'border-4 border-red-900 bg-red-500/75' : 'border-black'}`}`}>
                                            <div className="">
                                                <h5>{element.firstOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.secondOption ?
                                        <div className={`bg-slate-200/60 rounded-md p-3 font-bold border-2 ${element.answer === element.rightAnswer.trim() && element.secondOption.trim() === element.rightAnswer.trim() ? 'border-4 border-green-900 bg-green-500/75' : `${element.secondOption.trim() === element.rightAnswer.trim() ? 'border-4 border-red-900 bg-red-500/75' : 'border-black'}`}`}>
                                            <div className="">
                                                <h5>{element.secondOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.thirdOption ?
                                        <div className={`bg-slate-200/60 rounded-md p-3 font-bold border-2 ${element.answer === element.rightAnswer.trim() && element.thirdOption.trim() === element.rightAnswer.trim() ? 'border-4 border-green-900 bg-green-500/75' : `${element.thirdOption.trim() === element.rightAnswer.trim() ? 'border-4 border-red-900 bg-red-500/75' : 'border-black'}`}`}>

                                            <div className="">
                                                <h5>{element.thirdOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.fourthOption ?
                                        <div className={`bg-slate-200/60 rounded-md p-3 font-bold border-2 ${element.answer === element.rightAnswer.trim() && element.fourthOption.trim() === element.rightAnswer.trim() ? 'border-4 border-green-900 bg-green-500/75' : `${element.fourthOption.trim() === element.rightAnswer.trim() ? 'border-4 border-red-900 bg-red-500/75' : 'border-black'}`}`}>

                                            <div className="">
                                                <h5>{element.fourthOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.fifthOption ?
                                        <div className={`bg-slate-200/60 rounded-md p-3 font-bold border-2 ${element.answer === element.rightAnswer.trim() && element.fifthOption.trim() === element.rightAnswer.trim() ? 'border-4 border-green-900 bg-green-500/75' : `${element.fifthOption.trim() === element.rightAnswer.trim() ? 'border-4 border-red-900 bg-red-500/75' : 'border-black'}`}`}>

                                            <div className="">
                                                <h5>{element.fifthOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    element.sixthOption ?
                                        <div className={`bg-slate-200/60 rounded-md p-3 font-bold border-2 ${element.answer === element.rightAnswer.trim() && element.sixthOption.trim() === element.rightAnswer.trim() ? 'border-4 border-green-900 bg-green-500/75' : `${element.sixthOption.trim() === element.rightAnswer.trim() ? 'border-4 border-red-900 bg-red-500/75' : 'border-black'}`}`}>

                                            <div className="">
                                                <h5>{element.sixthOption}</h5>
                                            </div>
                                        </div>
                                        : null
                                }
                                <div className="bg-white rounded-lg border-2 border-black font-bold p-2">
                                    <h5>The right answer was {element.rightAnswer} <FontAwesomeIcon icon={faCheckDouble} /></h5>
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