import React from "react";
import {Sidebar} from "./sidebar.styles";
import {Avatar, Tooltip} from "@nextui-org/react";
import {CompaniesDropdown} from "./companies-dropdown";
import {HomeIcon} from "../icons/sidebar/home-icon";
import {PaymentsIcon} from "../icons/sidebar/payments-icon";
import {BalanceIcon} from "../icons/sidebar/balance-icon";
import {AccountsIcon} from "../icons/sidebar/accounts-icon";
import {CustomersIcon} from "../icons/sidebar/customers-icon";
import {ProductsIcon} from "../icons/sidebar/products-icon";
import {ReportsIcon} from "../icons/sidebar/reports-icon";
import {DevIcon} from "../icons/sidebar/dev-icon";
import {ViewIcon} from "../icons/sidebar/view-icon";
import {SettingsIcon} from "../icons/sidebar/settings-icon";
import {CollapseItems} from "./collapse-items";
import {SidebarItem} from "./sidebar-item";
import {SidebarMenu} from "./sidebar-menu";
import {FilterIcon} from "../icons/sidebar/filter-icon";
import {useSidebarContext} from "../layout/layout-context";
import {ChangeLogIcon} from "../icons/sidebar/changelog-icon";
import {usePathname} from "next/navigation";
import Image from "next/image";
import {useTheme} from "next-themes";
import {InterviewIcon} from "../icons/sidebar/Interview-icon";
import {OffersIcon} from "../icons/sidebar/offers-icon";
import { CVIcon } from "../icons/sidebar/cv-icon";
import { ApplicationIcon } from "../icons/sidebar/application-icon";
import { RecruiterIcon } from "../icons/sidebar/recruiter-icon";
import { CandidateIcon } from "../icons/sidebar/candidate-icon";
import { ModeratorIcon } from "../icons/sidebar/moderator-icon";

declare interface SideBarProps {
    role: string;
}

