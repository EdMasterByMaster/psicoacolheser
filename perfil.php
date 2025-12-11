<?php
// --- 1. ATIVAÇÃO DE ERROS (Para Debug) ---
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

// Verifica se o arquivo de conexão existe
if (!file_exists('conexao.php')) {
    die("Erro Fatal: O arquivo 'conexao.php' não foi encontrado na mesma pasta.");
}
include('conexao.php');

// Verifica se a conexão foi bem sucedida
if (!isset($mysqli)) {
    die("Erro Fatal: A variável de conexão (\$mysqli) não foi definida em 'conexao.php'.");
}

// --- 2. VERIFICAÇÃO DE SESSÃO ---
if(!isset($_SESSION['id'])) {
    header("Location: index.php");
    exit;
}

$id_usuario = $_SESSION['id'];
$mensagem = "";
$tipo_alerta = ""; 

// --- 3. PROCESSAMENTO DO FORMULÁRIO ---
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Campos principais (obrigatórios)
    $nome = $mysqli->real_escape_string($_POST['nome']);
    $email = $mysqli->real_escape_string($_POST['email']);
    
    // Novos campos a serem atualizados (todos os outros, menos TIPO)
    $idcpf = $mysqli->real_escape_string($_POST['idcpf']);
    $dataNascimento = $mysqli->real_escape_string($_POST['dataNascimento']);
    $telefone = $mysqli->real_escape_string($_POST['telefone']);
    $endereco = $mysqli->real_escape_string($_POST['endereco']);
    $numero = $mysqli->real_escape_string($_POST['numero']);
    $cidade = $mysqli->real_escape_string($_POST['cidade']);
    $uf = $mysqli->real_escape_string($_POST['uf']);
    $cep = $mysqli->real_escape_string($_POST['cep']);
    $sexo = $mysqli->real_escape_string($_POST['sexo']);

    $sql_extra = "";

    // Atualização de Senha
    if(!empty($_POST['senha'])) {
        // ATENÇÃO: É ALTAMENTE RECOMENDADO USAR password_hash() para criptografar a senha!
        // Ex: $nova_senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
        $nova_senha = $_POST['senha']; 
        $sql_extra .= ", senha = '$nova_senha'";
    }

    // Upload de Foto
    if(isset($_FILES['foto']) && $_FILES['foto']['error'] == 0) {
        $arquivo = $_FILES['foto'];
        $extensao = strtolower(pathinfo($arquivo['name'], PATHINFO_EXTENSION));
        $permitidos = ['jpg', 'jpeg', 'png', 'gif'];

        if(in_array($extensao, $permitidos)) {
            $novo_nome = $id_usuario . '_' . time() . '.' . $extensao;
            $diretorio = "uploads/";

            if(!is_dir($diretorio)) {
                mkdir($diretorio, 0755, true);
            }

            if(move_uploaded_file($arquivo['tmp_name'], $diretorio . $novo_nome)) {
                $caminho_foto = $diretorio . $novo_nome;
                $sql_extra .= ", urlfoto = '$caminho_foto'";
            } else {
                $mensagem = "Erro ao mover arquivo para pasta uploads.";
                $tipo_alerta = "danger";
            }
        } else {
            $mensagem = "Formato inválido. Use JPG, PNG ou GIF.";
            $tipo_alerta = "danger";
        }
    }

    if(empty($mensagem)) {
        // Query de UPDATE com todos os campos, exceto TIPO.
        $sql_update = "UPDATE users SET 
            nome = '$nome', 
            email = '$email',
            idcpf = '$idcpf',
            dataNascimento = '$dataNascimento',
            telefone = '$telefone',
            endereco = '$endereco',
            numero = '$numero',
            cidade = '$cidade',
            UF = '$uf', 
            CEP = '$cep',
            SEXO = '$sexo'
            $sql_extra 
        WHERE id = '$id_usuario'";

        if($mysqli->query($sql_update)) {
            $mensagem = "Perfil atualizado com sucesso!";
            $tipo_alerta = "success";
            $_SESSION['nome'] = $nome;
        } else {
            $mensagem = "Erro no Banco: " . $mysqli->error;
            $tipo_alerta = "danger";
        }
    }
}

