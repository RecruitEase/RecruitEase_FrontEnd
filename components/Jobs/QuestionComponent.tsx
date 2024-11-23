"use client"
import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Check, X, Loader } from '@/node_modules/lucide-react';
import {Button} from "@nextui-org/button";
import {Card, CardBody, CardHeader} from "@nextui-org/react";
import {Input} from "@nextui-org/input";

const API_URL = '/api/questions';


const MCQQuizApp = () => {
    const [page, setPage] = useState('create');
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch questions');
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            // showNotification('Failed to load questions. Please try again later.', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className=" flex items-center justify-center">
                <Loader className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-8">

            <div className="max-w-4xl mx-auto">
                {/*<div className="flex gap-4 mb-8">*/}
                {/*    <Button*/}
                {/*        onClick={() => setPage('create')}*/}
                {/*        variant={page === 'create' ? 'default' : 'outline'}*/}
                {/*    >*/}
                {/*        Create Questions*/}
                {/*    </Button>*/}
                {/*    <Button*/}
                {/*        onClick={() => setPage('answer')}*/}
                {/*        variant={page === 'answer' ? 'default' : 'outline'}*/}
                {/*    >*/}
                {/*        Answer Questions*/}
                {/*    </Button>*/}
                {/*</div>*/}

                {page === 'create' ? (
                    <QuestionCreator
                        questions={questions}
                        setQuestions={setQuestions}
                    />
                ) : (
                    <QuizTaker
                        questions={questions}
                        score={score}
                        setScore={setScore}
                    />
                )}
            </div>
        </div>
    );
};

