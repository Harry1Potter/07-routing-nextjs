"use client";

import Link from "next/link";
import type { Note } from "@/types/note";

interface NotesClientProps {
  notes: Note[];
}

export default function NotesClient({ notes }: NotesClientProps) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Link href={`/notes/${note.id}`}>{note.title}</Link>
        </li>
      ))}
    </ul>
  );
}