// --- 4. BUSCA DE DADOS (COM PROTEÇÃO) ---
$sql_user = "SELECT * FROM users WHERE id = '$id_usuario'";
$result = $mysqli->query($sql_user);

if (!$result) {
    die("Erro na consulta SQL: " . $mysqli->error);
}

if ($result->num_rows == 0) {
    // Se o usuário da sessão não existe no banco, desloga
    session_destroy();
    die("Erro: Usuário não encontrado. <a href='index.php'>Voltar ao Login</a>");
}

$dados = $result->fetch_assoc();

// Define foto padrão
$foto_atual = !empty($dados['urlfoto']) ? $dados['urlfoto'] : 'assets/img/doctors/doctors-1.jpg';
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>Meu Perfil - PsicoAcolheSer</title>
  
  <link href="assets/img/logo_pas.jpeg" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/fontawesome-free/css/all.min.css" rel="stylesheet">
  <link href="assets/css/main.css" rel="stylesheet">
</head>

<body class="starter-page-page">

  <header id="header" class="header sticky-top">
    <div class="branding d-flex align-items-center">
      <div class="container position-relative d-flex align-items-center justify-content-between">
        <a href="dashboard.php" class="logo d-flex align-items-center me-auto">
          <img src="assets/img/logo_pas.jpeg" alt="Logo PsicoAcolheSer">
          <h1 class="sitename">PsicoAcolheSer</h1>
        </a>

        <nav id="navmenu" class="navmenu">
          <ul>
            <li><a href="dashboard.php">Voltar ao Dashboard</a></li>
            <li class="dropdown"><a href="#" class="active"><span>Olá, <?php echo isset($_SESSION['nome']) ? $_SESSION['nome'] : 'Usuário'; ?></span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul>
                    <li><a href="logout.php">Sair</a></li>
                </ul>
            </li>
          </ul>
          <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
      </div>
    </div>
  </header>

  <main class="main">

    <div class="page-title" data-aos="fade">
      <div class="heading">
        <div class="container">
          <div class="row d-flex justify-content-center text-center">
            <div class="col-lg-8">
              <h1>Meu Perfil</h1>
              <p class="mb-0">Gerencie suas informações pessoais.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id="profile-section" class="section">
      <div class="container">

        <?php if(!empty($mensagem)): ?>
            <div class="alert alert-<?php echo $tipo_alerta; ?> alert-dismissible fade show" role="alert">
                <?php echo $mensagem; ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        <?php endif; ?>

        <div class="row gy-4">
            
            <div class="col-lg-4">
                <div class="card shadow-sm border-0 text-center p-4">
                    <div class="card-body">
                        <h4 class="card-title mb-4">Foto de Perfil</h4>
                        <div class="mb-3">
                            <img src="<?php echo $foto_atual; ?>" alt="Foto de Perfil" class="rounded-circle img-thumbnail shadow-sm" style="width: 180px; height: 180px; object-fit: cover;">
                        </div>
                        <p class="mt-3 text-muted">Tipo de Usuário: <strong><?php echo htmlspecialchars($dados['TIPO'] ?? 'NORMAL'); ?></strong></p>
                    </div>
                </div>
            </div>

            <div class="col-lg-8">
                <div class="card shadow-sm border-0">
                    <div class="card-header bg-white py-3">
                        <h5 class="mb-0 text-primary fw-bold"><i class="fas fa-user-edit me-2"></i> Editar Dados</h5>
                    </div>
                    <div class="card-body p-4">
                        <form action="perfil.php" method="POST" enctype="multipart/form-data">
                            
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="nome" class="form-label fw-bold">Nome Completo</label>
                                    <input type="text" class="form-control" id="nome" name="nome" value="<?php echo htmlspecialchars($dados['nome'] ?? ''); ?>" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="email" class="form-label fw-bold">E-mail</label>
                                    <input type="email" class="form-control" id="email" name="email" value="<?php echo htmlspecialchars($dados['EMAIL'] ?? ''); ?>" required>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="idcpf" class="form-label fw-bold">CPF</label>
                                    <input type="text" class="form-control" id="idcpf" name="idcpf" value="<?php echo htmlspecialchars($dados['idcpf'] ?? ''); ?>" maxlength="11">
                                </div>
                                <div class="col-md-6">
                                    <label for="dataNascimento" class="form-label fw-bold">Data de Nascimento</label>
                                    <input type="date" class="form-control" id="dataNascimento" name="dataNascimento" value="<?php echo htmlspecialchars($dados['dataNascimento'] ?? ''); ?>">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="telefone" class="form-label fw-bold">Telefone</label>
                                    <input type="text" class="form-control" id="telefone" name="telefone" value="<?php echo htmlspecialchars($dados['telefone'] ?? ''); ?>" maxlength="14">
                                </div>
                                <div class="col-md-6">
                                    <label for="sexo" class="form-label fw-bold">Sexo</label>
                                    <select class="form-select" id="sexo" name="sexo">
                                        <option value="" disabled>Selecione</option>
                                        <option value="M" <?php echo ($dados['SEXO'] ?? '') == 'M' ? 'selected' : ''; ?>>Masculino</option>
                                        <option value="F" <?php echo ($dados['SEXO'] ?? '') == 'F' ? 'selected' : ''; ?>>Feminino</option>
                                        <option value="O" <?php echo ($dados['SEXO'] ?? '') == 'O' ? 'selected' : ''; ?>>Outro</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-8">
                                    <label for="endereco" class="form-label fw-bold">Endereço</label>
                                    <input type="text" class="form-control" id="endereco" name="endereco" value="<?php echo htmlspecialchars($dados['endereco'] ?? ''); ?>">
                                </div>
                                <div class="col-md-4">
                                    <label for="numero" class="form-label fw-bold">Número</label>
                                    <input type="text" class="form-control" id="numero" name="numero" value="<?php echo htmlspecialchars($dados['numero'] ?? ''); ?>" maxlength="20">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-5">
                                    <label for="cidade" class="form-label fw-bold">Cidade</label>
                                    <input type="text" class="form-control" id="cidade" name="cidade" value="<?php echo htmlspecialchars($dados['cidade'] ?? ''); ?>">
                                </div>
                                <div class="col-md-3">
                                    <label for="uf" class="form-label fw-bold">UF</label>
                                    <input type="text" class="form-control" id="uf" name="uf" value="<?php echo htmlspecialchars($dados['UF'] ?? ''); ?>" maxlength="2">
                                </div>
                                <div class="col-md-4">
                                    <label for="cep" class="form-label fw-bold">CEP</label>
                                    <input type="text" class="form-control" id="cep" name="cep" value="<?php echo htmlspecialchars($dados['CEP'] ?? ''); ?>" maxlength="8">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="foto" class="form-label fw-bold">Alterar Foto</label>
                                <input class="form-control" type="file" id="foto" name="foto">
                            </div>

                            <hr class="my-4">
                            <h6 class="text-muted mb-3">Segurança</h6>

                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="senha" class="form-label fw-bold">Nova Senha</label>
                                    <input type="password" class="form-control" id="senha" name="senha" placeholder="Preencha apenas para alterar">
                                </div>
                            </div>

                            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <a href="dashboard.php" class="btn btn-light me-md-2">Cancelar</a>
                                <button type="submit" class="btn btn-primary px-4">Salvar Alterações</button>
                            </div>

                        </form>
                        </div>
                </div>
            </div>

        </div>

      </div>
    </section>

  </main>

  <footer id="footer" class="footer light-background">
    <div class="container copyright text-center mt-4">
      <p>© <span>Copyright</span> <strong class="px-1 sitename">PsicoAcolheSer</strong></p>
    </div>
  </footer>

  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/main.js"></script>

</body>
</html>