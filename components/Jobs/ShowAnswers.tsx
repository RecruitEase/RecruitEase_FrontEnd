// Types
import {Card, CardBody} from "@nextui-org/react";


// Component
import React from 'react';
import { Check, X } from 'lucide-react';
import {MCQProp, QuestionStatistics, QuizReviewProps, UserAnswers} from "@/types/job";

const calculateStatistics = (
    questions: MCQProp[],
    userAnswers: UserAnswers
): QuestionStatistics => {
    const totalQuestions = questions.length;
    const totalCorrect = questions.reduce((count, q, index) => {
        return count + (userAnswers[index] === q.correctAnswer ? 1 : 0);
    }, 0);

    return {
        totalCorrect,
        totalQuestions,
        score: (totalCorrect / totalQuestions) * 100
    };
};

const ShowAnswers: React.FC<QuizReviewProps> = ({ questions, userAnswers }) => {
    if (!questions || questions.length === 0) {
        return (
            <Card>
                <CardBody className="pt-6">
                    <p className="text-center text-gray-500">No questions available to review.</p>
                </CardBody>
            </Card>
        );
    }

    const { totalCorrect, totalQuestions, score } = calculateStatistics(questions, userAnswers);

    return (
        <div className="space-y-6">
            <Card>
                <CardBody className="pt-6">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">Quiz Review</h2>
                        <p className="text-xl">
                            Score: {score.toFixed(1)}% ({totalCorrect} out of {totalQuestions} correct)
                        </p>
                    </div>
                </CardBody>
            </Card>

            {questions.map((q, questionIndex) => {
                const userAnswer = userAnswers[questionIndex];
                const isCorrect = userAnswer === q.correctAnswer;

                return (
                    <Card key={questionIndex} className={isCorrect ? 'border-green-200' : 'border-red-200'}>
                        <CardBody className="pt-6">
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <h3 className="font-semibold">
                                        <span className="text-gray-500 mr-2">Question {questionIndex + 1}:</span>
                                        {q.question}
                                    </h3>
                                    {isCorrect ? (
                                        <Check className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <X className="h-5 w-5 text-red-500" />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    {q.options.map((opt, idx) => {
                                        const getOptionStyles = (): {
                                            background: string;
                                            text: string;
                                            border: string;
                                        } => {
                                            if (idx === q.correctAnswer) {
                                                return {
                                                    background: 'bg-green-50',
                                                    text: 'text-green-700',
                                                    border: 'border-green-200'
                                                };
                                            } else if (idx === userAnswer) {
                                                return {
                                                    background: 'bg-red-50',
                                                    text: 'text-red-700',
                                                    border: 'border-red-200'
                                                };
                                            }
                                            return {
                                                background: 'bg-white',
                                                text: 'text-gray-700',
                                                border: 'border-gray-200'
                                            };
                                        };

                                        const { background, text, border } = getOptionStyles();

                                        return (
                                            <div
                                                key={idx}
                                                className={`p-3 rounded-md border ${background} ${text} ${border} flex items-center justify-between`}
                                            >
                        <span>
                          <span className="text-gray-500 mr-2">{String.fromCharCode(65 + idx)}.</span>
                            {opt}
                        </span>
                                                {idx === q.correctAnswer && (
                                                    <span className="text-sm text-green-600 font-medium">
                            Correct Answer
                          </span>
                                                )}
                                                {idx === userAnswer && idx !== q.correctAnswer && (
                                                    <span className="text-sm text-red-600 font-medium">
                            Selected Answer
                          </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                );
            })}
        </div>
    );
};

export default ShowAnswers;