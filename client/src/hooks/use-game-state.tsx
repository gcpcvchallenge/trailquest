import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GameState } from '@/lib/types';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';

interface GameStateContextType {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
  saveProgress: () => Promise<void>;
  loadProgress: () => Promise<void>;
  resetGame: () => void;
}

const initialGameState: GameState = {
  sessionId: '',
  currentChapter: 1,
  currentPuzzle: 1,
  completedPuzzles: [],
  hintsUsed: 0,
  startTime: null,
  puzzleStartTime: null,
  score: 0,
  unlockedMissions: [],
};

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(() => {
    const sessionId = sessionStorage.getItem('sessionId') || 
                     `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('sessionId', sessionId);
    
    const saved = localStorage.getItem('gameState');
    if (saved) {
      try {
        return { ...JSON.parse(saved), sessionId };
      } catch {
        return { ...initialGameState, sessionId };
      }
    }
    return { ...initialGameState, sessionId };
  });

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const saveProgress = async () => {
    try {
      await apiRequest('POST', '/api/game-progress', {
        sessionId: gameState.sessionId,
        currentChapter: gameState.currentChapter,
        currentPuzzle: gameState.currentPuzzle,
        completedPuzzles: gameState.completedPuzzles,
        hintsUsed: gameState.hintsUsed,
        startTime: gameState.startTime ? new Date(gameState.startTime) : null,
        score: gameState.score,
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const loadProgress = async () => {
    try {
      const response = await fetch(`/api/game-progress/${gameState.sessionId}`);
      if (response.ok) {
        const progress = await response.json();
        updateGameState({
          currentChapter: progress.currentChapter,
          currentPuzzle: progress.currentPuzzle,
          completedPuzzles: progress.completedPuzzles || [],
          hintsUsed: progress.hintsUsed,
          startTime: progress.startTime ? new Date(progress.startTime).getTime() : null,
          score: progress.score,
        });
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  };

  const resetGame = () => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('sessionId', sessionId);
    setGameState({ ...initialGameState, sessionId });
    localStorage.removeItem('gameState');
  };

  return (
    <GameStateContext.Provider value={{
      gameState,
      updateGameState,
      saveProgress,
      loadProgress,
      resetGame,
    }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
}
