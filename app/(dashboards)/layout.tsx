import SideBar from "@/components/dashboard/SideBar";
import {Navbar} from "@/components/navbar";
import {Link} from "@nextui-org/link";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedIn={
        firstName:'Chathura',
        lastName:'Lakshan'
    };

    return (
        <>
        <Navbar />
    <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        <main className="flex h-screen w-full">
            <SideBar user={loggedIn} />
            {children}
        </main>
    </main>
    <footer className="w-full flex items-center justify-center py-3">
        <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
            title="nextui.org homepage"
        >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">NextUI</p>
        </Link>
    </footer>
        </>

    );
}
