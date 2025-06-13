# Notificações Service

## Notificações

### Obter todas as notificações

```http
GET {{host}}/notificacao
```

#### 200 OK

```json
[
  {
    "id": "b1e29c7e-8b2a-4c7a-9f2a-1b2c3d4e5f6a",
    "destinatario": "Bruno",
    "mensagem": "Seu pedido foi recebido!",
    "criadoEm": "2025-06-11T13:51:26.2331802Z",
    "pedidoId": "00000000-0000-0000-0000-000000000000"
  }
]
```

---

### Cadastrar uma notificação

```http
POST {{host}}/notificacao
Content-Type: application/json

{
  "destinatario": "Bruno",
  "mensagem": "Olá mundo!"
}
```

#### 201 Created

```json
{
  "id": "b1e29c7e-8b2a-4c7a-9f2a-1b2c3d4e5f6a",
  "destinatario": "Bruno",
  "mensagem": "Olá mundo!",
  "pedidoId": null
}
```

---

### Obter notificações por ID do Pedido

```http
GET {{host}}/notificacao/pedido/{{pedidoId}}
```

#### 404 Not Found

#### 200 OK

```json
[
  {
    "id": "b1e29c7e-8b2a-4c7a-9f2a-1b2c3d4e5f6a",
    "destinatario": "Bruno",
    "mensagem": "Seu pedido foi recebido!",
    "pedidoId": "00000000-0000-0000-0000-000000000000"
  }
]
```
