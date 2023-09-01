"use client";
import { Card, Input, Checkbox, Button, Typography } from "@/lib/material";
import { getRegisterUrl, getLoginUrl } from "@/lib/urls";

import axios from "axios";

export function SimpleRegisterForm() {
  const handleSubmit = async (e: FormEventHandler<HTMLFormElement>) => {
    e.preventDefault(); // prevent page relaod on submit
    const form = e.target as HTMLFormElement; // cast to reasure type
    const formData = new FormData(form);
    try {
      await axios.post(getRegisterUrl(), formData);
      const response = await axios.post(getLoginUrl(), formData);
      console.log(response.data.access);
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
          <Input size="lg" label="Name" name="username" />
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
              <a
                href="#"
                className="font-medium transition-colors hover:text-blue-500"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button type="submit" className="mt-6" fullWidth>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
}
