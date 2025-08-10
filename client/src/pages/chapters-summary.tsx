import { useLocation } from 'wouter';
import { UnlockIcon, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { useLanguage } from '@/hooks/use-language';
import { useGameState } from '@/hooks/use-game-state';
import { chapters } from '@/lib/puzzles';

export default function ChaptersSummary() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const { gameState, updateGameState } = useGameState();

  const handleChapterClick = (chapterId: number) => {
    if (chapterId === 1 || gameState.completedPuzzles.includes(3)) { // Chapter 2 unlocks after completing chapter 1
      updateGameState({ currentChapter: chapterId, currentPuzzle: chapterId === 1 ? 1 : 4 });
      const firstPuzzleId = chapterId === 1 ? 1 : 4;
      setLocation(`/puzzle/${firstPuzzleId}`);
    }
  };

  const handleStartNext = () => {
    // Start with chapter 1, puzzle 1
    updateGameState({ 
      currentChapter: 1, 
      currentPuzzle: 1,
      puzzleStartTime: Date.now()
    });
    setLocation('/puzzle/1');
  };

  const isChapter2Unlocked = gameState.completedPuzzles.includes(3); // Chapter 1 complete

  return (
    <div className="min-h-screen mountain-gradient p-4">
      <div className="max-w-md mx-auto">
        <PageHeader
          title={{ fr: 'Sommaire des Chapitres', en: 'Chapters Summary' }}
          onBack={() => setLocation('/mission-intro')}
        />

        <div className="space-y-4 mb-6">
          {/* Chapter 1 - Always Available */}
          <div
            onClick={() => handleChapterClick(1)}
            className="bg-white rounded-xl p-4 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-charcoal">
                  {t('chapter1Title', chapters[0].title)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('chapter1Info', {
                    fr: '3 énigmes • Disponible',
                    en: '3 puzzles • Available'
                  })}
                </p>
              </div>
              <div className="text-forest">
                <UnlockIcon className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Chapter 2 - Locked until Chapter 1 complete */}
          <div
            onClick={() => handleChapterClick(2)}
            className={`bg-white rounded-xl p-4 shadow-lg transition-all duration-200 ${
              isChapter2Unlocked 
                ? 'cursor-pointer hover:shadow-xl' 
                : 'opacity-50 blur-sm cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-charcoal">
                  {t('chapter2Title', chapters[1].title)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isChapter2Unlocked 
                    ? t('chapter2Available', {
                        fr: '2 énigmes • Disponible',
                        en: '2 puzzles • Available'
                      })
                    : t('chapter2Locked', {
                        fr: '2 énigmes • Verrouillé',
                        en: '2 puzzles • Locked'
                      })
                  }
                </p>
              </div>
              <div className={isChapter2Unlocked ? 'text-forest' : 'text-gray-400'}>
                {isChapter2Unlocked ? (
                  <UnlockIcon className="h-6 w-6" />
                ) : (
                  <Lock className="h-6 w-6" />
                )}
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleStartNext}
          className="w-full bg-forest hover:bg-forest/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-200"
        >
          {t('startNext', {
            fr: 'Commencer la prochaine étape',
            en: 'Start next chapter'
          })}
        </Button>
      </div>
    </div>
  );
}
