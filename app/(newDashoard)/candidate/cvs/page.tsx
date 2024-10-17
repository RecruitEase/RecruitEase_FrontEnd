"use client";
import React, { ChangeEvent, useEffect } from "react";
import {
  Card,
  CardHeader,
  Image,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import CustomInputWithoutValidation from "@/components/form_inputs/CustomInputWithoutValidations";
import Link from "next/link";
import HeaderBox from "@/components/dashboard/HeaderBox";
import { CVProps } from "@/types";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { CvUploadIcon } from "@/components/icons/CvIconUpload";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/LoadingComponent";

const Management = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [cv, setCv] = React.useState<CVProps[]>([]);
  const [cvName, setCvName] = React.useState("");
  const [cvFile, setCvFile] = React.useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);

  const { data: session } = useSession();
  const candidateId = session?.user?.roleDetails?.candidateId;

  const axios = useAxiosAuth();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!candidateId) return; //if candidateId is not available, return

    const fetchCv = async () => {
      try {
        const res = await axios.get(`api/v1/cv/candidate/${candidateId}`);
        console.log(res.data.content);
        setCv(res.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
      setUploadSuccess(false);
    };
    fetchCv();
  }, [uploadSuccess]);

  //Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvFile(e.target.files[0]);
    }
  };

  //Handle cvName input change
  const handleNameChange = (value: any) => {
    console.log("fdffdffdDFD", value);
    setCvName(value);
  };



  const handleUpload = async () => {

    const formData = new FormData();
    if (cvFile) {
      formData.append("file", cvFile);
    }

    try {
      setIsLoading(true);
      const res = await axios.post("/api/v1/files/upload-cv", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Upload Successful:', res.data);

      const { file, cvImage } = res.data.content;

      const saveCvdata = {
        file: file,
        cvImage: cvImage,
        cvData: null,
        cvName: cvName,
      };

      const saveRes = await axios.post("/api/v1/cv/saveCv", saveCvdata, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Save Successful:', saveRes.data);

      toast.success("CV uploaded successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
      });

      setUploadSuccess(true);


    } catch (error) {
      console.error("Error uploading or CV save:", error);
    }

    setIsLoading(false);
    onClose();
  };

  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title="CV Library"
          subtext="Manage your CVs here."
        />
      </header>
      {isLoading ? (
        <LoadingComponent />
      ) :
      <>
      <div className=" w-full flex justify-end gap-2">
        <Button
          className="bg-recruitBlue text-white"
          as={Link}
          href={"/candidate/cvs/create"}
        >
          Create
        </Button>

        {/* upload CV button */}
        <Button onClick={onOpen} className="bg-recruitBlue text-white" >
          Upload
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Upload Your CV
                </ModalHeader>
                <ModalBody>
                  <div>
                    <div>
                      <CustomInputWithoutValidation
                        name="name"
                        label="CV Name"
                        required={true}
                        placeholder="CV Name"
                        className="mb-5"
                        onValChange={handleNameChange}
                      />
                    </div>
                    {/* <div className='border border-dashed border-gray-500 p-4 mb-4 h-40'> */}
                    {/* <div className='items-center justify-center font-extralight text-xs'>
                                Drag and drop
                                your CV here
                              </div> */}
                    <div className="flex">
                      <label
                        htmlFor="file-upload"
                        className="flex items-center justify-center cursor-pointer"
                      >
                        <CvUploadIcon />
                      </label>

                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"

                        onChange={handleFileChange}
                      />
                    </div>


                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={onClose}> Close</Button>

                  <Button color="primary" onClick={handleUpload} isLoading={isLoading}>
                    Upload
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="flex flex-col sm:flex-row  w-full flex-wrap ">
        {cv &&
          cv.map((item) => (
            <div
              key={"cv" + item.cvId}
              id={"cv" + item.cvId}
              className=" relative group"
            >
              <Card className="col-span-12 sm:col-span-4 h-[350px] w-[200px] m-2 mt-2 transition duration-300 ease-in-out">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start"></CardHeader>
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover duration-300 ease-in-out group-hover:blur-sm"
                  src={item.cvImage}
                />
                <CardHeader className="absolute z-10 top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
                  {/* Added hover effect for the button */}
                  <Button
                    className=" bg-recruitBlue text-white"
                    as={Link}
                    href={"/candidate/cvs/" + item.cvId}
                  >
                    View CV
                  </Button>
                </CardHeader>
              </Card>
              <div className=" text-center font-bold"> {item.cvName}</div>
            </div>
          ))}
      </div>
      </>}
    </div>
  );
};

export default Management;
