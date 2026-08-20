Introdução ao Jira
==================

Visão geral
-----------
Jira é uma ferramenta de rastreamento de issues e gerenciamento de projetos muito usada para desenvolvimento de software e operações. Ela organiza o trabalho em projetos, onde cada item rastreável é chamado de "issue" (tarefa, bug, história, épico, etc.).

Conceitos principais
--------------------
- Projeto: agrupamento de issues (por produto, time, ou serviço).
- Issue: unidade de trabalho (tipos comuns: Bug, Task, Story, Epic).
- Workflow: o ciclo de vida das issues (e.g., To Do → In Progress → Done). Transições entre estados podem ser customizadas.
- Campos: título, descrição, prioridade, componentes, etiquetas (labels), responsável (assignee), repórter (reporter).
- Sprint/Board: visão ágil (Kanban/Scrum) para planejar e acompanhar o trabalho.

Como criar uma issue (exemplo rápido)
-------------------------------------
1. Acesse o projeto desejado.
2. Clique em "Criar" (Create) e preencha os campos obrigatórios: tipo, resumo (summary), descrição.
3. Defina prioridade e responsável, se necessário.
4. Salve — a issue será criada com um identificador (e.g., PROJ-123).

Boas práticas
-------------
- Use títulos curtos e descritivos; detalhe requisitos na descrição.
- Separe bugs de tasks e histórias para facilitar priorização.
- Use labels e componentes para categorizar e filtrar issues.
- Mantenha o workflow simples e documentado para o time.

Integração via API (exemplo)
----------------------------
Você pode interagir com o Jira programaticamente usando a REST API. Exemplo de requisição para obter uma issue (autenticação básica com email + API token):

GET /rest/api/3/issue/PROJ-123
Host: your-domain.atlassian.net
Authorization: Basic BASE64(email:apiToken)
Accept: application/json

Em JavaScript (fetch):

```js
fetch('https://your-domain.atlassian.net/rest/api/3/issue/PROJ-123', {
  headers: {
    'Authorization': 'Basic ' + btoa('email:apiToken'),
    'Accept': 'application/json'
  }
})
  .then(r => r.json())
  .then(data => console.log(data))
```

Casos de uso comuns
-------------------
- Reportar e priorizar bugs em produção.
- Planejar sprints e gerenciar backlog.
- Rastrear tarefas operacionais e solicitações de negócio.
- Integrar com CI/CD, Slack e Confluence para automatizar comunicação e documentação.

Próximos passos
----------------
- Se desejar, posso indexar outros documentos (manuais, runbooks) para melhorar a base de conhecimento.
- Também posso incluir exemplos mais técnicos e comandos de integração com a API do Jira para automação.

