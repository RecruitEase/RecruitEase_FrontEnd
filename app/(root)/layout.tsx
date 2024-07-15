import { Navbar } from "@/components/navbar";
import SideBar from "@/components/dashboard/SideBar";
import { Link } from "@nextui-org/link";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="md:mx-[5rem] mx-[1rem]">
                {children}
            </main>

        </>
    );
}
