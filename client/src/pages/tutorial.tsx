import { useState } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/page-header';
import { useLanguage } from '@/hooks/use-language';

export default function Tutorial() {
  const [, setLocation] = useLocation();
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const { t } = useLanguage();

  const handleValidate = () => {
    if (parseInt(answer) === 4) {
      setIsCorrect(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest to-steel p-4">
      <div className="max-w-md mx-auto">
        <PageHeader
          title={{ fr: 'Tutoriel Interactif', en: 'Interactive Tutorial' }}
          onBack={() => setLocation('/rules')}
        />

        <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
          <h3 className="text-xl font-bold text-charcoal mb-4">
            {t('samplePuzzle', { fr: 'Énigme d\'exemple', en: 'Sample Puzzle' })}
          </h3>
          <p className="text-gray-700 mb-6">
            {t('sampleQuestion', {
              fr: 'Combien font 2 + 2 ?',
              en: 'What is 2 + 2?'
            })}
          </p>
          
          <div className="space-y-4">
            <Input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest"
              placeholder={t('yourAnswer', {
                fr: 'Votre réponse...',
                en: 'Your answer...'
              })}
            />
            
            {!isCorrect && (
              <Button
                onClick={handleValidate}
                className="w-full bg-forest hover:bg-forest/90 text-white font-semibold py-3 rounded-xl transition-all"
              >
                {t('validate', { fr: 'Valider', en: 'Validate' })}
              </Button>
            )}

            {isCorrect && (
              <div className="text-center">
                <div className="bg-green-100 text-green-800 p-3 rounded-lg">
                  <CheckCircle className="h-5 w-5 inline mr-2" />
                  {t('correctAnswer', {
                    fr: 'Bonne réponse! Vous êtes prêt.',
                    en: 'Correct answer! You\'re ready.'
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {isCorrect && (
          <Button
            onClick={() => setLocation('/mission-intro')}
            className="w-full bg-vermillion hover:bg-vermillion/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-200"
          >
            {t('finishTutorial', {
              fr: 'Finir le tutoriel, passer à la mission',
              en: 'Finish tutorial, start mission'
            })}
          </Button>
        )}
      </div>
    </div>
  );
}
