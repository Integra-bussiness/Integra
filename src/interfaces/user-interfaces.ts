
export interface Company {
    id: number;
    companyName: string;

}

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            login: string;
            password: string;
            name: string;
            companyId: number | null;
        };
    }

    interface User {
        id: string;
        login: string;
        password: string;
        name: string;
        companyId: number | null;
    }

    interface JWT {
        id?: string;
        login?: string;
    }
}
