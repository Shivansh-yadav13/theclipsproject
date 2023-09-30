"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [user, setUser] = useState<any>();
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [message, setMessage] = useState("Your Message Here.");


  const sendReport = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      setEmail("")
      formData.append("first_name", firstName);
      setFirstName("")
      formData.append("message", message);
      setMessage("")
      const { data } = await axios.post(`/api/supabase/report-clip`, formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-screen text-muted-foreground">
      <div className="lg:border lg:w-2/5 mx-auto my-20 p-10 rounded-xl">
        <h1 className="text-3xl font-bold text-primary text-center">Contact Us</h1>
        <p className="text-center my-2">Got any query? fill the below form or just send an email @<span className="text-base text-primary bg-black font-mono px-1">shivansh@fusionclips.lol</span></p>
        <form className="my-5">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 text-primary border-gray-300 appearance-none focus:outline-none peer"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 text-primary border-gray-300 appearance-none focus:outline-none focus:ring-0 border-blue peer"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required />
            <label htmlFor="twitch_url" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <textarea
              name="message"
              id="message"
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 text-primary border-gray-300 appearance-none focus:outline-none focus:ring-0 border-blue peer"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required />
            <label
              htmlFor="message"
              className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Your Message
            </label>
          </div>
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              sendReport()
            }}
            className="focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}