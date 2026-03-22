# DocGen - Gerador de Documentação

Um site moderno e intuitivo para ajudar desenvolvedores a criar documentação profissional para aplicativos móveis e websites.

## 🚀 Funcionalidades

- **Formulário Interativo**: Interface amigável com perguntas guiadas
- **Múltiplos Tipos de Projeto**: Suporte para apps móveis, websites ou ambos
- **Validação em Tempo Real**: Feedback imediato sobre campos obrigatórios
- **Geração Automática**: Cria documentação estruturada automaticamente
- **Exportação**: Baixe a documentação em HTML ou copie para área de transferência
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Auto-save**: Salva automaticamente o progresso no navegador

## 📋 Seções da Documentação

O DocGen gera documentação completa incluindo:

1. **Informações Básicas**
   - Nome do projeto
   - Descrição
   - Versão

2. **Funcionalidades Principais**
   - Lista dinâmica de funcionalidades
   - Adicione quantas quiser

3. **Público-Alvo**
   - Defina quem usará seu projeto

4. **Informações Técnicas**
   - Tecnologias utilizadas
   - Plataformas suportadas (iOS, Android, Web, Desktop)

5. **Instalação e Configuração**
   - Passos de instalação
   - Requisitos do sistema

6. **Como Usar**
   - Instruções de uso detalhadas

7. **API** (se aplicável)
   - Endpoints principais

8. **Deploy e Publicação**
   - Passos para deploy em produção

9. **Contato e Suporte**
   - Informações de contato

## 🎨 Design e UX

- **Interface Moderna**: Design limpo e profissional
- **Animações Suaves**: Transições e efeitos visuais
- **Feedback Visual**: Notificações e estados de loading
- **Acessibilidade**: Cores contrastantes e navegação por teclado
- **Responsivo**: Adapta-se a qualquer tamanho de tela

## 🛠️ Como Usar

1. **Abra o site**: Abra o arquivo `index.html` em qualquer navegador moderno

2. **Selecione o tipo de projeto**:
   - Aplicativo Móvel
   - Website
   - Ambos

3. **Preencha o formulário**:
   - Campos obrigatórios são marcados com *
   - Adicione quantas funcionalidades quiser
   - Selecione as plataformas suportadas

4. **Gere a documentação**:
   - Clique em "Gerar Documentação"
   - Aguarde o processamento

5. **Exporte o resultado**:
   - Baixe como arquivo HTML
   - Copie para área de transferência
   - Crie uma nova documentação

## 📁 Estrutura do Projeto

```
docgen/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
└── README.md           # Este arquivo
```

## 🎯 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Flexbox e Grid
- **JavaScript ES6+**: Funcionalidades interativas
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia Inter

## 🌟 Recursos Avançados

### Auto-save
O site salva automaticamente seu progresso no navegador. Se você fechar e reabrir, seus dados estarão lá.

### Validação Inteligente
- Campos obrigatórios são validados em tempo real
- Feedback visual imediato
- Prevenção de submissão com dados incompletos

### Geração Dinâmica
- A documentação é gerada dinamicamente baseada nas suas respostas
- Seções vazias são omitidas automaticamente
- Formatação profissional e consistente

### Exportação Flexível
- **Download HTML**: Arquivo completo com estilos
- **Copiar texto**: Para colar em editores de texto
- **Formatação preservada**: Mantém a estrutura visual

