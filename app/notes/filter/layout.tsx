type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function NotesLayout({ children, sidebar }: Props) {
  return (
    <section style={{ display: "flex", gap: "40px" }}>
      <aside style={{ width: "200px" }}>{sidebar}</aside>
      <div style={{ flex: 1 }}>{children}</div>
    </section>
  );
}