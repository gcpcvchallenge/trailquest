import { useLocation } from 'wouter';
import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { useGameState } from '@/hooks/use-game-state';

export default function Completion() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const { gameState, resetGame } = useGameState();

  const calculateTotalTime = () => {
    if (!gameState.startTime) return '00:00';
    const elapsed = Date.now() - gameState.startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateAverageTime = () => {
    if (!gameState.startTime || gameState.completedPuzzles.length === 0) return '00:00';
    const elapsed = Date.now() - gameState.startTime;
    const average = elapsed / gameState.completedPuzzles.length;
    const minutes = Math.floor(average / 60000);
    const seconds = Math.floor((average % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleRestart = () => {
    resetGame();
    setLocation('/chapters');
  };

  const handleBackHome = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen sunset-gradient p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h2 className="text-3xl font-bold text-white">
            🎉 {t('congratulations', { fr: 'Félicitations!', en: 'Congratulations!' })}
          </h2>
          <p className="text-white text-lg mt-2">
            {t('missionAccomplished', { fr: 'Mission accomplie!', en: 'Mission accomplished!' })}
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
          <h3 className="text-xl font-bold text-charcoal mb-6 text-center">
            {t('yourPerformance', { fr: 'Votre Performance', en: 'Your Performance' })}
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">
                {t('totalTime', { fr: 'Temps total:', en: 'Total time:' })}
              </span>
              <span className="font-bold text-forest">{calculateTotalTime()}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">
                {t('averagePerPuzzle', { 
                  fr: 'Moyenne par énigme:',
                  en: 'Average per puzzle:'
                })}
              </span>
              <span className="font-bold text-steel">{calculateAverageTime()}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">
                {t('hintsUsed', { fr: 'Indices utilisés:', en: 'Hints used:' })}
              </span>
              <span className="font-bold text-chocolate">{gameState.hintsUsed}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gold bg-opacity-20 rounded-lg border-2 border-gold">
              <span className="font-bold">
                {t('finalScore', { fr: 'Score final:', en: 'Final score:' })}
              </span>
              <span className="font-bold text-2xl text-charcoal">
                {gameState.score} pts
              </span>
            </div>
          </div>
        </div>

        {/* Ranking */}
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
          <h3 className="text-lg font-bold text-charcoal mb-4 text-center">
            <Trophy className="h-5 w-5 inline mr-2" />
            {t('ranking', { fr: 'Classement', en: 'Ranking' })}
          </h3>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-vermillion mb-2">
              #{Math.floor(Math.random() * 20) + 1}
            </div>
            <p className="text-gray-600">
              {t('rankingDesc', {
                fr: 'sur 42 équipes cette semaine',
                en: 'out of 42 teams this week'
              })}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleRestart}
            className="w-full bg-forest hover:bg-forest/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
          >
            {t('restartMission', { 
              fr: 'Recommencer la mission',
              en: 'Restart mission'
            })}
          </Button>
          
          <Button
            onClick={handleBackHome}
            className="w-full bg-steel hover:bg-steel/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
          >
            {t('backToHome', { fr: 'Retour à l\'accueil', en: 'Back to home' })}
          </Button>
        </div>
      </div>
    </div>
  );
}
