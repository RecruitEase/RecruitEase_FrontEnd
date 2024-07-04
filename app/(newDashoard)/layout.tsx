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
                className="m-[5rem] mt-[2rem]">
                {children}
            </div>
        </div>
    </Layout>
;
}
