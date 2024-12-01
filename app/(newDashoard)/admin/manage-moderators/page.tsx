"use client";
import type { NextPage } from "next";
import { UserCard } from "@/components/admin/manageModarators/userCard";
import HeaderBox from "@/components/dashboard/HeaderBox";
import React, {useEffect, useState} from "react";
import { Button } from "@nextui-org/button";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  useDisclosure
} from "@nextui-org/react";
import CustomInput from "@/components/form_inputs/CustomInput";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import Swal from 'sweetalert2';
import {Bounce, toast} from "react-toastify";
import LoadingComponent from "@/components/LoadingComponent";

interface moderator{
  id:string ,
  email:string ,
  role:string,
  isActive: true,
  createdAt: string,
  firstName: string,
  lastName: string,
  city: string,
  gender: string,
  profilePic: string,
  moderatorId:string
}

const ManageModerators: NextPage = () => {

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({ mode: "all" });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data,setData]=useState<moderator[]>();
  const [reload,setReload]=useState(false);
  const [loading,setLoading]=useState(false);


  const axios=useAxiosAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const createModerator = () => {
    reset();
    setSelectedUser(null);
    setIsEnabled(false);

    onOpen();
  };

  const getModerators = () => {

     axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/all/moderators`)
        .then(response => {
          const data = response.data.content;
          if (!Array.isArray(data)) {
            console.error("Unexpected data format:", data);

          }
          setData(data)
          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          console.error("Error fetching interview data:", error);
        });


  };


// editModerator------------------------------------------------------------
  const editModerator = (user) => {
    setSelectedUser(user);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("email", user.email);
    setValue("mobileNumber", "0716676968");
    setValue("address", user.address); // Add address if available in user data
    // setIsEnabled(user.status === "Active");
    onOpen();
  };

  const activateModerator = (id:string)=>{
      Swal.fire({
          title: "Do you want to activate the moderator?",
          icon:"warning",
          customClass: {
              confirmButton: 'bg-recruitBlue', // Custom class for confirm button
              cancelButton: 'bg-[#a1a1aa]'   // Custom class for cancel button
          },

          showCancelButton: true,
          confirmButtonText: "Activate",

      }).then(() => {
          axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/activate-moderator/${id}`)
              .then(response => {
                  if (response.status == 201) {
                      toast.success('Deactivation successfully!', {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                              transition: Bounce,
                          }

                      );
                      setReload(true);
                  } else {
                      toast.error('Deactivation failed!', {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                          transition: Bounce,
                      })
                  }
              })
              .catch(error => {
                  toast.error('Deactivation failed!', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                      transition: Bounce,
                  })
                  console.error("Error fetching interview data:", error);
              });

      });
  }


  // delete moderator------------------------------------------------------
  const deleteModerator = (id:string) => {
    Swal.fire({
      title: "Do you want to deactivate the moderator?",
      icon:"warning",
      customClass: {
        confirmButton: 'bg-[#f31260]', // Custom class for confirm button
        cancelButton: 'bg-[#a1a1aa]'   // Custom class for cancel button
      },

      showCancelButton: true,
      confirmButtonText: "Deactivate",

    }).then(() => {
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/deactivate-moderator/${id}`)
          .then(response => {
            if (response.status == 201) {
              toast.success('Deactivation successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
              }

              );
              setReload(true);
            } else {
              toast.error('Deactivation failed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
              })
            }
            })
          .catch(error => {
              toast.error('Deactivation failed!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  transition: Bounce,
              })
            console.error("Error fetching interview data:", error);
          });

    });
  }

  const onSubmit = (data) => {
    // data.status = isEnabled ? "Active" : "Disabled";
    data.gender="Male"
    data.city="Colombo"
    data.profilePic="/profileImages/noImage.png"

      console.log(data);
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register-moderator`,data)
          .then(response => {
              if (response.status == 201 || response.status == 200 ) {
                  toast.success('Moderator created successfully!', {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                          transition: Bounce,
                      }

                  );
                  setReload(true);
              } else {
                  toast.error('Moderator register failed!', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                      transition: Bounce,
                  })
              }
          })
          .catch(error => {
              console.error("Error fetching interview data:", error);
          });

    onClose(); // Close the modal after submitting the form
  };

  // const handleSwitchChange = () => {
  //   setIsEnabled(!isEnabled);
  // };

  const myPopUp = (
      <Modal size={"2xl"} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {selectedUser ? "Edit Moderator" : "Add Moderator"}
                </ModalHeader>
                <ModalBody className={"gap-0"}>
                  <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={"flex "}>
                      <CustomInput
                          className={" w-full"}
                          name={"firstName"}
                          label={"First Name"}
                          placeholder={"Enter first name"}
                          required={true}
                          register={register}
                          errors={errors}
                          validationSchema={{
                            required: {
                              value: true,
                              message: "Please enter first name"
                            },
                            pattern: {
                              value: /^[A-Za-z]+(?:['-][A-Za-z]+)*$/,
                              message: "Invalid first name"
                            }
                          }}
                      />

                      <CustomInput
                          className={"w-full"}
                          name={"lastName"}
                          label={"Last Name"}
                          placeholder={"Enter last name"}
                          required={true}
                          register={register}
                          errors={errors}
                          validationSchema={{
                            required: {
                              value: true,
                              message: "Please enter last name"
                            },
                            pattern: {
                              value: /^[A-Za-z]+(?:['-][A-Za-z]+)*$/,
                              message: "Invalid last name"
                            }
                          }}
                      />
                    </div>

                    <div className={"flex "}>
                      <CustomInput
                          className={" w-full"}
                          name={"email"}
                          label={"Email"}
                          placeholder={"Enter email"}
                          required={true}
                          register={register}
                          errors={errors}
                          validationSchema={{
                            required: {
                              value: true,
                              message: "Please enter email address"
                            },
                            pattern: {
                              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                              message: "Invalid email address"
                            }
                          }}
                      />

                      <CustomInput
                          className={" w-full"}
                          name={"mobileNumber"}
                          label={"Phone Number"}
                          placeholder={"Enter phone number"}
                          required={true}
                          register={register}
                          errors={errors}
                          validationSchema={{
                            required: {
                              value: true,
                              message: "Please enter phone number"
                            },
                            pattern: {
                              value: /^(070|071|072|075|076|077|078|074)\d{7}$/,
                              message: "Invalid Sri Lankan mobile number"
                            }
                          }}
                      />
                    </div>

                    <div className={"flex "}>
                      <CustomInput
                          className={"w-full"}
                          name={"address"}
                          label={"Address"}
                          placeholder={"Enter address"}
                          required={true}
                          register={register}
                          errors={errors}
                          validationSchema={{
                            required: {
                              value: true,
                              message: "Please enter address"
                            }
                          }}
                      />

                      {!selectedUser && (
                          <div className={"w-full ml-[8px] mr-[8px] mb-[4px] "}>
                            <label htmlFor="password">Password</label>
                            <Input
                                {...register("password", {
                                  required: {
                                    value: true,
                                    message: "Please enter a password"
                                  }
                                })}
                                id={"password"}
                                variant="bordered"
                                placeholder="Enter your password"
                                endContent={
                                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                  </button>
                                }
                                type={isVisible ? "text" : "password"}
                                className="max-w"
                            />
                            {errors.password && <p className="text-danger text-sm mt-2">{errors.password?.message}</p>}
                          </div>
                      )}
                    </div>

                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" type="submit">
                        {selectedUser ? "Update" : "Add"}
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalBody>
              </>
          )}
        </ModalContent>
      </Modal>
  );

  useEffect(() => {
    setLoading(true)
    getModerators()
    setReload(false)
  }, [reload]);

  return (
      <div>
        {myPopUp}
        <header className="home-header">
          <HeaderBox type="title" title="Manage Moderators" subtext="Add and manage moderators to system from here." />
        </header>

        <div className={"flex justify-end mb-4"}>
          <Button className={"bg-recruitBlue text-[#FFFFFF]"} onPress={createModerator}>
            ADD NEW
          </Button>
        </div>
        <br />
        {loading?(
            <LoadingComponent/>
        ): (
            <div className={"flex sm:flex-row flex-col gap-4 flex-wrap"}>
              {data && data.map((item, index) => (
                  <UserCard key={index} user={item} onEdit={() => editModerator(item)}
                            onDelete={() => deleteModerator(item.id)} onActive={()=>activateModerator(item.id)}/>
              ))}
            </div>
        )}

      </div>
  );
};

export default ManageModerators;
