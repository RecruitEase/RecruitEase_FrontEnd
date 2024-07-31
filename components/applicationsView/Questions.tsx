import React from "react";

interface Option {
    id: string;
    text: string;
}

interface Question {
    id: number;
    type: "single" | "multiple";
    text: string;
    options: Option[];
    userAnswers: string[];
}

interface QuestionComponentProps {
    questions: Question[];
}
const Questions: React.FC<QuestionComponentProps> = ({ questions }) => {
    return (
        <div>
            <div className={"mt-4 mb-4"}>
                <p className={"text-2xl font-bold"}>Quiz</p>
            </div>
            {questions.map((question) => (
                <div key={question.id}>
                    <div className={"text-lg"}>{question.text}</div>
                    {question.options.map((option) => (
                        <div
                            key={option.id}
                            style={{
                                backgroundColor: question.userAnswers.includes(option.id) ? '#e5e7eb' : 'transparent',
                                padding: '5px',
                                borderRadius: '5px',
                                margin: '2px 0',
                            }}
                        >
                            <label>
                                <input
                                    type={question.type === "single" ? "radio" : "checkbox"}
                                    name={`question-${question.id}`}
                                    value={option.id}
                                    defaultChecked={question.userAnswers.includes(option.id)}
                                    disabled
                                />
                                {option.text}
                            </label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
};

export default Questions;