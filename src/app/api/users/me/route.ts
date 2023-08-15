import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/user';

import { connect } from '@/dbConfig/dbConfig';

connect();

export const GET = async (request: NextRequest) => {
    try {
        const userData: any = await getDataFromToken(request);
        const user = await User.findOne({ _id: userData.id }).select('-passowrd');
        return NextResponse.json({message: 'User Found', data: user}, {status:200});

    } catch (e: any) {
        return NextResponse.json({ error: e.message })
    }
}