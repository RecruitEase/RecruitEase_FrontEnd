
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
            <main className="flex h-screen w-full mt-4">
                {children}
            </main>

        </>
    );
}
