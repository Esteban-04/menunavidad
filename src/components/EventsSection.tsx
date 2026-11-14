import { useState } from 'react';
import { Calendar, Check, MessageCircle, Truck, Users } from 'lucide-react';
import { MENU_ITEMS, WHATSAPP_CONFIG, buildEventQuoteWhatsAppUrl } from '../data/menuData';

export function EventsSection() {
  const [eventType, setEventType] = useState('Novena Empresarial');
  const [companyOrFamily, setCompanyOrFamily] = useState('');
  const [guestCount, setGuestCount] = useState('25 personas');
  const [eventDate, setEventDate] = useState('');
  const [deliveryService, setDeliveryService] = useState(true);
  const [selectedDishes, setSelectedDishes] = useState<string[]>([
    'Natilla Artesanal con Buñuelos',
    'Tamal Tolimense Completo',
  ]);
  const [notes, setNotes] = useState('');

  const toggleDish = (dishName: string) => {
    setSelectedDishes((prev) =>
      prev.includes(dishName)
        ? prev.filter((name) => name !== dishName)
        : [...prev, dishName]
    );
  };

  const quoteUrl = buildEventQuoteWhatsAppUrl({
    eventType,
    guestCount,
    eventDate,
    companyOrFamily,
    selectedDishes,
    deliveryService,
    notes,
  });

  return (
    <section
      id="eventos"
      className="py-12 sm:py-16 bg-white border-t border-b border-[#1E1916]/10"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Brand Value Props from PDF Page 9 */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-medium tracking-wider uppercase text-[#8E6A1E] mb-2">
                Servicio de Entrega y Distribución
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1E1916] tracking-tight [text-wrap:balance]">
                Crea tu combinación ideal para novenas y empresas
              </h2>
              <p className="mt-4 text-base text-[#574E49] leading-relaxed">
                Elige una o varias de nuestras opciones y personaliza el menú de
                tu novena de acuerdo con las preferencias y el presupuesto de tu
                equipo o familia.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <Users className="w-5 h-5 text-[#A81C24] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-[#1E1916]">
                    Pedidos para grupos pequeños o grandes
                  </h3>
                  <p className="text-sm text-[#574E49]">
                    Combina diferentes opciones del catálogo para celebraciones
                    familiares y eventos corporativos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Truck className="w-5 h-5 text-[#A81C24] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-[#1E1916]">
                    Entrega programada y distribución organizada
                  </h3>
                  <p className="text-sm text-[#574E49]">
                    Llevamos tu pedido hasta la empresa o tu hogar y, si lo
                    requieres, apoyamos la entrega organizada a cada invitado.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Calendar className="w-5 h-5 text-[#A81C24] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-[#1E1916]">
                    Productos frescos y puntuales
                  </h3>
                  <p className="text-sm text-[#574E49]">
                    Tú disfrutas la celebración, nosotros nos encargamos de toda la
                    logística.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E1916]/10">
              <p className="text-xs font-medium uppercase tracking-wider text-[#746A63] mb-3">
                WhatsApp directo para pedidos y cotizaciones
              </p>
              <a
                href={WHATSAPP_CONFIG.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-lg border border-[#1E1916]/15 bg-[#FAF8F5] text-sm font-medium text-[#1E1916] hover:bg-[#EFEAE2] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#173B2B]" aria-hidden="true" />
                <span>Escríbenos por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Quote Builder */}
          <div
            id="cotizar"
            className="lg:col-span-7 bg-[#FAF8F5] border border-[#1E1916]/10 rounded-xl p-6 sm:p-8 space-y-5"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-[#1E1916]">
                Solicita tu cotización por WhatsApp
              </h3>
              <p className="mt-1 text-sm text-[#574E49]">
                Arma tu combinación y abre el chat con todo el detalle listo para
                confirmar disponibilidad y envío.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="event-type"
                  className="block text-xs font-medium text-[#574E49] mb-1.5"
                >
                  Tipo de celebración
                </label>
                <select
                  id="event-type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-lg border border-[#1E1916]/15 bg-white text-sm text-[#1E1916]"
                >
                  <option value="Novena Empresarial">Novena Empresarial</option>
                  <option value="Novena Familiar">Novena Familiar</option>
                  <option value="Cena de Fin de Año">Cena de Fin de Año</option>
                  <option value="Desayuno o Refrigerio Navideño">
                    Desayuno o Refrigerio Navideño
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="guest-count"
                  className="block text-xs font-medium text-[#574E49] mb-1.5"
                >
                  Cantidad de personas
                </label>
                <select
                  id="guest-count"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-lg border border-[#1E1916]/15 bg-white text-sm text-[#1E1916]"
                >
                  <option value="10 - 20 personas">10 - 20 personas</option>
                  <option value="25 personas">20 - 35 personas</option>
                  <option value="40 - 70 personas">40 - 70 personas</option>
                  <option value="80 - 150 personas">80 - 150 personas</option>
                  <option value="Más de 150 personas">Más de 150 personas</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="company-name"
                  className="block text-xs font-medium text-[#574E49] mb-1.5"
                >
                  Empresa o familia
                </label>
                <input
                  id="company-name"
                  type="text"
                  value={companyOrFamily}
                  onChange={(e) => setCompanyOrFamily(e.target.value)}
                  placeholder="Ej. Área Comercial / Familia Gómez"
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-lg border border-[#1E1916]/15 bg-white text-sm text-[#1E1916] placeholder:text-[#8B8078]"
                />
              </div>

              <div>
                <label
                  htmlFor="event-date"
                  className="block text-xs font-medium text-[#574E49] mb-1.5"
                >
                  Fecha estimada
                </label>
                <input
                  id="event-date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-lg border border-[#1E1916]/15 bg-white text-sm text-[#1E1916]"
                />
              </div>
            </div>

            <div>
              <span className="block text-xs font-medium text-[#574E49] mb-2">
                Opciones del menú a combinar
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {MENU_ITEMS.map((dish) => {
                  const checked = selectedDishes.includes(dish.name);
                  return (
                    <button
                      key={dish.id}
                      type="button"
                      onClick={() => toggleDish(dish.name)}
                      className={`px-3 py-2.5 min-h-[40px] rounded-lg border text-left text-xs font-medium flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                        checked
                          ? 'bg-[#173B2B]/8 border-[#173B2B] text-[#1E1916]'
                          : 'bg-white border-[#1E1916]/15 text-[#574E49] hover:border-[#1E1916]/30'
                      }`}
                    >
                      <span className="truncate">{dish.name}</span>
                      <span
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          checked
                            ? 'bg-[#173B2B] border-[#173B2B] text-white'
                            : 'border-[#1E1916]/25'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" aria-hidden="true" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={deliveryService}
                onChange={(e) => setDeliveryService(e.target.checked)}
                className="w-4 h-4 accent-[#173B2B]"
              />
              <span className="text-sm text-[#1E1916]">
                Requiero apoyo en entrega organizada a cada invitado durante el evento
              </span>
            </label>

            <div>
              <label
                htmlFor="event-notes"
                className="block text-xs font-medium text-[#574E49] mb-1.5"
              >
                Dirección o comentarios (opcional)
              </label>
              <input
                id="event-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Entrega 4:00 p.m. en zona norte, sabores surtidos"
                className="w-full min-h-[42px] px-3.5 py-2 rounded-lg border border-[#1E1916]/15 bg-white text-sm text-[#1E1916] placeholder:text-[#8B8078]"
              />
            </div>

            <a
              href={quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 min-h-[44px] rounded-lg bg-[#173B2B] text-white text-sm font-medium hover:bg-[#112D20] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>
                Enviar Cotización por WhatsApp
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
