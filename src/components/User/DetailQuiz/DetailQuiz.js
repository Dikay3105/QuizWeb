import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../../service/quizService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question/Question";
import ResultModal from "./ResultModal";

const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const location = useLocation();
    const dataFromListQuiz = location.state;

    const fetchQuestions = async () => {
        let response = await getDataQuiz(quizId);
        if (response && response.EC === 0) {
            let raw = response.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    });

                    return { questionId: key, answers, questionDescription, image };
                })
                .value();

            setDataQuiz(data);
        }
    };

    const handleNext = () => {
        if (index < dataQuiz.length - 1 && dataQuiz) {
            setIndex(index + 1);
        }
    };

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const handleCheckBox = (answerId, questionId) => {
        let cloneDataQuiz = _.cloneDeep(dataQuiz);
        let question = cloneDataQuiz.find(item => +item.questionId === +questionId)
        // let answer = question.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            let ans = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                } else {
                    item.isSelected = false
                }
                return item;
            })
            question.answers = ans
        }

        let index = cloneDataQuiz.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            cloneDataQuiz[index] = question
            setDataQuiz(cloneDataQuiz)
        }

    }

    // {
    //     "quizId": 1,
    //         "answers": [
    //             {
    //                 "questionId": 1,
    //                 "userAnswerId": [3]
    //             },
    //             {
    //                 "questionId": 2,
    //                 "userAnswerId": [6]
    //             }
    //         ]
    // }

    const handleFinish = async () => {
        let payload = {
            quizId: +quizId,
        };
        let answers = [];

        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach((item) => {
                let questionId = +item.questionId;

                // Lọc các câu trả lời đã được chọn
                let userAnswerId = item.answers
                    .filter((answer) => answer.isSelected === true) // Lọc chỉ những câu trả lời được chọn
                    .map((answer) => answer.id); // Lấy ID của câu trả lời đã chọn

                // Chỉ push nếu user đã chọn ít nhất 1 câu trả lời
                answers.push({
                    questionId: +questionId,
                    userAnswerId
                });
            });

            payload.answers = answers;
        }

        let response = await postSubmitQuiz(payload);
        if (response && response.EC === 0) {
            setIsShowModalResult(true);
            setDataModalResult({
                countCorrect: response.DT.countCorrect,
                countTotal: response.DT.countTotal,
                quizData: response.DT.quizData,
            })
        } else {
            alert("Somethings went wrong...")
        }
        console.log(response)
    };

    return (
        <div className="detail-quiz-container">
            <div className="left-container">
                <div className="title fs-3 fw-bold">
                    Quiz {quizId}: {dataFromListQuiz ? dataFromListQuiz.quizTitle : "No Title"}
                </div>
                <hr />
                <div className="quiz-content">
                    <Question
                        handleCheckBox={handleCheckBox}
                        index={index}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                    />
                </div>
                <div className="quiz-footer d-flex justify-content-center gap-3">
                    <button
                        className={`btn ${index === 0 ? 'btn-secondary d-none' : 'btn-secondary'}`}
                        onClick={handlePrev}
                        style={{ width: '100px' }}
                    >
                        Previous
                    </button>
                    <button
                        className={`btn ${index === dataQuiz.length - 1 ? 'btn-secondary d-none' : 'btn-primary'}`}
                        onClick={handleNext}
                        style={{ width: '100px' }}
                    >
                        Next
                    </button>

                    <button
                        className={`btn ${index === dataQuiz.length - 1 ? 'btn-danger' : 'd-none'}`}
                        onClick={() => handleFinish()}
                        style={{ width: '100px' }}
                    >
                        Finish
                    </button>
                </div>
            </div>
            <div className="right-container">
                count down
            </div>
            <ResultModal
                isShowModalResult={isShowModalResult}
                setIsShowModalResult={setIsShowModalResult}
                dataModalResult={dataModalResult}
            ></ResultModal>
        </div >
    );
};

export default DetailQuiz;
