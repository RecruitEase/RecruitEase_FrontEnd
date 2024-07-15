import { Layout } from "@/components/layout/layout";
import "@/styles/globals.css";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return <Layout>
        <div className="h-full px-15">
            <div
                className="md:m-[3rem] md:mt-[2rem] m-[1rem] mt-[2rem]">
                {children}
            </div>
        </div>
    </Layout>
;
}
