import _ from "lodash";

const Question = (props) => {
    const { data, index } = props;

    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleHandleCheckBox = (event, answerId, questionId) => {
        props.handleCheckBox(answerId, questionId)
    }

    return (
        <div className="q-child-container">
            <div className="q-img-container text-center">
                {data.image && <img className="img-fluid" src={`data:image/jpeg;base64,${data.image}`} />}
            </div>
            <div className="question fs-5 fw-normal">
                Question {index + 1}: {data.questionDescription}
            </div>
            <div className="answer-container mt-2">
                {data.answers && data.answers.length > 0
                    && data.answers.map((a, index) => {
                        return (<div className="child-answer" key={`answer-${index}`}>
                            <label>
                                <input
                                    checked={a.isSelected}
                                    type="radio"
                                    name="options"
                                    onChange={(event) => handleHandleCheckBox(event, a.id, data.questionId)} />
                                <span>{String.fromCharCode("A".charCodeAt(0) + index)}</span><span>{a.description}</span>
                            </label>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default Question;