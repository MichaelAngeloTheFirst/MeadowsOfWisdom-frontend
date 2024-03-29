"use client";
import { useAuthStore } from "@/app/stores/authStore";
import { Card, Input, Button, Typography } from "@/lib/material";
import { getLoginUrl } from "@/lib/urls";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";
import { useFunfactStore } from "@/app/stores/funfactStore";

export function SimpleLoginForm() {
  const { fetchFunFacts } = useFunfactStore();
  const router = useRouter();
  const { setAccessToken, setRefreshToken } = useAuthStore();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault(); 
    const form = e.target as HTMLFormElement; 
    const formData = new FormData(form);
    try {
      const response = await axios.post(getLoginUrl(), formData);
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);
      fetchFunFacts();
      await router.back();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Username" name="username" />
          <Input type="password" size="lg" label="Password" name="password" />
        </div>

        <Button type="submit" className="mt-6" fullWidth>
          Login
        </Button>
      </form>
    </Card>
  );
}
