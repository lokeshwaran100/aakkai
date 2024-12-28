import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TeamMember from '@/models/TeamMember';

export async function GET() {
  try {
    await dbConnect();
    const members = await TeamMember.find({});
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const member = await TeamMember.create(data);
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}