import { FormEvent, useMemo, useState } from "react";

type ChatRole = "user" | "assistant";

interface ChatItem {
  id: string;
  role: ChatRole;
  content: string;
}

const quickPrompts = [
  "Jelaskan AI dalam bahasa sederhana.",
  "Buat ide konten Instagram tentang teknologi.",
  "Tulis caption produk dengan gaya premium.",
];

const ENDPOINT = "https://api.zenzxz.my.id/ai/chatgpt";

export default function App() {
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = useMemo(() => prompt.trim().length > 0 && !loading, [prompt, loading]);

  const askAI = async (text: string) => {
    const cleanText = text.trim();
    if (!cleanText || loading) return;

    setError(null);
    const userMsg: ChatItem = { id: `${Date.now()}-u`, role: "user", content: cleanText };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt("");
    setLoading(true);

    try {
      const response = await fetch(`${ENDPOINT}?q=${encodeURIComponent(cleanText)}`);
      if (!response.ok) {
        throw new Error(`Request gagal (${response.status})`);
      }

      const payload = await response.json();
      const aiText =
        payload?.result ?? payload?.data?.result ?? payload?.message ?? "Maaf, jawaban tidak tersedia.";

      const aiMsg: ChatItem = { id: `${Date.now()}-a`, role: "assistant", content: String(aiText) };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan saat menghubungi API Zennz.";
      setError(message);
      const fallback: ChatItem = {
        id: `${Date.now()}-e`,
        role: "assistant",
        content: `Maaf, terjadi kendala: ${message}`,
      };
      setMessages((prev) => [...prev, fallback]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askAI(prompt);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-8 sm:px-8 sm:py-10">
        <header className="mb-6 rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-8">
          <p className="mb-3 inline-flex rounded-full bg-[#0071e3]/10 px-4 py-1 text-xs font-semibold tracking-wide text-[#0071e3]">
            EpanD AI
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Asisten AI modern dengan rasa desain ala Apple</h1>
          <p className="mt-3 max-w-2xl text-sm text-[#6e6e73] sm:text-base">
            Kirim pertanyaan kamu, lalu EpanD AI akan menjawab melalui API Zennz secara real-time.
          </p>
        </header>

        <section className="flex flex-1 flex-col rounded-3xl border border-white/80 bg-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-[#ececf0] px-5 py-4 sm:px-7">
            <h2 className="text-sm font-medium text-[#6e6e73]">Percakapan</h2>
            <span className="text-xs text-[#86868b]">Powered by Zennz API</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
            {messages.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#d2d2d7] bg-[#fbfbfd] p-5">
                <p className="mb-3 text-sm text-[#6e6e73]">Mulai dengan prompt cepat:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((item) => (
                    <button
                      key={item}
                      onClick={() => askAI(item)}
                      className="rounded-full border border-[#d2d2d7] bg-white px-3 py-1.5 text-xs text-[#1d1d1f] transition hover:border-[#0071e3] hover:text-[#0071e3]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((item) => (
              <article key={item.id} className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[75%] ${
                    item.role === "user"
                      ? "bg-[#0071e3] text-white"
                      : "border border-[#e5e5ea] bg-[#f5f5f7] text-[#1d1d1f]"
                  }`}
                >
                  {item.content}
                </div>
              </article>
            ))}

            {loading && <p className="text-sm text-[#6e6e73]">EpanD AI sedang mengetik...</p>}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-[#ececf0] p-4 sm:p-5">
            <div className="flex gap-3 rounded-2xl border border-[#d2d2d7] bg-white p-2">
              <input
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Tulis pertanyaan kamu..."
                className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-[#86868b]"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="rounded-xl bg-[#0071e3] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0077ed] disabled:cursor-not-allowed disabled:bg-[#b7d9fa]"
              >
                Kirim
              </button>
            </div>
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
          </form>
        </section>
      </main>
    </div>
  );
}
