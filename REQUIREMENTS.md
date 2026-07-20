# Análise de Requisitos - Metronomo Setlist App

## 📋 Resumo do Projeto
Desenvolver um aplicativo web mobile para metrônomo profissional com funcionalidades de gestão de setlist, baseado na análise do Soundbrenner e projetos open-source do GitHub.

## 🎯 Princípios da Plataforma
- **Performance:** Timing preciso usando Web Audio API
- **Confiabilidade:** 100% funcional offline após instalação
- **Utilidade:** Design mobile-first para prática musical
- **Inteligência:** Auto-acceleração/desaceleração inteligente
- **Acessibilidade:** Controles táteis e visuais claros

## 🎹 Funcionalidades do Metrônomo

### Core Features
1. **Controle de BPM**
   - Faixa: 20 - 1000 BPM
   - Incrementos de 0.1 BPM
   - Precisão de sample (sub-milissegundos)
   - Display digital grande e legível

2. **Subdivisões**
   - Seminote (divisão de 2)
   - Corda (divisão de 4)
   - Semicorda (divisão de 8)
   - Decima-sétima (divisão de 16)
   - Terça (divisão de 3)
   - Quinta (divisão de 5)

3. **Control de Afinador**
   - Faixa: 100 - 2000 Hz
   - Pitch personalizado para afinadores diferentes
   - Display em Hz

4. **Acentos Especiais**
   - Acento por compasso (accent per bar)
   - Acento a cada X batidas
   - Útil para frases musicais complexas

5. **Feedback Haptic**
   - Vibração em cada pulso
   - Diferente intensidade para acentos
   - Suporte nativo do dispositivo

### Visualizador de Compassos
- 4 visualizadores de pulso para cada subdivisão
- Feedback visual em tempo real
- Detecção de acento (cruz vermelho/verde)
- Animação suave

## 📋 Gestão de Setlist

### Funcionalidades
1. **CRUD Completo**
   - Criar músicas com BPM, subdivisão, afinação
   - Editar configurações existentes
   - Deletar itens do setlist
   - Ordenação de músicas

2. **Metadados por Música**
   - Nome da música
   - Instrumento associado
   - Notas específicas
   - Configurações pré-definidas

3. **Exportação/Importação**
   - Exportar setlist como JSON
   - Importar setlist existente
   - Compartilhamento de setlists entre músicos

4. **Carga Rápida**
   - Carregar configuração de uma música com 1 clique
   - Salvar presets de prática
   - Fácil organização por setlist

## 📱 UX/UI Mobile-First

### Design Principles
1. **Controles Grandes**
   - Botão start/stop grande e centralizado
   - Sliders de controle de fácil toque
   - Opções de subdivisão em grid

2. **Interface Clara**
   - Typography legível (Segoe UI, Arial)
   - Cores contrastantes (verde/vermelho para controle)
   - Feedback visual em tempo real

3. **Foco na Prática**
   - Modo tela cheia
   - Visualizador de compassos prominente
   - Painel de controles minimalista

### PWA Features
1. **Instalação**
   - Ícone destacado na Home Screen
   - Fullscreen sem barra de endereço
   - Funciona offline após instalação

2. **Performance**
   - Service Worker para cache
   - Timing preciso offline
   - Carregamento rápido

## 🔧 Arquitetura Técnica

### Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Linguagem:** TypeScript para type-safety
- **Audio:** Web Audio API nativa
- **Storage:** IndexedDB para persistência offline
- **PWA:** Service Worker + Manifest JSON
- **Estilos:** Tailwind CSS (via CDN para desenvolvimento)

### Componentes Principais
1. **MetronomeApp** - Componente raiz
2. **MetronomeDisplay** - Exibição de BPM e subdivisões
3. **ControlPanel** - Painel de controles
4. **MetronomeVisualizer** - Visualizador de compassos
5. **SetlistPanel** - Gestão de setlist

### Hook Personalizado: useMetronome
- Gerencia estado do metrônomo
- Coordena Web Audio API
- Gera eventos de beat
- Gerencia sessões de prática

### Lib Setlist
- IndexedDB wrapper
- CRUD operations
- Exportação/importação JSON
- Ordenação de itens

## 🎯 Métricas de Sucesso

### Performance
- **Latência de Timing:** < 2ms
- **Uso de CPU:** < 5% durante uso
- **Carregamento:** < 500ms inicial

### UX
- **Tempo para iniciar metrônomo:** < 200ms
- **Tempo para carregar setlist:** < 300ms
- **Acessibilidade:** 100% dos controles táteis

### Funcionalidades
- **Precisão BPM:** 100% (teste em 1000 BPM)
- **Acentos:** 100% (todas as subdivisões)
- **Offline:** 100% funcional após instalação

## 🔄 Fluxo de Uso

### Fluxo Princial (Prática)
1. Instalar app como PWA
2. Abrir painel de setlist
3. Adicionar música com configuração
4. Carregar configuração na tela principal
5. Iniciar metrônomo
6. Praticar com feedback visual e haptic
7. Terminar sessão
8. Exportar dados se necessário

### Fluxo Avançado (Setlist)
1. Criar múltiplas músicas
2. Organizar por ordem de setlist
3. Adicionar notas específicas
4. Exportar setlist para compartilhar
5. Usar setlist como base para prática
6. Ajustar configurações na prática

## 📊 Comparação com Competidores

### Soundbrenner (Referência)
- ✅ Timing preciso: Mesmo nível
- ✅ Subdivisões: Mais opções disponíveis
- ✅ Setlist: Funcionalidade completa
- ✅ Offline: Idêntico
- ✅ PWA: Idêntico
- ✅ Setlist: Integrado e funcional
- ✅ Preço: Gratuito e open-source
- ✅ Interface: Mobile-first e moderna
- ✅ Acessibilidade: Controles grandes e claros

### GitHub Open Source
- 🎯 Timing: 100% igual (Web Audio API)
- 🎯 Setlist: Alguns projetos têm, outros não
- 🎯 UX: Este projeto supera a maioria
- 🎯 PWA: Implementação completa
- 🎯 TypeScript: Em todos os projetos modernos
- 🎯 Ícone: Implementação melhorada

## 🚀 Roadmap

### Fase 1 (Concluído) ✅
- Metrônomo core com timing preciso
- Interface UI completa
- PWA básico
- Setlist CRUD
- IndexedDB storage

### Fase 2 (Planejada)
- Timer de prática com estatísticas
- Visualizador de waveform
- Interface light mode
- Keyboard shortcuts
- Presets de configuração

### Fase 3 (Futura)
- Sincronização entre dispositivos
- Integração com streaming de música
- Analytics de progresso
- Comunidade de compartilhamento
- Plugins de metrônomo personalizado

## 🎓 Alunos e Propósito
Desenvolvido como projeto educacional de desenvolvimento de aplicações web profissionais, demonstrando:
- Web Audio API avançado
- PWA implementação completa
- Gestão de estado complexa
- UX mobile-first
- TypeScript para type-safety
- Persistência offline com IndexedDB

## 📚 Referências Técnicas
- [Web Audio API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [PWA Best Practices](https://web.dev/pwa/)
- [Next.js 14 App Router](https://nextjs.org/docs)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
