export type MenuCategoryId =
  | 'all'
  | 'tradicion-navidena'
  | 'dulce-navidad'
  | 'sabor-colombiano'
  | 'tradicion-tolimense'
  | 'fin-de-ano'
  | 'chocobomba';

export interface OptionChoice {
  id: string;
  label: string;
}

export interface OptionGroup {
  id: string;
  title: string;
  required: boolean;
  type: 'single' | 'multiple';
  choices: OptionChoice[];
}

export interface MenuItem {
  id: string;
  categoryId: Exclude<MenuCategoryId, 'all'>;
  categoryLabel: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  imageFit?: 'cover' | 'contain';
  highlightNote?: string;
  optionGroups: OptionGroup[];
}

export interface SelectedOption {
  groupId: string;
  groupTitle: string;
  choiceId: string;
  choiceLabel: string;
}

export interface CartItem {
  cartItemId: string;
  menuItemId: string;
  name: string;
  image: string;
  selectedOptions: SelectedOption[];
  quantity: number;
  notes: string;
}

export type PaymentPreference = 'nequi' | 'daviplata' | 'cash';

export interface DeliveryInfo {
  customerName: string;
  phone: string;
  address: string;
  neighborhood: string;
  deliveryTiming: 'asap' | 'scheduled';
  scheduledDateTime: string;
  paymentPreference: PaymentPreference;
}
