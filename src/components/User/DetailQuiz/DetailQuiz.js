import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../../service/quizService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question/Question";

const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

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

    return (
        <div className="detail-quiz-container">
            <div className="left-container">
                <div className="title fs-3 fw-bold">
                    Quiz {quizId}: {dataFromListQuiz ? dataFromListQuiz.quizTitle : "No Title"}
                </div>
                <hr />
                <div className="quiz-content">
                    <Question
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
                        onClick={handleNext}
                        style={{ width: '100px' }}
                    >
                        Finish
                    </button>
                </div>
            </div>
            <div className="right-container">
                count down
            </div>
        </div>
    );
};

export default DetailQuiz;
