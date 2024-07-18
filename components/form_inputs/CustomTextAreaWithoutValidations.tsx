import React from 'react';
import {CustomFormInputProps, CustomFormInputWithoutValidationProps} from "@/types";
import {Input} from "@nextui-org/input";
import {Textarea} from "@nextui-org/react";

const CustomAreaWithoutValidation = ({
                         className = "",
                         name,
                         label,
                         required,
                         type = "text",
                         variant = "bordered",
                         placeholder = ""
                     }: CustomFormInputWithoutValidationProps) => {

    return (
        <div className={"mb-1 mx-2 " + className}>
            <label htmlFor={name}>
                {label}
                {required && <span className={"text-danger"}> * </span>}
            </label>
            <Textarea
                id={name}
                      name={name}
                      variant={variant}
                      placeholder={placeholder}
            />

        </div>
    );
};

export default CustomAreaWithoutValidation;
