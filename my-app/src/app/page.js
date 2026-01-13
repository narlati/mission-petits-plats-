'use client';

import Banner from '@/components/Banner';
import TagSelector from '@/components/TagSelector';
import RecipeCard from '@/components/RecipeCard';
import { useTagSearch } from './contexts/searchContext';
import { useMemo } from 'react';
import recipesData from '../../resources/recipes.json';

export default function Home() {
  const {
    searchQuery,
    selectedIngredients,
    selectedAppareils,
    selectedUstensiles,
    setSelectedIngredients,
    setSelectedAppareils,
    setSelectedUstensiles,
  } = useTagSearch();


const normalizeUstensil = (u) => u.charAt(0).toUpperCase() + u.slice(1).toLowerCase();

const allRecipes = useMemo(() => {
  return recipesData.map(recipe => ({
    id: recipe.id,
    title: recipe.name,
    image: recipe.image,
    time: recipe.time,
    description: recipe.description,
    ingredients: recipe.ingredients.map(ing => ({
      name: ing.ingredient,
      quantity: ing.quantity || '',
      unit: ing.unit || ''
    })),
    appliance: recipe.appliance,
    ustensils: (recipe.ustensils || []).map(normalizeUstensil)
  }));
}, []);

// Avec useMemo, React garantit que les hooks s'exécutent dans l'ordre. Sans useMemo, le calcul direct peut s'exécuter avant que allRecipes soit prêt.
const filteredRecipes = (allRecipes || []).filter(recipe => {
    // 1. Recherche textuelle
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' ||
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.ingredients.some(ing => ing.name.toLowerCase().includes(query));

    // 2. Vérifier les ingrédients sélectionnés
    const hasAllIngredients = selectedIngredients.every(ing =>
      recipe.ingredients.some(recipeIng => recipeIng.name === ing)
    );

    // 3. Vérifier les appareils
    const hasAllAppareils = selectedAppareils.every(app =>
      recipe.appliance === app
    );

    // 4. Vérifier les ustensiles
    const hasAllUstensiles = selectedUstensiles.every(ust =>
      recipe.ustensils.includes(ust)
    );

    return matchesSearch && hasAllIngredients && hasAllAppareils && hasAllUstensiles;
    }
  );

  // Tags disponibles (basés sur les recettes filtrées)
  const availableIngredients = useMemo(() => {
    const allIngredients = filteredRecipes.flatMap(recipe => 
      recipe.ingredients.map(ing => ing.name)
    );
    return [...new Set(allIngredients)].sort();
  }, [filteredRecipes]);

  const availableAppareils = useMemo(() => {
    const allAppareils = filteredRecipes.map(recipe => recipe.appliance);
    return [...new Set(allAppareils)].sort();
  }, [filteredRecipes]);

  const availableUstensiles = useMemo(() => {
    const allUstensiles = filteredRecipes.flatMap(recipe => recipe.ustensils);
    return [...new Set(allUstensiles)].sort();
  }, [filteredRecipes]);


  // Handlers pour ajouter/retirer des tags
  const toggleIngredient = (tag) => {
    setSelectedIngredients(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleAppareil = (tag) => {
    setSelectedAppareils(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleUstensile = (tag) => {
    setSelectedUstensiles(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const totalRecipes = filteredRecipes.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner with search */}
      <Banner />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters section */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-4">
            <TagSelector
              label="Ingrédients"
              options={availableIngredients}
              selectedTags={selectedIngredients}
              onTagSelect={toggleIngredient}
              color="emerald"
            />
            <TagSelector
              label="Appareils"
              options={availableAppareils}
              selectedTags={selectedAppareils}
              onTagSelect={toggleAppareil}
              color="blue"
            />
            <TagSelector
              label="Ustensiles"
              options={availableUstensiles}
              selectedTags={selectedUstensiles}
              onTagSelect={toggleUstensile}
              color="rose"
            />

            {/* Recipe count */}
            <div className="ml-auto flex items-center">
              <span className="text-xl font-bold text-gray-700">
                {totalRecipes} recette{totalRecipes > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </section>

        {/* Recipes grid */}
        <section>
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  time={recipe.time}
                  description={recipe.description}
                  ingredients={recipe.ingredients}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Aucune recette ne correspond à vos critères de recherche.
              </p>
            </div>
          )}
        </section>
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
