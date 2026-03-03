import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 glass-effect border-none rounded-none backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                        <span className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground">i</span>
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SES Networking</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <Link href="#about" className="text-sm font-medium hover:text-secondary transition-colors">イベント概要</Link>
                        <Link href="#venue" className="text-sm font-medium hover:text-secondary transition-colors">会場情報</Link>
                        <Link href="#archive" className="text-sm font-medium hover:text-secondary transition-colors">過去の記録</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="#entry" className="btn btn-primary px-6 py-2">
                        参加予約
                    </Link>
                </div>
            </div>
        </nav>
    );
}
