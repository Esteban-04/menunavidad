import { useEffect, useState } from 'react';
import { Check, MessageCircle, Minus, Plus, X } from 'lucide-react';
import { buildSingleDishWhatsAppUrl, formatCOP } from '../data/menuData';
import { CartItem, MenuItem, SelectedOption } from '../types/menu';

interface DishModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export function DishModal({
  dish,
  onClose,
  onAddToCart,
}: DishModalProps) {
  const [singleSelections, setSingleSelections] = useState<Record<string, string>>({});
  const [multiSelections, setMultiSelections] = useState<Record<string, string[]>>({});
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!dish) return;
    const initialSingles: Record<string, string> = {};
    const initialMultis: Record<string, string[]> = {};
    dish.optionGroups.forEach((group) => {
      if (group.type === 'single' && group.choices.length > 0) {
        initialSingles[group.id] = group.choices[0].id;
      } else if (group.type === 'multiple') {
        if (dish.id === 'arroz-con-leche') {
          initialMultis[group.id] = group.choices.map((c) => c.id);
        } else {
          initialMultis[group.id] = [];
        }
      }
    });
    setSingleSelections(initialSingles);
    setMultiSelections(initialMultis);
    setQuantity(1);
    setNotes('');
  }, [dish]);

  useEffect(() => {
    if (!dish) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dish, onClose]);

  if (!dish) return null;

  const selectedOptions: SelectedOption[] = [];
  dish.optionGroups.forEach((group) => {
    if (group.type === 'single') {
      const chosenId = singleSelections[group.id];
      const choice = group.choices.find((c) => c.id === chosenId);
      if (choice) {
        selectedOptions.push({
          groupId: group.id,
          groupTitle: group.title,
          choiceId: choice.id,
          choiceLabel: choice.label,
          priceDelta: choice.priceDelta ?? 0,
        });
      }
    } else {
      const chosenIds = multiSelections[group.id] ?? [];
      group.choices.forEach((choice) => {
        if (chosenIds.includes(choice.id)) {
          selectedOptions.push({
            groupId: group.id,
            groupTitle: group.title,
            choiceId: choice.id,
            choiceLabel: choice.label,
            priceDelta: choice.priceDelta ?? 0,
          });
        }
      });
    }
  });

  const unitPrice =
    dish.basePrice + selectedOptions.reduce((sum, opt) => sum + opt.priceDelta, 0);
  const totalLinePrice = unitPrice * quantity;

  const toggleMultiChoice = (groupId: string, choiceId: string) => {
    setMultiSelections((prev) => {
      const current = prev[groupId] ?? [];
      const exists = current.includes(choiceId);
      return {
        ...prev,
        [groupId]: exists
          ? current.filter((id) => id !== choiceId)
          : [...current, choiceId],
      };
    });
  };

  const previewCartItem: CartItem = {
    cartItemId: `${dish.id}-preview`,
    menuItemId: dish.id,
    name: dish.name,
    image: dish.image,
    unitBasePrice: dish.basePrice,
    selectedOptions,
    quantity,
    notes: notes.trim(),
  };

  const singleDishWaUrl = buildSingleDishWhatsAppUrl(previewCartItem);

  const handleConfirm = () => {
    const cartItem: CartItem = {
      ...previewCartItem,
      cartItemId: `${dish.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/55 p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl bg-[#FAF8F5] rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52 sm:h-60 bg-[#EFEAE2] shrink-0">
          <img
            src={dish.image}
            alt={dish.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar personalización"
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 text-[#1E1916] flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#8E6A1E]">
              {dish.categoryLabel} · Pedido a domicilio
            </p>
            <h3
              id="dish-modal-title"
              className="mt-1 font-display text-2xl font-semibold text-[#1E1916]"
            >
              {dish.name}
            </h3>
            <p className="mt-2 text-sm text-[#574E49] leading-relaxed">
              {dish.description}
            </p>
          </div>

          {dish.optionGroups.map((group) => (
            <div key={group.id} className="pt-4 border-t border-[#1E1916]/10">
              <div className="flex items-baseline justify-between gap-2 mb-3">
                <h4 className="text-sm font-semibold text-[#1E1916]">
                  {group.title}
                </h4>
                <span className="text-xs text-[#746A63]">
                  {group.required ? 'Selección obligatoria' : 'Opcional'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {group.choices.map((choice) => {
                  const isSelected =
                    group.type === 'single'
                      ? singleSelections[group.id] === choice.id
                      : (multiSelections[group.id] ?? []).includes(choice.id);

                  return (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() =>
                        group.type === 'single'
                          ? setSingleSelections((prev) => ({
                              ...prev,
                              [group.id]: choice.id,
                            }))
                          : toggleMultiChoice(group.id, choice.id)
                      }
                      className={`px-3.5 py-2.5 min-h-[44px] rounded-lg border text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-[#173B2B] bg-[#173B2B]/8 text-[#1E1916]'
                          : 'border-[#1E1916]/15 bg-white text-[#574E49] hover:border-[#1E1916]/30'
                      }`}
                    >
                      <span className="text-sm font-medium">{choice.label}</span>
                      <span className="flex items-center gap-2 shrink-0">
                        {choice.priceDelta ? (
                          <span className="font-mono text-xs tabular-nums text-[#8E6A1E]">
                            +{formatCOP(choice.priceDelta)}
                          </span>
                        ) : null}
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#173B2B] border-[#173B2B] text-white'
                              : 'border-[#1E1916]/25'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" aria-hidden="true" />}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-[#1E1916]/10">
            <label
              htmlFor="dish-notes"
              className="block text-sm font-semibold text-[#1E1916] mb-2"
            >
              Notas para tu pedido (opcional)
            </label>
            <textarea
              id="dish-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej. Empacar por separado, sin ají, incluir cubiertos..."
              className="w-full rounded-lg border border-[#1E1916]/15 bg-white px-3.5 py-2.5 text-sm text-[#1E1916] placeholder:text-[#8B8078] focus:outline-none focus:ring-2 focus:ring-[#A81C24]"
            />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white border-t border-[#1E1916]/10 space-y-2.5 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center border border-[#1E1916]/15 rounded-lg bg-[#FAF8F5]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Disminuir cantidad"
                className="w-10 h-10 flex items-center justify-center text-[#1E1916] hover:bg-[#EFEAE2] rounded-l-lg cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-mono text-sm font-semibold tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar cantidad"
                className="w-10 h-10 flex items-center justify-center text-[#1E1916] hover:bg-[#EFEAE2] rounded-r-lg cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 py-3 px-5 min-h-[44px] rounded-lg bg-[#A81C24] text-white text-sm font-medium hover:bg-[#8E151C] transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Agregar al Pedido</span>
              <span className="font-mono tabular-nums">· {formatCOP(totalLinePrice)}</span>
            </button>
          </div>

          <a
            href={singleDishWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 min-h-[40px] rounded-lg border border-[#173B2B]/30 bg-[#173B2B]/5 text-[#173B2B] text-xs sm:text-sm font-medium hover:bg-[#173B2B]/10 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Enviar esta elección directo por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
