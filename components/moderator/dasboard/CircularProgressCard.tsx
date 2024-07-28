import React from "react";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";

// Define the props interface
interface CircularProgressCardProps {
  progressValue: number;
  dataPoints: String;
}

const CircularProgressCard: React.FC<CircularProgressCardProps> = ({
  progressValue,
  dataPoints,
}) => {
  return (
    <Card
      className="border-none bg-gradient-to-br from-violet-500 to-fuchsia-500"
      style={{ overflow: "hidden" }}
    >
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          value={progressValue}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          {dataPoints}
        </Chip>
      </CardFooter>
    </Card>
  );
};

export default CircularProgressCard;
