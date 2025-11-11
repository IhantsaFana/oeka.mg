import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key',
};

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export class EmailService {
  private static initialized = false;

  static init() {
    if (!this.initialized) {
      emailjs.init(EMAILJS_CONFIG.publicKey);
      this.initialized = true;
    }
  }

  static async sendContactEmail(formData: ContactFormData): Promise<void> {
    this.init();

    // Vérifier que les variables d'environnement sont configurées
    if (
      EMAILJS_CONFIG.serviceId === 'your_service_id' ||
      EMAILJS_CONFIG.templateId === 'your_template_id' ||
      EMAILJS_CONFIG.publicKey === 'your_public_key'
    ) {
      throw new Error('EmailJS not configured. Please set environment variables.');
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Ihantsa RAKOTONDRANAIVO',
      reply_to: formData.email,
    };

    try {
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      if (response.status !== 200) {
        throw new Error(`EmailJS error: ${response.text}`);
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }

  // Fallback: ouvrir le client email par défaut
  static openEmailClient(formData: ContactFormData): void {
    const subject = `Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    
    const mailtoLink = `mailto:ihantsarakotondranaivo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  }
}

