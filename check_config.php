<?php
header('Content-Type: application/json');

$config = [
    'server_software' => $_SERVER['SERVER_SOFTWARE'],
    'server_name' => $_SERVER['SERVER_NAME'],
    'server_addr' => $_SERVER['SERVER_ADDR'],
    'remote_addr' => $_SERVER['REMOTE_ADDR'],
    'document_root' => $_SERVER['DOCUMENT_ROOT'],
    'script_filename' => $_SERVER['SCRIPT_FILENAME'],
    'php_version' => PHP_VERSION,
    'max_execution_time' => ini_get('max_execution_time'),
    'memory_limit' => ini_get('memory_limit'),
    'upload_max_filesize' => ini_get('upload_max_filesize'),
    'post_max_size' => ini_get('post_max_size')
];

echo json_encode($config, JSON_PRETTY_PRINT);
?> 