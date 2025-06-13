# Pizza Service

## Pizzas

### Obter todas as pizzas

```http
GET {{host}}/sabor
```

#### 200 OK

```json
[
  {
    "id": 1,
    "sabor": "Margherita",
    "tempoPreparo": 15,
    "criadoEm": "2025-06-04T13:08:03.5083728Z"
  },
  {
    "id": 2,
    "sabor": "Pepperoni",
    "tempoPreparo": 20,
    "criadoEm": "2025-06-04T13:08:03.5084704Z"
  },
  {
    "id": 3,
    "sabor": "Quatro Queijos",
    "tempoPreparo": 25,
    "criadoEm": "2025-06-04T13:08:03.5084706Z"
  }
]
```

---

### Obter uma pizza pelo ID

```http
GET {{host}}/sabor/{{id}}
```

#### 200 OK

```json
{
  "id": 2,
  "sabor": "Pepperoni",
  "tempoPreparo": 20,
  "criadoEm": "2025-06-04T13:08:03.5084704Z"
}
```

---

### Cadastrar uma nova pizza

```http
POST {{host}}/sabor
Content-Type: application/json

{
  "sabor": "Napolitana",
  "tempoPreparo": 15
}
```

#### 201 Created

```json
{
  "id": 4,
  "sabor": "Napolitana",
  "tempoPreparo": 15,
  "criadoEm": "2025-06-04T13:09:00.9412666Z"
}
```

---

## Estoque

### Obter todo o estoque de pizzas

```http
GET {{host}}/estoque
```

#### 200 OK

```json
[
  {
    "id": 1,
    "pizzaId": 2,
    "pizza": {
      "id": 2,
      "sabor": "Pepperoni",
      "tempoPreparo": 20,
      "criadoEm": "2025-06-04T13:08:03.5084704Z"
    },
    "quantidade": 10,
    "criadoEm": "2025-06-04T13:14:53.3289903Z",
    "atualizadoEm": "2025-06-04T13:14:53.3309238Z"
  },
  {
    "id": 2,
    "pizzaId": 1,
    "pizza": {
      "id": 1,
      "sabor": "Margherita",
      "tempoPreparo": 15,
      "criadoEm": "2025-06-04T13:08:03.5083728Z"
    },
    "quantidade": 5,
    "criadoEm": "2025-06-04T13:15:28.2239834Z",
    "atualizadoEm": "2025-06-04T13:15:28.2243229Z"
  }
]
```

---

### Obter um estoque por ID

```http
GET {{host}}/estoque/{{id}}
```

#### 404 Not Found

#### 200 OK

```json
{
  "id": 1,
  "pizzaId": 2,
  "pizza": {
    "id": 2,
    "sabor": "Pepperoni",
    "tempoPreparo": 20,
    "criadoEm": "2025-06-04T13:08:03.5084704Z"
  },
  "quantidade": 10,
  "criadoEm": "2025-06-04T13:14:53.3289903Z",
  "atualizadoEm": "2025-06-04T13:14:53.3309238Z"
}
```

---

### Criar um novo estoque de pizzas

```http
POST {{host}}/estoque
Content-Type: application/json

{
  "pizzaId": 2,
  "quantidade": 10
}
```

#### 200 OK

```json
{
  "id": 3,
  "pizzaId": 3,
  "pizza": {
    "id": 3,
    "sabor": "Quatro Queijos",
    "tempoPreparo": 25,
    "criadoEm": "2025-06-04T13:08:03.5084706Z"
  },
  "quantidade": 15,
  "criadoEm": "2025-06-04T13:16:12.8279949Z",
  "atualizadoEm": "2025-06-04T13:16:12.8281499Z"
}
```

---

### Obter o estoque de uma pizza específica

```http
GET {{host}}/estoque/pizza/{{pizzaId}}
```

#### 404 Not Found

#### 200 OK

```json
{
  "id": 2,
  "pizzaId": 1,
  "pizza": {
    "id": 1,
    "sabor": "Margherita",
    "tempoPreparo": 15,
    "criadoEm": "2025-06-04T13:08:03.5083728Z"
  },
  "quantidade": 5,
  "criadoEm": "2025-06-04T13:15:28.2239834Z",
  "atualizadoEm": "2025-06-04T13:15:28.2243229Z"
}
```

---

### Reduzir o estoque de uma pizza específica

```http
PUT {{host}}/estoque/pizza/{{pizzaId}}/{{quantidade}}
```

#### 400 Bad Request

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "An error has occurred.",
  "status": 400,
  "detail": "Estoque insuficiente para a operação.",
  "traceId": "00-1c31461b9c23b7e6c07e0f8a41125b80-8cec152ce4f51f7c-00"
}
```

#### 200 OK

```json
{
  "id": 1,
  "pizzaId": 2,
  "pizza": {
    "id": 2,
    "sabor": "Pepperoni",
    "tempoPreparo": 20,
    "criadoEm": "2025-06-04T13:08:03.5084704Z"
  },
  "quantidade": 9,
  "criadoEm": "2025-06-04T13:14:53.3289903Z",
  "atualizadoEm": "2025-06-04T13:17:13.8857124Z"
}
```
