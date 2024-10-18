import React from 'react';
import { CustomFormInputWithoutValidationProps } from "@/types";
import { Input } from "@nextui-org/input";

const CustomInputWithoutValidation = ({
    className = "",
    name,
    label,
    required,
    type = "text",
    variant = "bordered",
    placeholder = "",
    onValChange
}: CustomFormInputWithoutValidationProps) => {

    return (
        <div className={"mb-1 mx-2 " + className}>
            <label htmlFor={name}>
                {label}
                {required && <span className={"text-danger"}> * </span>}
            </label>
            <Input
                id={name}
                name={name}
                type={type}
                variant={variant}
                placeholder={placeholder}
                onValueChange={onValChange}
            />


        </div>
    );
};

export default CustomInputWithoutValidation;
