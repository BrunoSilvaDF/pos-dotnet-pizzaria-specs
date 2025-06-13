# Aplicação de Microsserviços de Pizzaria

Esta é uma aplicação de exemplo que simula um sistema de pedidos de pizzas utilizando microsserviços. A arquitetura é baseada em Docker e Docker Compose, permitindo fácil configuração e escalabilidade.

## Tecnologias Utilizadas

- **.NET 8**: Framework principal para desenvolvimento dos microsserviços. [Documentação](https://docs.microsoft.com/dotnet/core/)
- **ASP.NET Core**: Framework web utilizado para construir os microsserviços. [Documentação](https://docs.microsoft.com/aspnet/core/)
- **Entity Framework Core**: ORM utilizado para interagir com o banco de dados. [Documentação](https://docs.microsoft.com/ef/core/)
- **Yarp**: Biblioteca para roteamento reverso, utilizada no API Gateway. [Documentação](https://github.com/dotnet/yarp)
- **Steeltoe**: Biblioteca para integração com Consul e Jaeger. [Documentação](https://steeltoe.io/)
- **OpenTelemetry**: Biblioteca para instrumentação e rastreamento distribuído. [Documentação](https://opentelemetry.io/docs/)
- **Docker**: Para containerização dos microsserviços. [Documentação](https://docs.docker.com/)
- **Docker Compose**: Para orquestração dos containers. [Documentação](https://docs.docker.com/compose/)

## Microsserviços

- **API Gateway**: Ponto de entrada para todos os microsserviços, gerenciando as requisições e roteando-as para os serviços apropriados.
- **Pizza Service**: Gerencia os sabores de pizzas disponíveis. [Documentação](./docs/pizza-service.md)
- **Pedidos Service**: Gerencia os pedidos de pizzas, incluindo a criação e consulta de pedidos. [Documentação](./docs/pedidos-service.md)
- **Notificacoes Service**: Gerencia as notificações enviadas aos clientes sobre o status dos pedidos. [Documentação](./docs/notificacoes-service.md)

## Aplicações

- **Consul**: Utilizado para descoberta de serviços e configuração distribuída. [Documentação](https://www.consul.io/docs)
- **Jaeger**: Utilizado para rastreamento distribuído, permitindo visualizar o fluxo de requisições entre os microsserviços. [Documentação](https://www.jaegertracing.io/docs/)
- **Fake Smtp Server**: Simula um servidor SMTP para testes de envio de e-mails sem necessidade de configuração real. [Documentação](https://github.com/gessnerfl/fake-smtp-server)

## Subindo a aplicação

Para subir a aplicação, você precisa ter o Docker e o Docker Compose instalados. Após isso, execute o seguinte comando no terminal:

```bash
docker compose up -d
```

## Testando a aplicação

Utilize os arquivos de exemplo na pasta **http** para testar os endpoints dos microsserviços. Você pode usar ferramentas como Postman ou cURL para enviar requisições HTTP.

## Rodando os testes de integração automatizados

Rode os arquivos `test.ps1` (PowerShell) ou `test.sh` (Linux) para testar a aplicação, ou execute o seguinte comando:

```bash
docker run --rm --network="host" --env-file .env.example brunoosilva/ms-teste
```
