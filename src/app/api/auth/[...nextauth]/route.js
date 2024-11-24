import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongoose";
import User from "@/app/model/user";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    console.log('Attempting to connect to DB...');
                    await connectDB();
                    console.log('DB connected');
                    
                    console.log('Finding user:', credentials.username);
                    const user = await User.findOne({ username: credentials.username });
                    console.log('User found:', user ? 'Yes' : 'No');

                    if (!user) {
                        throw new Error('ไม่พบชื่อผู้ใช้นี้');
                    }

                    console.log('Checking password...');
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    console.log('Password valid:', isValid);

                    if (!isValid) {
                        throw new Error('รหัสผ่านไม่ถูกต้อง');
                    }

                    return {
                        id: user._id,
                        name: user.username,
                        email: user.email,
                        role: user.role
                    };
                } catch (error) {
                    console.error('Auth Error:', error);
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.username = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.role = token.role;
                session.user.username = token.username;
            }
            return session;
        }
    },
    pages: {
        signIn: '/account',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST }; 