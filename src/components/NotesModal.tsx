'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function NotesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
            >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-900">注意事項</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X className="w-6 h-6 text-slate-500" />
                    </button>
                </div>
                <div className="p-8 overflow-y-auto space-y-6 text-slate-700 leading-relaxed">
                    <section>
                        <h3 className="font-bold text-slate-900 mb-2 underline decoration-teal-500 decoration-2">ご来場について</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>受付開始時間前のご来場はご遠慮ください。</li>
                            <li>受付にて名刺を2枚頂戴いたします。（交流用とは別に必要です）</li>
                            <li>交流用の名刺は合計100枚程度ご用意ください。</li>
                            <li>IT業界に関係のない企業様のごエントリーはお控え下さい。応募の確認が取れ次第、主催者側にてキャンセル対応をさせていただきます。</li>
                            <li>会場内での強引な勧誘や引き抜き行為は固くお断りいたします。</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="font-bold text-slate-900 mb-2 underline decoration-teal-500 decoration-2">キャンセルについて</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>キャンセルの場合は3月26日（木）までにご連絡をお願いいたします。無料開催の為、ご協力をお願いいたします。</li>
                            <li>無断キャンセルの場合は、次回以降のご参加をご遠慮させていただきます。</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="font-bold text-slate-900 mb-2 underline decoration-teal-500 decoration-2">その他</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>主催者側で不適切と判断した方のご入場をお断りする場合がございます。</li>
                            <li>交流会中のトラブルについて、主催者は一切の責任を負いかねます。</li>
                        </ul>
                    </section>
                </div>
                <div className="p-6 border-t border-slate-100 bg-slate-50 text-center">
                    <button onClick={onClose} className="btn-primary px-10">閉じる</button>
                </div>
            </motion.div>
        </div>
    );
}
