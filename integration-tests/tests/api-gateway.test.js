require("dotenv").config();

// Testes de integração para os endpoints de Notificações usando axios
const axios = require("axios");

const API_GATEWAY_URL = process.env.API_GATEWAY_URL || "http://nao-definido";

describe("API Gateway", () => {
  it("Health Checks", async () => {
    const res = await axios.get(`${API_GATEWAY_URL}/health`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Healthy");
  });

  describe("Notificações", () => {
    it("deve subir na url correta", async () => {
      const res = await axios.get(`${API_GATEWAY_URL}/notificacoes/health`);
      expect(res.status).toBe(200);
      expect(res.data).toBe("Healthy");
    });
    it("deve retornar o Swagger do serviço de Notificações", async () => {
      const NOTIFICACOES_SWAGGER_URL = `${API_GATEWAY_URL}/notificacoes/swagger`;
      const swagger = await axios.get(NOTIFICACOES_SWAGGER_URL);
      expect(swagger.status).toBe(200);
      const swaggerJson = await axios.get(
        `${NOTIFICACOES_SWAGGER_URL}/v1/swagger.json`
      );
      expect(swaggerJson.status).toBe(200);
      expect(swaggerJson.data).toHaveProperty("info");
      expect(swaggerJson.data.info.title).toBe("NotificacoesService");
    });
  });
  describe("Pedidos", () => {
    it("deve subir na url correta", async () => {
      const res = await axios.get(`${API_GATEWAY_URL}/pedidos/health`);
      expect(res.status).toBe(200);
      expect(res.data).toBe("Healthy");
    });
    it("deve retornar o Swagger do serviço de Pedidos", async () => {
      const PEDIDOS_SWAGGER_URL = `${API_GATEWAY_URL}/pedidos/swagger`;
      const swagger = await axios.get(PEDIDOS_SWAGGER_URL);
      expect(swagger.status).toBe(200);
      const swaggerJson = await axios.get(
        `${PEDIDOS_SWAGGER_URL}/v1/swagger.json`
      );
      expect(swaggerJson.status).toBe(200);
      expect(swaggerJson.data).toHaveProperty("info");
      expect(swaggerJson.data.info.title).toBe("PedidosService");
    });
  });
  describe("Pizzas", () => {
    it("deve subir na url correta", async () => {
      const res = await axios.get(`${API_GATEWAY_URL}/pizzas/health`);
      expect(res.status).toBe(200);
      expect(res.data).toBe("Healthy");
    });
    it("deve retornar o Swagger do serviço de Pizzas", async () => {
      const PIZZAS_SWAGGER_URL = `${API_GATEWAY_URL}/pizzas/swagger`;
      const res = await axios.get(PIZZAS_SWAGGER_URL);
      expect(res.status).toBe(200);
      const swaggerJson = await axios.get(
        `${PIZZAS_SWAGGER_URL}/v1/swagger.json`
      );
      expect(swaggerJson.status).toBe(200);
      expect(swaggerJson.data).toHaveProperty("info");
      expect(swaggerJson.data.info.title).toBe("PizzaService");
    });
  });


  
 
  
});