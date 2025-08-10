import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'wouter';
import { ArrowLeft, Clock, Lightbulb, Flag, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HintModal } from '@/components/hint-modal';
import { AbandonModal } from '@/components/abandon-modal';
import { useLanguage } from '@/hooks/use-language';
import { useGameState } from '@/hooks/use-game-state';
import { getPuzzleById, getChapterByPuzzleId } from '@/lib/puzzles';

export default function Puzzle() {
  const { puzzleId } = useParams();
  const [, setLocation] = useLocation();
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showAbandon, setShowAbandon] = useState(false);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [timer, setTimer] = useState('00:00');
  
  const { t } = useLanguage();
  const { gameState, updateGameState, saveProgress } = useGameState();
  
  const puzzle = getPuzzleById(parseInt(puzzleId || '1'));
  const chapter = getChapterByPuzzleId(parseInt(puzzleId || '1'));

  useEffect(() => {
    if (!puzzle) {
      setLocation('/chapters');
      return;
    }

    // Start puzzle timer
    const startTime = Date.now();
    updateGameState({ puzzleStartTime: startTime });

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const minutes = Math.floor(elapsed / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      setTimer(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [puzzleId, puzzle, updateGameState, setLocation]);

  if (!puzzle || !chapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-chocolate to-steel p-4">
        <div className="max-w-md mx-auto pt-20 text-center">
          <div className="text-white text-lg">
            {t('loading', { fr: 'Chargement...', en: 'Loading...' })}
          </div>
        </div>
      </div>
    );
  }

  const handleValidate = () => {
    const userAnswer = parseInt(answer);
    if (userAnswer === puzzle.answer) {
      setResult('correct');
      const newCompleted = [...gameState.completedPuzzles, puzzle.id];
      updateGameState({ 
        completedPuzzles: newCompleted,
        score: gameState.score + Math.max(100 - gameState.hintsUsed * 10, 50)
      });
      saveProgress();
      
      setTimeout(() => {
        // Check if there's a next puzzle in this chapter
        const nextPuzzleId = puzzle.id + 1;
        const nextPuzzle = getPuzzleById(nextPuzzleId);
        const nextChapter = getChapterByPuzzleId(nextPuzzleId);
        
        if (nextPuzzle && nextChapter?.id === chapter.id) {
          // Next puzzle in same chapter
          updateGameState({ currentPuzzle: nextPuzzleId });
          setLocation(`/puzzle/${nextPuzzleId}`);
        } else if (puzzle.id === 3) {
          // Completed chapter 1, go back to chapters summary
          setLocation('/chapters');
        } else if (puzzle.id === 5) {
          // Completed all puzzles, go to completion
          setLocation('/completion');
        } else {
          // Go back to chapters summary
          setLocation('/chapters');
        }
      }, 2000);
    } else {
      setResult('incorrect');
      setTimeout(() => {
        setResult(null);
      }, 3000);
    }
  };

  const handleHint = () => {
    setShowHint(true);
    updateGameState({ hintsUsed: gameState.hintsUsed + 1 });
  };

  const handleAbandon = () => {
    setAnswer(puzzle.answer.toString());
    setShowAbandon(false);
    updateGameState({ hintsUsed: gameState.hintsUsed + 2 }); // Penalty for abandoning
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-chocolate to-steel p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-8">
          <button
            onClick={() => setLocation('/chapters')}
            className="text-white hover:text-beige transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold text-white text-center">
            {t('chapterTitle', chapter.title)}
          </h2>
          <button
            onClick={() => setLocation('/chapters')}
            className="text-white hover:text-beige transition-colors text-sm"
          >
            {t('summary', { fr: 'Sommaire', en: 'Summary' })}
          </button>
        </div>

        {/* Puzzle Card */}
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-charcoal">{puzzle.title}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{timer}</span>
            </div>
          </div>
          
          <div className="mb-6">
            {puzzle.image && (
              <img 
                src={puzzle.image} 
                alt="Puzzle visual" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            
            <p className="text-gray-700 leading-relaxed">
              {t('puzzleQuestion', puzzle.question)}
            </p>
          </div>
          
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
            
            <div className="flex space-x-3">
              <Button
                onClick={handleHint}
                className="flex-1 bg-steel hover:bg-steel/90 text-white font-semibold py-3 rounded-xl transition-all"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                {t('hint', { fr: 'Indice', en: 'Hint' })}
              </Button>
              <Button
                onClick={() => setShowAbandon(true)}
                className="flex-1 bg-gray-500 hover:bg-gray-500/90 text-white font-semibold py-3 rounded-xl transition-all"
              >
                <Flag className="h-4 w-4 mr-2" />
                {t('giveUp', { fr: 'Abandon', en: 'Give up' })}
              </Button>
            </div>
            
            <Button
              onClick={handleValidate}
              disabled={!answer.trim()}
              className="w-full bg-forest hover:bg-forest/90 text-white font-bold py-3 rounded-xl transition-all"
            >
              {t('validateAnswer', { fr: 'Valider la réponse', en: 'Validate answer' })}
            </Button>

            {/* Result feedback */}
            {result && (
              <div className="text-center">
                {result === 'correct' ? (
                  <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                    <CheckCircle className="h-6 w-6 inline mr-2" />
                    <div className="font-bold">
                      {t('excellentAnswer', { fr: 'Excellente réponse!', en: 'Excellent answer!' })}
                    </div>
                    <div className="text-sm mt-2">
                      {t('nextPuzzle', { 
                        fr: 'Passage à l\'énigme suivante...',
                        en: 'Moving to next puzzle...'
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-100 text-red-800 p-4 rounded-lg">
                    <XCircle className="h-5 w-5 inline mr-2" />
                    {t('incorrectAnswer', { 
                      fr: 'Réponse incorrecte. Réessayez!',
                      en: 'Incorrect answer. Try again!'
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <HintModal
        isOpen={showHint}
        onClose={() => setShowHint(false)}
        hint={puzzle.hint}
      />

      <AbandonModal
        isOpen={showAbandon}
        onClose={() => setShowAbandon(false)}
        onConfirm={handleAbandon}
      />
    </div>
  );
}
