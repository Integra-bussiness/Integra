
export interface Company {
    id: number;
    companyName: string;

}

declare module "next-auth" {
    export interface Session {
        user: {
            id: string;
            login: string;
            password: string;
            name: string;
            companyId: number | null;
        };
    }

    export interface User {
        id: string;
        login: string;
        password: string;
        name: string;
        companyId: number | null;
    }

    export interface JWT {
        id?: string;
        login?: string;
    }
}
