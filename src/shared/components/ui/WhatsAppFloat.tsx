import { FaWhatsapp } from 'react-icons/fa';

export function WhatsAppFloat() {
  const phoneNumber = '261384702532'; // Sans le signe +
  const message = encodeURIComponent("Bonjour, je souhaite vous contacter à propos de...");

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 rounded-full p-4 h-14 w-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Contacter sur WhatsApp"
      >
        <FaWhatsapp className="h-7 w-7 text-white" />
      </a>
    </div>
  );
}
