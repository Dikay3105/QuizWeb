import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuizByID } from "../../service/quizService";

const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.id

    useEffect(() => {
        fetchQuestion();
    }, [quizId])

    const fetchQuestion = async () => {
        let response = await getQuizByID(quizId)
    }

    return (<div>cc</div>);
}
export default DetailQuiz;