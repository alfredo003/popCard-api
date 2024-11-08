# popCard-api
PopCard is an API that manages the user's money securely and offers balance management features and deposit withdrawal deadlines.
 
### Funcionalidades

1. **Depositar Dinheiro**:
   - O usuário faz um depósito.
   - O valor do depósito é armazenado junto com a data de depósito e o prazo de saque (caso seja um depósito a prazo).

2. **Sacar Dinheiro**:
   - O usuário tenta sacar dinheiro da sua conta.
   - Se o valor de saque for superior ao saldo, a operação falha.
   - Se o depósito for a prazo, o saque só pode ser realizado após o prazo de vencimento.

3. **Consultar Saldo**:
   - O usuário pode verificar o saldo atual disponível para saque.

4. **Consultar Depósitos a Prazo**:
   - O usuário pode verificar seus depósitos a prazo e quando o prazo para saque será atingido.

### Modelo de Dados

Vamos assumir um banco de dados simples, com pelo menos duas tabelas principais: `users` (usuários) e `deposits` (depósitos). 

1. **Tabela `users`**:
   - `id` (chave primária)
   - `name` (nome do usuário)
   - `email` (email do usuário)
   - `balance` (saldo disponível para saque)

2. **Tabela `deposits`**:
   - `id` (chave primária)
   - `user_id` (chave estrangeira para a tabela `users`)
   - `amount` (valor depositado)
   - `deposit_date` (data de depósito)
   - `maturity_date` (data de vencimento do depósito a prazo, se aplicável)
   - `is_matured` (booleano, indica se o depósito já está disponível para saque)

### Endpoints da API

Aqui estão os principais endpoints para a sua API `popCard`:

#### 1. **Registrar usuário**
- **POST** `/users`
- **Descrição**: Cria um novo usuário.
- **Corpo da requisição**:
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
- **Descrição**: Permite o usuário depositar dinheiro.
- **Corpo da requisição**:
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
- **Descrição**: Permite o saque de dinheiro, levando em consideração se o depósito é a prazo.
- **Corpo da requisição**:
```json
{
  "user_id": 1,
  "amount": 50
}
```
- **Resposta** (se o depósito for a prazo e ainda não venceu):
```json
{
  "message": "O depósito a prazo ainda não venceu. Só é possível sacar após a data de vencimento."
}
```
- **Resposta** (se o saque for bem-sucedido):
```json
{
  "message": "Saque realizado com sucesso!",
  "balance": 50
}
```

#### 4. **Consultar Saldo**
- **GET** `/users/{user_id}/balance`
- **Descrição**: Retorna o saldo disponível para saque.
- **Resposta**:
```json
{
  "balance": 100
}
```

#### 5. **Consultar Depósitos a Prazo**
- **GET** `/users/{user_id}/deposits`
- **Descrição**: Retorna todos os depósitos a prazo de um usuário.
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

### Lógica de Negócio para o Prazo de Saque

- Ao fazer o depósito, você pode incluir uma data de vencimento (`maturity_date`). 
- Quando o usuário tentar sacar o dinheiro, a API deve verificar se o depósito já venceu (`is_matured`). Se não tiver vencido, a operação de saque não é permitida.
- Quando a data de vencimento for atingida, você pode atualizar o campo `is_matured` para `true`, permitindo que o usuário realize o saque.


### Considerações de Segurança
- Verifique se o valor do depósito é positivo.
- A validação de dados é importante para evitar erros.
- Você pode implementar autenticação para garantir que os usuários apenas possam acessar seus próprios dados.

Se você precisar de mais detalhes em qualquer uma dessas partes ou quiser discutir o design da API mais a fundo, estou à disposição!
