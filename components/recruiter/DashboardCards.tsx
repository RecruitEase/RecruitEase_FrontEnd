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
import { DataCard2 } from "../moderator/dasboard/DataCard2";

function DashboardCards() {
  return (
    <div className="flex items-center space-x-9 justify-center">
      <DataCard2
        analyticName="Total Applications"
        amount={10}
        percentageChange={10}
      />

      <DataCard2
        analyticName="Open Rate"
        amount={10 + "%"}
        percentageChange={10}
      />

      <DataCard2
        analyticName="Time to Hire"
        amount={10 + " Days"}
        percentageChange={10}
      />

      <DataCard2
        analyticName="Cost Per Hire"
        amount={10 + " LKR"}
        percentageChange={10}
      />
    </div>
  );
}

export default DashboardCards;
