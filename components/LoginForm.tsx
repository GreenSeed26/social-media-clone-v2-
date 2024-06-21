"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("All fields must filled in");
    }

    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        console.log(res.error);
        return;
      }
      router.replace("/");
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  return (
    <main className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSignin}
        className="flex w-[350px] flex-col gap-1 border p-4"
      >
        <h1 className="my-1 text-2xl font-bold">Sign In</h1>
        <div className="flex flex-col">
          <label htmlFor="" className="p-1 text-xs font-semibold">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="h-10 border px-4 py-1 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="p-1 text-xs font-semibold">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="h-10 border px-4 py-1 outline-none"
          />
        </div>

        <button className="mt-4 h-10 bg-slate-800 text-sm font-semibold text-white">
          {isLoading ? "Loading..." : "Sign In"}
        </button>

        <p className="mt-1 text-center text-xs">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </form>
    </main>
  );
}

export default LoginForm;
