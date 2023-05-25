function cadastrar() {

    const div_aviso = document.querySelector('.aviso')
    const resposta_aviso = document.querySelector('.resposta-cadastro')

    var nomeVar = nome_input.value;
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
            sessionStorage.getItem('idUsuario', dados.idUsuario)
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

