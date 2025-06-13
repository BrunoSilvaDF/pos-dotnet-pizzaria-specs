require("dotenv").config();

// Testes de integração para os endpoints de Notificações usando axios
const axios = require("axios");
const guid = require("guid");
const { faker } = require("@faker-js/faker");

const API_GATEWAY_URL = process.env.API_GATEWAY_URL || "http://nao-definido";

const NOTIFICACOES_URL = `${API_GATEWAY_URL}/notificacoes`;
const SMTP_SWAGGER_URL = process.env.SMTP_SWAGGER_URL || "http://nao-definido";

describe("Notificações API", () => {
  it("Health Checks", async () => {
    const res = await axios.get(`${NOTIFICACOES_URL}/health`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Healthy");
  });
  it("deve cadastrar uma notificação", async () => {
    const payload = {
      destinatario: faker.internet.email(),
      mensagem: faker.internet.exampleEmail(),
      pedidoId: guid.raw(),
    };
    const res = await axios.post(`${NOTIFICACOES_URL}/notificacao`, payload);
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
    expect(res.data).toHaveProperty("id");
    expect(res.data.destinatario).toBe(payload.destinatario);
    expect(res.data.mensagem).toBe(payload.mensagem);
    expect(res.data.criadoEm).toBeDefined();
    expect(res.data.pedidoId).toBe(payload.pedidoId);
  });

  it("deve obter todas as notificações", async () => {
    const notificacao = (
      await axios.post(`${NOTIFICACOES_URL}/notificacao`, {
        destinatario: faker.internet.email(),
        mensagem: faker.internet.exampleEmail(),
        pedidoId: guid.raw(),
      })
    ).data;
    const res = await axios.get(`${NOTIFICACOES_URL}/notificacao`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    const notificacaoFound = res.data.find((n) => n.id === notificacao.id);
    expect(notificacaoFound).toBeDefined();
    expect(notificacaoFound.id).toBe(notificacao.id);
    expect(notificacaoFound.destinatario).toBe(notificacao.destinatario);
    expect(notificacaoFound.mensagem).toBe(notificacao.mensagem);
    expect(notificacaoFound.pedidoId).toBe(notificacao.pedidoId);
    expect(notificacaoFound.criadoEm).toBeDefined();
  });

  it("deve obter uma notificação pelo id do pedido", async () => {
    const notificacao = (
      await axios.post(`${NOTIFICACOES_URL}/notificacao`, {
        destinatario: faker.internet.email(),
        mensagem: faker.internet.exampleEmail(),
        pedidoId: guid.raw(),
      })
    ).data;
    const res = await axios.get(
      `${NOTIFICACOES_URL}/notificacao/pedido/${notificacao.pedidoId}`
    );
    expect(res.status).toBe(200);
    expect(res.data).toMatchObject({
      id: notificacao.id,
      destinatario: notificacao.destinatario,
      mensagem: notificacao.mensagem,
      pedidoId: notificacao.pedidoId,
      criadoEm: notificacao.criadoEm,
    });
  });

  it("deve enviar um email de notificação", async () => {
    const notificacao = (
      await axios.post(`${NOTIFICACOES_URL}/notificacao`, {
        destinatario: faker.internet.email(),
        mensagem: faker.internet.exampleEmail(),
        pedidoId: guid.raw(),
      })
    ).data;

    const res = await axios.get(`${SMTP_SWAGGER_URL}/emails?page=0&size=200`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data.content)).toBe(true);
    expect(res.data.content.length).toBeGreaterThan(0);
    const email = res.data.content.find(
      (email) => email.toAddress === notificacao.destinatario
    );
    expect(email).toBeDefined();
    expect(email.subject).toBe(`Seu pedido ${notificacao.pedidoId}`);
    expect(email.contents[0].data).toBe(notificacao.mensagem);
  });
});
