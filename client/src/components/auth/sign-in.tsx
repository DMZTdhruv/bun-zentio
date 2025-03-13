"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import { authedUser, signInSchema, SignInSchema } from "~/schema/user";
import { useMutation } from "@tanstack/react-query";
import { signInAction } from "~/actions/auth";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { initializeUser } from "~/store/user";
import { useRouter } from "next/navigation";

type FormErrors = {
  [K in keyof SignInSchema]?: string;
};

const SignInCard = () => {
  const navigate = useRouter();
  const { isPending, error, mutate } = useMutation({
    mutationFn: signInAction,
    onSuccess: (response) => {
      toast.success("signed in successfully");
      console.log(response);
      const parsedData = authedUser.parse(response);
      initializeUser({
        username: parsedData.username,
        name: parsedData.name,
      });
      navigate.push("/");
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignInSchema>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name as keyof SignInSchema]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    try {
      const data = signInSchema.parse(formData);
      mutate(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof SignInSchema;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 max-w-2xl space-y-2">
      <div>
        <Input
          className="h-[45px] w-full border-none bg-neutral-900 px-4 leading-none text-white"
          placeholder="Enter your email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            className="h-[45px] w-full border-none bg-neutral-900 px-4 leading-none text-white"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <Button type="submit" className="mt-4 w-full cursor-pointer">
        {isPending ? <Loader2 className="animate-spin" /> : "Sign in"}
      </Button>
      {error && (
        <p className="text-center font-semibold text-red-500">
          {error.message}
        </p>
      )}
      <small>
        Don&apos;t have an account yet? <Link href="/sign-up">Sign up</Link>
      </small>
    </form>
  );
};

export default SignInCard;
