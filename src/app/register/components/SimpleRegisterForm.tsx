"use client";
import { Card, Input, Checkbox, Button, Typography } from "@/lib/material";
import { getRegisterUrl, getLoginUrl } from "@/lib/urls";
import Link from "next/link";

import axios from "axios";
import React, { FormEventHandler } from "react";
import { useAuthStore } from "@/app/stores/authStore";
import useStore from "@/app/stores/useStore";
import { useRouter } from "next/navigation";
import { useFunfactStore } from "@/app/stores/funfactStore";

export function SimpleRegisterForm() {
  const { fetchFunFacts } = useFunfactStore();
  const router = useRouter();
  const setAccessToken = useStore(
    useAuthStore,
    (state) => state.setAccessToken,
  );
  const setRefreshToken = useStore(
    useAuthStore,
    (state) => state.setRefreshToken,
  );
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault(); // prevent page relaod on submit
    const form = e.target as HTMLFormElement; // cast to reasure type
    const formData = new FormData(form);
    try {
      await axios.post(getRegisterUrl(), formData);
      const response = await axios.post(getLoginUrl(), formData);
      setAccessToken?.(response.data.access);
      setRefreshToken?.(response.data.refresh);
      fetchFunFacts();
      await router.push("/meadows");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Username" name="username" />
          <Input type="password" size="lg" label="Password" name="password" />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <Link
                href="#"
                className="font-medium transition-colors hover:text-blue-500"
              >
                &nbsp;Terms and Conditions
              </Link>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button type="submit" className="mt-6" fullWidth>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
