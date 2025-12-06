"use client";

// Import real (agora ativado)
import { useAuth } from "./AuthProvider";

// Componente exportado com o nome correto para seu projeto
export function DashboardContent() {
  const { logout } = useAuth(); // Usando o hook real

  /* Este é o componente final, sem os wrappers de centralização 
    do preview. Ele está pronto para ser inserido no seu layout
    de dashboard.
  */
  return (
    <div
      className="card shadow-lg border-0"
      // Usa o estilo 'border-radius' do Bootstrap 5, 
      // mas podemos forçar um valor maior se o tema Medilab não o fizer.
      style={{ borderRadius: "1.5rem" }}
    >
      <div className="card-body p-4 p-sm-5 text-center">
        {/* Título (Usa a variável --heading-color do seu globals.css) */}
        <h2
          className="card-title h2 fw-bold mb-4"
          style={{ color: "var(--heading-color)" }}
        >
          Área Protegida (Dashboard)
        </h2>

        {/* Texto (Usa classes de texto do Bootstrap) */}
        <p className="card-text text-muted mb-4 fs-5">
          Seu código está seguro e você está autenticado.
        </p>

        {/* Botão de Logout (Bootstrap)
          Usa 'btn-danger' para vermelho e 'rounded-pill' 
          para combinar com o estilo do seu tema Medilab. 
        */}
        <button
          onClick={logout}
          className="btn btn-danger btn-lg rounded-pill fw-semibold px-4 py-2"
        >
          Sair (Logout)
        </button>
      </div>
    </div>
  );
}