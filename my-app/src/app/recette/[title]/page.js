import Image from 'next/image';
import Link from 'next/link';
import { notFound } from "next/navigation";
import recipes from '../../../../resources/recipes.json';

// Fonction pour trouver une recette par son nom
function getRecipeByTitle(title) {
    const decodedTitle = decodeURIComponent(title);
    return recipes.find(recipe => recipe.name === decodedTitle);
}

export default async function RecipePage({ params }) {
    const { title } = await params;
    
    if (!title) {
        notFound();
    }

    const recipe = getRecipeByTitle(title);
    
    if (!recipe) {
        notFound();
    }

    const imageSrc = recipe.image ? `/recipes_images/${recipe.image}` : null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="relative w-full h-24 overflow-hidden bg-gray-900">
                <Image
                    src="/f90e7bb5ff2950597c1f7f1fce40bd5b03a3d836.jpg"
                    alt="Header background"
                    fill
                    className="object-cover opacity-70"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
                
                <div className="relative z-10 h-full flex items-center px-8">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <span className="text-white font-bold text-xl tracking-wide">LES PETITS PLATS</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <circle cx="12" cy="12" r="10" strokeWidth="2" />
                            <circle cx="12" cy="12" r="4" fill="currentColor" />
                        </svg>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image de la recette */}
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-amber-100 to-orange-100">
                        {imageSrc ? (
                            <Image
                                src={imageSrc}
                                alt={recipe.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Détails de la recette */}
                    <div className="space-y-8">
                        {/* Titre */}
                        <h1 className="font-display text-4xl font-bold text-gray-900">
                            {recipe.name}
                        </h1>

                        {/* Temps de préparation */}
                        <div>
                            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Temps de préparation
                            </h2>
                            <span className="inline-block bg-amber-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                                {recipe.time}min
                            </span>
                        </div>

                        {/* Ingrédients */}
                        <div>
                            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                                Ingrédients
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {recipe.ingredients.map((ing, index) => (
                                    <div key={index} className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-900">
                                            {ing.ingredient}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {ing.quantity !== undefined && ing.quantity}
                                            {ing.unit && ` ${ing.unit}`}
                                            {!ing.quantity && !ing.unit && '-'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ustensiles */}
                        {recipe.ustensils && recipe.ustensils.length > 0 && (
                            <div>
                                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                                    Ustensiles nécessaires
                                </h2>
                                <div className="space-y-2">
                                    {recipe.ustensils.map((ustensil, index) => (
                                        <div key={index} className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-900 capitalize">
                                                {ustensil}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Appareils */}
                        {recipe.appliance && (
                            <div>
                                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                                    Appareils nécessaires
                                </h2>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-gray-900">
                                        {recipe.appliance}
                                    </span>
                                    <span className="text-sm text-gray-500">1</span>
                                </div>
                            </div>
                        )}

                        {/* Instructions */}
                        <div>
                            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                                Recette
                            </h2>
                            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                                <p>{recipe.description}</p>
                            </div>
                        </div>

                        {/* Portions */}
                        {recipe.servings && (
                            <div className="pt-4 border-t border-gray-200">
                                <span className="text-sm text-gray-500">
                                    Pour <span className="font-semibold text-gray-900">{recipe.servings}</span> {recipe.servings > 1 ? 'personnes' : 'personne'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-6 mt-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm text-gray-400">
                        Copyright © {new Date().getFullYear()} - Les Petits Plats
                    </p>
                </div>
            </footer>
        </div>
    );
}
