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
import {QuizReviewPopUpProps} from "@/types/job";
import ShowAnswers from "@/components/Jobs/ShowAnswers";
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
  questions,
  userAnswers,
  applicant
}: QuizReviewPopUpProps) {
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
              <ShowAnswers  questions={questions} userAnswers={userAnswers}/>
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
