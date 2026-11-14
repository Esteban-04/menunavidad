import {
  CartItem,
  DeliveryInfo,
  MenuCategoryId,
  MenuItem,
  PaymentPreference,
} from '../types/menu';

export const WHATSAPP_CONFIG = {
  displayPhone: '302 357 9819',
  rawPhone: '3023579819',
  waNumber: '573023579819',
  baseUrl: 'https://wa.me/573023579819',
} as const;

export const MENU_CATEGORIES: { id: MenuCategoryId; label: string }[] = [
  { id: 'all', label: 'Toda la Carta' },
  { id: 'tradicion-navidena', label: 'Tradición Navideña' },
  { id: 'dulce-navidad', label: 'Dulce Navidad' },
  { id: 'sabor-colombiano', label: 'Sabor Colombiano' },
  { id: 'tradicion-tolimense', label: 'Tradición Tolimense' },
  { id: 'fin-de-ano', label: 'Especial Fin de Año' },
  { id: 'chocobomba', label: 'Chocobomba' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'natilla-bunuelos',
    categoryId: 'tradicion-navidena',
    categoryLabel: 'Tradición Navideña',
    name: 'Natilla Artesanal con Buñuelos',
    subtitle: 'Porción tradicional navideña',
    description:
      'Deliciosa porción de natilla artesanal recién preparada acompañada de buñuelos dorados y crujientes.',
    basePrice: 14000,
    image: '/images/menu/natilla_bunuelos.jpg',
    imageAlt:
      'Porción de natilla artesanal con salsa de mora y buñuelos dorados sobre plato artesanal',
    highlightNote: 'Sabores: Tradicional, Arequipe o Coco',
    optionGroups: [
      {
        id: 'sabor-natilla',
        title: 'Sabor de Natilla',
        required: true,
        type: 'single',
        choices: [
          { id: 'tradicional', label: 'Tradicional' },
          { id: 'arequipe', label: 'Arequipe' },
          { id: 'coco', label: 'Coco' },
        ],
      },
      {
        id: 'adicion-natilla',
        title: 'Adición Opcional',
        required: false,
        type: 'multiple',
        choices: [
          {
            id: 'dulce-mora',
            label: 'Adicionar Dulce de Mora artesanal',
            priceDelta: 2500,
          },
        ],
      },
    ],
  },
  {
    id: 'cheesecake-navideno',
    categoryId: 'dulce-navidad',
    categoryLabel: 'Dulce Navidad',
    name: 'Cheesecake Artesanal',
    subtitle: 'Cinco sabores de temporada',
    description:
      'Postre cremoso sobre base crocante de galleta, preparado en porción individual para celebrar la Navidad.',
    basePrice: 15000,
    image: '/images/menu/dulce_navidad.jpg',
    imageAlt:
      'Selección de postres navideños con cheesecake de Oreo, maracuyá, arroz con leche y quesillo',
    highlightNote: 'Limón, Maracuyá, Oreo, Frutos Rojos o Milo',
    optionGroups: [
      {
        id: 'sabor-cheesecake',
        title: 'Elige tu Sabor',
        required: true,
        type: 'single',
        choices: [
          { id: 'limon', label: 'Limón' },
          { id: 'maracuya', label: 'Maracuyá' },
          { id: 'oreo', label: 'Oreo' },
          { id: 'frutos-rojos', label: 'Frutos Rojos' },
          { id: 'milo', label: 'Milo' },
        ],
      },
    ],
  },
  {
    id: 'arroz-con-leche',
    categoryId: 'dulce-navidad',
    categoryLabel: 'Dulce Navidad',
    name: 'Arroz con Leche Especial',
    subtitle: 'Con dulce de mora, arequipe y queso',
    description:
      'Cremoso arroz con leche con toque de canela, servido con dulce de mora, arequipe y queso rallado.',
    basePrice: 13000,
    image: '/images/menu/dulce_navidad.jpg',
    imageAlt:
      'Vaso de arroz con leche artesanal con canela acompañado de postres navideños',
    highlightNote: 'Incluye los tres acompañamientos clásicos',
    optionGroups: [
      {
        id: 'toppings-arroz',
        title: 'Acompañamientos incluidos',
        required: false,
        type: 'multiple',
        choices: [
          { id: 'con-mora', label: 'Con Dulce de Mora' },
          { id: 'con-arequipe', label: 'Con Arequipe' },
          { id: 'con-queso', label: 'Con Queso' },
        ],
      },
    ],
  },
  {
    id: 'quesillo-venezolano',
    categoryId: 'dulce-navidad',
    categoryLabel: 'Dulce Navidad',
    name: 'Quesillo Venezolano',
    subtitle: 'Receta tradicional caramelizada',
    description:
      'Suave y sedoso quesillo artesanal bañado en caramelo dorado, ideal para disfrutar en casa o regalar.',
    basePrice: 13500,
    image: '/images/menu/dulce_navidad.jpg',
    imageAlt: 'Porción de quesillo venezolano bañado en caramelo artesanal',
    highlightNote: 'Preparación artesanal diaria',
    optionGroups: [
      {
        id: 'presentacion-quesillo',
        title: 'Presentación',
        required: true,
        type: 'single',
        choices: [
          { id: 'individual', label: 'Empaque individual sellado' },
          { id: 'regalo', label: 'Presentación festiva para regalo' },
        ],
      },
    ],
  },
  {
    id: 'empanada-combo',
    categoryId: 'sabor-colombiano',
    categoryLabel: 'Sabor Colombiano',
    name: 'Empanada Tradicional + Bebida',
    subtitle: 'Clásico colombiano para compartir',
    description:
      'Empanada dorada y crujiente acompañada de ají casero, limón fresco y un vaso frío de gaseosa o jugo de naranja.',
    basePrice: 11000,
    image: '/images/menu/empanada_combo.jpg',
    imageAlt: 'Empanada colombiana dorada con ají, limón y vaso frío de gaseosa',
    highlightNote: 'Carne, Pollo o Mixta + Bebida fría',
    optionGroups: [
      {
        id: 'relleno-empanada',
        title: 'Relleno de la Empanada',
        required: true,
        type: 'single',
        choices: [
          { id: 'carne', label: 'Carne' },
          { id: 'pollo', label: 'Pollo' },
          { id: 'mixta', label: 'Mixta' },
        ],
      },
      {
        id: 'bebida-empanada',
        title: 'Bebida Incluida',
        required: true,
        type: 'single',
        choices: [
          { id: 'gaseosa', label: 'Vaso de Gaseosa' },
          { id: 'jugo-naranja', label: 'Vaso de Jugo de Naranja' },
        ],
      },
    ],
  },
  {
    id: 'tamal-tolimense',
    categoryId: 'tradicion-tolimense',
    categoryLabel: 'Tradición Tolimense',
    name: 'Tamal Tolimense Completo',
    subtitle: 'El sabor de nuestras tradiciones',
    description:
      'Auténtico tamal tolimense envuelto en hoja de plátano, acompañado a tu elección con arepa o pan hojaldrado y bebida.',
    basePrice: 24000,
    image: '/images/menu/tamal_tolimense.jpg',
    imageAlt:
      'Tamal tolimense en hoja de plátano servido con pan hojaldrado y taza de chocolate caliente',
    highlightNote: 'Incluye acompañante y bebida caliente o fría',
    optionGroups: [
      {
        id: 'acompanante-tamal',
        title: 'Acompañamiento',
        required: true,
        type: 'single',
        choices: [
          { id: 'arepa', label: 'Arepa' },
          { id: 'pan-hojaldrado', label: 'Pan Hojaldrado' },
        ],
      },
      {
        id: 'bebida-tamal',
        title: 'Bebida Incluida',
        required: true,
        type: 'single',
        choices: [
          { id: 'chocolate-caliente', label: 'Chocolate Caliente' },
          { id: 'jugo-naranja', label: 'Jugo de Naranja' },
          { id: 'gaseosa', label: 'Gaseosa' },
        ],
      },
    ],
  },
  {
    id: 'lechona-tolimense',
    categoryId: 'fin-de-ano',
    categoryLabel: 'Especial Fin de Año',
    name: 'Lechona Tolimense (250 gr)',
    subtitle: 'Ideal para cerrar el año',
    description:
      'Generosa porción de 250 gr de lechona tolimense tradicional con cuero crocante, acompañada de arepa y vaso de bebida.',
    basePrice: 26000,
    image: '/images/menu/lechona_tolimense.jpg',
    imageAlt:
      'Porción de 250 gr de lechona tolimense con arepas y vaso de bebida fría',
    highlightNote: 'Porción de 250 gr con arepa incluida',
    optionGroups: [
      {
        id: 'bebida-lechona',
        title: 'Bebida Incluida (con Arepa)',
        required: true,
        type: 'single',
        choices: [
          { id: 'gaseosa', label: 'Arepa + Vaso de Gaseosa' },
          { id: 'jugo-naranja', label: 'Arepa + Vaso de Jugo de Naranja' },
        ],
      },
    ],
  },
  {
    id: 'chocobomba-navidena',
    categoryId: 'chocobomba',
    categoryLabel: 'Chocobomba Navideña',
    name: 'Chocobomba Navideña',
    subtitle: 'Recordatorio original de temporada',
    description:
      'Esfera de chocolate de alta calidad rellena de masmelos y cocoa que se derrite al contacto con una taza de leche caliente.',
    basePrice: 12000,
    image: '/images/menu/chocobomba.jpg',
    imageAlt:
      'Chocobomba navideña artesanal decorada con chispas festivas sobre base de madera',
    highlightNote: 'Lista para preparar en casa o regalar',
    optionGroups: [
      {
        id: 'modo-chocobomba',
        title: 'Presentación para Domicilio',
        required: true,
        type: 'single',
        choices: [
          {
            id: 'caja-individual',
            label: 'Caja individual protectora',
            priceDelta: 0,
          },
          {
            id: 'recordatorio',
            label: 'Empaque festivo de recordatorio con tarjeta',
            priceDelta: 1500,
          },
        ],
      },
    ],
  },
];

