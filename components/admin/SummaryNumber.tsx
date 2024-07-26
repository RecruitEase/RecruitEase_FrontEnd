import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { IconType } from "react-icons";

interface SummaryNumberProps {
  analyticName: string;
  amount: number;
  percentageChange: number;
  Icon: IconType;
}

export const SummaryNumber: React.FC<SummaryNumberProps> = ({
  amount,
  percentageChange,
  Icon,
  analyticName,
}) => {
  const isPositiveChange = percentageChange >= 0;
  const percentageChangeText = `${isPositiveChange ? "+ " : "- "}${Math.abs(percentageChange)}%`;

  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <Icon />
          <div className="flex flex-col">
            <span className="text-white">{analyticName}</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">{amount}</span>
          <span
            className={`text-xs ${isPositiveChange ? "text-success" : "text-error"}`}
          >
            {percentageChangeText}
          </span>
        </div>
      </CardBody>
    </Card>
  );
};
