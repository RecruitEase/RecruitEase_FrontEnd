import SideBar from "@/components/dashboard/SideBar";

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
        <main className="flex h-screen w-full">
            <SideBar user={loggedIn} />
            {children}
        </main>
    );
}
