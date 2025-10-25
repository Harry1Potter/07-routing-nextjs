import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1],
    queryFn: () => fetchNotes("", 1),
  });

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <NotesClient />
    </HydrationBoundary>
  );
}
