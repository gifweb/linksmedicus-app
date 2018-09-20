<?php
require 'cors.php';
require '../vendor/autoload.php';
require_once 'cache.class.php';
include 'config.php';

use Google\Cloud\Translate\TranslateClient;

$translate = new TranslateClient([
    'key' => $config['key'],
]);


$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$texts = !empty($data) && $data->texts ? $data->texts : ['Test'];
$target =  !empty($data) && $data->lang ? $data->lang : 'pt';

$cache = new Cache([
    'name' => 'lang_' . $target,
    'path' => '../cache/',
    'extension' => '.cache',
]);

$results = [];
$result_keys = [];
$translates = [];

foreach ($texts as $k => $text) {
    if($text !== null){
        $key = md5($text);
        $result = $cache->retrieve($key);
        if (!$result) {
            //echo 'traduzindo....';
            $translates[] = $text;
        } else {
            //echo 'cacheado!';
            $result_keys[$key] = $result;
        }
    }
   
}

if (!empty($translates)) {
    $translations = $translate->translateBatch($translates, ['target' => $target, 'origin' => 'en']);
    foreach ($translations as $k => $translation) {
        $key = md5($translates[$k]);
        $result_keys[$key] = $translation['text'];
        $cache->store($key, $translation['text']);
    }
}

foreach ($texts as $k => $text) {
    $results[$text] = $result_keys[md5($text)];
}

echo json_encode($results);
