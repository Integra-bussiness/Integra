// "use server"

// import { signIn } from "@/auth/auth";

// export const loginUser = async (login: string, password: string) => {

//     try {
//         const info = await signIn("credentials",
//             {
//                 login,
//                 password,
//                 redirect: false
//             }
//         )

//         return { success: true, message: "Авторизация успешна!", result: info };
//     }

//     catch (error) {
//         console.log(error);
//         return { success: false, message: error }
//     }

// }