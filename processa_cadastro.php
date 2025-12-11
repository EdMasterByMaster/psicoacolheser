<?php
session_start();
include('conexao.php');

$email = $mysqli->real_escape_string($_POST['email']);
$senha = $_POST['senha'];
$confirma_senha = $_POST['confirma_senha'];

if($senha !== $confirma_senha) {
    header("Location: index.php?erro=senha"); exit;
}

$check = $mysqli->query("SELECT id FROM users WHERE email = '$email'");
if($check->num_rows > 0) {
    header("Location: index.php?erro=existe"); exit;
}

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);
$sql = "INSERT INTO users (EMAIL, senha, TIPO) VALUES ('$email', '$senhaHash', 'NORMAL')";

if($mysqli->query($sql)) {
    header("Location: index.php?sucesso=ok");
} else {
    header("Location: index.php?erro=erro");
}
?>
