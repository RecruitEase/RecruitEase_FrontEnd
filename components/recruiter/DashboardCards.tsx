import React from "react";
import {
  Card,
  CardHeader,
  Image,
  Divider,
  CardBody,
  CardFooter,
  Link,
} from "@nextui-org/react";


function DashboardCards() {
  return (
    <div className="flex items-center space-x-9 justify-center">
      <Card className="w-64">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://www.shutterstock.com/image-vector/pen-filling-application-form-apply-600nw-2246161303.jpg"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">Total Applications</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>2</p>
        </CardBody>
        <Divider />
      </Card>

      <Card className="w-64">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://static.thenounproject.com/png/3735581-200.png"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">Open Rate</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>2</p>
        </CardBody>
        <Divider />
      </Card>

      <Card className="w-64">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://static.thenounproject.com/png/3735581-200.png"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">Open rate of filtered applications</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>2</p>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}

export default DashboardCards;
