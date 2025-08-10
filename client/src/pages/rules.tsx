import { useLocation } from 'wouter';
import { Gamepad2, Wrench, Trophy, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { useLanguage } from '@/hooks/use-language';

export default function Rules() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-steel to-chocolate p-4">
      <div className="max-w-md mx-auto">
        <PageHeader
          title={{ fr: 'Règles & Notice', en: 'Rules & Notice' }}
          onBack={() => setLocation('/mission-details')}
        />

        <div className="space-y-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h3 className="font-bold text-charcoal mb-2 flex items-center">
              <Gamepad2 className="h-5 w-5 text-forest mr-2" />
              {t('gameRules', { fr: 'Règles du jeu', en: 'Game Rules' })}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('gameRulesDesc', {
                fr: 'Résolvez les énigmes en équipe pendant votre randonnée. Chaque bonne réponse débloque la suite.',
                en: 'Solve puzzles as a team during your hike. Each correct answer unlocks the next challenge.'
              })}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h3 className="font-bold text-charcoal mb-2 flex items-center">
              <Wrench className="h-5 w-5 text-saddle mr-2" />
              {t('requiredResources', { 
                fr: 'Ressources nécessaires',
                en: 'Required Resources'
              })}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('resourcesDesc', {
                fr: 'Smartphone chargé, chaussures de randonnée, eau, et esprit d\'équipe!',
                en: 'Charged smartphone, hiking shoes, water, and team spirit!'
              })}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h3 className="font-bold text-charcoal mb-2 flex items-center">
              <Trophy className="h-5 w-5 text-gold mr-2" />
              {t('scoringSystem', { fr: 'Système de score', en: 'Scoring System' })}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('scoringDesc', {
                fr: 'Points basés sur la rapidité et le nombre d\'indices utilisés.',
                en: 'Points based on speed and number of hints used.'
              })}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h3 className="font-bold text-charcoal mb-2 flex items-center">
              <Lightbulb className="h-5 w-5 text-vermillion mr-2" />
              {t('tipsHints', { fr: 'Astuces & Indices', en: 'Tips & Hints' })}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('tipsDesc', {
                fr: 'Utilisez les indices avec parcimonie pour un meilleur score. L\'abandon révèle la réponse.',
                en: 'Use hints sparingly for a better score. Giving up reveals the answer.'
              })}
            </p>
          </div>
        </div>

        <Button
          onClick={() => setLocation('/tutorial')}
          className="w-full bg-forest hover:bg-forest/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-200"
        >
          {t('next', { fr: 'Suivant', en: 'Next' })}
        </Button>
      </div>
    </div>
  );
}
