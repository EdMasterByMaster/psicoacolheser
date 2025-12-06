// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';

// // 1. Importação dos estilos das bibliotecas
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'aos/dist/aos.css';

// // 2. Importação do seu CSS global (por último)
// import './globals.css';

// // 3. Importação do componente de inicialização do AOS
// import { AOSInit } from './components/AOSInit';

// // Configuração da fonte (pode ser qualquer uma do Google Fonts)
// const inter = Inter({ subsets: ['latin'] });

// // Metadados para SEO
// export const metadata: Metadata = {
//   title: 'Psico Acolhe Ser',
//   description: 'Acolhimento e cuidado com a saúde mental.',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="pt-BR">
//       <body className={inter.className}>
//         <AOSInit />
//         {children}
//       </body>
//     </html>
//   );
// }

// apps/frontend/src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";

// 1. Importação dos estilos das bibliotecas
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";

// 2. Importação do seu CSS global (por último)
import "./globals.css";

// 3. Importação do componente de inicialização do AOS
import { AOSInit } from "./components/AOSInit";

// --- NOVO: Importação do Provedor de Autenticação ---
import { AuthProvider } from "./components/AuthProvider";
// --------------------------------------------------

// Configuração da fonte (pode ser qualquer uma do Google Fonts)
const inter = Inter({ subsets: ["latin"] });

// Metadados para SEO
export const metadata: Metadata = {
  title: "Psico Acolhe Ser",
  description: "Acolhimento e cuidado com a saúde mental.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/*
          O AuthProvider deve envolver todos os componentes filhos
          para que o estado de login fique disponível globalmente.
        */}
        <AuthProvider>
          <AOSInit />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
