import { ExternalLink, MessageCircle, X } from 'lucide-react';
import { WHATSAPP_CONFIG, buildCartWhatsAppUrl } from '../data/menuData';
import { CartItem, DeliveryInfo } from '../types/menu';

interface WhatsAppLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
  deliveryInfo: DeliveryInfo;
  cart: CartItem[];
}

export function WhatsAppLauncher({
  isOpen,
  onToggle,
  deliveryInfo,
  cart,
}: WhatsAppLauncherProps) {
  const directOrderUrl =
    cart.length > 0
      ? buildCartWhatsAppUrl(deliveryInfo, cart)
      : `${WHATSAPP_CONFIG.baseUrl}?text=${encodeURIComponent(
          'Hola, estoy viendo el Menú Navideño 2026 y quiero hacer un pedido a domicilio.'
        )}`;

  const eventsUrl = `${WHATSAPP_CONFIG.baseUrl}?text=${encodeURIComponent(
    'Hola, quiero solicitar una cotización a domicilio para una novena o evento navideño 2026.'
  )}`;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Contacto por WhatsApp"
          className="w-80 bg-white border border-[#1E1916]/15 rounded-xl shadow-xl p-4 space-y-3"
        >
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#1E1916]/10">
            <div>
              <p className="text-sm font-semibold text-[#1E1916]">
                WhatsApp Domicilios
              </p>
              <p className="text-xs text-[#574E49]">
                Atención directa para domicilios
              </p>
            </div>
            <button
              type="button"
              onClick={onToggle}
              aria-label="Cerrar menú de WhatsApp"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#574E49] hover:bg-[#FAF8F5] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <a
            href={directOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 rounded-lg bg-[#FAF8F5] border border-[#1E1916]/10 hover:border-[#173B2B]/40 transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#173B2B]">
                {cart.length > 0
                  ? `Enviar pedido actual (${cart.reduce((s, i) => s + i.quantity, 0)})`
                  : 'Pedir domicilio por WhatsApp'}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#574E49]" aria-hidden="true" />
            </div>
            <p className="text-xs text-[#574E49] mt-1">
              {cart.length > 0
                ? 'Abre el chat con el detalle completo de tu carrito.'
                : 'Consulta cobertura, horarios de entrega y disponibilidad.'}
            </p>
          </a>

          <a
            href={eventsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 rounded-lg bg-[#FAF8F5] border border-[#1E1916]/10 hover:border-[#173B2B]/40 transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#173B2B]">
                Cotizar novena o evento
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#574E49]" aria-hidden="true" />
            </div>
            <p className="text-xs text-[#574E49] mt-1">
              Pedidos programados para grupos familiares y empresas.
            </p>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label="Abrir contacto por WhatsApp"
        className="inline-flex items-center gap-2.5 px-4 py-3 min-h-[48px] rounded-full bg-[#173B2B] text-white text-sm font-medium shadow-lg hover:bg-[#112D20] active:scale-[0.98] transition-all cursor-pointer"
      >
        <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="whitespace-nowrap">WhatsApp</span>
      </button>
    </div>
  );
}
