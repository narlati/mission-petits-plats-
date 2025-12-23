'use client';

import Image from 'next/image';
import SearchBar from './SearchBar';

export default function Banner() {
  return (
    <header className="relative w-full min-h-[500px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/f90e7bb5ff2950597c1f7f1fce40bd5b03a3d836.jpg"
        alt="Délicieuses recettes"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Logo en haut à gauche */}
      <div className="absolute top-6 left-8 z-20 flex items-center gap-2">
        <span className="text-white font-bold text-xl tracking-wide">LES PETITS PLATS</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" fill="currentColor" />
        </svg>
      </div>
      
      {/* Contenu centré */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] px-4 py-12">
        {/* Titre principal */}
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-yellow-400 mb-10 text-center max-w-4xl leading-tight tracking-wide">
          DÉCOUVREZ NOS RECETTES
          <br />
          DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
        </h1>
        
        {/* Search Bar */}
        <SearchBar />
      </div>
    </header>
  );
}
