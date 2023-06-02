// sessão
var email = sessionStorage.getItem('email');
var nome = sessionStorage.getItem('nome');
var id = sessionStorage.getItem('id');
var btnEntra = document.getElementById('btnEntra')

// function validarSessao() {
//     if(id == undefined){
//         alert('nao ta logado')
//     }
// }


function toggle(){
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
    sessionStorage.clear();
    window.location = "./index.html";
}

validarSessao()

// FUNÇÃO ENTRAR
function entrar() {
    var email = email_input_login.value;
    var senha = senha_input_login.value;

    const div_aviso = document.querySelector('.aviso')
    const resposta_aviso = document.querySelector('.resposta-cadastro')

    // Verificação se os campos estão preenchidos
    if (email == "" || senha == "") {
        div_aviso.style.opacity = '1'
        resposta_aviso.style.color = 'black'
        div_aviso.style.backgroundColor = '#fc9999'
        resposta_aviso.style.backgroundColor = '#fc9999'
        resposta_aviso.innerHTML = 'Insira todos os campos!'
        setTimeout(() => {
          div_aviso.style.opacity = '0'
        }, 3500)
        return false;
    } else {  
        fetch("/usuarios/autenticar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            emailServer: email,
            senhaServer: senha
          })
      }).then(function (resposta) {
          if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
              console.log(JSON.stringify(json));

              sessionStorage.setItem('id',json.id)
              sessionStorage.setItem('nome',json.nome)
              sessionStorage.setItem('email',json.email)
              

              div_aviso.style.opacity = '1'
              resposta_aviso.style.color = 'black'
              div_aviso.style.backgroundColor = '#caf5b3'
              resposta_aviso.style.backgroundColor = '#caf5b3'
              resposta_aviso.innerHTML = 'Login realizado com sucesso!'
              setTimeout(() => {
              div_aviso.style.opacity = '0'
            }, 3000)

            setTimeout(() =>{
              window.location.href = '../index.html'
             },1500)
      
          });

        } else {
            div_aviso.style.opacity = '1'
            resposta_aviso.style.color = 'black'
            div_aviso.style.backgroundColor = '#fc9999'
            resposta_aviso.style.backgroundColor = '#fc9999'
            resposta_aviso.innerHTML = 'Usuario não encontrado, tente novamente'
            setTimeout(() => {
              div_aviso.style.opacity = '0'
            }, 3000)

            console.log("Houve um erro ao tentar realizar o login!");
            resposta.text().then(texto => {
              cardErro.style.display = "block"
              mensagem_erro.innerHTML = `${texto}`;
            });
        }

      }).catch(function (erro) {
        console.log(erro);
      })
    }
}

// FUNÇÃO CADASTRAR
function cadastrar() {
    const div_aviso = document.querySelector('.aviso')
    const resposta_aviso = document.querySelector('.resposta-cadastro')

    var nomeVar = nome_input.value
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    if (nomeVar == "" || emailVar == "" || senhaVar == "") {
        div_aviso.style.opacity = '1'
        resposta_aviso.style.color = 'black'
        div_aviso.style.backgroundColor = '#fc9999'
        resposta_aviso.style.backgroundColor = '#fc9999'
        resposta_aviso.innerHTML = 'Insira todos os campos!'
        setTimeout(()=>{
            div_aviso.style.opacity = '0'
        },3000)
        return false;
    }
    else {
        //  alert('Deu erro')
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);
        if (resposta.ok) {
            console.log('OK')
            return resposta.json()
         } else {
            div_aviso.style.opacity = '1'
            resposta_aviso.style.color = 'black'
            div_aviso.style.backgroundColor = '#fc9999'
            resposta_aviso.style.backgroundColor = '#fc9999'
            resposta_aviso.innerHTML = 'Insira todos os campos!'
                setTimeout(()=>{
                 div_aviso.style.opacity = '0'
             },5000)
             throw ("Houve um erro ao tentar realizar o cadastro!");
         }


        }).then((dados)=>{
            sessionStorage.setItem('idUsuario', dados.idUsuario)
            sessionStorage.setItem('username', dados.username)
            sessionStorage.setItem('email', dados.email)
            div_aviso.style.opacity = '1'
            resposta_aviso.style.color = 'black'
            div_aviso.style.backgroundColor = '#caf5b3'
            resposta_aviso.style.backgroundColor = '#caf5b3'
            resposta_aviso.innerHTML = 'Cadastro realizado com sucesso!'
    
           setTimeout(() =>{
            window.location.href = '/index.html'
           },1500)
    
        }).catch(function (erro) {
            console.log(erro);
        })
    return false;
}
