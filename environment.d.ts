//types for env variables
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_SECRET:string;
            API_GATEWAY_BASE_URL:string;
            API_GATEWAY_LOGIN: RequestInfo | URL;
            AUTH_GOOGLE_ID: string;
            AUTH_GOOGLE_SECRET: string;
            NEXT_PUBLIC_API_URL: string;
            NEXT_PUBLIC_S3_URL:string;
            NEXTAUTH_SECRET: string;
            // add more environment variables and their types here
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}