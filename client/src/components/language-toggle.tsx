import { useLanguage } from '@/hooks/use-language';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-1 flex">
      <button
        onClick={() => setLanguage('fr')}
        className={`px-4 py-2 rounded-full text-white font-medium transition-all duration-200 ${
          language === 'fr' ? 'bg-white bg-opacity-30' : 'hover:bg-white hover:bg-opacity-10'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded-full text-white font-medium transition-all duration-200 ${
          language === 'en' ? 'bg-white bg-opacity-30' : 'hover:bg-white hover:bg-opacity-10'
        }`}
      >
        EN
      </button>
    </div>
  );
}
