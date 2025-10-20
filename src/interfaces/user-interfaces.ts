import type { User } from "next-auth"

export interface Company {
     id: number
  name: string
  address?: string | null
  contact_email?: string | null
  contact_phone?: string | null
  created_at?: Date | null
  users: User[]

}

declare module "next-auth" {
    
       export interface Session {
        user: {
            id: number; 
            login: string;
            password: string;
            name: string;
            company_id?: number | null;
            role?: string | null; 
            status?: string | null; 
            created_at?: Date | null;
        };
    }

    export interface User {
        id: number;
        login: string;
        password: string;
        name: string;
        company_id?: number | null;
        role?: string | null;
        status?: string | null;
        created_at?: Date | null;
    }


    export interface JWT {
        id?: number;
        login?: string;
    }
}