## 🔧 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #28a745;
    --error-color: #dc3545;
}
```

### Perguntas
Para adicionar ou modificar perguntas, edite o HTML em `index.html` e atualize a lógica no `script.js`.

### Estilos
O design é totalmente customizável através do CSS. Todas as classes são bem organizadas e comentadas.

## 📱 Compatibilidade

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## 🚀 Deploy

Para usar online, simplesmente faça upload dos arquivos para qualquer servidor web:

1. **GitHub Pages**: Faça push para um repositório e ative GitHub Pages
2. **Netlify**: Arraste a pasta para o Netlify
3. **Vercel**: Conecte seu repositório
4. **Servidor próprio**: Upload via FTP/SFTP

## 👥 Equipe do Projeto

### Estrutura e Papéis

O projeto DocGen segue uma estrutura organizacional definida para garantir eficiência e qualidade na entrega:

#### Papéis e Responsabilidades

- **Project Manager/Scrum Master**
  - Coordenação geral do projeto
  - Gestão de sprints e backlog
  - Facilitação de reuniões e comunicação

- **Desenvolvedores Frontend**
  - Implementação da interface do usuário
  - Desenvolvimento responsivo
  - Otimização de performance

- **Desenvolvedores Backend**
  - Lógica de negócio
  - APIs e integrações
  - Banco de dados

- **UX/UI Designer**
  - Design da interface
  - Experiência do usuário
  - Prototipagem

- **QA/Tester**
  - Testes funcionais
  - Testes de usabilidade
  - Relatórios de bugs

#### Matriz de Comunicação

- **Daily Stand-ups**: Reuniões diárias de 15 minutos
- **Sprint Planning**: Planejamento a cada 2 semanas
- **Sprint Review**: Apresentação das entregas
- **Retrospectiva**: Lições aprendidas e melhorias

### Relatórios Individuais

Cada integrante da equipe deve manter seu relatório individual atualizado com:

- **Tarefas Realizadas**: Descrição detalhada das atividades completas
- **Tempo Investido**: Horas dedicadas a cada tarefa
- **Desafios Encontrados**: Obstáculos e como foram superados
- **Aprendizados**: Conhecimentos adquiridos durante o desenvolvimento
- **Próximos Passos**: Planejamento das próximas atividades

#### Estrutura do Relatório Individual
```markdown
# Relatório Individual - [Nome do Integrante]

## Período
- Data Início: DD/MM/AAAA
- Data Fim: DD/MM/AAAA

## Tarefas Realizadas
1. [Tarefa 1] - X horas
   - Descrição detalhada
   - Tecnologias utilizadas
   
2. [Tarefa 2] - Y horas
   - Descrição detalhada
   - Tecnologias utilizadas

## Desafios e Soluções
- [Desafio 1]: [Solução aplicada]
- [Desafio 2]: [Solução aplicada]

## Aprendizados
- [Aprendizado 1]
- [Aprendizado 2]

## Próximos Passos
- [Próxima tarefa 1]
- [Próxima tarefa 2]
```

### Relatórios Coletivos

Os relatórios coletivos são compilados semanalmente ou ao final de cada sprint, consolidando as contribuições de todos os integrantes.

#### Estrutura do Relatório Coletivo
```markdown
# Relatório Coletivo - DocGen

## Período
- Data Início: DD/MM/AAAA
- Data Fim: DD/MM/AAAA

## Resumo Executivo
- Objetivos do período
- Principais conquistas
- Desafios superados pela equipe

## Contribuições por Integrante
### [Nome Integrante 1]
- Tarefas: X horas totais
- Principais entregas: [Lista]
- Desafios: [Lista]

### [Nome Integrante 2]
- Tarefas: Y horas totais
- Principais entregas: [Lista]
- Desafios: [Lista]

## Métricas do Projeto
- Total de horas investidas: X horas
- Features completadas: Y
- Bugs resolvidos: Z
- Testes criados: W

## Status das Funcionalidades
- ✅ Funcionalidade 1 - 100%
- 🔄 Funcionalidade 2 - 75%
- ⏳ Funcionalidade 3 - 30%

## Próximos Objetivos
- [Objetivo 1] - Responsável: [Nome]
- [Objetivo 2] - Responsável: [Nome]
- [Objetivo 3] - Responsável: [Nome]

## Lições Aprendidas
- [Lição 1]
- [Lição 2]
```

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🙏 Agradecimentos

- Font Awesome pelos ícones
- Google Fonts pela tipografia
- Comunidade open source pelas inspirações

---

**DocGen** - Transformando ideias em documentação profissional! 📚✨
