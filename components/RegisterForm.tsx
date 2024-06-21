"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nametag, setNametag] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !lastName || !nametag || !email || !password)
      return alert("All fields must filled in");

    try {

      if(confirmPassword != password){
        return alert("password doesn't match")
      }
      const res = await fetch("api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: firstName + " " + lastName,
          nametag,
          email,
          password,
        }),
      });

      if (res.ok) {
        router.push("/signIn");
        alert("user created");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="flex h-[90dvh] items-center justify-center">
      <form
        onSubmit={registerUser}
        className="flex w-[450px] flex-col gap-1 border p-4"
      >
        <div className="flex flex-col">
          <label htmlFor="" className="p-1 text-xs font-semibold">
            First Name
          </label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            type="text"
            placeholder="First Name"
            className="h-8 border px-4 py-1 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="p-1 text-xs font-semibold">
            Last Name
          </label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            type="text"
            placeholder="Last Name"
            className="h-8 border px-4 py-1 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="p-1 text-xs font-semibold">
            Nametag
          </label>
          <input
            onChange={(e) => setNametag(e.target.value)}
            value={nametag}
            type="text"
            placeholder="Nametag"
            className="h-8 border px-4 py-1 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="p-1 text-xs font-semibold">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="h-8 border px-4 py-1 outline-none"
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
            className="h-8 border px-4 py-1 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="p-1 text-xs font-semibold">
            Confirm Password
          </label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className="h-8 border px-4 py-1 outline-none"
          />
        </div>
        <button className="mt-4 h-8 bg-slate-800 text-white">Sign Up</button>

        <p className="mt-1 text-center text-xs">
          Already have an account?{" "}
          <Link href="/signIn" className="text-blue-500 underline">
            Sign In
          </Link>
        </p>
      </form>
    </main>
  );
}

export default RegisterForm;
