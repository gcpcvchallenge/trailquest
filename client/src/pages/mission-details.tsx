import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Clock, Star, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { useLanguage } from '@/hooks/use-language';
import type { Mission } from '@shared/schema';

export default function MissionDetails() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [mission, setMission] = useState<Mission | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('selectedMission');
    if (stored) {
      try {
        setMission(JSON.parse(stored));
      } catch {
        setLocation('/missions');
      }
    } else {
      setLocation('/missions');
    }
  }, [setLocation]);

  if (!mission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-chocolate to-forest p-4">
        <div className="max-w-md mx-auto pt-20 text-center">
          <div className="text-white text-lg">
            {t('loading', { fr: 'Chargement...', en: 'Loading...' })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-chocolate to-forest p-4">
      <div className="max-w-md mx-auto">
        <PageHeader
          title={{ fr: 'Détails Mission', en: 'Mission Details' }}
          onBack={() => setLocation('/missions')}
        />

        <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
          <h3 className="text-2xl font-bold text-charcoal mb-4">{mission.name}</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-steel" />
              <span className="font-medium">
                {t('duration', { fr: 'Durée:', en: 'Duration:' })}
              </span>
              <span className="text-gray-600">{mission.duration}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-vermillion" />
              <span className="font-medium">
                {t('difficulty', { fr: 'Difficulté:', en: 'Difficulty:' })}
              </span>
              <span className="text-gray-600">{mission.difficulty}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-forest" />
              <span className="font-medium">
                {t('recommendedAge', { 
                  fr: 'Âge recommandé:',
                  en: 'Recommended age:'
                })}
              </span>
              <span className="text-gray-600">{mission.recommendedAge}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-saddle" />
              <span className="font-medium">
                {t('location', { fr: 'Lieu:', en: 'Location:' })}
              </span>
              <span className="text-gray-600">{mission.location}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setLocation('/rules')}
          className="w-full bg-vermillion hover:bg-vermillion/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-200"
        >
          {t('next', { fr: 'Suivant', en: 'Next' })}
        </Button>
      </div>
    </div>
  );
}
