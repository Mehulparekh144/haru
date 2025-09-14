"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import * as validations from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/auth-client";
import { LoadingButton } from "@/components/ui/loading-button";
import { toast } from "sonner";
import { Motion } from "@/components/motion";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";

type Tab = "login" | "register";

export const GetStartedTabs = () => {
  const [tab, setTab] = useQueryState(
    "tab",
    parseAsString.withDefault("login"),
  );

  const safeTab = tab === "login" || tab === "register" ? tab : "login";

  return (
    <Tabs
      defaultValue={safeTab}
      value={safeTab}
      onValueChange={(value) => setTab(value)}
    >
      <TabsList>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <div className="relative">
        <Motion show={tab === "login"} duration={1000} key="login">
          <TabsContent value="login" className="relative">
            <LoginForm />
          </TabsContent>
        </Motion>
        <Motion show={tab === "register"} duration={1000} key="register">
          <TabsContent value="register" className="relative">
            <RegisterForm setTab={setTab} />
          </TabsContent>
        </Motion>
      </div>
    </Tabs>
  );
};

function RegisterForm({ setTab }: { setTab: (tab: Tab) => void }) {
  const form = useForm<validations.RegisterFormValues>({
    resolver: zodResolver(validations.registerSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  const onSubmit = async (data: validations.RegisterFormValues) => {
    await signUp.email(
      {
        email: data.email,
        password: data.password,
        username: data.username,
        name: data.username,
      },
      {
        onSuccess: () => {
          toast.success("Registered successfully");
          setTab("login");
        },
        onError: (error) => {
          toast.error("Something went wrong", {
            description: error.error.message,
          });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormDescription>
                This will be your username and will be used to identify you in
                the app.
              </FormDescription>
              <FormControl>
                <Input placeholder="sensei_afacad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="sensei@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Use 8+ characters with uppercase, lowercase, numbers, and
                symbols
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" loading={form.formState.isSubmitting}>
          Register
        </LoadingButton>
      </form>
    </Form>
  );
}

function LoginForm() {
  const router = useRouter();
  const form = useForm<validations.LoginFormValues>({
    resolver: zodResolver(validations.loginSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: validations.LoginFormValues) => {
    await signIn.username(
      {
        username: data.username,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Logged in successfully");
          router.push("/dashboard");
        },
        onError: (error) => {
          toast.error("Something went wrong", {
            description: error.error.message,
          });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="sensei_afacad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Use 8+ characters with uppercase, lowercase, numbers, and
                symbols
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" loading={form.formState.isSubmitting}>
          Login
        </LoadingButton>
      </form>
    </Form>
  );
}
