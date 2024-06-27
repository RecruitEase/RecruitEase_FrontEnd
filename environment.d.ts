//types for env variables
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            API_GATEWAY_URL: RequestInfo | URL;
            AUTH_GOOGLE_ID: string;
            AUTH_GOOGLE_SECRET: string;
            // add more environment variables and their types here
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}