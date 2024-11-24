import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

import { signIn } from "../../api/sign-in";
import accessIcon from "../../assets/icons/access.svg";
import arrowRightIconOrange from "../../assets/icons/arrow-right-orange.svg";
import arrowRightIconWhite from "../../assets/icons/arrow-right-white.svg";
import mailIcon from "../../assets/icons/mail.svg";
import { FieldErrorMessage } from "../../components/common/fieldErrorMessage";
import { InputWithIcon } from "../../components/common/inputWithIcon";
import { Label } from "../../components/common/label";

const signInFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Please enter the password"),
});

type SignInForm = z.infer<typeof signInFormSchema>;

export function SignIn() {
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const navigate = useNavigate();

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email, password: data.password });

      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials.");
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="h-full w-full rounded-[32px] bg-white px-20 py-[4.5rem]">
        <div className="flex h-full flex-col gap-12">
          <div className="flex flex-col gap-2 ">
            <h2 className="title-md text-gray-500">Sign in to your account</h2>
            <p className="body-sm">Enter your email and password to log in</p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <div className="flex flex-col">
              <Label htmlFor="email">Email</Label>
              <InputWithIcon
                icon={mailIcon}
                id="email"
                placeholder="Your registered email"
                {...register("email")}
              />

              {errors.email && (
                <FieldErrorMessage message={errors.email.message} />
              )}
            </div>

            <div className="flex flex-col">
              <Label htmlFor="password">Password</Label>
              <InputWithIcon
                icon={accessIcon}
                id="password"
                placeholder="Your access password"
                type="password"
                {...register("password")}
              />

              {errors.password && (
                <FieldErrorMessage message={errors.password.message} />
              )}
            </div>

            <button
              className={`mt-12 flex h-14 w-full items-center justify-between rounded-[.625rem] bg-orange-base px-5 text-white transition-colors duration-200
              ${isSubmitting ? "cursor-not-allowed opacity-55" : "hover:bg-orange-dark"}`}
              disabled={isSubmitting}
              type="submit"
            >
              <span className="action-md">Sign In</span>
              <img
                src={arrowRightIconWhite}
                className="h-6 w-6"
                alt="Right arrow"
              />
            </button>
          </form>

          <div className="mt-auto space-y-5">
            <p className="body-md text-gray-300">Don't have an account yet?</p>

            <div>
              <Link to="/sign-up">
                <button
                  className={`flex h-14 w-full items-center justify-between rounded-[.625rem] border-[1px] border-orange-base px-5 text-orange-base transition-colors duration-200                            
                ${isSubmitting ? "cursor-not-allowed opacity-55" : "hover:border-orange-dark hover:text-orange-dark"}`}
                  disabled={isSubmitting}
                >
                  <span className="action-md">Sign Up</span>
                  <img
                    src={arrowRightIconOrange}
                    className="h-6 w-6"
                    alt="Right arrow"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
