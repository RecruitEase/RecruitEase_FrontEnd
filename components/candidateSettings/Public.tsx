import react from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/react";
export default function Public() {
  return (
    <div className="p-2 md:p-4">
      <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
        <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
        <div className="grid max-w-2xl mx-auto mt-8">
          <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
            <img
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt="Bordered avatar"
            />
            <ButtonGroup className="ml-4">
              <Button>Edit Picture</Button>
              <Button>Delete Picture</Button>
            </ButtonGroup>
          </div>

          <div className="items-center mt-8 sm:mt-14 text-[#202142]">
            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <Input
                  isRequired
                  type="text"
                  label="Name"
                  defaultValue="Sajith Bandara"
                  className="max-w-xs"
                />
              </div>
              <div className="w-full">
                <Input
                  isRequired
                  type="email"
                  label="Email"
                  defaultValue="sajithbandara@gamil.com"
                  className="max-w-xs"
                />
              </div>
            </div>
            <div className="mb-2 sm:mb-6">
              <Textarea
                isRequired
                label="Address"
                labelPlacement="outside"
                defaultValue="No 123, Colombo, Sri Lanka"
                className="w-full"
              />
            </div>
            <div className="mb-2 sm:mb-6">
              <Textarea
                isRequired
                label="About Me"
                labelPlacement="outside"
                defaultValue="I'm a Product Designer based in Dallas, Texas. I specialize in UX/UI design, product design, and code development. I'm always striving to grow and learn something new, trying to do stuff that is outside my comfort zone. My work has been featured on Dribble, Behance, Webflow, Awwwards, CSS Winner, Mobbin, and Editor X."
                className="w-full"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
