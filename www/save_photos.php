<?php

$data = json_decode(json_encode($_POST));

if (!isset($data->path)) {
    die(json_encode(["error" => "Não foi foi possível obter a imagem."]));
}

$path = sprintf("snaps/%s.jpg", md5(time() . uniqid()));

$data = explode(',', str_replace(" ", "+", $data->path));

file_put_contents($path, base64_decode(trim($data[1])));

echo json_encode(["img" => $path], JSON_PRETTY_PRINT);
