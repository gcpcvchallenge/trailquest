import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  hint: { fr: string; en: string };
}

export function HintModal({ isOpen, onClose, hint }: HintModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto rounded-2xl p-6">
        <div className="text-center">
          <Lightbulb className="w-12 h-12 text-gold mx-auto mb-4" />
          <h3 className="text-xl font-bold text-charcoal mb-4">
            {t('hint', { fr: 'Indice', en: 'Hint' })}
          </h3>
          <p className="text-gray-700 mb-6">
            {t('hintText', hint)}
          </p>
          <Button 
            onClick={onClose}
            className="w-full bg-forest hover:bg-forest/90 text-white font-bold py-3 rounded-xl"
          >
            {t('gotIt', { fr: 'Compris!', en: 'Got it!' })}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
