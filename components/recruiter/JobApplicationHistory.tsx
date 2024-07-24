import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
interface JobApplicationHistoryProps {
  applied: any;
  preScreening: any;
  shortListed: any;
  interviewScheduled: any;
  interview: any;
  offered: any;
  rejected: any;
}

const JobApplicationHistory = ({
  applied,
  preScreening,
  shortListed,
  interviewScheduled,
  interview,
  offered,
  rejected,
}: JobApplicationHistoryProps) => {
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleViewOfferNote = (offer) => {
    setSelectedOffer(offer);
    setShowOfferPopup(true);
  };

  const closeOfferPopup = () => {
    setShowOfferPopup(false);
    setSelectedOffer(null);
  };

  const stages = [
    { name: "Applied", data: applied },
    { name: "Pre-Screening", data: preScreening },
    { name: "Short Listed", data: shortListed },
    { name: "Interview Scheduled", data: interviewScheduled },
    { name: "Interview", data: interview },
    { name: "Offered", data: offered },
    { name: "Rejected", data: rejected },
  ];

  const myPopUp = (
    <Modal
      size={"2xl"}
      isOpen={showOfferPopup}
      onClose={closeOfferPopup}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row gap-2">
              <div className={"flex flex-col justify-center"}>
                {selectedOffer?.companyName} - {selectedOffer?.position}
              </div>
            </ModalHeader>
            <ModalBody className={"gap-0"}>
              <div className={"flex gap-4"}>
                <div
                  className={
                    "flex flex-col mb-4 text-sm font-bold text-gray-600"
                  }
                >
                  <div>
                    <p>Date:</p>
                  </div>
                  <div>
                    <p>Time:</p>
                  </div>
                  <div>
                    <p>Dress Code:</p>
                  </div>
                  <div>
                    <p>Location:</p>
                  </div>
                </div>
                <div
                  className={
                    "flex flex-col mb-4 text-sm font-bold text-gray-600"
                  }
                >
                  <div>
                    <p>{selectedOffer?.date}</p>
                  </div>
                  <div>
                    <p>{selectedOffer?.time}</p>
                  </div>
                  <div>
                    <p>{selectedOffer?.dressCode}</p>
                  </div>
                  <div>
                    <p>{selectedOffer?.location}</p>
                  </div>
                </div>
              </div>
              <div className={"mb-4"}>
                <p>{selectedOffer?.description}</p>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );

  return (
    <div>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {stages.map((stage, index) => (
          <li
            className={`mb-10 ms-6 ${!stage.data ? "opacity-50" : ""}`}
            key={index}
          >
            <span
              className={`absolute flex items-center justify-center w-6 h-6 ${stage.data ? "bg-blue-100" : "bg-red-100"} rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 ${stage.data ? "dark:bg-blue-900" : "dark:bg-red-900"}`}
            >
              {stage.data ? <TiTick /> : <MdCancel />}
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              {stage.name}
              {stage.data?.score && (
                <button className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                  Score: {stage.data.score}
                </button>
              )}
              {stage.data?.status && (
                <button className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                  {stage.data.status}
                </button>
              )}
            </h3>
            {stage.data?.date && (
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                on {stage.data.date}
              </time>
            )}
            {stage.data?.link && stage.name === "Offered" ? (
              <a
                href="#"
                onClick={() => handleViewOfferNote(stage.data)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                {stage.data.linkText}
              </a>
            ) : (
              stage.data?.link && (
                <a
                  href={stage.data.link}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  {stage.data.linkText}
                </a>
              )
            )}
          </li>
        ))}
      </ol>

      {showOfferPopup && myPopUp}
    </div>
  );
};

export default JobApplicationHistory;
