"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

interface Props {
  params: { id: string };
}

export default function NotePreview({ params }: Props) {
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const loadNote = async () => {
      const data = await fetchNoteById(params.id);
      setNote(data);
    };
    loadNote();
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
