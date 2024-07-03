import {Navbar} from "@/components/navbar";
import SideBar from "@/components/dashboard/SideBar";
import {Link} from "@nextui-org/link";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
