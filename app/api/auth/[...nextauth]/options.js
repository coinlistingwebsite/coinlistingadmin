import { auth } from "@/firebase_config";
import { signInWithEmailAndPassword } from "firebase/auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "string" },
        password: { label: "Password", type: "string" },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;

        const user = await signInWithEmailAndPassword(auth, email, password);

        if (!user) {
          console.log("bad");
          return null;
        } else {
          return { email: email };
        }

        return;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
