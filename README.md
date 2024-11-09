Aqui está uma versão renovada e mais simplificada do README com base nas informações fornecidas:

---

# popCard-api

**PopCard** é uma API para gerenciamento de carteiras digitais, permitindo que os usuários façam depósitos, saques e transferências, além de terem acesso a contas correntes e poupanças. A API oferece recursos de saldo disponível, depósitos a prazo e controle de vencimento.

### Funcionalidades

1. **Cadastrar Conta**:
   - Criação de conta para o usuário, permitindo acessar sua carteira digital.

2. **Depositar Dinheiro**:
   - O usuário pode fazer depósitos em sua conta corrente ou conta poupança.
   - O depósito pode ser imediato ou com um vencimento (depósito a prazo).

3. **Sacar Dinheiro**:
   - O usuário pode sacar dinheiro de sua conta corrente.
   - Caso o depósito seja a prazo, o saque só será possível após o vencimento.

4. **Consultar Saldo**:
   - Verifique o saldo disponível para saque em conta corrente ou poupança.

5. **Consultar Depósitos a Prazo**:
   - O usuário pode consultar os depósitos a prazo e verificar a data de vencimento de cada um.

### Modelo de Dados

A API utiliza duas principais tabelas para armazenar as informações:

1. **Tabela `users`** (usuários):
   - `id` (chave primária)
   - `name` (nome do usuário)
   - `email` (e-mail do usuário)
   - `bill_balance` (saldo disponível para saque)

2. **Tabela `deposits`** (depósitos):
   - `id` (chave primária)
   - `user_id` (chave estrangeira para a tabela `users`)
   - `amount` (valor depositado)
   - `deposit_date` (data do depósito)
   - `maturity_date` (data de vencimento, se aplicável)
   - `is_matured` (indica se o depósito já venceu e pode ser sacado)

### Endpoints da API

Aqui estão os principais endpoints para interação com a API:

#### 1. **Registrar Usuário**

- **POST** `/users`
- **Descrição**: Cria uma nova conta para o usuário.
- **Corpo da Requisição**:

```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com"
}
```

- **Resposta**:

```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@exemplo.com"
}
```

#### 2. **Depositar Dinheiro**

- **POST** `/deposit`
- **Descrição**: Realiza um depósito na conta do usuário (corrente ou poupança).
- **Corpo da Requisição**:

```json
{
  "user_id": 1,
  "amount": 100,
  "maturity_date": "2024-12-01"
}
```

- **Resposta**:

```json
{
  "deposit_id": 1,
  "user_id": 1,
  "amount": 100,
  "deposit_date": "2024-11-08",
  "maturity_date": "2024-12-01",
  "is_matured": false
}
```

#### 3. **Sacar Dinheiro**

- **POST** `/withdraw`
- **Descrição**: Permite o saque de dinheiro da conta corrente. Caso o depósito seja a prazo, o saque só pode ser feito após o vencimento.
- **Corpo da Requisição**:

```json
{
  "user_id": 1,
  "amount": 50
}
```

- **Resposta (se o depósito ainda não venceu)**:

```json
{
  "message": "O depósito a prazo ainda não venceu. Só é possível sacar após a data de vencimento."
}
```

- **Resposta (se o saque for bem-sucedido)**:

```json
{
  "message": "Saque realizado com sucesso!",
  "balance": 50
}
```

#### 4. **Consultar Saldo**

- **GET** `/users/{user_id}/balance`
- **Descrição**: Retorna o saldo disponível para saque na conta do usuário.
- **Resposta**:

```json
{
  "balance": 100
}
```

#### 5. **Consultar Depósitos a Prazo**

- **GET** `/users/{user_id}/deposits`
- **Descrição**: Retorna todos os depósitos a prazo de um usuário, incluindo as datas de vencimento.
- **Resposta**:

```json
[
  {
    "deposit_id": 1,
    "amount": 100,
    "deposit_date": "2024-11-08",
    "maturity_date": "2024-12-01",
    "is_matured": false
  }
]
```

### Lógica de Negócio para Depósitos a Prazo

- Os depósitos podem ter uma data de vencimento (`maturity_date`).
- O saque de depósitos a prazo só é permitido após a data de vencimento, quando o campo `is_matured` se torna `true`.
- Se o saque for solicitado antes do vencimento, a operação falhará com uma mensagem informando sobre a data de liberação.