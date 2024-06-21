import LoginForm from "@/components/LoginForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Sign In" };

async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return <LoginForm />;
}

export default LoginPage;
