import {FieldError, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import dotenv from 'dotenv';

type Values = {
    email: string;
    name: string;
    message: string;
};

const schema = yup.object({
    email: yup.string().email("Email address is not valid.").required("Email is required."),
    name: yup.string().required("Name is required."),
    message: yup.string().required("Message is required.")
});

export const ContactMeForm = () => {
    const form = useRef();
    
    const {register, handleSubmit, formState: {errors}} = useForm<Values>({
        resolver: yupResolver(schema),
    });


    const sendEmail = () => {

        emailjs.sendForm("service_8qaxr5p", "template_omb8cep", form.current!, "_8ebki0IKlAVk2e_5")
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        };

    return (
    <form ref={form} onSubmit={handleSubmit(sendEmail)} className="rounded-lg w-full mx-auto mt-4 py-4 px-5">
        <input 
        type="email" 
        {...register("email")} 
        className="w-full block border-gray-200 rounded-lg focus:ring-2 focus:ring:blue-300 mt-2" 
        placeholder="Email"
        />
        {errors.email && <ErrorMessage error={errors.email}/>}
        <input 
        type="text" 
        {...register("name")} 
        className="w-full block border-gray-200 rounded-lg focus:ring-2 focus:ring:blue-300 mt-2" 
        placeholder="Name"
        />
        {errors.name && <ErrorMessage error={errors.name}/>}
        <textarea 
        {...register("message")} 
        className="peer peer-focus:text-primary w-full h-64 block border-gray-200 rounded-lg focus:ring-2 focus:ring:blue-300 mt-2 align-text-top" 
        placeholder="Message"
        />
        {errors.message && <ErrorMessage error={errors.message}/>}
        <button 
        type="submit" 
        className="bg-blue-600 text-white px-4 py-2.5 mt-5 rounded-lg hover:bg-blue-700 hover:ring-4 hover:ring-blue-300 focus:bg-blue-700 focus:ring-4 focus:ring-blue-300"
        >
        Submit Form
        </button>
    </form>
    );
};

type ErrorMessageProps = {
    error?: FieldError;
};

const ErrorMessage = ({error}: ErrorMessageProps) => {
    return <div className="mt-1.5 text-red-600">{error?.message}</div>
};



