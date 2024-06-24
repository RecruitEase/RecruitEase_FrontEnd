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
        <>

            <SideBar user={loggedIn} />
            <section className="home">
                <div className="home-content">
                    {children}
                </div>
            </section>

        </>

    );
}
