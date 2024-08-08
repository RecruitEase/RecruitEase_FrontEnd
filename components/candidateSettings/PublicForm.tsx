import React from "react";
import { Input } from "@nextui-org/react";

export default function PublicForm() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        isRequired
        type="text"
        label="Your first name"
        defaultValue="Jane"
        className="w-full"
      />
      <Input
        isRequired
        type="text"
        label="Your last name"
        defaultValue="Ferguson"
        className="w-full"
      />
      <Input
        isRequired
        type="email"
        label="Your email"
        defaultValue="your.email@mail.com"
        className="w-full"
      />
      <Input
        type="text"
        label="Profession"
        defaultValue="your profession"
        className="w-full"
      />
      <textarea
        className="w-full p-2 border rounded-md"
        placeholder="Write your bio here..."
        rows="4"
      ></textarea>
    </div>
  );
}
