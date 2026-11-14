import { ArrowDownRight, MessageCircle, Truck } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/menuData';

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="pt-8 pb-10 sm:pt-12 sm:pb-14 border-b border-[#1E1916]/10"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-wider uppercase text-[#8E6A1E] mb-4">
                Edición 2026 · Domicilios Directos por WhatsApp
              </p>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight text-[#1E1916] [text-wrap:balance] max-w-2xl">
                Celebremos juntos la magia de la Navidad
              </h1>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#574E49] max-w-[60ch]">
                Ofrecemos propuestas gastronómicas especiales para acompañar tus
                celebraciones empresariales y familiares. Elige tus platos favoritos,
                personaliza sabores y envía tu pedido directo por WhatsApp.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#carta"
                className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-lg bg-[#173B2B] text-white text-sm font-medium hover:bg-[#112D20] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Explorar la Carta</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={WHATSAPP_CONFIG.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-lg border border-[#1E1916]/20 bg-white text-[#1E1916] text-sm font-medium hover:bg-[#F3EFE9] transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#173B2B]" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-64 sm:h-80 lg:h-full min-h-[280px] rounded-xl overflow-hidden bg-[#ECE6DD] border border-[#1E1916]/10">
              <img
                src="/images/menu/natilla_bunuelos.jpg"
                alt="Natilla artesanal navideña con dulce de mora y buñuelos dorados"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <p className="text-xs text-white/80">
                  Tradición Colombiana · Entrega a Domicilio
                </p>
                <p className="font-display text-lg font-medium mt-0.5">
                  Natilla artesanal, tamal, lechona y postres de temporada
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Delivery Info Strip below Hero split */}
        <div className="mt-8 bg-white border border-[#1E1916]/10 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[#173B2B]">
            <Truck className="w-5 h-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-medium text-[#574E49]">
                Pedidos directos a domicilio
              </p>
              <p className="text-sm font-semibold text-[#1E1916]">
                Arma tu carrito y envíalo en un clic directo por WhatsApp
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#574E49]">
            <span>Nequi / Daviplata</span>
            <span aria-hidden="true">·</span>
            <span>Efectivo contra entrega</span>
          </div>
        </div>
      </div>
    </section>
  );
}
