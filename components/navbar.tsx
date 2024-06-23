"use client"
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem, NavbarProps,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale
} from "@/components/icons";
import {DropdownItem, DropdownMenu} from "@nextui-org/dropdown";
import {Dropdown, DropdownTrigger} from "@nextui-org/react";
import {Avatar} from "@nextui-org/avatar";
import React, {useState} from "react";
import Image from "next/image";
import {useTheme} from "next-themes";



export const Navbar = () => {

  const {theme,setTheme}=useTheme();

  const user={
    firstName:'Chathura',
    lastName:'Lakshan',
    email:"chathura@gmail.com",
    role:'recruiter'
  };

  const isLoggedIn=true;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems =isLoggedIn? [
    {label:"Home",url:"/"},
    {label:"Explore",url:"/jobs"},
    {label:"Dashboard",url:`/${user.role}`},
    {label:"Profile",url:`/${user.role}/profile`},
    {label:"Settings",url:`/${user.role}/settings`},
    {label:"Help & Feedback",url:"/help"},
    {label:"Contact Us",url:"/contact"},
  ]:[
    {label:"Home",url:"/"},
    {label:"Explore",url:"/jobs"},
    {label:"Help & Feedback",url:"/help"},
    {label:"Contact Us",url:"/contact"},
  ];

  const avatarItems = isLoggedIn?[
    {label:"signin",url:`/`},
    {label:"Dashboard",url:`/${user.role}`},
    {label:"Profile",url:`/${user.role}/profile`},
    {label:"Settings",url:`/${user.role}/settings`},
    {label:"Chats",url:"/chats"},
    {label:"logout",url:"/logout"},
  ]:[];

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };





  return (
      <NextUINavbar maxWidth="xl" onMenuOpenChange={setIsMenuOpen} isBordered>
        <NavbarBrand>
          <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
          />
          {theme=='light'?(<Image
              src="/logos/logoSVGBlack.svg"
              width={1511}
              height={281}
              alt="RecruitEase"
          />):(<Image
              src="/logos/logoSVG.svg"
              width={1511}
              height={281}
              alt="RecruitEase"
          />)}

        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent text-medium"
                    endContent={icons.chevron}
                    radius="sm"
                    variant="light"
                >
                  Explore
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
                aria-label="ACME features"
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
            >
              <DropdownItem
                  key="supreme_support"
                  description="Checkout all listed job vacancies."
                  startContent={icons.user}
                  href={"jobs"}
              >
                All Jobs
              </DropdownItem>
              <DropdownItem
                  key="99_uptime"
                  description="Explore different job categories."
                  startContent={icons.server}
                  href={"/jobs/categories"}
              >
                Categories
              </DropdownItem>
              <DropdownItem
                  key="production_ready"
                  description="Job vacancies recommended for you."
                  startContent={icons.flash}
                  href={"/recommendations"}
              >
                Recommendations
              </DropdownItem>


            </DropdownMenu>
          </Dropdown>

          <NavbarItem>
            <Link color="foreground" href="/about">
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/contact">
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>
        {/*<NavbarContent justify="end">*/}
        {/*  <NavbarItem className="hidden lg:flex">*/}
        {/*    <Link href="#">Login</Link>*/}
        {/*  </NavbarItem>*/}
        {/*  <NavbarItem>*/}
        {/*    <Button as={Link} color="primary" href="#" variant="flat">*/}
        {/*      Sign Up*/}
        {/*    </Button>*/}
        {/*  </NavbarItem>*/}
        {/*</NavbarContent>*/}

        <NavbarContent
            className="hidden sm:flex basis-1/5 sm:basis-full"
            justify="end"
        >

          <NavbarItem className="hidden md:flex lg:flex">{searchInput}</NavbarItem>
          <NavbarItem className="hidden sm:flex gap-2">
            <ThemeSwitch/>
          </NavbarItem>
        </NavbarContent>


        <NavbarContent as="div" justify="end">
          {!isLoggedIn ? (<>
                <NavbarItem>
                  <Button as={Link} color="primary" href="/signin" variant="flat">
                    Sign In
                  </Button>
                </NavbarItem>
                <NavbarItem>
                  <Button as={Link} color="primary" href="/signup" variant="flat">
                    Sign Up
                  </Button>
                </NavbarItem>
              </>
          ) : (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      name="Jason Hughes"
                      size="sm"
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">


                  {avatarItems.map((item, index) => {
                    if (index == avatarItems.length - 1) {
                      return (
                          <DropdownItem key={"logout-key"} href={"/logout"}>
                            Log Out
                          </DropdownItem>
                      )
                    } else if (index == 0) {
                      return (
                          <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">{user.email}</p>
                          </DropdownItem>

                      )
                    } else {
                      return (
                          <DropdownItem key={`${item.label}-${index}`} href={item.url}>
                            {item.label}
                          </DropdownItem>
                      )
                    }
                  })}


                </DropdownMenu>
              </Dropdown>
          )}

        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.label}-${index}`}>
                <Link
                    color={"foreground"}
                    className="w-full"
                    href={item.url}
                    size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
          ))}
          {isLoggedIn ? (
              <NavbarMenuItem key={"logout-key"}>
                <Link
                    color="danger"
                    className="w-full"
                    href="/logout"
                    size="lg"
                >
                  Log Out
                </Link>
              </NavbarMenuItem>
          ) : (
              <></>


          )}
        </NavbarMenu>
      </NextUINavbar>
  );
};
