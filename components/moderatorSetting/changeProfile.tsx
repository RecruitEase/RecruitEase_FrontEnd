"use client";
import React, { useState } from "react";
import {Button, Card, CardBody, Tab, Tabs} from "@nextui-org/react";
import Public from "./Public";

export default function App() {
  const [activeComponent, setActiveComponent] = useState("Public");

  return (
      <Card>
        <CardBody>
          <Public />
        </CardBody>
      </Card>
  )

}
