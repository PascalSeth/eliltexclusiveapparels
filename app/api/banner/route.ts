import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

// Define the GET function to handle API requests
export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(banners, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'An error occurred while fetching banners' }, { status: 500 });
  }
}
