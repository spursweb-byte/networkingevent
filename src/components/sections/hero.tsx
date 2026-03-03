'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Wallet, IdCard, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-12 px-4">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-slate-50/50 rounded-full blur-[120px] -z-10" />

            <div className="max-w-4xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-6 text-primary leading-tight">
                        SES Networking <span className="text-secondary">2026</span>
                    </h1>

                    <p className="text-xl text-slate-500 mb-12 font-medium max-w-2xl mx-auto">
                        エンジニア・営業・経営者が集う、SES業界のネットワークを広げる交流イベント。
                    </p>

                    {/* Core Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        <div className="glass-effect p-6 flex items-center gap-4 text-left border-slate-200/60">
                            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-lg">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Date & Time</p>
                                <p className="text-lg font-bold text-primary leading-tight">2026.03.25 (Wed) 19:00 - 22:00</p>
                            </div>
                        </div>

                        <div className="glass-effect p-6 flex items-center gap-4 text-left border-slate-200/60">
                            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-white shrink-0 shadow-lg">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Location</p>
                                <p className="text-lg font-bold text-primary leading-tight">渋谷ストリーム ホール</p>
                            </div>
                        </div>

                        <div className="glass-effect p-6 flex items-center gap-4 text-left border-slate-200/60">
                            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-white shrink-0 shadow-lg">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Admission Fee</p>
                                <p className="text-lg font-bold text-primary leading-tight">無料</p>
                            </div>
                        </div>

                        <div className="glass-effect p-6 flex items-center gap-4 text-left border-slate-200/60">
                            <div className="w-12 h-12 rounded-xl bg-slate-400 flex items-center justify-center text-white shrink-0 shadow-lg">
                                <IdCard className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Requirements</p>
                                <p className="text-lg font-bold text-primary leading-tight">名刺 90枚程度</p>
                            </div>
                        </div>
                    </div>

                    <Link href="#entry" className="btn btn-primary px-12 py-5 text-xl font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                        今すぐ参加を申し込む
                        <ChevronRight className="w-6 h-6" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