export const QuestionCreator = ({ draftQuestions, setDraftQuestions }) => {
    const [currentQuestion, setCurrentQuestion] = useState({
        question: '',
        options: ['', ''],  // Start with 2 options
        correctAnswer: 0
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addOption = () => {
        setCurrentQuestion(prev => ({
            ...prev,
            options: [...prev.options, '']
        }));
    };

    const removeOption = (indexToRemove) => {
        if (currentQuestion.options.length <= 2) return; // Minimum 2 options
        setCurrentQuestion(prev => ({
            ...prev,
            options: prev.options.filter((_, idx) => idx !== indexToRemove),
            correctAnswer: prev.correctAnswer >= indexToRemove ?
                Math.max(0, prev.correctAnswer - 1) : prev.correctAnswer
        }));
    };

    const addToDraft = () => {
        if (currentQuestion.question.trim() === '') return;
        if (currentQuestion.options.some(opt => opt.trim() === '')) return;

        setDraftQuestions([...draftQuestions, { ...currentQuestion }]);
        setCurrentQuestion({
            question: '',
            options: ['', ''],
            correctAnswer: 0
        });
    };

    const removeDraftQuestion = (index) => {
        setDraftQuestions(draftQuestions.filter((_, idx) => idx !== index));
    };

    const saveAllQuestions = async () => {
        if (draftQuestions.length === 0) return;

        try {
            setIsSubmitting(true);
            console.log("obj",draftQuestions)
            console.log("str",JSON.stringify({ questions: draftQuestions }))
            // const response = await fetch(API_URL + '/batch', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ questions: draftQuestions }),
            // });
            //
            // if (!response.ok) throw new Error('Failed to save questions');

            setDraftQuestions([]);
        } catch (error) {
            // showNotification('Failed to save questions. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    Create New Question
                </CardHeader>
                <CardBody>
                    <div className="space-y-4">
                        <Input
                            placeholder="Enter your question"
                            value={currentQuestion.question}
                            onChange={(e) => setCurrentQuestion({
                                ...currentQuestion,
                                question: e.target.value
                            })}
                        />

                        {currentQuestion.options.map((option, idx) => (
                            <div key={idx} className="flex gap-4 items-center">
                                <Input
                                    placeholder={`Option ${idx + 1}`}
                                    value={option}
                                    onChange={(e) => {
                                        const newOptions = [...currentQuestion.options];
                                        newOptions[idx] = e.target.value;
                                        setCurrentQuestion({
                                            ...currentQuestion,
                                            options: newOptions
                                        });
                                    }}
                                />
                                <Button
                                    variant={currentQuestion.correctAnswer === idx ? 'solid' : 'faded'}
                                    color={currentQuestion.correctAnswer === idx ? 'success' : 'default'}
                                    onClick={() => setCurrentQuestion({
                                        ...currentQuestion,
                                        correctAnswer: idx
                                    })}
                                >
                                    Correct
                                </Button>
                                {currentQuestion.options.length > 2 && (
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => removeOption(idx)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}

                        <div className="flex gap-4">
                            <Button
                                onClick={addOption}
                                variant="outline"
                                className="flex-1"
                                disabled={currentQuestion.options.length >= 6}
                            >
                                Add Option
                            </Button>
                            <Button
                                onClick={addToDraft}
                                className="flex-1"
                            >
                                Add to Draft
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {draftQuestions.length > 0 && (
                <>
                    {/*<div className="flex justify-between items-center">*/}
                    {/*    <h2 className="text-xl font-semibold">Draft Questions ({draftQuestions.length})</h2>*/}
                    {/*    <Button*/}
                    {/*        onClick={saveAllQuestions}*/}
                    {/*        disabled={isSubmitting}*/}
                    {/*    >*/}
                    {/*        {isSubmitting ? (*/}
                    {/*            <Loader className="h-4 w-4 animate-spin mr-2" />*/}
                    {/*        ) : (*/}
                    {/*            <PlusCircle className="mr-2 h-4 w-4" />*/}
                    {/*        )}*/}
                    {/*        Save All Questions*/}
                    {/*    </Button>*/}
                    {/*</div>*/}

                    <div className="space-y-4">
                        {draftQuestions.map((q, index) => (
                            <Card key={index}>
                                <CardBody className="pt-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">{q.question}</h3>
                                            <ul className="mt-2 space-y-1">
                                                {q.options.map((opt, optIdx) => (
                                                    <li key={optIdx} className="flex items-center gap-2">
                                                        {opt}
                                                        {optIdx === q.correctAnswer &&
                                                            <Check className="h-4 w-4 text-green-500" />
                                                        }
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => removeDraftQuestion(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </>
            )}


        </div>
    );
};

// Quiz Taker Component remains the same
export const QuizTaker = ({ questions, currentAnswers, setCurrentAnswers }) => {



    if (questions.length === 0) {
        return (
            <Card>
                <CardBody className="pt-6">
                    <p className="text-center text-gray-500">No questions available.</p>
                </CardBody>
            </Card>
        );
    }



    return (
        <div className="space-y-6">
            {questions.map((q, idx) => (
                <Card key={idx}>
                    <CardBody className="pt-6">
                        <h3 className="font-semibold mb-4">{q.question}</h3>
                        <div className="space-y-2">
                            {q.options.map((opt, optIdx) => (
                                <Button
                                    key={optIdx}
                                    color={currentAnswers[idx] === optIdx ? 'warning' : 'default'}
                                    variant={currentAnswers[idx] === optIdx ? 'solid' : 'flat'}
                                    className="w-full justify-start"
                                    onClick={() => {
                                        console.log(currentAnswers)
                                        console.log(questions)
                                        setCurrentAnswers({
                                            ...currentAnswers,
                                            [idx]: optIdx
                                        })
                                    }}
                                >
                                    {opt}
                                </Button>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            ))}

            {/*<Button*/}
            {/*    className="w-full"*/}
            {/*    onClick={handleSubmit}*/}
            {/*    disabled={Object.keys(currentAnswers).length !== questions.length}*/}
            {/*>*/}
            {/*    Submit Quiz*/}
            {/*</Button>*/}
        </div>
    );
};

export default MCQQuizApp;