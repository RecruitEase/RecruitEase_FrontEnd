import React from "react";
import {Image} from "@nextui-org/image";

type CVImageProps = {
    cvImage: string;
};

const CV: React.FC<CVImageProps> = ({ cvImage }) => {
    return (
        <div className={"flex justify-end w-full"}>
            <Image
                src={cvImage}
            />

        </div>
    )
};

export default CV;