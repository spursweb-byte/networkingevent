'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Briefcase, Send, CheckCircle2 } from 'lucide-react';

export default function EntryForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-effect p-12 text-center border-secondary/20 max-w-2xl mx-auto"
            >
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-primary mb-4">申し込みを受け付けました</h3>
                <p className="text-slate-600 mb-8 font-medium">参加を申し込みいただき、ありがとうございます。<br />当日は受付にて名刺を頂戴いたします。</p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="text-secondary font-bold hover:underline"
                >
                    別の参加者を登録する
                </button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-primary mb-4 tracking-tight">参加申し込み</h2>
                <div className="w-16 h-1.5 bg-secondary rounded-full mx-auto" />
            </div>

            <form onSubmit={handleSubmit} className="glass-effect p-8 md:p-12 space-y-6 border-slate-200 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -z-10" />

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block ml-1">お名前 *</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            required
                            type="text"
                            placeholder="山田 太郎"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-secondary focus:ring-0 transition-all font-medium text-slate-900"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block ml-1">メールアドレス *</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            required
                            type="email"
                            placeholder="taro.yamada@example.jp"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-secondary focus:ring-0 transition-all font-medium text-slate-900"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block ml-1">会社名 *</label>
                    <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            required
                            type="text"
                            placeholder="株式会社XXXXX"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-secondary focus:ring-0 transition-all font-medium text-slate-900"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full btn btn-primary py-5 text-xl font-black rounded-2xl shadow-lg shadow-primary/20 disabled:opacity-50 transition-all active:scale-95 group"
                    >
                        {loading ? (
                            <span className="flex items-center gap-3">送信中...</span>
                        ) : (
                            <span className="flex items-center gap-3 justify-center">
                                申し込みを送信
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </span>
                        )}
                    </button>
                </div>

                <p className="text-xs text-center text-slate-400 font-medium">参加規約に同意の上、送信ボタンを押してください。</p>
            </form>
        </div>
    );
}
