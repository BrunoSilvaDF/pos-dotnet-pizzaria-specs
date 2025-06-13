require("dotenv").config();

const API_GATEWAY_URL = process.env.API_GATEWAY_URL || "http://nao-definido";

const axios = require("axios");
const { faker } = require("@faker-js/faker");

const PIZZA_URL = `${API_GATEWAY_URL}/pizzas` || "http://nao-definido/pizzas";

describe("PizzaService API", () => {
  it("Health Checks", async () => {
    const res = await axios.get(`${PIZZA_URL}/health`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Healthy");
  });

  describe("Pizzas", () => {
    it("deve cadastrar uma pizza", async () => {
      const payload = {
        sabor: faker.food.dish(),
        tempoPreparo: faker.number.int({ min: 10, max: 60 }),
      };
      const res = await axios.post(`${PIZZA_URL}/sabor`, payload);
      expect(res.status).toBe(201);
      expect(res.data).toHaveProperty("id");
      expect(res.data.sabor).toBe(payload.sabor);
      expect(res.data.tempoPreparo).toBe(payload.tempoPreparo);
      expect(res.data).toHaveProperty("criadoEm");
    });

    it("deve obter todas as pizzas", async () => {
      const pizza = (
        await axios.post(`${PIZZA_URL}/sabor`, {
          sabor: faker.food.dish(),
          tempoPreparo: faker.number.int({ min: 10, max: 60 }),
        })
      ).data;
      const res = await axios.get(`${PIZZA_URL}/sabor`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.data)).toBe(true);
      expect(res.data.length).toBeGreaterThan(0);
      const foundPizza = res.data.find((p) => p.id === pizza.id);
      expect(foundPizza).toBeDefined();
      expect(foundPizza.id).toBe(pizza.id);
      expect(foundPizza.sabor).toBe(pizza.sabor);
      expect(foundPizza.tempoPreparo).toBe(pizza.tempoPreparo);
      expect(foundPizza.criadoEm).toBe(pizza.criadoEm);
    });

    it("deve obter uma pizza por id", async () => {
      const pizza = (
        await axios.post(`${PIZZA_URL}/sabor`, {
          sabor: faker.food.dish(),
          tempoPreparo: faker.number.int({ min: 10, max: 60 }),
        })
      ).data;
      const res = await axios.get(`${PIZZA_URL}/sabor/${pizza.id}`);
      expect(res.status).toBe(200);
      expect(res.data).toMatchObject({
        id: pizza.id,
        sabor: pizza.sabor,
        tempoPreparo: pizza.tempoPreparo,
        criadoEm: pizza.criadoEm,
      });
    });

    it("deve retornar 404 caso o id da pizza nao exista", async () => {
      try {
        await axios.get(`${PIZZA_URL}/sabor/999999`);
        fail("Deveria ter lançado um erro 404");
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });
  });

  describe("Estoque", () => {
    it("deve criar um novo estoque", async () => {
      const pizza = (
        await axios.post(`${PIZZA_URL}/sabor`, {
          sabor: faker.food.dish(),
          tempoPreparo: faker.number.int({ min: 10, max: 60 }),
        })
      ).data;
      const pizzaId = pizza.id;
      const payload = { pizzaId, quantidade: 99 };
      const res = await axios.post(`${PIZZA_URL}/estoque`, payload);
      expect(res.status).toBe(201);
      expect(res.data).toHaveProperty("id");
      expect(res.data.pizzaId).toBe(pizzaId);
      expect(res.data.quantidade).toBe(payload.quantidade);
      expect(res.data).toHaveProperty("criadoEm");
      expect(res.data).toHaveProperty("atualizadoEm");
      expect(res.data.pizza).toHaveProperty("id", pizzaId);
    });

    it("deve obter todos os estoques", async () => {
      const pizza = (
        await axios.post(`${PIZZA_URL}/sabor`, {
          sabor: faker.food.dish(),
          tempoPreparo: faker.number.int({ min: 10, max: 60 }),
        })
      ).data;
      const estoque = (
        await axios.post(`${PIZZA_URL}/estoque`, {
          pizzaId: pizza.id,
          quantidade: 99,
        })
      ).data;
      const res = await axios.get(`${PIZZA_URL}/estoque`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.data)).toBe(true);
      expect(res.data.length).toBeGreaterThan(0);
      const foundEstoque = res.data.find((e) => e.id === estoque.id);
      expect(foundEstoque).toBeDefined();
      expect(foundEstoque.id).toBe(estoque.id);
      expect(foundEstoque.pizzaId).toBe(pizza.id);
      expect(foundEstoque.quantidade).toBe(estoque.quantidade);
      expect(foundEstoque.criadoEm).toBe(estoque.criadoEm);
      expect(foundEstoque.atualizadoEm).toBe(estoque.atualizadoEm);
      expect(foundEstoque.pizza).toMatchObject({
        id: pizza.id,
        sabor: pizza.sabor,
        tempoPreparo: pizza.tempoPreparo,
        criadoEm: pizza.criadoEm,
      });
    });

    it("deve obter um estoque por id", async () => {
      const pizza = (
        await axios.post(`${PIZZA_URL}/sabor`, {
          sabor: faker.food.dish(),
          tempoPreparo: faker.number.int({ min: 10, max: 60 }),
        })
      ).data;
      const estoque = (
        await axios.post(`${PIZZA_URL}/estoque`, {
          pizzaId: pizza.id,
          quantidade: 99,
        })
      ).data;

      const res = await axios.get(`${PIZZA_URL}/estoque/${estoque.id}`);

      expect(res.status).toBe(200);
      expect(res.data).toMatchObject(estoque);
    });

    it("deve retornar 404 caso o id do estoque nao exista", async () => {
      try {
        await axios.get(`${PIZZA_URL}/estoque/999999`);
        fail("Deveria ter lançado um erro 404");
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });

    it("deve obter um estoque pelo id da pizza", async () => {
      const pizza = (
        await axios.post(`${PIZZA_URL}/sabor`, {
          sabor: faker.food.dish(),
          tempoPreparo: faker.number.int({ min: 10, max: 60 }),
        })
      ).data;
      const pizzaId = pizza.id;
      const estoque = (
        await axios.post(`${PIZZA_URL}/estoque`, {
          pizzaId,
          quantidade: 10,
        })
      ).data;
      const res = await axios.get(
        `${PIZZA_URL}/estoque/pizza/${estoque.pizzaId}`
      );
      expect(res.status).toBe(200);
      expect(res.data.pizzaId).toBe(estoque.pizzaId);
      expect(res.data.pizza).toHaveProperty("id", estoque.pizzaId);
    });

    it("deve reduzir o estoque de pizza", async () => {
      const pizza = (
        await axios.post(`${PIZZA_URL}/sabor`, {
          sabor: faker.food.dish(),
          tempoPreparo: faker.number.int({ min: 10, max: 60 }),
        })
      ).data;
      const pizzaId = pizza.id;
      const estoque = (
        await axios.post(`${PIZZA_URL}/estoque`, {
          pizzaId,
          quantidade: faker.number.int({ min: 10, max: 60 }),
        })
      ).data;
      const res = await axios.put(`${PIZZA_URL}/estoque/pizza/${pizzaId}/1`);
      expect(res.status).toBe(200);
      expect(res.data.pizzaId).toBe(pizzaId);
      expect(res.data.quantidade).toBe(estoque.quantidade - 1);
    });

    it("deve retornar 400 ao tentar reduzir estoque caso nao haja", async () => {
      const pizza = (
        await axios.post(`${PIZZA_URL}/sabor`, {
          sabor: faker.food.dish(),
          tempoPreparo: faker.number.int({ min: 10, max: 60 }),
        })
      ).data;
      (
        await axios.post(`${PIZZA_URL}/estoque`, {
          pizzaId: pizza.id,
          quantidade: faker.number.int({ min: 1, max: 10 }),
        })
      ).data;
      try {
        await axios.put(
          `${PIZZA_URL}/estoque/pizza/${pizza.id}/${faker.number.int({
            min: 11,
            max: 20,
          })}`
        );
        fail("Deveria ter lançado um erro 400");
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });
  });
});
