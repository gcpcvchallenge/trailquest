import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

interface AbandonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function AbandonModal({ isOpen, onClose, onConfirm }: AbandonModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto rounded-2xl p-6">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-vermillion mx-auto mb-4" />
          <h3 className="text-xl font-bold text-charcoal mb-4">
            {t('abandon', { fr: 'Abandonner?', en: 'Give up?' })}
          </h3>
          <p className="text-gray-700 mb-6">
            {t('abandonConfirm', { 
              fr: 'Êtes-vous sûr de vouloir abandonner? La réponse sera révélée.',
              en: 'Are you sure you want to give up? The answer will be revealed.'
            })}
          </p>
          <div className="flex space-x-3">
            <Button 
              onClick={onConfirm}
              className="flex-1 bg-vermillion hover:bg-vermillion/90 text-white font-bold py-3 rounded-xl"
            >
              {t('yes', { fr: 'Oui', en: 'Yes' })}
            </Button>
            <Button 
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-500/90 text-white font-bold py-3 rounded-xl"
            >
              {t('no', { fr: 'Non', en: 'No' })}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
