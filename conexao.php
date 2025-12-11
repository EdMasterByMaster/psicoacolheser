<?php
$host = 'localhost';
$usuario = 'root';
$senha = '1234';
$banco = 'pasdb';

$mysqli = new mysqli($host, $usuario, $senha, $banco);

if($mysqli->connect_errno) {
    die("Falha na conexão: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
}
?>
