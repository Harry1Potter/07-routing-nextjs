import { fetchNotes } from "@/lib/api";
import Link from "next/link";

export default async function FilteredNotesPage({ params }: { params: { slug?: string[] } }) {
  const tag = params.slug?.[0];
  const isAll = !tag || tag === "all";
  const res = await fetchNotes(isAll ? "" : tag);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{isAll ? "All Notes" : `Notes tagged: ${tag}`}</h2>
      <ul>
        {res.notes.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
