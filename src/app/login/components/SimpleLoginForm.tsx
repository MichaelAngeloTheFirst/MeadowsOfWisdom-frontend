"use client";
import { Card, Input, Button, Typography } from "@/lib/material";

export function SimpleLoginForm() {
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Username" />
          <Input type="password" size="lg" label="Password" />
        </div>

        <Button className="mt-6" fullWidth>
          Login
        </Button>
      </form>
    </Card>
  );
}
