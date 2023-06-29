'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler,useForm} from "react-hook-form";

import useRegisterModal from "../../Hooks/useRegisterModal";
import useLoginModal from "../../Hooks/useLoginModal";

import Modals from "./Modals";
import Heading from "../Header/Navbar/Heading";
import Input from "../Input/Input";
import { toast } from 'react-hot-toast'
import Button from "../Header/Navbar/Button";



const RegisterModal= () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
    .then(() => {
      registerModal.onClose();
    })
    .catch((error) => {
        toast.error("Register Fail")
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

//   const onToggle = useCallback(() => {
//     registerModal.onClose();
//   }, [registerModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Heading
        title="Welcome to Airbnb"
        subtitle="Create an account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}} 
      />
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span 
            // onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            onClick={()=>{
              loginModal.onOpen();
              registerModal.onClose();
            }}
            > Log in</span>
        </p>
      </div>
    </div>
  )




  return (
    <Modals
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;