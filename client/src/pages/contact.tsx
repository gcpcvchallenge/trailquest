import { useState } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/page-header';
import { useLanguage } from '@/hooks/use-language';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function Contact() {
  const [, setLocation] = useLocation();
  const [message, setMessage] = useState('');
  const { t } = useLanguage();
  const { toast } = useToast();

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      return apiRequest('POST', '/api/contact', { message });
    },
    onSuccess: () => {
      toast({
        title: t('success', { fr: 'Succès', en: 'Success' }),
        description: t('messageSent', { fr: 'Message envoyé!', en: 'Message sent!' }),
      });
      setMessage('');
    },
    onError: () => {
      toast({
        title: t('error', { fr: 'Erreur', en: 'Error' }),
        description: t('messageError', { 
          fr: 'Erreur lors de l\'envoi du message',
          en: 'Error sending message'
        }),
        variant: 'destructive',
      });
    },
  });

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessageMutation.mutate(message);
    }
  };

  return (
    <div className="min-h-screen steel-gradient p-4">
      <div className="max-w-md mx-auto">
        <PageHeader
          title={{ fr: 'Contact', en: 'Contact' }}
          onBack={() => setLocation('/')}
        />

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="mb-6">
            <label className="block text-charcoal font-medium mb-2">
              {t('messageLabel', {
                fr: 'Votre message à l\'équipe',
                en: 'Your message to the team'
              })}
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest resize-none"
              placeholder={t('messagePlaceholder', {
                fr: 'Écrivez votre message ici...',
                en: 'Write your message here...'
              })}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || sendMessageMutation.isPending}
            className="w-full bg-forest hover:bg-forest/90 text-white font-semibold py-3 rounded-xl transition-all duration-200"
          >
            {sendMessageMutation.isPending 
              ? t('sending', { fr: 'Envoi...', en: 'Sending...' })
              : t('send', { fr: 'Envoyer', en: 'Send' })
            }
          </Button>
        </div>
      </div>
    </div>
  );
}
