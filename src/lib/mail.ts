import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        // アプリパスワードに空白が含まれている場合を考慮して削除
        pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, ''),
    },
});

// 起動時に設定を確認
if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('WARNING: GMAIL_USER or GMAIL_APP_PASSWORD is not set in environment variables.');
}

export async function sendEntryEmail(to: string, name: string, isWaitlist: boolean, company: string = '', entryId: number | string = '') {
    const subject = isWaitlist
        ? '【3月30日（月）無料交流会】キャンセル待ちエントリー受付のお知らせ'
        : '【3月30日（月）無料交流会＠渋谷】エントリー受付のお知らせ';

    const body = isWaitlist
        ? `${company}\n${name} 様\n\nこの度は無料交流会へのエントリーをいただきましてありがとうございます。\n現在、参加エントリーを多くいただいており定員に達している状況となっております。\n\nキャンセルが出た際には改めてご連絡をさせていただきます。\n\nこちらからのご連絡が3月27日（金）までになかった場合は大変申し訳ございませんが、\n次回開催時に改めてご参加をいただけますと幸いです。`
        : `${company}\n${name} 様\n\nこの度は無料交流会へのエントリーをいただきましてありがとうございます。\nエントリー受付完了いたしました。\n\n当日は受付に「No.${entryId}」をお伝え下さい。\nーーーー\n会場：東京都渋谷区渋谷2-22-6幸和ビル3階\n日時：3月30日（月）14:00～\n受付開始：13:45～　※受付開始前のご来場はご遠慮ください。\n持ち物：名刺100枚程度　※受付にて2枚ご提出いただきます。\nーーーー\n\n☆ キャンセルについて ☆\n・3月26日（木）までにキャンセルのご連絡を下記アドレスまでご送付ください。\n連絡先：support@spurs-inc.com\n・当日キャンセルは無料開催を維持していくためにもお控え下さい。\n・無断キャンセルの場合は次回以降参加をお断りさせていただきます。\n\n主催企業\n株式会社iRup：https://irup.jp/top\nSpurs株式会社：https://spurs-inc.com/`;

    await transporter.sendMail({
        from: `"SES営業交流会 実行委員会" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        text: body,
    });
}

export async function sendPromotionEmail(to: string, name: string, entryId: number | string, company: string = '') {
    const body = `${company}\n${name} 様\n\nお世話になっております。\n先日ごエントリーいただいておりました無料交流会＠渋谷にて\nキャンセルが出たため繰り上げでのご参加枠の確保ができましたためご連絡を差し上げました。\n\n当日は受付に「No.${entryId}」をお伝え下さい。\n\nご参加をお待ちしております。\n\n当日のご参加が難しい場合は、お手数ですがこちらにご参加できない旨ご返信をいただけますと幸いです。`;

    await transporter.sendMail({
        from: `"SES営業交流会 実行委員会" <${process.env.GMAIL_USER}>`,
        to,
        subject: '【3月30日（月）交流会】繰り上げ案内のご連絡',
        text: body,
    });
}
