# 🎵 Metronomo Setlist App

Aplicativo web mobile de metrônomo profissional com gestão de setlists, feito com Next.js, TypeScript e Web Audio API.

## ✨ Funcionalidades

### 🎹 Metrônomo Pro
- **BPM Controlado:** De 20 a 1000 BPM com precisão sample
- **Subdivisões:** Seminote, corda, semicorda, decima-sétima, terça, quinta
- **Afinador:** 100-2000 Hz para diferentes afinadores
- **Acentos:** Por compasso ou a cada X batidas
- **Feedback Haptic:** Vibração inteligente para cada pulso

### 📋 Setlist Manager
- Criar, editar e deletar músicas
- Adicionar notas e instrumentos específicos
- Exportar/Importar setlists em JSON
- Carregar rapidamente configurações
- Organização intuitiva

### 📱 PWA Instalável
- Funciona offline após instalação
- Home Screen widget
- Fullscreen mode
- Performance otimizada

## 🚀 Começando

### Instalação

```bash
npm install
```

### Instalar dependências para ícones (opcional)

```bash
npm install sharp
```

### Rodar em desenvolvimento

```bash
npm run dev
```

### Construir para produção

```bash
npm run build
npm start
```

## 📱 Instalar como App

### Android
1. Abra o app no Chrome
2. Clique em menu (⋮)
3. "Adicionar à Tela de Início"
4. Siga as instruções

### iOS
1. Abra o site no Safari
2. Clique em "Compartilhar" (⬆️)
3. "Adicionar à Tela de Início"
4. Siga as instruções

## 🎯 Uso Rápido

1. **Adicionar música ao setlist:**
   - Clique em "Setlist"
   - Adicione nome, BPM e subdivisão
   - Salve

2. **Praticar:**
   - Clique em "Setlist"
   - Toque na música desejada
   - Clique em "Iniciar"
   - Pratique com feedback visual e haptic

3. **Exportar:**
   - Clique em "Setlist"
   - "Exportar" para salvar como JSON
   - Compartilhe com outros músicos

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Type safety
- **Web Audio API** - Timing preciso
- **IndexedDB** - Offline storage
- **PWA** - Progressive Web App
- **Tailwind CSS** - Estilização

## 📁 Estrutura

```
src/
├── app/           # Next.js app directory
├── components/    # Componentes React
├── hooks/         # Custom hooks
├── lib/           # Funções utilitárias
└── types/         # TypeScript types
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run start        # Produção local
npm run lint         # Linting
```

## 📝 Extras

### Melhorias Futuras
- [ ] Timer de prática com estatísticas
- [ ] Visualizador de waveform
- [ ] Interface light mode
- [ ] Atalhos de teclado
- [ ] Presets de configuração
- [ ] Análise de progresso
- [ ] Sincronização entre dispositivos

## 🎓 Informações

- **Baseado em:** Análise Soundbrenner + GitHub Open Source
- **Framework:** Next.js + TypeScript
- **Timing:** Web Audio API
- **Offline:** IndexedDB + Service Worker

## 📄 Licença

Open source e livre para uso pessoal e profissional.

---

Desenvolvido com 💙 para músicos que valorizam a precisão e organização musical.
