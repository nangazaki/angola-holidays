# 🇦🇴 Angola Holidays

Uma API REST moderna e rápida para consultar **feriados nacionais**. Construída com Hono.js, TypeScript e otimizada para deploy serverless na Vercel.

## ✨ Características

- **Ultra rápida** - Construída com Hono.js para máxima performance
- **Multilíngue** - Suporte para Português e Inglês
- **RESTful** - API simples e intuitiva
- **Serverless** - Deploy instantâneo na Vercel
- **Segura** - Rate limiting e headers de segurança
- **Tipada** - 100% TypeScript com validação de dados
- **Leve** - Zero dependências desnecessárias

## 🌍 Demo ao Vivo

**Base URL**: `https://angola-holidays.nangazaki.io`

Experimente a API diretamente:
- [Listar todos os feriados de 2025](https://angola-holidays.nangazaki.io/holidays?year=2025)
- [Próximos feriados](https://angola-holidays.nangazaki.io/upcoming?days=30)
- [Verificar se hoje é feriado](https://angola-holidays.nangazaki.io/holidays/check?date=2025-01-01)

## 📚 Documentação da API

### Base URL
```
https://angola-holidays.nangazaki.io
```

### Endpoints Disponíveis

#### 🏠 Informações da API
```http
GET /
```
Retorna informações básicas sobre a API e documentação.

#### 📅 Listar Feriados
```http
GET /holidays?year=2025&lang=pt
```

**Parâmetros:**
- `year` (opcional) - Ano desejado (padrão: ano atual)
- `lang` (opcional) - Idioma da resposta: `pt` ou `en` (padrão: `pt`)

**Exemplo de resposta:**
```json
{
  "status": "success",
  "timestamp": "2025-09-22T10:30:00.000Z",
  "data": {
    "year": 2025,
    "count": 13,
    "holidays": [
      {
        "name": "Ano Novo",
        "date": "2025-01-01",
        "type": "national",
        "description": "Primeiro dia do ano civil"
      }
    ]
  }
}
```

#### 🔮 Próximos Feriados
```http
GET /upcoming?days=30&lang=pt
```

**Parâmetros:**
- `days` (opcional) - Número de dias a partir de hoje (1-365, padrão: 30)
- `lang` (opcional) - Idioma da resposta: `pt` ou `en`

**Exemplo de resposta:**
```json
{
  "status": "success",
  "timestamp": "2025-09-22T10:30:00.000Z",
  "data": {
    "days": 30,
    "fromDate": "2025-09-22",
    "count": 2,
    "upcoming": [
      {
        "name": "Dia da Independência",
        "date": "2025-11-11",
        "daysUntil": 50
      }
    ]
  }
}
```

#### ✅ Verificar Data
```http
GET /holidays/check?date=2025-01-01&lang=pt
```

**Parâmetros:**
- `date` (obrigatório) - Data no formato `YYYY-MM-DD`
- `lang` (opcional) - Idioma da resposta: `pt` ou `en`

**Exemplo de resposta:**
```json
{
  "status": "success",
  "timestamp": "2025-09-22T10:30:00.000Z",
  "data": {
    "date": "2025-01-01",
    "isHoliday": true,
    "name": "Ano Novo",
    "type": "national"
  }
}
```

#### 🏥 Health Check
```http
GET /health
```

Endpoint para verificar a saúde da API.

### 📝 Códigos de Resposta

| Código | Descrição |
|--------|-----------|
| `200` | Sucesso |
| `400` | Parâmetros inválidos |
| `404` | Recurso não encontrado |
| `429` | Rate limit excedido |
| `500` | Erro interno do servidor |

### ⚡ Rate Limiting

- **Limite**: 100 requisições por 10 minutos por IP
- **Headers informativos**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## 🚀 Uso Rápido

### JavaScript/TypeScript
```javascript
const response = await fetch('https://angola-holidays.nangazaki.io/holidays?year=2025');
const data = await response.json();
console.log(data.data.holidays);
```

### Python
```python
import requests

response = requests.get('https://angola-holidays.nangazaki.io/holidays?year=2025')
holidays = response.json()['data']['holidays']
print(holidays)
```

### cURL
```bash
curl "https://angola-holidays.nangazaki.io/holidays?year=2025&lang=en"
```

## 📖 Feriados Incluídos

A API inclui todos os **feriados nacionais oficiais** de Angola incluindo as respectivas pontes:

### Feriados Fixos
- Ano Novo (1º de Janeiro)
- Dia dos Mártires da Repressão Colonial (4 de Janeiro)
- Dia da Mulher Angolana (8 de Março)
- Dia da Paz e Reconciliação Nacional (4 de Abril)
- Dia do Trabalhador (1º de Maio)
- Dia da Independência (11 de Novembro)
- Dia do Pioneiro e Juventude (1º de Dezembro)
- Dia do Fundador da Nação/Família (17 de Dezembro)
- Natal (25 de Dezembro)

### Feriados Móveis
- Carnaval (47 dias antes da Páscoa)
- Sexta-feira Santa (sexta-feira antes da Páscoa)
- Páscoa (primeiro domingo após a lua cheia do equinócio da primavera)

## 🛠️ Desenvolvimento

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone https://github.com/nangazaki/angola-holidays.git

# Entrar no diretório
cd angola-holidays

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build para produção
npm run type-check # Verificar tipos TypeScript
npm run lint       # Executar linter
npm run test       # Executar testes
```

### Estrutura do Projeto
```
angola-holidays/
├── src/
│   ├── data/           # Dados dos feriados
│   ├── helpers/        # Funções auxiliares
│   ├── middleware/     # Middlewares personalizados
│   ├── routes/         # Definição das rotas
│   ├── schemas/        # Validação de dados (Zod)
│   ├── services/       # Lógica de negócio
│   └── types/          # Definições TypeScript
├── api/
│   └── index.ts        # Entry point para Vercel
├── tsconfig.json       # Configuração TypeScript
├── vercel.json         # Configuração Vercel
└── package.json
```

## 🚀 Deploy

### Vercel (Recomendado)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnangazaki%2Fangola-holidays)

Ou via CLI:
```bash
npm install -g vercel
vercel --prod
```

### Outras Plataformas
- **Netlify**: Funciona com adaptações
- **Railway**: Deploy direto do GitHub
- **Render**: Compatível com Node.js

## 🤝 Contribuição

Contribuições são muito bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Reportar Bugs
Encontrou um bug? [Abra uma issue](https://github.com/nangazaki/angola-holidays/issues) com:
- Descrição detalhada do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)

### Solicitar Features
Tem uma ideia? [Abra uma issue](https://github.com/nangazaki/angola-holidays/issues) com:
- Descrição da feature
- Justificativa/caso de uso
- Possível implementação

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Helder Cambuta** - [@nangazaki](https://github.com/nangazaki)


## 📊 Status do Projeto

- ✅ API básica funcionando
- ✅ Todos os feriados nacionais incluídos
- ✅ Suporte multilíngue (PT/EN)
- ✅ Rate limiting e segurança
- ✅ Documentação completa
- ✅ Deploy automático
- 🔄 Testes automatizados (em progresso)
- 🔄 Cache inteligente (planejado)
- 🔄 Webhook para notificações (planejado)

---

<div align="center">

**🇦🇴 Feito com ❤️ para Angola**

[API Docs](https://angola-holidays.nangazaki.io) • [GitHub](https://github.com/nangazaki/angola-holidays) • [Issues](https://github.com/nangazaki/angola-holidays/issues)

</div>