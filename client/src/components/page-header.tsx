import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

interface PageHeaderProps {
  title: { fr: string; en: string };
  onBack: () => void;
  rightContent?: React.ReactNode;
}

export function PageHeader({ title, onBack, rightContent }: PageHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-between mb-8 pt-8">
      <button
        onClick={onBack}
        className="text-white hover:text-beige transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <h2 className="text-2xl font-bold text-white text-center flex-1 mx-4">
        {t('title', title)}
      </h2>
      <div className="w-6">
        {rightContent}
      </div>
    </div>
  );
}
