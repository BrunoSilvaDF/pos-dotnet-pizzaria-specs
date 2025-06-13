#!/bin/bash
# Roda os testes usando Docker no Bash
docker run --rm --network="host" --env-file .env.example brunoosilva/ms-teste:latest
