import { useState } from 'react';
import { Plus, Search, UtensilsCrossed } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, formatCOP } from '../data/menuData';
import { MenuCategoryId, MenuItem } from '../types/menu';

interface MenuCatalogProps {
  onSelectDish: (dish: MenuItem) => void;
}

export function MenuCatalog({ onSelectDish }: MenuCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.categoryId === activeCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    const haystack = `${item.name} ${item.categoryLabel} ${item.description} ${item.highlightNote ?? ''}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  return (
    <section id="carta" className="py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1E1916]/10">
          <div>
            <p className="text-xs font-medium tracking-wider uppercase text-[#8E6A1E] mb-2">
              Nuestras Opciones
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1E1916] tracking-tight">
              Carta Navideña 2026
            </h2>
          </div>

          <div className="w-full md:w-72 relative">
            <Search
              className="w-4 h-4 text-[#746A63] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar natilla, tamal, lechona..."
              aria-label="Buscar en el menú"
              className="w-full min-h-[42px] pl-10 pr-4 py-2 rounded-lg bg-white border border-[#1E1916]/15 text-sm text-[#1E1916] placeholder:text-[#8B8078] focus:outline-none focus:ring-2 focus:ring-[#A81C24]"
            />
          </div>
        </div>

        {/* Category Filter Segmented Controls */}
        <div
          role="tablist"
          aria-label="Categorías del menú"
          className="mt-6 flex items-center gap-2 overflow-x-auto pb-2"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 min-h-[40px] rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#173B2B] text-white'
                    : 'bg-white text-[#574E49] border border-[#1E1916]/10 hover:bg-[#F3EFE9] hover:text-[#1E1916]'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="mt-10 bg-white border border-[#1E1916]/10 rounded-xl p-10 text-center">
            <p className="font-display text-xl text-[#1E1916]">
              No encontramos opciones con ese filtro
            </p>
            <p className="mt-2 text-sm text-[#574E49]">
              Prueba borrando la búsqueda o seleccionando toda la carta.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-5 px-5 py-2.5 min-h-[40px] rounded-lg bg-[#173B2B] text-white text-sm font-medium hover:bg-[#112D20] transition-colors cursor-pointer"
            >
              Ver toda la carta
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const imgFailed = failedImages[item.id];
              return (
                <article
                  key={item.id}
                  className="group bg-white border border-[#1E1916]/10 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => onSelectDish(item)}
                    className="block w-full aspect-[4/3] bg-[#EFEAE2] overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#A81C24]"
                  >
                    {imgFailed ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F3ECE1] to-[#E5DBCD] text-[#574E49] p-6 text-center">
                        <UtensilsCrossed className="w-8 h-8 mb-2 text-[#8E6A1E]" aria-hidden="true" />
                        <span className="font-display text-base font-medium text-[#1E1916]">
                          {item.name}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    )}
                  </button>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#8E6A1E]">
                        {item.categoryLabel}
                      </p>
                      <h3 className="mt-1.5 font-display text-xl font-semibold text-[#1E1916] leading-snug">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm text-[#574E49] leading-relaxed">
                        {item.description}
                      </p>
                      {item.highlightNote && (
                        <p className="mt-2.5 text-xs text-[#746A63]">
                          {item.highlightNote}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#1E1916]/10 flex items-center justify-between gap-4">
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-[#746A63]">
                          Desde
                        </span>
                        <span className="font-mono text-lg font-semibold text-[#1E1916] tabular-nums">
                          {formatCOP(item.basePrice)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectDish(item)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[42px] rounded-lg bg-[#A81C24] text-white text-sm font-medium hover:bg-[#8E151C] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        <span>Elegir y Pedir</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
