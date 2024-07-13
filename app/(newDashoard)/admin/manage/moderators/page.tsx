"use client";
import type { NextPage } from "next";
import { UserCard } from "@/components/admin/manageModarators/userCard";
import HeaderBox from "@/components/dashboard/HeaderBox";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
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

const data = [
  {
    name: "Sajith Bandara",
    email: "nishanthasajithbandara@gmail.com",
    imageUrl: "https://th.bing.com/th/id/OIP.4Y0BXVoEPd7lBZms8uraGAHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    status: "Active",
    address:"pallebedda Ratnapura",
    pnumber:"0716676968"

  },
  {
    name: "Chathura Lakshan",
    email: "Chathura@gmail.com",
    imageUrl: "https://th.bing.com/th/id/OIP.NqY3rNMnx2NXYo3KJfg43gAAAA?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    status: "Disable",
    address:"colombo 07",
    pnumber:"0712256987"
  },
  {
    name: "Randunu Kumari",
    email: "randunu@gmail.com",
    imageUrl: "https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    status: "Disable",
    address:"pallebedda Ratnapura",
    pnumber:"0716676968"
  },
  {
    name: "Akila Demote",
    email: "akila@gmail.com",
    imageUrl: "https://th.bing.com/th/id/OIP.XSZAFm-5JI7nriDLwZqRQQAAAA?w=294&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    status: "Active",
    address:"pallebedda Ratnapura",
    pnumber:"0716676968"
  },
  {
    name: "Sajith Bandara",
    email: "sajithbanadara@gmail.com",
    imageUrl: "https://th.bing.com/th/id/OIP.4Y0BXVoEPd7lBZms8uraGAHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    status: "Active",
    address:"pallebedda Ratnapura",
    pnumber:"0716676968"
  },
  {
    name: "Sajith Bandara",
    email: "sajithbandara@gmail.com",
    imageUrl: "https://th.bing.com/th/id/OIP.4Y0BXVoEPd7lBZms8uraGAHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    status: "Active",
    address:"pallebedda Ratnapura",
    pnumber:"0716676968"
  }
];

const ManageModerators: NextPage = () => {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({ mode: "all" });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const createModerator = () => {
    reset();
    setSelectedUser(null);
    setIsEnabled(false);
    onOpen();
  };

  const editModerator = (user) => {
    setSelectedUser(user);
    setValue("fname", user.name.split(" ")[0]);
    setValue("lname", user.name.split(" ")[1]);
    setValue("email", user.email);
    setValue("pnumber", user.pnumber);
    setValue("address", user.address); // Add address if available in user data
    setIsEnabled(user.status === "Active");
    onOpen();
  };

  const onSubmit = (data) => {
    data.status = isEnabled ? "Active" : "Disabled";
    console.log(data);
    onClose(); // Close the modal after submitting the form
  };

  const handleSwitchChange = () => {
    setIsEnabled(!isEnabled);
  };

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
                    <div className={"flex justify-end mb-4 "}>
                      <Switch
                          checked={isEnabled}
                          onChange={handleSwitchChange}
                          size="sm"
                          classNames={{
                            base: cn(
                                "flex flex-row-reverse  max-w-md  justify-start",
                                "cursor-pointer gap-2 mr-[8px]",
                                "data-[selected=true]:border-primary"
                            )
                          }}
                      >
                        Enable
                      </Switch>
                    </div>

                    <div className={"flex "}>
                      <CustomInput
                          className={" w-full"}
                          name={"fname"}
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
                          name={"lname"}
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
                          name={"pnumber"}
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

        <div className={"flex sm:flex-row flex-col gap-4 flex-wrap"}>
          {data && data.map((item, index) => (
              <UserCard key={index} user={item} onEdit={() => editModerator(item)} />
          ))}
        </div>
      </div>
  );
};

export default ManageModerators;
