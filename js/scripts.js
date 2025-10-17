document.addEventListener('DOMContentLoaded', function() {
    const signoForm = document.getElementById('signo-form');
    const dataInput = document.getElementById('data_nascimento');
    const loadingElement = document.getElementById('loading');

    // Configura data máxima (hoje) e mínima (100 anos atrás)
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 100);
    const minDateString = minDate.toISOString().split('T')[0];
    
    dataInput.setAttribute('max', maxDate);
    dataInput.setAttribute('min', minDateString);

    // Validação em tempo real
    dataInput.addEventListener('change', function() {
        validateDate(this.value);
    });

    // Validação no submit
    signoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const dataValue = dataInput.value;
        const isValid = validateDate(dataValue);
        
        if (isValid) {
            // Mostra loading
            if (loadingElement) {
                loadingElement.style.display = 'block';
            }
            
            // Submit do formulário após pequeno delay para mostrar loading
            setTimeout(() => {
                signoForm.submit();
            }, 500);
        }
    });

    function validateDate(dateString) {
        const errorElement = document.getElementById('data-error');
        const submitButton = signoForm.querySelector('button[type="submit"]');
        
        // Remove mensagens de erro anteriores
        if (errorElement) {
            errorElement.remove();
        }
        
        // Verifica se a data está vazia
        if (!dateString) {
            showError('Por favor, selecione uma data de nascimento');
            return false;
        }
        
        const selectedDate = new Date(dateString);
        const today = new Date();
        
        // Verifica se a data é futura
        if (selectedDate > today) {
            showError('A data de nascimento não pode ser futura');
            return false;
        }
        
        // Verifica se a data é muito antiga (mais de 100 anos)
        const hundredYearsAgo = new Date();
        hundredYearsAgo.setFullYear(today.getFullYear() - 100);
        
        if (selectedDate < hundredYearsAgo) {
            showError('Por favor, selecione uma data mais recente (máximo 100 anos)');
            return false;
        }
        
        // Verifica idade mínima (12 anos)
        const minAgeDate = new Date();
        minAgeDate.setFullYear(today.getFullYear() - 12);
        
        if (selectedDate > minAgeDate) {
            showError('Você deve ter pelo menos 12 anos para usar este serviço');
            return false;
        }
        
        // Data válida
        dataInput.style.borderColor = '#48bb78';
        return true;
    }

    function showError(message) {
        // Remove erro anterior
        const existingError = document.getElementById('data-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Estiliza input com erro
        dataInput.style.borderColor = '#f56565';
        
        // Cria elemento de erro
        const errorElement = document.createElement('div');
        errorElement.id = 'data-error';
        errorElement.style.color = '#f56565';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.style.padding = '0.5rem';
        errorElement.style.backgroundColor = '#fed7d7';
        errorElement.style.borderRadius = '4px';
        errorElement.style.borderLeft = '3px solid #f56565';
        errorElement.textContent = message;
        
        // Insere após o input
        dataInput.parentNode.appendChild(errorElement);
    }

    // Efeitos visuais
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});

// Função para mostrar loading (pode ser chamada de outros lugares)
function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'block';
    }
}

// Função para esconder loading
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
    }
}