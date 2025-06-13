require("dotenv").config();

const axios = require("axios");
const { faker } = require("@faker-js/faker");

const API_GATEWAY_URL = process.env.API_GATEWAY_URL || "http://nao-definido";

const PEDIDOS_URL =
  `${API_GATEWAY_URL}/pedidos` || "http://nao-definido/pedidos";
const PIZZA_URL = `${API_GATEWAY_URL}/pizzas` || "http://nao-definido/pizzas";
const NOTIFICACOES_URL =
  `${API_GATEWAY_URL}/notificacoes` || "http://nao-definido/notificacoes";

const cadastrarPizza = async (sabor, tempoPreparo) => {
  return (
    await axios.post(`${PIZZA_URL}/sabor`, {
      sabor,
      tempoPreparo,
    })
  ).data;
};

const cadastrarEstoque = async (pizzaId, quantidade) => {
  return (
    await axios.post(`${PIZZA_URL}/estoque`, {
      pizzaId,
      quantidade,
    })
  ).data;
};

describe("Pedidos API", () => {
  it("Health Checks", async () => {
    const res = await axios.get(`${PEDIDOS_URL}/health`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Healthy");
  });

  it("deve cadastrar um pedido", async () => {
    const pizza = await cadastrarPizza(
      faker.food.dish(),
      faker.number.int({ min: 10, max: 60 })
    );
    const estoque = await cadastrarEstoque(
      pizza.id,
      faker.number.int({ min: 1, max: 10 })
    );

    const payload = {
      cliente: faker.internet.email(),
      pizzaId: pizza.id,
      quantidade: 1,
    };

    const res = await axios.post(`${PEDIDOS_URL}/pedido`, payload);
    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty("id");
    expect(res.data.cliente).toBe(payload.cliente);
    expect(res.data.pizzaId).toBe(payload.pizzaId);
    expect(res.data.quantidade).toBe(payload.quantidade);
    expect(res.data.situacaoId).toBe(0);
    expect(res.data.situacao).toBe("Recebido");

    // Verifica se o estoque foi atualizado
    const estoqueAtualizado = (
      await axios.get(`${PIZZA_URL}/estoque/${estoque.id}`)
    ).data;
    expect(estoqueAtualizado.quantidade).toBe(
      estoque.quantidade - payload.quantidade
    );

    // Verifica se houve notificação
    const notificacaoRes = await axios.get(
      `${NOTIFICACOES_URL}/notificacao/pedido/${res.data.id}`
    );
    expect(notificacaoRes.status).toBe(200);
    expect(notificacaoRes.data).toHaveProperty("id");
    expect(notificacaoRes.data.destinatario).toBe(payload.cliente);
    expect(notificacaoRes.data).toHaveProperty("mensagem");
    expect(notificacaoRes.data.pedidoId).toBe(res.data.id);
  });

  it("deve obter um pedido pelo ID", async () => {
    const pizza = await cadastrarPizza(
      faker.food.dish(),
      faker.number.int({ min: 10, max: 60 })
    );
    await cadastrarEstoque(pizza.id, faker.number.int({ min: 1, max: 60 }));

    const pedidoCriado = (
      await axios.post(`${PEDIDOS_URL}/pedido`, {
        cliente: faker.internet.email(),
        pizzaId: pizza.id,
        quantidade: 2,
      })
    ).data;

    const res = await axios.get(`${PEDIDOS_URL}/pedido/${pedidoCriado.id}`);
    expect(res.status).toBe(200);
    expect(res.data).toMatchObject({
      id: pedidoCriado.id,
      cliente: pedidoCriado.cliente,
      pizzaId: pedidoCriado.pizzaId,
      quantidade: pedidoCriado.quantidade,
      situacaoId: 0,
      situacao: "Recebido",
    });
  });

  it("deve retornar 404 ao buscar pedido inexistente", async () => {
    try {
      await axios.get(
        `${PEDIDOS_URL}/pedido/00000000-0000-0000-0000-000000000000`
      );
      fail("Deveria ter lançado um erro 404");
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  it("deve obter todos os pedidos", async () => {
    const pizza = await cadastrarPizza(
      faker.food.dish(),
      faker.number.int({ min: 10, max: 60 })
    );
    await cadastrarEstoque(pizza.id, faker.number.int({ min: 1, max: 10 }));
    const pedido1 = (
      await axios.post(`${PEDIDOS_URL}/pedido`, {
        cliente: faker.internet.email(),
        pizzaId: pizza.id,
        quantidade: 1,
      })
    ).data;
    const pedido2 = (
      await axios.post(`${PEDIDOS_URL}/pedido`, {
        cliente: faker.internet.email(),
        pizzaId: pizza.id,
        quantidade: 1,
      })
    ).data;
    const res = await axios.get(`${PEDIDOS_URL}/pedido`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThanOrEqual(2);
    const pedidosEncontrados = res.data.filter(
      (p) => p.id === pedido1.id || p.id === pedido2.id
    );
    expect(pedidosEncontrados.length).toBe(2);
    expect(pedidosEncontrados[0].cliente).toBe(pedido1.cliente);
    expect(pedidosEncontrados[0].pizzaId).toBe(pedido1.pizzaId);
    expect(pedidosEncontrados[0].quantidade).toBe(pedido1.quantidade);
    expect(pedidosEncontrados[1].cliente).toBe(pedido2.cliente);
    expect(pedidosEncontrados[1].pizzaId).toBe(pedido2.pizzaId);
    expect(pedidosEncontrados[1].quantidade).toBe(pedido2.quantidade);
  });
});
