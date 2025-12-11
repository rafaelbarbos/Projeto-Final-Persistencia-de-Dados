# 🗺️ Plataforma de Gerenciamento de Pontos Turísticos (Grupo 5)

Este projeto consiste em uma plataforma completa para gerenciamento e avaliação de pontos turísticos. A aplicação é dividida em um **backend robusto** desenvolvido com Spring Boot (focado em Persistência de Dados) e um **frontend dinâmico** construído em React.

## 📝 Visão Geral

O sistema permite:
* **CRUD completo** de Pontos Turísticos.
* **Sistema de Avaliações** por usuário, com cálculo automático de média.
* Cadastro de **Hospedagens** relacionadas aos pontos.
* Controle de acesso básico (Roles: `ADMIN`/`USER`).

---

## 🏗️ Arquitetura e Tecnologias

### ⚙️ Backend (API REST)

O backend é a espinha dorsal do projeto, focado em alta coesão e baixo acoplamento através de uma arquitetura de camadas (Controller, Service, Repository).

| Categoria | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Framework** | Spring Boot 3 | Gerenciamento de dependências e configuração. |
| **Persistência** | Spring Data JPA / Hibernate | Mapeamento Objeto-Relacional (ORM). |
| **Banco de Dados** | H2 Database (em memória) | Usado para desenvolvimento, testes e demonstração. |
| **Padrões** | RESTful API | Comunicação Stateless entre Backend e Frontend. |
| **Auxiliares** | Lombok | Redução de código boilerplate. |

### 🖥️ Frontend (Interface do Usuário)

O frontend foi desenvolvido para consumir a API REST e fornecer uma experiência de usuário fluida.

* **Tecnologia:** React

---

## 🧭 Mapeamento das Entidades

O modelo de dados implementa os seguintes recursos principais e seus relacionamentos:

| Entidade | Propósito Principal | Relacionamentos Chave |
| :--- | :--- | :--- |
| `PontoTuristico` | Informação do local (nome, localização, descrição). | 1:N com `Avaliacao`, 1:N com `Hospedagem`. |
| `Avaliacao` | Nota (1-5) e comentário do usuário. | N:1 com `PontoTuristico`, N:1 com `Usuario`. |
| `Hospedagem` | Locais de acomodação próximos. | N:1 com `PontoTuristico`. |
| `Usuario` | Gerenciamento e autoria de avaliações. | 1:N com `Avaliacao`. |

---

## 🌐 Endpoints da API REST

A API expõe os seguintes recursos principais. A documentação completa pode ser explorada após o *deploy*.

| Recurso | Método | Endpoint | Descrição |
| :--- | :--- | :--- | :--- |
| **Pontos** | `GET` | `/pontos` | Listar todos os pontos. |
| | `POST` | `/pontos` | Cadastrar novo ponto. |
| | `PUT` | `/pontos/{id}` | Atualizar ponto. |
| **Avaliações** | `POST` | `/avaliacoes` | Enviar nova avaliação. |
| | `GET` | `/avaliacoes/ponto/{id}` | Listar avaliações de um ponto. |
| **Hospedagens** | `POST` | `/hospedagens` | Cadastrar nova hospedagem. |
| | `GET` | `/hospedagens/ponto/{id}` | Listar hospedagens de um ponto. |

---

## 🚀 Como Executar o Backend (Spring Boot)

### Pré-requisitos
* Java 17+
* Maven

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITÓRIO]
    cd [pasta-do-backend]
    ```

2.  **Compile o projeto:**
    ```bash
    ./mvnw clean install
    ```

3.  **Execute a aplicação:**
    ```bash
    java -jar target/turismo-0.0.1-SNAPSHOT.jar # Ou o nome do seu JAR
    ```

A API estará acessível em `http://localhost:8080`.

### Acesso ao Banco de Dados H2
O console do H2 é habilitado para visualização dos dados em tempo real:
* **URL:** `http://localhost:8080/h2`
* **JDBC URL:** `jdbc:h2:mem:turismo`
* **Usuário:** `sa`
* **Senha:** *(Deixar em branco)*

---

## 👥 Desenvolvedores (Grupo 5)

Este projeto foi desenvolvido como parte do requisito de Persistência de Dados.

* Rafael Barbosa
* Isabella Oliveira
* Phablo Tavares
* Tayna Crisllen
