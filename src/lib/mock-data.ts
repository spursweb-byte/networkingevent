export interface Entry {
    id: string;
    name: string;
    katakana: string;
    company: string;
    email: string;
    newsletterEmail?: string;
    status: 'active' | 'cancelled' | 'checked-in';
    type: '案件保有' | '要員保有' | '両方';
    memo?: string;
    createdAt: string;
}

export const mockEntries: Entry[] = [
    {
        id: '1',
        name: '山田 太郎',
        katakana: 'ヤマダ タロウ',
        company: '株式会社iRup',
        email: 'yamada@irup.jp',
        newsletterEmail: 'yamada.news@p-irup.jp',
        status: 'active',
        type: '両方',
        createdAt: '2026-03-01 10:00',
    },
    {
        id: '2',
        name: '佐藤 次郎',
        katakana: 'サトウ ジロウ',
        company: 'Spurs株式会社',
        email: 'sato@spurs.inc',
        status: 'checked-in',
        type: '案件保有',
        createdAt: '2026-03-02 11:30',
    },
    {
        id: '3',
        name: '田中 花子',
        katakana: 'タナカ ハナコ',
        company: 'フリーランス',
        email: 'tanaka@example.com',
        newsletterEmail: 'tanaka.personal@gmail.com',
        status: 'cancelled',
        type: '要員保有',
        memo: '体調不良のため欠席',
        createdAt: '2026-03-03 09:15',
    }
];