export function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function getCartItemUnitTotal(item: CartItem): number {
  const optionsDelta = item.selectedOptions.reduce((sum, opt) => sum + opt.priceDelta, 0);
  return item.unitBasePrice + optionsDelta;
}

export function getPaymentPreferenceLabel(method: PaymentPreference): string {
  switch (method) {
    case 'nequi':
      return 'Nequi';
    case 'daviplata':
      return 'Daviplata';
    case 'cash':
      return 'Efectivo contra entrega';
  }
}

export function buildCartWhatsAppUrl(
  deliveryInfo: Partial<DeliveryInfo>,
  items: CartItem[]
): string {
  const subtotal = items.reduce(
    (sum, item) => sum + getCartItemUnitTotal(item) * item.quantity,
    0
  );

  const timingLabel =
    deliveryInfo.deliveryTiming === 'scheduled' && deliveryInfo.scheduledDateTime
      ? `Programado: ${deliveryInfo.scheduledDateTime}`
      : 'Lo antes posible';

  const lines: string[] = [
    '*MENÚ NAVIDEÑO 2026 — PEDIDO A DOMICILIO*',
    deliveryInfo.customerName?.trim()
      ? `Cliente: *${deliveryInfo.customerName.trim()}*`
      : '',
    deliveryInfo.phone?.trim() ? `Celular: ${deliveryInfo.phone.trim()}` : '',
    deliveryInfo.address?.trim()
      ? `Dirección: *${deliveryInfo.address.trim()}*${
          deliveryInfo.neighborhood?.trim()
            ? ` (${deliveryInfo.neighborhood.trim()})`
            : ''
        }`
      : '',
    `Entrega: ${timingLabel}`,
    deliveryInfo.paymentPreference
      ? `Forma de pago: ${getPaymentPreferenceLabel(deliveryInfo.paymentPreference)}`
      : '',
    '',
    '*Productos elegidos:*',
    ...items.map((item) => {
      const unitTotal = getCartItemUnitTotal(item);
      const optsText =
        item.selectedOptions.length > 0
          ? `\n   Opciones: ${item.selectedOptions
              .map((o) => o.choiceLabel)
              .join(', ')}`
          : '';
      const notesText = item.notes.trim()
        ? `\n   Nota: _${item.notes.trim()}_`
        : '';
      return `• *${item.quantity}x ${item.name}* — ${formatCOP(
        unitTotal * item.quantity
      )}${optsText}${notesText}`;
    }),
    '',
    `*Subtotal productos: ${formatCOP(subtotal)}*`,
    'Domicilio: Por confirmar según zona',
  ].filter(Boolean);

  return `${WHATSAPP_CONFIG.baseUrl}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function buildSingleDishWhatsAppUrl(item: CartItem): string {
  return buildCartWhatsAppUrl({}, [item]);
}

export function buildEventQuoteWhatsAppUrl(params: {
  eventType: string;
  guestCount: string;
  eventDate: string;
  companyOrFamily: string;
  selectedDishes: string[];
  deliveryService: boolean;
  notes: string;
}): string {
  const lines = [
    '*COTIZACIÓN MENÚ NAVIDEÑO 2026 — DOMICILIO Y EVENTOS*',
    `Tipo de evento: ${params.eventType}`,
    params.companyOrFamily.trim()
      ? `Empresa / Familia: ${params.companyOrFamily.trim()}`
      : '',
    `Cantidad estimada de personas: ${params.guestCount}`,
    params.eventDate ? `Fecha deseada: ${params.eventDate}` : '',
    params.selectedDishes.length > 0
      ? `Opciones de interés: ${params.selectedDishes.join(', ')}`
      : '',
    `Servicio de entrega y distribución organizada: ${
      params.deliveryService ? 'Sí, requerido' : 'Solo entrega en punto'
    }`,
    params.notes.trim() ? `Comentarios: ${params.notes.trim()}` : '',
  ].filter(Boolean);

  return `${WHATSAPP_CONFIG.baseUrl}?text=${encodeURIComponent(lines.join('\n'))}`;
}
