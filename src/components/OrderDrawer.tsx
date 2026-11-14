import { useEffect, useState } from 'react';
import {
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import {
  WHATSAPP_CONFIG,
  buildCartWhatsAppUrl,
  formatCOP,
  getCartItemUnitTotal,
} from '../data/menuData';
import { CartItem, DeliveryInfo, PaymentPreference } from '../types/menu';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryInfo: DeliveryInfo;
  onDeliveryInfoChange: (info: DeliveryInfo) => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export function OrderDrawer({
  isOpen,
  onClose,
  deliveryInfo,
  onDeliveryInfoChange,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: OrderDrawerProps) {
  const [formError, setFormError] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setFormError('');
    setSentNotice(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + getCartItemUnitTotal(item) * item.quantity,
    0
  );

  const waUrl = buildCartWhatsAppUrl(deliveryInfo, cart);

  const handleSendWhatsApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      !deliveryInfo.customerName.trim() ||
      !deliveryInfo.phone.trim() ||
      !deliveryInfo.address.trim()
    ) {
      e.preventDefault();
      setFormError(
        'Por favor completa tu nombre, celular y dirección antes de enviar el pedido.'
      );
      return;
    }
    if (
      deliveryInfo.deliveryTiming === 'scheduled' &&
      !deliveryInfo.scheduledDateTime.trim()
    ) {
      e.preventDefault();
      setFormError('Indica la fecha y hora deseada para tu entrega programada.');
      return;
    }
    setFormError('');
    setSentNotice(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FAF8F5] h-full shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-white border-b border-[#1E1916]/10 flex items-center justify-between gap-4 shrink-0">
          <div>
            <h2
              id="drawer-title"
              className="font-display text-xl font-semibold text-[#1E1916]"
            >
              Tu Pedido por WhatsApp
            </h2>
            <p className="text-xs text-[#746A63]">
              Revisa tus platos y envíalos directo por WhatsApp
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar panel de pedido"
            className="w-10 h-10 rounded-lg border border-[#1E1916]/10 flex items-center justify-center text-[#1E1916] hover:bg-[#F3EFE9] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {cart.length === 0 ? (
            <div className="bg-white border border-[#1E1916]/10 rounded-xl p-8 text-center mt-4">
              <ShoppingBag
                className="w-10 h-10 mx-auto text-[#8E6A1E] mb-3"
                aria-hidden="true"
              />
              <h3 className="font-display text-xl font-semibold text-[#1E1916]">
                Tu pedido está vacío
              </h3>
              <p className="mt-2 text-sm text-[#574E49]">
                Elige natillas, buñuelos, tamales, lechona o postres de la carta y
                envía tu pedido directo por WhatsApp.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-5 py-2.5 min-h-[42px] rounded-lg bg-[#173B2B] text-white text-sm font-medium hover:bg-[#112D20] cursor-pointer"
              >
                Ir a la Carta
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#746A63]">
                    Productos seleccionados ({cart.reduce((s, i) => s + i.quantity, 0)})
                  </span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-xs text-[#746A63] hover:text-[#A81C24] underline underline-offset-2 cursor-pointer"
                  >
                    Vaciar pedido
                  </button>
                </div>

                {cart.map((item) => {
                  const unitTotal = getCartItemUnitTotal(item);
                  return (
                    <div
                      key={item.cartItemId}
                      className="bg-white border border-[#1E1916]/10 rounded-xl p-4 flex gap-3.5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 rounded-lg object-cover bg-[#EFEAE2] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-[#1E1916] leading-snug">
                            {item.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.cartItemId)}
                            aria-label={`Eliminar ${item.name}`}
                            className="p-1.5 text-[#746A63] hover:text-[#A81C24] cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {item.selectedOptions.length > 0 && (
                          <p className="mt-1 text-xs text-[#574E49]">
                            {item.selectedOptions
                              .map((o) => o.choiceLabel)
                              .join(' · ')}
                          </p>
                        )}

                        {item.notes && (
                          <p className="mt-1 text-xs italic text-[#746A63]">
                            Nota: {item.notes}
                          </p>
                        )}

                        <div className="mt-3 flex items-center justify-between gap-2">
                          <div className="inline-flex items-center border border-[#1E1916]/15 rounded-lg bg-[#FAF8F5]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                              aria-label="Restar unidad"
                              className="w-8 h-8 flex items-center justify-center text-[#1E1916] hover:bg-[#EFEAE2] rounded-l-lg cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center font-mono text-xs font-semibold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                              aria-label="Sumar unidad"
                              className="w-8 h-8 flex items-center justify-center text-[#1E1916] hover:bg-[#EFEAE2] rounded-r-lg cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="font-mono text-sm font-semibold text-[#1E1916] tabular-nums">
                            {formatCOP(unitTotal * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Form */}
              <div className="bg-white border border-[#1E1916]/10 rounded-xl p-4 space-y-3.5">
                <div className="flex items-center gap-2 text-[#173B2B]">
                  <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-[#1E1916]">
                    Datos de entrega a domicilio
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="delivery-name"
                      className="block text-xs font-medium text-[#574E49] mb-1"
                    >
                      Nombre completo *
                    </label>
                    <input
                      id="delivery-name"
                      type="text"
                      value={deliveryInfo.customerName}
                      onChange={(e) => {
                        setFormError('');
                        onDeliveryInfoChange({
                          ...deliveryInfo,
                          customerName: e.target.value,
                        });
                      }}
                      placeholder="Ej. Carolina Méndez"
                      className="w-full min-h-[40px] px-3 py-2 rounded-lg border border-[#1E1916]/15 bg-[#FAF8F5] text-sm text-[#1E1916] placeholder:text-[#8B8078]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="delivery-phone"
                      className="block text-xs font-medium text-[#574E49] mb-1"
                    >
                      Celular / WhatsApp *
                    </label>
                    <input
                      id="delivery-phone"
                      type="tel"
                      value={deliveryInfo.phone}
                      onChange={(e) => {
                        setFormError('');
                        onDeliveryInfoChange({
                          ...deliveryInfo,
                          phone: e.target.value,
                        });
                      }}
                      placeholder="Ej. 300 123 4567"
                      className="w-full min-h-[40px] px-3 py-2 rounded-lg border border-[#1E1916]/15 bg-[#FAF8F5] font-mono text-sm text-[#1E1916] placeholder:text-[#8B8078]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="delivery-address"
                    className="block text-xs font-medium text-[#574E49] mb-1"
                  >
                    Dirección exacta (calle, número, torre/apto o empresa) *
                  </label>
                  <input
                    id="delivery-address"
                    type="text"
                    value={deliveryInfo.address}
                    onChange={(e) => {
                      setFormError('');
                      onDeliveryInfoChange({
                        ...deliveryInfo,
                        address: e.target.value,
                      });
                    }}
                    placeholder="Ej. Calle 72 # 14-25, Apto 402"
                    className="w-full min-h-[40px] px-3 py-2 rounded-lg border border-[#1E1916]/15 bg-[#FAF8F5] text-sm text-[#1E1916] placeholder:text-[#8B8078]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="delivery-neighborhood"
                    className="block text-xs font-medium text-[#574E49] mb-1"
                  >
                    Barrio o punto de referencia
                  </label>
                  <input
                    id="delivery-neighborhood"
                    type="text"
                    value={deliveryInfo.neighborhood}
                    onChange={(e) =>
                      onDeliveryInfoChange({
                        ...deliveryInfo,
                        neighborhood: e.target.value,
                      })
                    }
                    placeholder="Ej. Chapinero / Frente al parque"
                    className="w-full min-h-[40px] px-3 py-2 rounded-lg border border-[#1E1916]/15 bg-[#FAF8F5] text-sm text-[#1E1916] placeholder:text-[#8B8078]"
                  />
                </div>

                <div>
                  <span className="block text-xs font-medium text-[#574E49] mb-1.5">
                    Horario de entrega
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onDeliveryInfoChange({
                          ...deliveryInfo,
                          deliveryTiming: 'asap',
                        })
                      }
                      className={`py-2 px-3 min-h-[38px] rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                        deliveryInfo.deliveryTiming === 'asap'
                          ? 'bg-[#173B2B] text-white border-[#173B2B]'
                          : 'bg-[#FAF8F5] text-[#574E49] border-[#1E1916]/15 hover:bg-[#EFEAE2]'
                      }`}
                    >
                      Lo antes posible
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onDeliveryInfoChange({
                          ...deliveryInfo,
                          deliveryTiming: 'scheduled',
                        })
                      }
                      className={`py-2 px-3 min-h-[38px] rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                        deliveryInfo.deliveryTiming === 'scheduled'
                          ? 'bg-[#173B2B] text-white border-[#173B2B]'
                          : 'bg-[#FAF8F5] text-[#574E49] border-[#1E1916]/15 hover:bg-[#EFEAE2]'
                      }`}
                    >
                      Programar fecha/hora
                    </button>
                  </div>

                  {deliveryInfo.deliveryTiming === 'scheduled' && (
                    <input
                      type="text"
                      value={deliveryInfo.scheduledDateTime}
                      onChange={(e) => {
                        setFormError('');
                        onDeliveryInfoChange({
                          ...deliveryInfo,
                          scheduledDateTime: e.target.value,
                        });
                      }}
                      placeholder="Ej. Sábado 19 de dic, 4:30 p.m."
                      aria-label="Fecha y hora programada de entrega"
                      className="mt-2.5 w-full min-h-[40px] px-3 py-2 rounded-lg border border-[#1E1916]/15 bg-[#FAF8F5] text-sm text-[#1E1916] placeholder:text-[#8B8078]"
                    />
                  )}
                </div>

                <div>
                  <label
                    htmlFor="payment-preference"
                    className="block text-xs font-medium text-[#574E49] mb-1.5"
                  >
                    ¿Cómo prefieres pagar?
                  </label>
                  <select
                    id="payment-preference"
                    value={deliveryInfo.paymentPreference}
                    onChange={(e) =>
                      onDeliveryInfoChange({
                        ...deliveryInfo,
                        paymentPreference: e.target.value as PaymentPreference,
                      })
                    }
                    className="w-full min-h-[40px] px-3 py-2 rounded-lg border border-[#1E1916]/15 bg-[#FAF8F5] text-sm text-[#1E1916]"
                  >
                    <option value="nequi">Nequi</option>
                    <option value="daviplata">Daviplata</option>
                    <option value="cash">Efectivo contra entrega</option>
                  </select>
                </div>

                {formError && (
                  <p className="text-xs font-medium text-[#A81C24]" role="alert">
                    {formError}
                  </p>
                )}

                {sentNotice && (
                  <p className="text-xs font-medium text-[#173B2B]" role="status">
                    Se abrió WhatsApp con tu pedido completo. Si deseas ajustar algo,
                    puedes volver a enviarlo cuando quieras.
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#1E1916]/10 space-y-3 shrink-0">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-base font-semibold text-[#1E1916]">
                <span>Subtotal productos</span>
                <span className="font-mono tabular-nums">{formatCOP(subtotal)}</span>
              </div>
              <p className="text-xs text-[#746A63]">
                El valor del domicilio se confirma por WhatsApp según tu dirección
              </p>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 px-5 min-h-[46px] rounded-lg bg-[#173B2B] text-white text-sm font-medium hover:bg-[#112D20] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                Enviar Pedido por WhatsApp
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
