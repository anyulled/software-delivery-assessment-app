import { NextResponse } from 'next/server';
import { getTopicsResult } from '../../../../lib/ResultRepository';

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const data = await getTopicsResult(params.name);

  return NextResponse.json(data);
}
