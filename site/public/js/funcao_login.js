function entrar() {
    var email = email_input_login.value;
    var senha = senha_input_login.value;

    const div_aviso = document.querySelector('.aviso')
    const resposta_aviso = document.querySelector('.resposta-cadastro')

    // Verificação se os campos estão preenchidos
    if (email == "" || senha == "") {
        div_aviso.style.opacity = '1'
        resposta_aviso.style.color = 'black'
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

              sessionStorage.EMAIL_USUARIO = json.email;
              sessionStorage.NOME_USUARIO = json.nome;
              sessionStorage.SENHA_USUARIO = json.senha;
              sessionStorage.ID_USUARIO = json.id;

              div_aviso.style.opacity = '1'
              resposta_aviso.style.color = 'black'
              div_aviso.style.backgroundColor = '#caf5b3'
              resposta_aviso.style.backgroundColor = '#caf5b3'
              resposta_aviso.innerHTML = 'Login realizado com sucesso!'
              setTimeout(() => {
              div_aviso.style.opacity = '0'
            }, 3000)

            setTimeout(() =>{
              window.location.href = './dashboard/dashboard.html'
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
