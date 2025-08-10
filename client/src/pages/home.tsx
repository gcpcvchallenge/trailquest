import { useLocation } from 'wouter';
import { Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/hooks/use-language';

export default function Home() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative">
      {/* Mountain landscape background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4">
        {/* Logo */}
        <div className="mb-12 text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Mountain className="text-forest text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {t('appName', { fr: 'Môle Adventures', en: 'Môle Adventures' })}
          </h1>
          <p className="text-beige text-lg">
            {t('tagline', { 
              fr: 'Découvrez les mystères de la montagne',
              en: 'Discover the mysteries of the mountain'
            })}
          </p>
        </div>

        {/* Main Navigation */}
        <div className="w-full max-w-sm space-y-4">
          <Button
            onClick={() => setLocation('/missions')}
            className="w-full bg-forest hover:bg-forest/90 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-3"
          >
            <i className="fas fa-map-marked-alt"></i>
            <span>{t('missions', { fr: 'Missions', en: 'Missions' })}</span>
          </Button>
          
          <Button
            onClick={() => setLocation('/contact')}
            className="w-full bg-steel hover:bg-steel/90 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-3"
          >
            <i className="fas fa-envelope"></i>
            <span>{t('contact', { fr: 'Contact', en: 'Contact' })}</span>
          </Button>
        </div>

        {/* Language Toggle */}
        <div className="mt-8">
          <LanguageToggle />
        </div>
      </div>
    </div>
  );
}
