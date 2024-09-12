import axios from "../util/axiosCustomize";

const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data, delay: 1000 });
}

const postCreateNewQuiz = (name, description, difficulty, image) => {
    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('difficulty', difficulty);
    form.append('quizImage', image);
    return axios.post('api/v1/quiz', form);
}

const putUpdateUser = (id, username, role, image) => {
    const form = new FormData();
    form.append('id', id);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    return axios.put('api/v1/participant', { form, delay: 2000 });
}

const delUser = (id) => {
    return axios.delete('api/v1/participant', { data: { id: id } });
}

const getQuizByUser = () => {
    return axios.get(`api/v1/quiz-by-participant`);
}

const getDataQuiz = (quizId) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
}

const getAllQuiz = () => {
    return axios.get(`api/v1/quiz/all`);
}

export {
    getQuizByUser,
    getDataQuiz,
    postSubmitQuiz,
    postCreateNewQuiz,
    getAllQuiz
};
