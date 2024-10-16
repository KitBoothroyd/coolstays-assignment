<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $input = $_POST['input'];
    $key = $_POST['key'];

    function isPrime($n) {
        if ($n < 2) {
            return false;
        }

        for ($i = 2; $i < intval($n**0.5) + 1; $i++) {
            if ($n % $i == 0) {
                return false;
            }
        }

        return true;
    }

    function nthPrime($n) {
        $count = 0;
        $current = 1;

        while ($count < $n) {
            $current++;
            if (isPrime($current)) {
                $count++;
            }
        }

        return $current;
    }

    function normAscii($n) {
        return (($n - 32) % (126 - 32 + 1)) + 32;
    }

    function encryptChar($d, $k, $i) {
        $e = chr(normAscii(nthPrime($i + ord($k)) + $i + ord($d)));
        return $e;
    }

    function decryptChar($e, $k, $i) {
        $d = ord($e) - normAscii(nthPrime($i + ord($k)) + $i);
    }

    function encrypt($stringToEncrypt, $encryptionKey) {
        $inputChars = str_split($stringToEncrypt);
        $keyChars = str_split($encryptionKey);

        $encryptedChars = array();
        for ($i = 0; $i < count($inputChars); $i++) {
            $k = $keyChars[$i % count($keyChars)];
            $encryptedChars[$i] = 
                encryptChar($inputChars[$i], $k, $i);
        }

        return implode($encryptedChars);
    }

    function decrypt($stringToEncrypt, $encryptionKey) {
        $inputChars = str_split($stringToEncrypt);
        $keyChars = str_split($encryptionKey);

        $encryptedChars = array();
        for ($i = 0; $i < count($inputChars); $i++) {
            $k = $keyChars[$i % count($keyChars)];
            $encryptedChars[$i] = 
                decryptChar($inputChars[$i], $k, $i);
        }

        return implode($encryptedChars);
    }

    echo encrypt($input, $key);
?>