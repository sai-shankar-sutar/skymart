export default function AuthShell({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
