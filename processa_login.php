<?php
session_start();
include('conexao.php');

if(empty($_POST['email']) || empty($_POST['senha'])) {
    header('Location: index.php'); exit();
}

$email = $mysqli->real_escape_string($_POST['email']);
$senha = $_POST['senha'];

$query = "SELECT id, senha, nome, TIPO FROM users WHERE email = '{$email}'";
$result = $mysqli->query($query);
$row = $result->fetch_assoc();

if($result->num_rows == 1 && password_verify($senha, $row['senha'])) {
    $_SESSION['id'] = $row['id'];
    $_SESSION['nome'] = $row['nome'];
    $_SESSION['email'] = $email;
    $_SESSION['tipo'] = $row['TIPO'];
    header('Location: dashboard.php');
    exit();
} else {
    header('Location: index.php?erro=login_falha');
    exit();
}
?>
