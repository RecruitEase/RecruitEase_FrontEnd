"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import {SessionProvider} from "next-auth/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}
const queryClient = new QueryClient({
    defaultOptions: {
        queries:{
            retry:5,
            retryDelay:1000
        }
    }
});

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (

    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <SessionProvider>
            <QueryClientProvider client={queryClient}>

            {children}
                <ReactQueryDevtools initialIsOpen={false} />

            </QueryClientProvider>
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
