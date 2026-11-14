import { ShoppingBag } from 'lucide-react';
import { formatCOP } from '../data/menuData';

interface HeaderProps {
  cartCount: number;
  cartSubtotal: number;
  onOpenOrderDrawer: () => void;
}

export function Header({ cartCount, cartSubtotal, onOpenOrderDrawer }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#1E1916]/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        <a
          href="#inicio"
          className="font-display text-xl font-semibold tracking-tight text-[#1E1916] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A81C24]"
        >
          Menú Navideño
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#574E49]">
          <a
            href="#carta"
            className="hover:text-[#1E1916] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            La Carta
          </a>
          <a
            href="#eventos"
            className="hover:text-[#1E1916] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Celebraciones
          </a>
          <a
            href="#cotizar"
            className="hover:text-[#1E1916] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Cotizar Novena
          </a>
          <a
            href="#contacto"
            className="hover:text-[#1E1916] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            WhatsApp
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenOrderDrawer}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 min-h-[40px] rounded-lg bg-[#A81C24] text-white text-sm font-medium hover:bg-[#8E151C] active:scale-[0.99] transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A81C24]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Pedido</span>
            <span className="font-mono text-xs tabular-nums opacity-90">
              ({cartCount})
            </span>
            {cartSubtotal > 0 && (
              <span className="hidden sm:inline font-mono text-xs tabular-nums border-l border-white/25 pl-2">
                {formatCOP(cartSubtotal)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
