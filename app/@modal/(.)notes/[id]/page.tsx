"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

export default function NotePreview({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNoteById(params.id).then(setNote);
  }, [params.id]);

  if (!note) return null;

  return (
    <Modal onClose={() => router.back()}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>
        <strong>Tag:</strong> {note.tag}
      </p>
      <p>
        <small>Created: {new Date(note.createdAt).toLocaleString()}</small>
      </p>
    </Modal>
  );
}
