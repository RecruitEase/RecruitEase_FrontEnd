import React from 'react';
import {CustomFormInputProps} from "@/types";
import {Input} from "@nextui-org/input";
import {Textarea} from "@nextui-org/react";

const CustomInput = ({
                         className = "",
                         name,
                         label,
                         register,
                         errors,
                         required,
                         type = "text",
                         validationSchema,
                         variant = "bordered",
                         placeholder = "",
    defaultValue,
                     }: CustomFormInputProps) => {

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
                defaultValue={defaultValue}
                      {...register(name, validationSchema)}
            />


            <span className="mt-3 text-danger text-sm">
        {errors && errors[name] ? errors[name]?.message?.toString() : '\u00A0'}
             </span>
        </div>
    );
};

export default CustomInput;
