// apps/frontend/src/app/dashboard/page.tsx
import { AuthGuard } from "../components/AuthGuard";

import { DashboardContent } from "../components/DashboardContent";
import  Header  from "../components/Header"; // Supondo que existe
import  Footer  from "../components/Footer"; // Supondo que existe

export default function DashboardPage() {
  return (
    // Usa o AuthGuard para garantir que apenas usuários logados acessem
    <AuthGuard>
      <Header />
      <main className="py-10 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardContent />
        </div>
      </main>
      <Footer />
    </AuthGuard>
  );
}
