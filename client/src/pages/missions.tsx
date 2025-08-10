import { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/page-header';
import { useLanguage } from '@/hooks/use-language';
import { useGameState } from '@/hooks/use-game-state';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { Mission } from '@shared/schema';

export default function Missions() {
  const [, setLocation] = useLocation();
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const { t } = useLanguage();
  const { gameState, updateGameState } = useGameState();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: missions = [], isLoading } = useQuery<Mission[]>({
    queryKey: ['/api/missions'],
  });

  const validateCodeMutation = useMutation({
    mutationFn: async (code: string) => {
      const response = await apiRequest('POST', '/api/missions/validate-code', { accessCode: code });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.valid) {
        updateGameState({
          unlockedMissions: [...gameState.unlockedMissions, data.mission.id]
        });
        queryClient.invalidateQueries({ queryKey: ['/api/missions'] });
        setShowAccessCode(false);
        setAccessCode('');
        toast({
          title: t('success', { fr: 'Succès', en: 'Success' }),
          description: t('missionUnlocked', { 
            fr: 'Mission débloquée!',
            en: 'Mission unlocked!'
          }),
        });
      } else {
        toast({
          title: t('error', { fr: 'Erreur', en: 'Error' }),
          description: t('invalidCode', {
            fr: 'Code d\'accès invalide',
            en: 'Invalid access code'
          }),
          variant: 'destructive',
        });
      }
    },
  });

  const handleValidateCode = () => {
    if (accessCode.trim()) {
      validateCodeMutation.mutate(accessCode);
    }
  };

  const handleMissionSelect = (mission: Mission) => {
    // Store selected mission in game state or session storage
    sessionStorage.setItem('selectedMission', JSON.stringify(mission));
    setLocation('/mission-details');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen mountain-gradient p-4">
        <div className="max-w-md mx-auto pt-20 text-center">
          <div className="text-white text-lg">
            {t('loading', { fr: 'Chargement...', en: 'Loading...' })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mountain-gradient p-4">
      <div className="max-w-md mx-auto">
        <PageHeader
          title={{ fr: 'Missions', en: 'Missions' }}
          onBack={() => setLocation('/')}
          rightContent={
            <button
              onClick={() => setShowAccessCode(true)}
              className="text-white hover:text-beige transition-colors"
            >
              <Plus className="h-6 w-6" />
            </button>
          }
        />

        {/* Missions List */}
        <div className="space-y-4 mb-6">
          {missions.map((mission) => (
            <div
              key={mission.id}
              onClick={() => handleMissionSelect(mission)}
              className="bg-white rounded-xl p-4 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-charcoal">{mission.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {mission.duration} • {mission.difficulty}
                  </p>
                </div>
                <div className="text-forest">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Access Code Section */}
        {showAccessCode && (
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">
              {t('accessCode', { fr: 'Code d\'accès', en: 'Access Code' })}
            </h3>
            <div className="space-y-4">
              <Input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest"
                placeholder={t('enterCode', {
                  fr: 'Entrez le code...',
                  en: 'Enter the code...'
                })}
              />
              <div className="flex space-x-3">
                <Button
                  onClick={handleValidateCode}
                  disabled={!accessCode.trim() || validateCodeMutation.isPending}
                  className="flex-1 bg-forest hover:bg-forest/90 text-white font-semibold py-3 rounded-xl transition-all"
                >
                  {validateCodeMutation.isPending
                    ? t('validating', { fr: 'Validation...', en: 'Validating...' })
                    : t('validate', { fr: 'Valider', en: 'Validate' })
                  }
                </Button>
                <Button
                  onClick={() => {
                    setShowAccessCode(false);
                    setAccessCode('');
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-500/90 text-white font-semibold py-3 rounded-xl transition-all"
                >
                  {t('cancel', { fr: 'Annuler', en: 'Cancel' })}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
