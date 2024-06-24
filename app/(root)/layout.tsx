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
            <main className="container pt-16 px-10 flex-grow">
                <main className="flex h-screen w-full">
                    {children}
                </main>
            </main>

        </>
    );
}
