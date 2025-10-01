import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 py-10 text-white">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold mb-2">Serviços</h3>
          <span>Conta corrente</span>
          <span>Conta PJ</span>
          <span>Cartão de crédito</span>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold mb-2">Contato</h3>
          <span>0800 004 250 08</span>
          <span>meajuda@bytebank.com.br</span>
          <span>ouvidoria@bytebank.com.br</span>
        </div>

        <div className="flex flex-col items-start sm:items-end justify-between space-y-4">
          <p className="text-sm">
            © 2025 Victor Moraes - Pixel and Art. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaFacebookF size={20} />
            </Link>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