export const SidebarWrapper = ({role}: SideBarProps) => {
    const pathname = usePathname();
    const {collapsed, setCollapsed} = useSidebarContext();

    const {theme, setTheme} = useTheme();
    return (
        <aside className="h-screen z-[20] sticky top-0">
            {collapsed ? (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div className={Sidebar.Overlay()} onClick={setCollapsed}/>
            ) : null}
            <div
                className={Sidebar({
                    collapsed: collapsed,
                })}
            >
                <div className={Sidebar.Header()}>
                    {theme === 'dark' ? (<Image className={"w-[95%]"}
                                                src="/logos/logoSVG.svg"
                                                width={1511}
                                                height={281}
                                                alt="RecruitEase"
                    />) : (<Image className={"w-[95%]"}
                                  src="/logos/logoSVGBlack.svg"
                                  width={1511}
                                  height={281}
                                  alt="RecruitEase"
                    />)}
                </div>
                <div className="flex flex-col justify-between h-full">
                    <div className={Sidebar.Body()}>
                        {role == "candidate" &&
                            (<SidebarItem
                                isActive={pathname === `/${role}`}
                                title="Profile"
                                icon={<AccountsIcon/>}
                                href={`/${role}`}
                            />)}

                        {role != "candidate" &&
                            (<SidebarItem
                                title={"Dashboard"}
                                icon={<HomeIcon/>}
                                isActive={pathname === `/${role}`}
                                href={`/${role}`}
                            />)}


                        <SidebarMenu title="Main Menu">


                            {role == "recruiter" &&
                                (
                                    <>
                                        <SidebarItem
                                            isActive={pathname === `/${role}/profile`}
                                            title="Profile"
                                            icon={<AccountsIcon/>}
                                            href={`/${role}/profile`}
                                        />
                                        <SidebarItem
                                            isActive={pathname.startsWith(`/${role}/vacancy`) || pathname.startsWith(`/${role}/candidateProfileView`)}
                                            title="Vacancies"
                                            icon={<ProductsIcon/>}
                                            href={`/${role}/vacancy`}
                                        />
                                        <SidebarItem
                                            isActive={pathname === `/${role}/post`}
                                            title="Post a Job"
                                            icon={<ReportsIcon/>}
                                            href={`/${role}/post`}
                                        />
                                        <SidebarItem
                                            isActive={pathname.startsWith(`/${role}/interviews`)}
                                            title="Interviews"
                                            icon={<InterviewIcon/>}
                                            href={`/${role}/interviews`}
                                        />
                                        <SidebarItem
                                            isActive={pathname === `/${role}/joboffers`}
                                            title="Job Offers"
                                            icon={<OffersIcon/>}
                                            href={`/${role}/joboffers`}
                                        />
                                        <SidebarItem
                                            isActive={pathname === `/${role}/tickets`}
                                            title="Tickets"
                                            icon={<BalanceIcon/>}
                                            href={`/${role}/tickets`}
                                        />

                                    </>
                                )
                            }

                            {role == "candidate" &&
                                (
                                    <>
                                        <SidebarItem
                                            isActive={pathname.startsWith(`/${role}/applications`)}
                                            title="Applications"
                                            icon={<ApplicationIcon/>}
                                            href={`/${role}/applications`}
                                        />
                                        <SidebarItem
                                            isActive={pathname.startsWith(`/${role}/cvs`)}
                                            title="CV Library"
                                            icon={<CVIcon/>}
                                            href={`/${role}/cvs`}
                                        />
                                        <SidebarItem
                                            isActive={pathname.startsWith(`/${role}/interviews`)}
                                            title="Interviews"
                                            icon={<InterviewIcon/>}
                                            href={`/${role}/interviews`}
                                        />
                                        <SidebarItem
                                            isActive={pathname === `/${role}/joboffers`}
                                            title="Job Offers"
                                            icon={<OffersIcon/>}
                                            href={`/${role}/joboffers`}
                                        />
                                        <SidebarItem
                                            isActive={pathname === `/${role}/tickets`}
                                            title="Tickets"
                                            icon={<BalanceIcon/>}
                                            href={`/${role}/tickets`}
                                        />

                                    </>
                                )
                            }

                            {role == "admin" &&
                                (
                                    <>
                                        <SidebarItem
                                            isActive={pathname.startsWith(`/${role}/manage-recruiters`)}
                                            title="Manage Recruiters"
                                            icon={<RecruiterIcon/>}
                                            href={`/${role}/manage-recruiters`}
                                        />
                                        <SidebarItem
                                            isActive={pathname.startsWith(`/${role}/manage-candidates`)}
                                            title="Manage JobSeekers"
                                            icon={<CandidateIcon/>}
                                            href={`/${role}/manage-candidates`}
                                        />
                                        <SidebarItem
                                            isActive={pathname.startsWith(`/${role}/manage-moderators`)}
                                            title="Manage Moderators"
                                            icon={<ModeratorIcon/>}
                                            href={`/${role}/manage-moderators`}
                                        />

                                        <SidebarItem
                                            isActive={pathname.startsWith(`/${role}/reports`)}
                                            title="Reports"
                                            icon={<ReportsIcon/>}
                                            href={`/${role}/reports`}
                                        />



                                    </>
                                )
                            }

                            {role == "moderator" &&
                                (
                                    <>
                                        <SidebarItem
                                            isActive={pathname.startsWith(`/${role}/tickets`)}
                                            title="Manage Tickets"
                                            icon={<BalanceIcon/>}
                                            href={`/${role}/tickets`}
                                        />
                                    </>
                                )
                            }


                            <SidebarItem
                                isActive={pathname === `/${role}/chat`}
                                title="Chats"
                                icon={<CustomersIcon/>}
                                href={`/${role}/chat`}
                            />

                        </SidebarMenu>

                        <SidebarMenu title="General">

                            {role != "recruiter"  &&
                                (<>
                                        <SidebarItem
                                            isActive={pathname.startsWith(`/${role}/edit-profile`)}
                                            title="Edit Profile"
                                            icon={<SettingsIcon/>}
                                            href={`/${role}/edit-profile`}
                                        />


                                    </>
                                )
                            }

                            {role == "recruiter" &&
                                (<>
                                    <SidebarItem
                                        isActive={pathname === `/${role}/settings`}
                                        title="Settings"
                                        icon={<SettingsIcon/>}
                                        href={`/${role}/edit-profile`}
                                    />

                                    <SidebarItem
                                        isActive={pathname === `/${role}/subscription`}
                                        title="Subscription"
                                        icon={<PaymentsIcon/>}
                                        href={`/${role}/subscription`}
                                    />
                                    </>
                                )
                            }
                        </SidebarMenu>


                    </div>
                    {/*<div className={Sidebar.Footer()}>*/}
                    {/*    <Tooltip content={"Settings"} color="primary">*/}
                    {/*        <div className="max-w-fit">*/}
                    {/*            <SettingsIcon/>*/}
                    {/*        </div>*/}
                    {/*    </Tooltip>*/}
                    {/*    <Tooltip content={"Adjustments"} color="primary">*/}
                    {/*        <div className="max-w-fit">*/}
                    {/*            <FilterIcon/>*/}
                    {/*        </div>*/}
                    {/*    </Tooltip>*/}
                    {/*    <Tooltip content={"Profile"} color="primary">*/}
                    {/*        <Avatar*/}
                    {/*            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"*/}
                    {/*            size="sm"*/}
                    {/*        />*/}
                    {/*    </Tooltip>*/}
                    {/*</div>*/}
                </div>
            </div>
        </aside>
    );
};
