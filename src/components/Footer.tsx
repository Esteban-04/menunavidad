import { FileDown, MessageCircle } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/menuData';

export function Footer() {
  return (
    <footer id="contacto" className="py-10 sm:py-12 bg-[#FAF8F5]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-display text-lg font-semibold text-[#1E1916]">
            Menú Navideño 2026
          </p>
          <p className="mt-1 text-sm text-[#574E49] max-w-md">
            Propuestas gastronómicas artesanales a domicilio para tu hogar,
            novenas empresariales y celebraciones familiares.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={WHATSAPP_CONFIG.baseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] rounded-lg bg-white border border-[#1E1916]/15 text-sm font-medium text-[#1E1916] hover:bg-[#EFEAE2] transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-[#173B2B]" aria-hidden="true" />
            <span>Pedir por WhatsApp</span>
          </a>

          <a
            href="/menu_navideno_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] rounded-lg border border-[#1E1916]/15 text-sm font-medium text-[#574E49] hover:text-[#1E1916] hover:bg-white transition-colors whitespace-nowrap"
          >
            <FileDown className="w-4 h-4" aria-hidden="true" />
            <span>Ver Catálogo PDF</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
