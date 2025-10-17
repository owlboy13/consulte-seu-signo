<?php
error_reporting(0);
ini_set('display_errors', 0);
?>

<?php include('layouts/header.php'); ?>

<div class="container mt-5">
    <?php
    // Verifica se o formulário foi submetido
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['data_nascimento'])) {
        $data_nascimento = $_POST['data_nascimento'];
        $signos = simplexml_load_file("signos.xml");
        
        // Converte a data
        $timestamp = strtotime($data_nascimento);
        $dia = (int)date('d', $timestamp);
        $mes = (int)date('m', $timestamp);
        
        $signo_encontrado = null;
        
        foreach ($signos->signo as $signo) {
            // Converte datas do XML
            list($dia_inicio, $mes_inicio) = explode('/', (string)$signo->dataInicio);
            list($dia_fim, $mes_fim) = explode('/', (string)$signo->dataFim);
            
            $dia_inicio = (int)$dia_inicio;
            $mes_inicio = (int)$mes_inicio;
            $dia_fim = (int)$dia_fim;
            $mes_fim = (int)$mes_fim;
            
            // Lógica de comparação
            if ($mes == $mes_inicio && $dia >= $dia_inicio) {
                $signo_encontrado = $signo;
                break;
            } elseif ($mes == $mes_fim && $dia <= $dia_fim) {
                $signo_encontrado = $signo;
                break;
            } elseif ($mes_inicio > $mes_fim) { // Caso especial (Capricórnio)
                if (($mes == 12 && $dia >= $dia_inicio) || ($mes == 1 && $dia <= $dia_fim)) {
                    $signo_encontrado = $signo;
                    break;
                }
            }
        }
        
        // Exibe resultado
        if ($signo_encontrado) {
            echo "<div class='alert alert-success'>";
            echo "<h2>Seu signo é: " . $signo_encontrado->signoNome . "</h2>";
            echo "<p><strong>Data de Nascimento:</strong> " . date('d/m/Y', strtotime($data_nascimento)) . "</p>";
            echo "<p><strong>Período:</strong> " . $signo_encontrado->dataInicio . " a " . $signo_encontrado->dataFim . "</p>";
            echo "<p><strong>Características:</strong> " . $signo_encontrado->descricao . "</p>";
            echo "</div>";
        } else {
            echo "<div class='alert alert-danger'>";
            echo "<h2>Signo não encontrado!</h2>";
            echo "<p>Não foi possível identificar o signo para a data informada.</p>";
            echo "</div>";
        }
    } else {
        echo "<div class='alert alert-warning'>";
        echo "<h2>Dados inválidos!</h2>";
        echo "<p>Por favor, preencha o formulário corretamente.</p>";
        echo "</div>";
    }
    ?>
    
    <a href="index.php" class="btn btn-primary mt-3">Voltar</a>
</div>

<?php include('layouts/footer.php'); ?>