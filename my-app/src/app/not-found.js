import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Background image */}
            <div className="fixed inset-0 -z-10">
                <Image
                    src="/f90e7bb5ff2950597c1f7f1fce40bd5b03a3d836.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Header */}
            <header className="relative z-10 px-8 py-6">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity w-fit">
                    <span className="text-white font-bold text-xl tracking-wide">LES PETITS PLATS</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                        <circle cx="12" cy="12" r="4" fill="currentColor" />
                    </svg>
                </Link>
            </header>

            {/* Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-4">
                <h1 className="font-display text-6xl md:text-8xl font-bold text-amber-400 mb-4">
                    404 :(
                </h1>
                <p className="text-xl md:text-2xl text-white font-medium text-center">
                    La page que vous demandez est introuvable.
                </p>
                
                <Link 
                    href="/"
                    className="mt-8 px-6 py-3 bg-amber-400 text-gray-900 font-bold rounded-full hover:bg-amber-300 transition-colors"
                >
                    Retour à l'accueil
                </Link>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-6 text-center">
                <p className="text-sm text-gray-400">
                    Copyright © {new Date().getFullYear()} - Les Petits Plats
                </p>
            </footer>
        </div>
    );
}
