<?php
    //allow requests from the react frontend
    header('Access-Control-Allow-Origin: http://localhost:3000');
    
    $input = $_POST['input'];
    $key = $_POST['key'];
    $type = $_POST['type'];

    function isPrime($n) {
        if ($n < 2) {
            return false;
        }

        for ($i = 2; $i < ceil($n**0.5) + 1; $i++) {
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

    //in place of php % function which handles negative values in a different way to true mathematical modulo
    function modulo($num, $mod) {
        return ($mod + ($num % $mod)) % $mod;
    }

    // normalises an integer into the valid ascii range 32-126
    function normAscii($n) {
        return modulo($n - 32, 126 - 32 + 1) + 32;
    }

    function encryptChar($d, $k, $i) {
        $e = chr(normAscii(nthPrime($i + ord($k)) + $i + ord($d)));
        return $e;
    }

    function decryptChar($e, $k, $i) {
        $d = chr(normAscii(ord($e) - nthPrime($i + ord($k)) - $i));
        return $d;
    }

    function process($input, $key, $type) {
        $inputChars = str_split($input);
        $keyChars = str_split($key);

        $outputChars = array();
        for ($i = 0; $i < count($inputChars); $i++) {
            $k = $keyChars[$i % count($keyChars)];
            $outputChars[$i] = 
                $type == "encrypt" 
                ? encryptChar($inputChars[$i], $k, $i) 
                : decryptChar($inputChars[$i], $k, $i);
        }

        return implode($outputChars);
    }

    echo process($input, $key, $type);
?>