<?php
session_start();
include('conexao.php');

// 1. Proteção básica de sessão
if(!isset($_SESSION['id'])) {
    header("Location: index.php");
    exit;
}

// 2. Segurança Reforçada: Checa o tipo no banco em tempo real
$id_usuario = $_SESSION['id'];
$sql_check = "SELECT TIPO, nome FROM users WHERE id = '$id_usuario'";
$result_check = $mysqli->query($sql_check);
$row_check = $result_check->fetch_assoc();

// Atualiza sessão com dados frescos
$tipo_usuario = $row_check['TIPO'];
$_SESSION['tipo'] = $tipo_usuario; 
$_SESSION['nome'] = $row_check['nome'];

// 3. Lógica de Títulos Dinâmicos
$titulo_dash = "Área do Paciente";
$subtitulo_dash = "Bem-vindo ao PsicoAcolheSer! Cuide do seu bem-estar.";

if($tipo_usuario == 'ADMIN') {
    $titulo_dash = "Painel Administrativo";
    $subtitulo_dash = "Gerencie usuários, agendamentos e profissionais.";
} elseif ($tipo_usuario == 'PROFESSOR') { // Mantive PROFESSOR caso use a mesma lógica, ou pode ser PSICOLOGO
    $titulo_dash = "Área do Especialista";
    $subtitulo_dash = "Gerencie sua agenda e pacientes.";
}
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>Dashboard - PsicoAcolheSer</title>
  <meta name="description" content="">
  <meta name="keywords" content="">

  <link href="assets/img/logo_pas.jpeg" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="assets/vendor/fontawesome-free/css/all.min.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

  <link href="assets/css/main.css" rel="stylesheet">
</head>

