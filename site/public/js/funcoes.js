// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var senha = sessionStorage.SENHA_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
         window.alert(`Seja bem-vindo, ${nome}! \n
                        sua senha é ${senha}`);
        b_usuario.innerHTML = nome;
        b_usuario.innerHTML = senha;

        // finalizarAguardar();
    } else {
        window.location = "../login.html";
    }
}


function toggle(){
    var blur = document.getElementById('blur')
    blur.classList.toggle('active')
    
    var popup = document.getElementById('popupCadastro')
    popup.classList.toggle('active')
}



function loginModal(){
    var blur = document.getElementById('blur')
    blur.classList.toggle('active')
    
    var popup = document.getElementById('popupLogin')
    popup.classList.toggle('active')
}


function limparSessao() {
     aguardar();
    sessionStorage.clear();
     finalizarAguardar();
    window.location = "../login.html";
}

// carregamento (loading)
// function aguardar() {
//     var divAguardar = document.getElementById("div_aguardar");
//     divAguardar.style.display = "flex";
// }

// function finalizarAguardar(texto) {
//     var divAguardar = document.getElementById("div_aguardar");
//     divAguardar.style.display = "none";

//     var divErrosLogin = document.getElementById("div_erros_login");
//     if (texto) {
//         divErrosLogin.style.display = "flex";
//         divErrosLogin.innerHTML = texto;
//     }
// }


// modal
function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}

