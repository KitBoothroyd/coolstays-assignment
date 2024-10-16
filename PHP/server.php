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

    function findNthPrime($n) {
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

    function convertToValidAsciiCode($n) {
        return (($n - 32) % (126 - 32 + 1)) + 32;
    }

    function encrypt($stringToEncrypt, $encryptionKey) {
        $inputChars = str_split($stringToEncrypt);
        $keyChars = str_split($encryptionKey);

        $encryptedChars = array();
        for ($i = 0; $i < count($inputChars); $i++) {
            $n = $i + ord($keyChars[$i % count($keyChars)]);
            $nthPrime = findNthPrime($n);

            $encryptedChars[$i] = 
                chr(convertToValidAsciiCode($nthPrime + $i + ord($inputChars[$i])));
        }

        return implode($encryptedChars);
    }

    function decrypt($stringToDecrypt, $decryptionKey) {
        $inputChars = str_split($stringToDecrypt);
        $keyChars = str_split($decryptionKey);

        $encryptedChars = array();
        for ($i = 0; $i < count($inputChars); $i++) {
            $n = $i + ord($keyChars[$i % count($keyChars)]);
            $nthPrime = findNthPrime($n);

            $encryptedChars[$i] = 
                chr(convertToValidAsciiCode($nthPrime + $i + ord($inputChars[$i])));
        }

        return implode($encryptedChars);
    }

    echo encrypt($input, $key);
?>