"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NotesList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesClient() {
  const [topic, setTopic] = useState("");
  const [debouncedTopic] = useDebounce(topic, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, isSuccess } = useQuery<
    { notes: Note[]; totalPages: number },
    Error
  >({
    queryKey: ["notes", debouncedTopic, currentPage],
    queryFn: ({ queryKey }) => {
      const [, search, page] = queryKey;
      return fetchNotes(search as string, page as number);
    },
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div>
      <header>
        <SearchBox
          onValueChange={(value) => {
            setTopic(value);
            setCurrentPage(1);
          }}
        />
        {isSuccess && totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
        <button onClick={() => setIsModalOpen(true)}>
          Create Note
        </button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong!</p>}
      {data && <NotesList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}