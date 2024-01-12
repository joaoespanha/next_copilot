import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export async function POST(request: NextRequest) {
    const { password, email } = await request.json();

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: 'User does not exist!', status: 401 })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials!', status: 402 })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        console.log('tokenData', tokenData)
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({ message: 'User logged in successfully!', status: 200 })

        response.cookies.set("token", token, { httpOnly: true })
        return response
    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 })
    }


}