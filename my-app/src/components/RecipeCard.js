'use client';

import Image from 'next/image';
import Link from "next/link";

export default function RecipeCard({ 
  title = "Recette", 
  image,
  time = 45,
  description = "Une délicieuse recette à découvrir...",
  ingredients = []
}) {
  const imageSrc = image ? `/recipes_images/${image}` : null;

  return (
    <article className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
        <Link href={`/recette/${title}`}>
      {/* Image container */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Time badge */}
        <div className="absolute top-4 right-4 bg-amber-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-md">
          {time} min
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-display text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {title}
        </h3>

        {/* Recipe section */}
        <div className="mb-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Recette
          </h4>
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Ingredients section */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Ingrédients
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {ingredients.slice(0, 6).map((ingredient, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-sm text-gray-800 font-medium truncate">
                  {ingredient.name}
                </span>
                <span className="text-xs text-gray-400">
                  {ingredient.quantity} {ingredient.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
        </Link>
    </article>
  );
}
