<?php
error_reporting(0);
ini_set('display_errors', 0);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<?php include('layouts/header.php'); ?>
<body>
    <div class="container">
        <h1>🔮 Consulte seu Signo</h1>
        
        <div class="card fade-in">
            <form id="signo-form" method="POST" action="show_zodiac_sign.php">
                <div class="mb-4">
                    <label for="data_nascimento" class="form-label">Data de Nascimento</label>
                    <input type="date" class="form-control" id="data_nascimento" name="data_nascimento" required>
                </div>
                <button type="submit" class="btn btn-primary">Descobrir Signo</button>
            </form>
            
            <div id="loading" class="loading">
                <div class="spinner"></div>
                    <p>Consultando as estrelas...</p>
            </div>
        </div>
    </div>
    
    <script src="assets/js/scripts.js"></script>
</body>
</html>