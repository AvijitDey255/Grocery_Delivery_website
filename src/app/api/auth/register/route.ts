// api/auth/register

import connectDB from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        await connectDB()
        const {name,email,password} = await req.json()
        const exisUser = await User.findOne({email})
        if(exisUser){
            return NextResponse.json(
                {message:"Email already Exist!"},
                {status:400}
            )
        }
        if(password.length < 6){
            return NextResponse.json(
                {message:"Password must be at least 6 characters"},
                {status:400}
            )
        }
        const hashpassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,email,password:hashpassword
        })

        return NextResponse.json(
                user,
                {status:200}
            )
    }catch(error){
        return NextResponse.json(
                {message:`register error ${error}`},
                {status:500}
            )
    }
}