'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Users,
    Download,
    CheckCircle,
    XCircle,
    LogOut,
    Search,
    Filter,
    Calendar,
    ArrowLeft
} from 'lucide-react';

interface Entry {
    id: number;
    name: string;
    katakana: string;
    company: string;
    email: string;
    newsletter_email?: string;
    status: 'active' | 'cancelled' | 'waitlist' | 'checked-in';
    type: string;
    memo?: string;
    created_at: string;
}

export default function AdminDashboard() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchEntries = async () => {
        try {
            const res = await fetch('/api/entry');
            const data = await res.json();
            setEntries(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    const handleStatusChange = async (id: number, newStatus: string) => {
        try {
            const res = await fetch('/api/admin/entry-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            });
            if (res.ok) {
                fetchEntries();
            }
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    const downloadCSV = () => {
        const headers = ['ID', '氏名', 'フリガナ', '会社名', 'メインメール', '配信受信メール', '属性', 'ステータス', '申込日時'];
        const csvContent = [
            headers.join(','),
            ...entries.map(e => [
                e.id, e.name, e.katakana, e.company, e.email, e.newsletter_email || '', e.type, e.status, e.created_at
            ].map(val => `"${val}"`).join(','))
        ].join('\n');

        const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `entries_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const filteredEntries = entries.filter(e =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">読み込み中...</div>;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <header className="bg-white border-b border-slate-100 sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-teal-600 p-2 rounded-xl">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tight">管理ダッシュボード</h1>
                        <p className="text-xs text-slate-400 font-bold">SES営業無料交流会＠渋谷</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-sm transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        サイトへ戻る
                    </button>
                    <button
                        onClick={() => router.push('/admin/login')}
                        className="flex items-center gap-2 text-slate-400 hover:text-red-500 font-bold text-sm transition-colors border-l pl-6"
                    >
                        <LogOut className="w-5 h-5" />
                        ログアウト
                    </button>
                </div>
            </header>

            <main className="p-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <StatCard title="総申込数" value={entries.length} unit="名" icon={<Users className="w-5 h-5" />} color="blue" />
                    <StatCard title="入場済み" value={entries.filter(e => e.status === 'checked-in').length} unit="名" icon={<CheckCircle className="w-5 h-5" />} color="emerald" />
                    <StatCard title="参加予定" value={entries.filter(e => e.status === 'active').length} unit="名" icon={<Calendar className="w-5 h-5" />} color="teal" />
                    <StatCard title="キャンセル待ち" value={entries.filter(e => e.status === 'waitlist').length} unit="名" icon={<Filter className="w-5 h-5" />} color="orange" />
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="氏名、会社名、メールアドレスで検索..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-teal-600 rounded-2xl outline-none font-medium text-sm"
                            />
                        </div>

                        <button
                            onClick={downloadCSV}
                            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg"
                        >
                            <Download className="w-5 h-5" />
                            CSVダウンロード
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 text-left border-b border-slate-100">
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">操作</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">ステータス</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">属性</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">氏名 (フリガナ)</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">会社名</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">メールアドレス</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">配信受信アドレス</th>
                                    <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">申込日時</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredEntries.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                {entry.status === 'active' ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusChange(entry.id, 'checked-in')}
                                                            className="px-3 py-1.5 bg-emerald-600 text-white text-[11px] font-black rounded-lg hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap"
                                                        >
                                                            来場確認
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusChange(entry.id, 'cancelled')}
                                                            className="px-3 py-1.5 bg-red-50 text-red-600 text-[11px] font-black rounded-lg hover:bg-red-600 hover:text-white transition-all whitespace-nowrap"
                                                        >
                                                            キャンセル
                                                        </button>
                                                    </>
                                                ) : entry.status === 'waitlist' ? (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleStatusChange(entry.id, 'active')}
                                                            className="px-3 py-1.5 bg-slate-900 text-white text-[11px] font-black rounded-lg hover:bg-slate-800 transition-colors shadow-sm whitespace-nowrap"
                                                        >
                                                            繰り上げ
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusChange(entry.id, 'cancelled')}
                                                            className="px-3 py-1.5 bg-red-50 text-red-600 text-[11px] font-black rounded-lg hover:bg-red-600 hover:text-white transition-all whitespace-nowrap"
                                                        >
                                                            キャンセル
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => handleStatusChange(entry.id, 'active')}
                                                        className="text-[10px] font-black text-slate-300 hover:text-slate-600 uppercase tracking-widest shadow-sm border border-slate-100 px-2 py-1 rounded"
                                                    >
                                                        戻す
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <StatusBadge status={entry.status} />
                                        </td>
                                        <td className="p-4">
                                            <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-lg whitespace-nowrap">{entry.type}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-slate-900 whitespace-nowrap">{entry.name}</div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase whitespace-nowrap">{entry.katakana}</div>
                                        </td>
                                        <td className="p-4 font-medium text-slate-600 truncate max-w-[150px]">{entry.company}</td>
                                        <td className="p-4 text-sm text-slate-500 font-medium">{entry.email}</td>
                                        <td className="p-4 text-sm text-slate-500 font-medium italic">
                                            {entry.newsletter_email || <span className="text-slate-200">-</span>}
                                        </td>
                                        <td className="p-4 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                                            {new Date(entry.created_at).toLocaleString('ja-JP')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ title, value, icon, color, unit }: any) {
    const colorClasses: any = {
        blue: 'text-blue-600 bg-blue-50',
        emerald: 'text-emerald-600 bg-emerald-50',
        teal: 'text-teal-600 bg-teal-50',
        orange: 'text-orange-600 bg-orange-50'
    };
    return (
        <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${colorClasses[color]}`}>{icon}</div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
                <p className="text-xl font-black text-slate-900">{value}<span className="text-xs ml-1 text-slate-400">{unit}</span></p>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: any = {
        active: 'bg-teal-50 text-teal-700 border-teal-100',
        'checked-in': 'bg-emerald-600 text-white border-emerald-700',
        cancelled: 'bg-red-50 text-red-700 border-red-100',
        waitlist: 'bg-orange-50 text-orange-700 border-orange-100'
    };
    const labels: any = {
        active: '参加予定',
        'checked-in': '来場済み',
        cancelled: 'キャンセル',
        waitlist: 'キャンセル待ち'
    };
    return (
        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border whitespace-nowrap ${styles[status]}`}>
            {labels[status]}
        </span>
    );
}
