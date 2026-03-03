'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'ipspr') {
            router.push('/admin/dashboard');
        } else {
            setError('パスワードが正しくありません。');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-600 rounded-3xl shadow-xl shadow-teal-200 mb-6">
                        <Lock className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">管理者ログイン</h1>
                    <p className="text-slate-500 mt-2 font-medium">SES交流会 管理システム</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-xl text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">管理パスワード</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-teal-600 rounded-xl outline-none transition-all font-medium text-slate-900"
                                    placeholder="パスワードを入力"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
                        >
                            ログインしてダッシュボードへ
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>


                <div className="text-center mt-8">
                    <button
                        onClick={() => router.push('/')}
                        className="text-sm font-bold text-slate-400 hover:text-slate-600"
                    >
                        ← トップページへ戻る
                    </button>
                </div>
            </div>
        </div>
    );
}
