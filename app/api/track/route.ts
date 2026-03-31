import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event_type, page, section, referrer, user_agent, session_id, metadata } = body;

    if (!event_type) {
      return NextResponse.json({ error: "event_type required" }, { status: 400 });
    }

    const { error } = await supabase.from("analytics_events").insert({
      event_type,
      page: page || null,
      section: section || null,
      referrer: referrer || null,
      user_agent: user_agent || null,
      session_id: session_id || null,
      metadata: metadata || {},
    });

    if (error) {
      console.error("Analytics insert error:", error);
      return NextResponse.json({ error: "insert failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}
