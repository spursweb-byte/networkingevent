import Image from 'next/image';

export default function LogosSection() {
    return (
        <section className="py-20 px-4 bg-white border-b border-slate-100">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Jointly Hosted By</span>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0">
                    {/* Logo 1: irup */}
                    <div className="flex-1 flex justify-center items-center px-8">
                        <div className="relative group">
                            <div className="text-4xl font-black italic tracking-tighter text-slate-800 flex items-center gap-2 group-hover:scale-105 transition-transform duration-300 cursor-default">
                                <span className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white not-italic text-2xl shadow-lg">i</span>
                                irup.jp
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-16 bg-slate-200 mx-4" />
                    <div className="md:hidden w-16 h-px bg-slate-200" />

                    {/* Logo 2: Spurs */}
                    <div className="flex-1 flex justify-center items-center px-8">
                        <div className="relative group">
                            <div className="text-4xl font-black tracking-tight text-slate-800 flex items-center gap-1 group-hover:scale-105 transition-transform duration-300 cursor-default">
                                Spurs
                                <span className="text-secondary">.</span>
                                <span className="text-sm font-bold text-slate-400 self-end mb-1 ml-1">inc</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
