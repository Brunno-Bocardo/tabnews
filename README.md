# tabnews

Implementação do Tabnews


### comandos do docker
- `docker compose up`
- `docker compose up -d`
- `docker compose up -d --force-recreate`
- `docker compose -f infra/compose.yaml up` -> pra quando o arquivo está dentro de uma pasta
    - esse comando pode ser combiado com -d e todos os outros acima
- `docker compose down`
- `docker compose -f infra/compose.yaml down`
- `docker ps`
- `docker ps -a`
- `docker logs`


### comandos do banco de dados
- `sudo apt install postgresql-client` -> instala o client
- deve ser configurado o `compose.yaml`
- `psql --host=localhost --username=local_user --port=5432`
