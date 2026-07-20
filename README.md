# Metronomo Setlist App

## 🚀 Instruções de Instalação

### Pré-requisitos
- Node.js 18 ou superior
- npm ou yarn

### Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Criar ícones do PWA:**
```bash
npm install -g svg-icons
svg-icons public/icon-192.svg public/icon-512.svg --out=public/
```

3. **Iniciar o desenvolvimento:**
```bash
npm run dev
```

4. **Abrir no navegador:**
```
http://localhost:3000
```

5. **Instalar como PWA:**
   - No Chrome/Edge: Usar "Adicionar à Tela de Início" (⭐ no endereço)
   - No iOS: Baixar e abrir o site

## 🎵 Funcionalidades

### Metrônomo Core
- ✅ BPM controlado de 20 a 1000
- ✅ Subdivisões: seminote, semicorda, corda, decima-sétima, terça, quinta
- ✅ Control de afinação (100-2000 Hz)
- ✅ Acentos especiais por compasso e batidas
- ✅ Feedback haptic (vibração)

### Setlist
- ✅ Criar, editar e deletar músicas
- ✅ Ordenar itens do setlist
- ✅ Exportar/Importar JSON
- ✅ Notas e instrumento por música
- ✅ Carga rápida de configurações

### UI/UX
- ✅ Design mobile-first
- ✅ Visualizador de compassos
- ✅ Interface responsiva
- ✅ Tema escuro
- ✅ PWA offline-ready

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página inicial
│   └── global.css       # Estilos globais
├── components/
│   ├── MetronomeApp.tsx      # Componente principal
│   ├── MetronomeDisplay.tsx  # Exibição BPM/subdivisões
│   ├── ControlPanel.tsx      # Painel de controles
│   ├── MetronomeVisualizer.tsx # Visualizador de compassos
│   └── SetlistPanel.tsx      # Painel de setlist
├── hooks/
│   ├── useMetronome.ts       # Lógica do metrônomo
│   └── useSetlist.ts         # Lógica do setlist
├── lib/
│   └── setlist.ts            # IndexedDB para setlist
└── types/
    └── index.ts              # Tipos TypeScript
```

## 🎯 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Audio:** Web Audio API
- **Storage:** IndexedDB
- **PWA:** Service Worker + Manifest
- **Estilos:** Tailwind CSS (via CDN para desenvolvimento)

## 🧪 Testando

### Teste do Metrônomo
1. Iniciar metrônomo (botão verde)
2. Ajustar BPM com slider
3. Escolher subdivisão
4. Ajustar afinação
5. Testar acentos especiais
6. Testar vibração

### Teste do Setlist
1. Clicar em "Setlist" para abrir o painel
2. Adicionar uma música com BPM e subdivisão
3. Editar notas e instrumento
4. Testar exportação/importação JSON
5. Tentar carregar rapidamente a configuração

## 📱 Dispositivos Suportados

- ✅ iOS 16+ (Safari)
- ✅ Android 10+ (Chrome)
- ✅ Desktop (Chrome, Edge, Firefox)
- ✅ PWA instalável

## 🔧 Desenvolvimento

### Comandos Disponíveis
```bash
npm run dev        # Desenvolvimento
npm run build      # Build de produção
npm run start      # Produção local
npm run lint       # Linting
```

### Melhorias Futuras
- [ ] Timer de prática
- [ ] Estatísticas de sessões
- [ ] Sincronização entre dispositivos
- [ ] Visualizador de waveform
- [ ] Áudio personalizado
- [ ] Playlists
- [ ] Backup automático
- [ ] Interface light mode
- [ ] Widgets de iOS/Home Screen
- [ ] Keyboard shortcuts
- [ ] Presets de configuração
- [ ] Fácil playback de setlists
- [ ] Integrar com músicas reais

## 📚 Referências

- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [PWA Specification](https://web.dev/pwa/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 💡 Dicas

1. **Performance:** O Web Audio API fornece timing preciso
2. **Offline:** O app funciona sem internet após instalado
3. **Setlist:** Você pode exportar suas músicas e compartilhar
4. **Afinador:** Ajuste o pitch para sua preferência de afinador
5. **Acentos:** Ótimo para treinar frases musicais e frases complexas

## 🐛 Problemas Conhecidos

- Importação JSON pode falhar com formatos incorretos
- Vídeo áudio pode ser desabilitado em alguns navegadores (Safari desktop)

## 📝 Licença

Este projeto é de código aberto e livre para uso pessoal e profissional.

---

Desenvolvido com 💙 para músicos que valorizam a precisão e a organização.
