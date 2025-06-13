# Pedido Service

## Pedidos

### Criar um novo pedido

```http
POST {{host}}/pedido
Content-Type: application/json

{
  "cliente": "Bruno",
  "pizzaId": 1,
  "quantidade": 1
}
```

#### 201 Created

```json
{
  "id": "b1e29c7e-8b2a-4c7a-9f2a-1b2c3d4e5f6a",
  "cliente": "Bruno",
  "pizzaId": 1,
  "quantidade": 1,
  "criadoEm": "2025-06-04T13:30:00.0000000Z"
}
```

---

### Obter um pedido por ID

```http
GET {{host}}/pedido/{{id}}
```

#### 404 Not Found

#### 200 OK

```json
{
  "id": "b1e29c7e-8b2a-4c7a-9f2a-1b2c3d4e5f6a",
  "cliente": "Bruno",
  "pizzaId": 1,
  "quantidade": 1,
  "criadoEm": "2025-06-04T13:30:00.0000000Z"
}
```

---

### Obter todos os pedidos

```http
GET {{host}}/pedido
```

#### 200 OK

```json
[
  {
    "id": "b1e29c7e-8b2a-4c7a-9f2a-1b2c3d4e5f6a",
    "cliente": "Bruno",
    "pizzaId": 1,
    "quantidade": 1,
    "criadoEm": "2025-06-04T13:30:00.0000000Z"
  }
]
```