<body class="starter-page-page">

  <header id="header" class="header sticky-top">

    <div class="topbar d-flex align-items-center">
      <div class="container d-flex justify-content-center justify-content-md-between">
        <div class="contact-info d-flex align-items-center">
          <i class="bi bi-envelope d-flex align-items-center"><a href="mailto:contact@example.com">contact@example.com</a></i>
          <i class="bi bi-phone d-flex align-items-center ms-4"><span>+55 11 95589-55488</span></i>
        </div>
        <div class="social-links d-none d-md-flex align-items-center">
          <a href="#" class="twitter"><i class="bi bi-twitter-x"></i></a>
          <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
          <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>
    </div><div class="branding d-flex align-items-center">

      <div class="container position-relative d-flex align-items-center justify-content-between">
        <a href="index.html" class="logo d-flex align-items-center me-auto">
          <img src="assets/img/logo_pas.jpeg" alt="Logo PsicoAcolheSer">
          <h1 class="sitename">PsicoAcolheSer</h1>
        </a>

        <nav id="navmenu" class="navmenu">
          <ul>
            <li><a href="index.html">Início</a></li>
            
            <?php if($tipo_usuario == 'ADMIN'): ?>
            <li class="dropdown"><a href="#"><span>Administração</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
              <ul>
                <li><a href="admin_usuarios.php">Gerenciar Usuários</a></li>
                <li><a href="admin_agendamentos.php">Ver Agendamentos</a></li>
                <li><a href="admin_relatorios.php">Relatórios</a></li>
              </ul>
            </li>
            <?php endif; ?>

            <?php if($tipo_usuario == 'PROFESSOR'): ?>
            <li class="dropdown"><a href="#"><span>Área do Especialista</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
              <ul>
                <li><a href="minha_agenda.php">Minha Agenda</a></li>
                <li><a href="meus_pacientes.php">Meus Pacientes</a></li>
              </ul>
            </li>
            <?php endif; ?>

            <li class="dropdown"><a href="#" class="active"><span>Olá, <?php echo $_SESSION['nome']; ?></span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul>
                    <li><a href="perfil.php">Meu Perfil</a></li>
                    <li><a href="logout.php">Sair</a></li>
                </ul>
            </li>
          </ul>
          <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <?php if($tipo_usuario != 'ADMIN' && $tipo_usuario != 'PROFESSOR'): ?>
            <a class="cta-btn d-none d-sm-block" href="index.html#appointment">Novo Agendamento</a>
        <?php endif; ?>

      </div>

    </div>

  </header>

  <main class="main">

    <div class="page-title" data-aos="fade">
      <div class="heading">
        <div class="container">
          <div class="row d-flex justify-content-center text-center">
            <div class="col-lg-8">
              <h1><?php echo $titulo_dash; ?></h1>
              <p class="mb-0"><?php echo $subtitulo_dash; ?></p>
            </div>
          </div>
        </div>
      </div>
      <nav class="breadcrumbs">
        <div class="container">
          <ol>
            <li><a href="index.html">Home</a></li>
            <li class="current">Dashboard</li>
          </ol>
        </div>
      </nav>
    </div><section id="dashboard-content" class="services section">

      <div class="container" data-aos="fade-up">
        
        <div class="row gy-4">

        <?php if($tipo_usuario == 'ADMIN'): ?>
          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="fas fa-users-cog"></i>
              </div>
              <a href="admin_usuarios.php" class="stretched-link">
                <h3>Gerenciar Usuários</h3>
              </a>
              <p>Adicione, edite ou remova usuários do sistema.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="fas fa-calendar-check"></i>
              </div>
              <a href="admin_agendamentos.php" class="stretched-link">
                <h3>Agendamentos</h3>
              </a>
              <p>Visualize todos os agendamentos da plataforma.</p>
            </div>
          </div>

        <?php elseif($tipo_usuario == 'PROFESSOR'): ?>
          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="fas fa-calendar-alt"></i>
              </div>
              <a href="minha_agenda.php" class="stretched-link">
                <h3>Minha Agenda</h3>
              </a>
              <p>Confira seus próximos atendimentos.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="fas fa-user-injured"></i>
              </div>
              <a href="meus_pacientes.php" class="stretched-link">
                <h3>Pacientes</h3>
              </a>
              <p>Histórico e acompanhamento.</p>
            </div>
          </div>

        <?php else: ?>
          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="fas fa-calendar-plus"></i>
              </div>
              <a href="index.html#appointment" class="stretched-link">
                <h3>Novo Agendamento</h3>
              </a>
              <p>Marque uma nova consulta com nossos especialistas.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="fas fa-history"></i>
              </div>
              <a href="#" class="stretched-link">
                <h3>Histórico</h3>
              </a>
              <p>Visualize seus atendimentos anteriores.</p>
            </div>
          </div>
        <?php endif; ?>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div class="service-item position-relative">
              <div class="icon">
                <i class="fas fa-user-edit"></i>
              </div>
              <a href="perfil.php" class="stretched-link">
                <h3>Meu Perfil</h3>
              </a>
              <p>Atualize seus dados pessoais e senha.</p>
            </div>
          </div>

        </div>

      </div>

    </section>

  </main>

  <footer id="footer" class="footer light-background">
    <div class="container footer-top">
      <div class="row gy-4">
        <div class="col-lg-4 col-md-6 footer-about">
          <a href="index.html" class="logo d-flex align-items-center">
            <span class="sitename">PsicoAcolheSer</span>
          </a>
          <div class="footer-contact pt-3">
            <p>Avenida Paulista, 1111</p>
            <p>São Paulo - SP</p>
            <p class="mt-3"><strong>Telefone:</strong> <span>+55 95589-55488</span></p>
            <p><strong>Email:</strong> <span>info@example.com</span></p>
          </div>
          <div class="social-links d-flex mt-4">
            <a href=""><i class="bi bi-twitter-x"></i></a>
            <a href=""><i class="bi bi-facebook"></i></a>
            <a href=""><i class="bi bi-instagram"></i></a>
            <a href=""><i class="bi bi-linkedin"></i></a>
          </div>
        </div>

        <div class="col-lg-2 col-md-3 footer-links">
            <h4>Links Úteis</h4>
            <ul>
              <li><a href="index.html">Início</a></li>
              <li><a href="index.html#about">Sobre nós</a></li>
              <li><a href="index.html#services">Serviços</a></li>
              <li><a href="#">Termos de serviço</a></li>
              <li><a href="#">Política de privacidade</a></li>
            </ul>
        </div>
      </div>
    </div>

    <div class="container copyright text-center mt-4">
      <p>© <span>Copyright</span> <strong class="px-1 sitename">PsicoAcolheSer</strong> <span>All Rights Reserved</span></p>
      <div class="credits">
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>
  </footer>

  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <div id="preloader"></div>

  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>

  <script src="assets/js/main.js"></script>

</body>

</html>