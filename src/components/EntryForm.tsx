'use client';

import { useState } from 'react';
import NotesModal from './NotesModal';

export default function EntryForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'waitlist' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            katakana: formData.get('katakana'),
            company: formData.get('company'),
            email: formData.get('email'),
            newsletterEmail: formData.get('newsletterEmail'),
            type: formData.get('type'),
            memo: formData.get('memo'),
        };

        try {
            const res = await fetch('/api/entry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            if (result.success) {
                if (result.entry.status === 'waitlist') {
                    setStatus('waitlist');
                } else {
                    setStatus('success');
                }
            } else {
                setStatus('error');
                setErrorMessage(result.message || result.error || '送信中にエラーが発生しました。');
            }
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || '通信エラーが発生しました。');
        }
    };

    if (status === 'success') {
        return (
            <div className="card text-center border-emerald-100 bg-emerald-50/30">
                <h3 className="text-2xl font-bold text-emerald-700 mb-2">申し込み完了</h3>
                <p className="text-slate-600">お申し込みありがとうございます。当日お待ちしております。</p>
            </div>
        );
    }

    if (status === 'waitlist') {
        return (
            <div className="card text-center border-orange-100 bg-orange-50/30">
                <h3 className="text-2xl font-bold text-orange-700 mb-2">キャンセル待ち受付</h3>
                <p className="text-slate-600">現在定員に達しているため、キャンセル待ちとして承りました。空きが出次第メールにてご連絡いたします。</p>
            </div>
        );
    }

    return (
        <div className="card shadow-2xl relative">
            <div className="flex flex-col items-center mb-8">
                <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">参加申し込みフォーム</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-sm font-bold text-teal-600 hover:text-teal-700 underline decoration-2 underline-offset-4 transition-colors bg-teal-50 px-4 py-2 rounded-full"
                >
                    📝 注意事項を確認する
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 text-center">
                        {errorMessage}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">お名前 *</label>
                        <input name="name" required type="text" placeholder="山田 太郎" className="w-full p-3 border-2 border-slate-100 rounded-xl outline-none focus:border-teal-600 text-slate-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">フリガナ *</label>
                        <input name="katakana" required type="text" placeholder="ヤマダ タロウ" className="w-full p-3 border-2 border-slate-100 rounded-xl outline-none focus:border-teal-600 text-slate-900" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">会社名 *</label>
                    <input name="company" required type="text" placeholder="株式会社サンプル" className="w-full p-3 border-2 border-slate-100 rounded-xl outline-none focus:border-teal-600 text-slate-900" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">メールアドレス *</label>
                    <input name="email" required type="email" placeholder="mail@example.com" className="w-full p-3 border-2 border-slate-100 rounded-xl outline-none focus:border-teal-600 text-slate-900" />
                </div>

                <div>
                    <label className="block text-base font-bold text-slate-700 mb-1">配信受信アドレス</label>
                    <p className="text-xs text-slate-500 mb-2 font-medium">※主催2社からの配信受信を希望いただける方のみご記載ください</p>
                    <input name="newsletterEmail" type="email" placeholder="mail@example.com" className="w-full p-3 border-2 border-slate-100 rounded-xl outline-none focus:border-teal-600 text-slate-900" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">案件・要員状況 *</label>
                    <select name="type" required className="w-full p-3 border-2 border-slate-100 rounded-xl focus:border-teal-600 outline-none font-medium text-slate-900 bg-white">
                        <option value="">選択してください</option>
                        <option value="案件保有">案件保有</option>
                        <option value="要員保有">要員保有</option>
                        <option value="両方">両方</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">その他（備考）</label>
                    <textarea
                        name="memo"
                        rows={4}
                        className="w-full p-4 border-2 border-slate-100 rounded-xl focus:border-teal-600 outline-none font-medium text-slate-900 bg-white"
                        placeholder="ご質問やご連絡事項があればご記入ください"
                    ></textarea>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <input required type="checkbox" className="w-5 h-5 mt-0.5 accent-teal-600" />
                    <p className="text-sm font-bold text-slate-800">注意事項を確認しました *</p>
                </div>

                <button
                    disabled={status === 'loading'}
                    type="submit"
                    className={`w-full btn-primary mt-4 ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {status === 'loading' ? '送信中...' : '申し込みを送信する'}
                </button>
            </form>

            <NotesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
