Acervinho - Backend (protótipo)
================================

Este diretório contém um protótipo simples de backend em TypeScript + Express + SQLite para a funcionalidade de pesquisa técnica do Acervinho.

Características
- Endpoints:
  - POST /api/docs  -> indexar um documento (title, content). Quando OPENAI_API_KEY está definida, o servidor tenta gerar embeddings e armazená-las.
  - POST /api/search -> buscar por query. Se OPENAI_API_KEY estiver definida e embeddings presentes, usa embeddings + similaridade de cosseno. Caso contrário, faz busca por palavra-chave simples.
  - GET  / -> health

Configuração (local)
1. Instalar dependências:

   cd backend
   npm install

2. (Opcional) Habilitar OpenAI embeddings:

   - Crie um arquivo .env no diretório backend com a chave:

     OPENAI_API_KEY=sk-xxx

   - Se não fornecer a chave, o backend ainda irá funcionar em modo fallback (pesquisa por palavras-chave).

3. Rodar em modo dev:

   npm run dev

Exemplos de uso

- Indexar um documento:

  curl -X POST http://localhost:4000/api/docs \
    -H "Content-Type: application/json" \
    -d '{"title":"Como reiniciar o serviço X","content":"Para reiniciar o serviço X execute systemctl restart x.service"}'

- Buscar:

  curl -X POST http://localhost:4000/api/search \
    -H "Content-Type: application/json" \
    -d '{"query":"reiniciar serviço","topK":5}'

Observações
- Este é um protótipo leve pensado para testes e pequenos volumes. Para produção recomenda-se:
  - armazenar embeddings em um índice vetorial (e.g., Pinecone, Milvus, pgvector),
  - proteger a API (autenticação, rate limiting),
  - tratar erros e retries para chamadas externas (OpenAI),
  - migração e backup do banco de dados.

Se quiser, eu posso:
- criar scripts para popular a base com documentos de exemplo,
- adicionar endpoints para gerenciar (listar/remover) documentos,
- implementar um servidor de autenticação básico para proteger a API.

