import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

interface GraphSummary {
  imageUrl: string;
  title: string;
  subtitle: string;
  detailsLink: string;
  children: React.ReactNode;
}

const FinanceSummaryCard: React.FC<GraphSummary> = ({
  imageUrl,
  title,
  subtitle,
  detailsLink,
  children,
}) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={imageUrl}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">{subtitle}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row justify-center gap-4">
        {children}
      </CardBody>
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href={detailsLink}>
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FinanceSummaryCard;
