import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmailService, type ContactFormData } from '@/core/api/emailService';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/shared/components/ui/Toast';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const { t } = useTranslation();
  const { toast, showSuccess, showError, hideToast } = useToast();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Nom
    if (!formData.name.trim()) {
      newErrors.name = t('contact.validation.nameRequired');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('contact.validation.nameMinLength');
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t('contact.validation.emailRequired');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('contact.validation.emailInvalid');
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = t('contact.validation.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact.validation.messageMinLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion des changements
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError(t('contact.validation.formErrors'));
      return;
    }

    setIsSubmitting(true);

    try {
      await EmailService.sendContactEmail(formData);
      
      showSuccess(t('contact.success'));
      
      // Réinitialiser le formulaire
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      
    } catch (error) {
      console.error('Contact form error:', error);
      
      // Si EmailJS n'est pas configuré, proposer l'alternative
      if (error instanceof Error && error.message.includes('not configured')) {
        const useEmailClient = window.confirm(
          t('contact.emailjs.notConfigured') + '\n\n' + t('contact.emailjs.useEmailClient')
        );
        
        if (useEmailClient) {
          EmailService.openEmailClient(formData);
          showSuccess(t('contact.emailClient.opened'));
        }
      } else {
        showError(t('contact.error'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            {t('contact.name')} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent`}
            placeholder={t('contact.placeholders.name')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            {t('contact.email')} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent`}
            placeholder={t('contact.placeholders.email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            {t('contact.message')} *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
              errors.message
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent`}
            placeholder={t('contact.placeholders.message')}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
          )}
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-8 py-4 rounded-lg font-semibold transition-all duration-200 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg hover:shadow-xl'
          } text-white`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {t('contact.sending')}
            </span>
          ) : (
            t('contact.send')
          )}
        </button>

        {/* Note de confidentialité */}
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {t('contact.privacy')}
        </p>
      </form>

      {/* Toast notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
}

