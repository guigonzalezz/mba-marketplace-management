import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

import { signUp } from "../../api/sign-up";
import { uploadAttachments } from "../../api/upload-attachments";
import accessIcon from "../../assets/icons/access.svg";
import arrowRightIconOrange from "../../assets/icons/arrow-right-orange.svg";
import arrowRightIconWhite from "../../assets/icons/arrow-right-white.svg";
import callIcon from "../../assets/icons/call.svg";
import mailIcon from "../../assets/icons/mail.svg";
import userIcon from "../../assets/icons/user.svg";
import { FieldErrorMessage } from "../../components/common/fieldErrorMessage";
import { ImageUpload } from "../../components/common/imageUpload";
import { InputWithIcon } from "../../components/common/inputWithIcon";
import { Label } from "../../components/common/label";
import { ACCEPTED_IMAGE_TYPES } from "../../utils/constants";
import { phoneRegex } from "../../utils/regex";

const signUpFormSchema = z
  .object({
    avatar: z
      .custom<FileList>()
      .refine((files) => files && files.length > 0, {
        message: "The image is required",
      })
      .refine(
        (files) => {
          return Array.from(files ?? []).every((file) =>
            ACCEPTED_IMAGE_TYPES.includes(file.type),
          );
        },
        {
          message: "The image must be in PNG format",
        },
      ),

    fullName: z.string().min(3, "Please enter your full name"),

    phone: z.string().regex(phoneRegex, "Invalid phone number"),

    email: z.string().email("Invalid email address"),

    password: z.string().min(3, "The password must be at least 3 characters"),

    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Passwords do not match",
  });

type SignUpForm = z.infer<typeof signUpFormSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({ resolver: zodResolver(signUpFormSchema) });

  const { mutateAsync: uploadAvatar } = useMutation({
    mutationFn: uploadAttachments,
  });

  const { mutateAsync: signUpFn } = useMutation({
    mutationFn: signUp,
  });

  async function handleSignUp(data: SignUpForm) {
    try {
      let attachmentId = null;

      if (data.avatar?.length) {
        const files = new FormData();
        files.append("files", data.avatar[0]);

        const uploadedAvatar = await uploadAvatar({ files });

        attachmentId = uploadedAvatar?.attachments[0]?.id;

        if (!attachmentId) throw new Error();
      }

      await signUpFn({
        name: data.fullName,
        phone: data.phone,
        email: data.email,
        avatarId: attachmentId,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });

      toast.success("Registration successful!", {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch (error) {
      toast.error("Error during registration.");
    }
  }

  return (
    <>
      <Helmet title="Sign Up" />

      <div className="scrollbar flex h-full w-full flex-col gap-20 overflow-y-scroll rounded-[32px] bg-white px-20 py-[4.5rem]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 ">
            <h2 className="title-md text-gray-500">Create your account</h2>
            <p className="body-sm">Provide your personal and access details</p>
          </div>

          <form className="space-y-12" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-5">
              <h3 className="title-sm text-gray-500">Profile</h3>

              <div>
                <div className="h-[120px] w-[120px] ">
                  <ImageUpload
                    id="avatar"
                    accept=".png"
                    register={register("avatar")}
                  />
                </div>

                {errors.avatar && (
                  <FieldErrorMessage message={errors.avatar.message} />
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="fullName">Name</Label>
                <InputWithIcon
                  icon={userIcon}
                  id="fullName"
                  placeholder="Your full name"
                  {...register("fullName")}
                />

                {errors.fullName && (
                  <FieldErrorMessage message={errors.fullName.message} />
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="phone">Phone</Label>
                <InputWithIcon
                  icon={callIcon}
                  id="phone"
                  placeholder="(00) 00000-0000"
                  {...register("phone")}
                />

                {errors.phone && (
                  <FieldErrorMessage message={errors.phone.message} />
                )}
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="title-sm text-gray-500">Access</h3>

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

              <div className="flex flex-col">
                <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                <InputWithIcon
                  icon={accessIcon}
                  id="passwordConfirmation"
                  placeholder="Confirm your password"
                  type="password"
                  {...register("passwordConfirmation")}
                />

                {errors.passwordConfirmation && (
                  <FieldErrorMessage
                    message={errors.passwordConfirmation.message}
                  />
                )}
              </div>
            </div>

            <button
              className={`mt-12 flex h-14 w-full items-center justify-between rounded-[.625rem] bg-orange-base px-5 text-white transition-colors duration-200
              ${isSubmitting ? "cursor-not-allowed opacity-55" : "hover:bg-orange-dark"}`}
              disabled={isSubmitting}
              type="submit"
            >
              <span className="action-md">Sign Up</span>
              <img
                src={arrowRightIconWhite}
                className="h-6 w-6"
                alt="Right arrow"
              />
            </button>
          </form>
        </div>

        <div className="mt-auto space-y-5">
          <p className="body-md text-gray-300">Already have an account?</p>

          <div>
            <Link to="/sign-in">
              <button
                className={`flex h-14 w-full items-center justify-between rounded-[.625rem] border-[1px] border-orange-base px-5 text-orange-base transition-colors duration-200                            
                ${isSubmitting ? "cursor-not-allowed opacity-55" : "hover:border-orange-dark hover:text-orange-dark"}`}
                disabled={isSubmitting}
              >
                <span className="action-md">Log In</span>
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
    </>
  );
}
