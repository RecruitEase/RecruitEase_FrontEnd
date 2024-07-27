"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import { ApplicationProps } from "@/types";
type viewCvPopupProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  applicant: ApplicationProps;
};

const questions = [
  {
    id: 1,
    type: "single", // type can be 'single' or 'multiple'
    text: "Which of the following is a version control system?",
    options: [
      { id: "a", text: "Git" },
      { id: "b", text: "JIRA" },
      { id: "c", text: "Confluence" },
      { id: "d", text: "Slack" },
    ],
    correctAnswers: ["a"],
    userAnswers: ["b"],
  },
  {
    id: 2,
    type: "multiple", // type can be 'single' or 'multiple'
    text: "Select the front-end frameworks/libraries you have experience with:",
    options: [
      { id: "a", text: "React" },
      { id: "b", text: "Angular" },
      { id: "c", text: "Vue" },
      { id: "d", text: "Django" },
    ],
    correctAnswers: ["a", "b", "c"],
    userAnswers: ["a", "d"],
  },
  {
    id: 3,
    type: "single", // type can be 'single' or 'multiple'
    text: "Which language is primarily used for Android app development?",
    options: [
      { id: "a", text: "Swift" },
      { id: "b", text: "Kotlin" },
      { id: "c", text: "JavaScript" },
      { id: "d", text: "Python" },
    ],
    correctAnswers: ["b"],
    userAnswers: ["b"],
  },
  {
    id: 4,
    type: "multiple", // type can be 'single' or 'multiple'
    text: "Which of the following are database management systems?",
    options: [
      { id: "a", text: "MySQL" },
      { id: "b", text: "MongoDB" },
      { id: "c", text: "PostgreSQL" },
      { id: "d", text: "Docker" },
    ],
    correctAnswers: ["a", "b", "c"],
    userAnswers: ["a", "b", "d"],
  },
];

function ViewAnswersPopup({
  isOpen,
  onOpenChange,
  applicant,
}: viewCvPopupProps) {
  const chosenAnswer = "A";

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="4xl"
      className="h-[700px] overflow-y-scroll"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              View Answers of {applicant.name}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className="p-4 border rounded shadow-sm"
                  >
                    <div className="mb-2 font-bold">{question.text}</div>
                    <div className="space-y-2">
                      {question.options.map((option) => {
                        const isCorrect = question.correctAnswers.includes(
                          option.id
                        );
                        const isUserAnswer = question.userAnswers.includes(
                          option.id
                        );

                        return (
                          <div
                            key={option.id}
                            className={`p-2 rounded ${
                              isUserAnswer
                                ? isCorrect
                                  ? "bg-green-100 border border-green-400"
                                  : "bg-red-100 border border-red-400"
                                : ""
                            }`}
                          >
                            <span
                              className={`font-semibold ${
                                isCorrect ? "text-green-600" : ""
                              }`}
                            >
                              {option.text}
                            </span>
                            {isUserAnswer && (
                              <span
                                className={`ml-2 text-sm ${
                                  isCorrect ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {isCorrect ? "(Correct)" : "(Your choice)"}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {question.type === "multiple" &&
                      question.userAnswers.some(
                        (answer) => !question.correctAnswers.includes(answer)
                      ) && (
                        <div className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">
                          Correct answers:{" "}
                        </span>
                        {question.correctAnswers.map((correctAnswerId) => (
                          <span
                            key={correctAnswerId}
                            className="text-green-600"
                          >
                            {
                              question.options.find(
                                (option) => option.id === correctAnswerId
                              ).text
                            }
                            {correctAnswerId !==
                              question.correctAnswers[
                                question.correctAnswers.length - 1
                              ] && ", "}
                          </span>
                          
                        ))}
                      </div>
                      )}
                    {question.type === "single" &&
                      question.userAnswers[0] !==
                        question.correctAnswers[0] && (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-semibold">
                            Correct answer:{" "}
                          </span>
                          <span className="text-green-600">
                            {
                              question.options.find(
                                (option) =>
                                  option.id === question.correctAnswers[0]
                              ).text
                            }
                          </span>
                        </div>
                      )}

<div className="text-right mt-2 text-sm text-gray-600">
                          <span className="font-semibold">
                            Score:{" "}
                          </span>
                            <span>
                              5/10
                            </span>
                        </div>
                  </div>
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {/* <Button color="primary" onPress={onClose}>
              Action
            </Button> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ViewAnswersPopup;
