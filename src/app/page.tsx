import Link from 'next/link';
import EntryForm from '@/components/EntryForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header / Logos */}
      <header className="py-10 border-b border-slate-100 mb-12 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-10">
            <div className="flex items-center">
              <img src="/irup-logo.png" alt="iRup株式会社" className="h-12 w-auto object-contain" />
            </div>

            <div className="hidden md:block w-px h-6 bg-slate-200" />

            <div className="flex items-center">
              <img src="/spurs-logo.png" alt="Spurs株式会社" className="h-8 w-auto object-contain" />
            </div>
          </div>

          <Link
            href="/admin/login"
            className="px-6 py-2 border-2 border-slate-900 rounded-full text-sm font-black hover:bg-slate-900 hover:text-white transition-all shadow-md active:scale-95"
          >
            管理者の方はこちら
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-24">
        {/* Event Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            SES営業無料交流会＠渋谷
          </h1>
          <div className="inline-block px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold tracking-wider mb-2">
            主催会社：iRup株式会社 / Spurs株式会社
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20 flex-1">
          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">開催日時</h3>
            <p className="text-xl font-bold leading-tight text-slate-800">2026年3月30日 (月)</p>
            <p className="text-2xl font-black mt-1 text-slate-900">14:00 - 16:00</p>
            <p className="text-sm text-slate-500 mt-2 font-bold">（受付開始 13:45）</p>
          </div>

          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">会場</h3>
            <p className="text-xl font-bold leading-tight text-slate-800">東京都渋谷区渋谷2-22-6<br />幸和ビル3階</p>
          </div>

          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">参加費</h3>
            <p className="text-3xl font-black text-emerald-600">無料</p>
          </div>

          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">持ち物</h3>
            <p className="text-xl font-bold leading-tight text-slate-800">名刺 100枚程度</p>
          </div>
        </div>

        {/* Application Form Section */}
        <section id="entry" className="scroll-mt-24">
          <EntryForm />
        </section>
      </main>

      <footer className="py-16 border-t border-slate-100 text-center bg-slate-50 mt-12">

        <Link
          href="/admin/login"
          className="text-[10px] text-slate-300 hover:text-slate-500 mt-8 inline-block font-bold tracking-widest uppercase transition-all"
        >
          管理者ログイン
        </Link>
      </footer>
    </div>
  );
}
