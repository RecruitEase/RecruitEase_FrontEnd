// Types
import {Card, CardBody} from "@nextui-org/react";


// Component
import React from 'react';
import { Check, X } from 'lucide-react';
import {MCQProp, QuestionStatistics, QuizReviewProps, UserAnswers} from "@/types/job";



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


    return (
        <div className="space-y-6">

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

                                </div>

                                <div className="space-y-2">
                                    {q.options.map((opt, idx) => {
                                        const getOptionStyles = (): {
                                            background: string;
                                            text: string;
                                            border: string;
                                        } => {
                                            if (idx === userAnswer) {
                                                return {
                                                    background: 'bg-orange-50',
                                                    text: 'text-orange-700',
                                                    border: 'border-orange-200'
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

                                                {idx === userAnswer  && (
                                                    <span className="text-sm text-orange-600 font-medium">
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