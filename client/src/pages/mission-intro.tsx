import { useLocation } from 'wouter';
import { Video, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { useLanguage } from '@/hooks/use-language';
import { useGameState } from '@/hooks/use-game-state';

export default function MissionIntro() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const { updateGameState } = useGameState();

  const handleStartChapters = () => {
    // Initialize the game timer
    updateGameState({
      startTime: Date.now(),
    });
    setLocation('/chapters');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saddle to-forest p-4">
      <div className="max-w-md mx-auto">
        <PageHeader
          title={{ fr: 'Introduction Mission', en: 'Mission Introduction' }}
          onBack={() => setLocation('/tutorial')}
        />

        <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
          <h3 className="text-xl font-bold text-charcoal mb-4">🏔️ Panique au Môle</h3>
          
          <div className="prose text-gray-700 text-sm leading-relaxed mb-6 space-y-4">
            <p>
              {t('storyPart1', {
                fr: 'Un mystère entoure la Montagne du Môle depuis des siècles. Les anciens parlent d\'un trésor caché par les bergers d\'autrefois, protégé par des énigmes ancestrales.',
                en: 'A mystery has surrounded Môle Mountain for centuries. The ancients speak of a treasure hidden by shepherds of old, protected by ancestral riddles.'
              })}
            </p>
            
            <p>
              {t('storyPart2', {
                fr: 'Votre mission: suivre les indices disséminés le long du sentier et percer les secrets de cette montagne majestueuse.',
                en: 'Your mission: follow the clues scattered along the trail and uncover the secrets of this majestic mountain.'
              })}
            </p>
          </div>

          {/* Optional multimedia resources */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-charcoal mb-3">
              {t('optionalResources', {
                fr: 'Ressources optionnelles',
                en: 'Optional Resources'
              })}
            </h4>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex-1 bg-steel text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-steel/90"
              >
                <Video className="h-4 w-4 mr-1" />
                {t('video', { fr: 'Vidéo', en: 'Video' })}
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-chocolate text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-chocolate/90"
              >
                <Images className="h-4 w-4 mr-1" />
                {t('images', { fr: 'Images', en: 'Images' })}
              </Button>
            </div>
          </div>
        </div>

        <Button
          onClick={handleStartChapters}
          className="w-full bg-vermillion hover:bg-vermillion/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-200"
        >
          {t('next', { fr: 'Suivant', en: 'Next' })}
        </Button>
      </div>
    </div>
  );
}
