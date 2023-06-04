CREATE TABLE usuario(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100)
);

CREATE TABLE cadastro(
	idCadastro INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100),
	fkUsuario INT,
    unique (email),
    constraint fkUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario (id)
);

CREATE TABLE quiz (
	idQuiz INT PRIMARY KEY AUTO_INCREMENT,
	pontuacaoTotal INT,
	qtdQuestoes INT
);

CREATE TABLE tentativa(
	idTentativa INT,
    pontuacao INT,
    fkUsuario INT,
    fkQuiz INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario (id),
    FOREIGN KEY (fkQuiz) REFERENCES quiz (idQuiz)
);