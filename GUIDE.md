# Metronomo Setlist App - Guia de Configuração

## 🚀 Primeiros Passos

### 1. Configurar TypeScript

O TypeScript já está configurado no `tsconfig.json` com:
- Target ES2020
- Strict mode ativado
- Path aliases para `@/*`
- Suporte para Next.js

### 2. Configurar Next.js

O Next.js está configurado em `next.config.js` com:
- PWA habilitado
- Roteamento de arquivos baseado em `app/`
- Configuração de produção otimizada

### 3. Instalar Dependências

```bash
npm install
```

Dependências principais:
- `react` + `react-dom` - UI framework
- `next` - Framework React
- `next-pwa` - PWA capabilities
- `typescript` - Type safety
- `@types/*` - TypeScript definitions

## 📦 Instalar Ícones (Opcional)

### Método 1: Usando Sharp (Recomendado)

```bash
npm install sharp
```

Depois, converter os ícones:
```bash
node scripts/generate-png-icons.js
```

### Método 2: Usar SVG Direto

Os ícones SVG já estão configurados no manifest.json:
```json
{
  "src": "/icon-192.svg",
  "sizes": "192x192",
  "type": "image/svg+xml"
}
```

### Método 3: Converter Manualmente

```bash
# Instalar SVGOMG
npm install -g svg2svg

# Converter ícones
svg2svg icon-192.svg --out public/ --prefix icon-192
svg2svg icon-512.svg --out public/ --prefix icon-512
```

## 🎯 Modo Desenvolvimento

### Iniciar servidor de desenvolvimento

```bash
npm run dev
```

O servidor vai rodar em:
- **Local:** `http://localhost:3000`
- **Network:** `http://[seu-ip]:3000`

### Ativar Recursos de PWA

1. **Serviços para desenvolvimento:**
   - O next-pwa vai registrar automaticamente
   - Service Worker no background

2. **Para testar PWA:**
   - Abra no Chrome
   - Ferramentas Dev (F12)
   - Aplicativo > Service Workers
   - Você deve ver o service worker registrado

3. **Teste no celular:**
   - Certifique-se de que seu celular e PC estão na mesma rede
   - Acesse `http://[seu-ip]:3000` no celular
   - Instale como app PWA

## 🏗️ Modo Produção

### Build para produção

```bash
npm run build
```

Isso vai:
- Compilar TypeScript
- Otimizar imagens
- Gerar service worker
- Criar artefatos de build

### Rodar produção local

```bash
npm start
```

O build será servido com otimizações de produção.

### Deploy em produção

#### Deploy com Vercel (Recomendado)

```bash
# Instalar CLI
npm install -g vercel

# Deploy
vercel
```

#### Deploy com Netlify

```bash
# Instalar CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=.next
```

#### Deploy com Docker

```bash
# Criar Dockerfile
docker build -t metronomo-setlist .

# Rodar
docker run -p 3000:3000 metronomo-setlist
```

## 🧪 Testes

### Teste do Metrônomo

1. Abra o app
2. Clique em "Iniciar"
3. Ajuste o BPM com o slider
4. Escolha subdivisão
5. Ajuste afinação
6. Teste acentos especiais
7. Teste vibração

### Teste do Setlist

1. Abra painel de setlist
2. Adicione música
3. Teste edição
4. Teste exclusão
5. Teste exportação/importação
6. Teste carga rápida

### Teste PWA

1. Instale como app
2. Verifique que funciona offline
3. Verifique fullscreen mode
4. Teste ícone na Home Screen

## 🐛 Debugging

### Erros comuns

**Error: Module not found**
```bash
npm install
```

**Error: TypeScript types**
```bash
npm install -D @types/react @types/node @types/react-dom
```

**PWA não funciona**
- Verifique manifest.json
- Verifique service worker em public/sw.js
- Limpe cache do navegador

### Logs de desenvolvimento

```bash
# Logs do servidor
npm run dev

# Logs do build
npm run build

# Logs de linting
npm run lint
```

## 📊 Métricas de Desempenho

### Performance Targets

- **Primeira renderização:** < 2s
- **Time to interactive:** < 5s
- **Largest Contentful Paint:** < 1s
- **Memory usage:** < 200MB

### Monitoramento

```bash
# Ativar performance profiling
NODE_OPTIONS='--inspect' npm run dev

# Usar React DevTools
# Chrome > F12 > React Tab
```

## 🔒 Segurança

### Configurações de segurança

- **CSP (Content Security Policy):** Configure no next.config.js
- **Headers:** Otimizados automaticamente pelo Next.js
- **CORS:** Não configurado (só frontend)

### Otimizações de segurança

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ]
      }
    ]
  }
}
```

## 📝 Maintenance

### Atualizações

```bash
# Atualizar dependências
npm update

# Verificar vulnerabilidades
npm audit
npm audit fix
```

### Limpar cache

```bash
# Limpar node_modules
rm -rf node_modules package-lock.json

# Reinstalar
npm install
```

## 🎓 Próximos Passos

1. **Testar funcionais:**
   - Metrônomo
   - Setlist
   - PWA

2. **Melhorar performance:**
   - Otimize assets
   - Implement lazy loading
   - Otimiza imagens

3. **Adicionar features:**
   - Timer de prática
   - Estatísticas
   - Presets

4. **Deploy:**
   - Vercel / Netlify
   - Configure custom domain
   - Setup analytics

## 💡 Dicas Avançadas

### Performance

```javascript
// Use React.memo para componentes estáticos
const StaticComponent = React.memo(({ data }) => {
  return <div>{data}</div>
})

// Implement lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

### TypeScript

```typescript
// Type guards
function isMetronomeConfig(obj: any): obj is MetronomeConfig {
  return obj.bpm && obj.subdivision && obj.pitch
}

// Optional chaining
const bpm = metronome?.config?.bpm ?? 120
```

### PWA Service Worker

```javascript
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/manifest.json',
        '/icon-192.svg',
        '/icon-512.svg'
      ])
    })
  )
})
```

---

Desenvolvido com Next.js 14, TypeScript e Web Audio API
