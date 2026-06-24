import { NextResponse } from "next/server";
import { getOrCreateTodoList } from "@/app/data/todos/get-or-create-todo-list";

export async function GET() {
  try {
    return NextResponse.json(await getOrCreateTodoList());
  } catch {
    return NextResponse.json({ error: "Failed to load todo list" }, { status: 500 });
  }
}
