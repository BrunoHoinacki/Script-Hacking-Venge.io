# Script-Hacking-Venge.io

Este é um script para o jogo **Venge.io**, um FPS online baseado em navegador. O script altera propriedades do jogo, permitindo hacks como **munição infinita**, **vida infinita**, **pulo infinito**, **aimbot**, **ESP** (ver inimigos através de paredes), **teleporte**, **auto-kill** e ajustes de **velocidade** e **escala de tempo**. Ele foi projetado para rodar com o **Tampermonkey**, uma extensão de navegador que executa scripts personalizados.

**⚠️ Aviso Importante**: Usar este script é **contra os termos de serviço do Venge.io** e pode resultar em banimento da sua conta. Use com moderação e por sua conta e risco. Teste em uma conta secundária ou em partidas personalizadas para evitar problemas.

---

## O que é o Tampermonkey?

O **Tampermonkey** é uma extensão para navegadores (como Chrome, Firefox, Edge) que permite executar scripts personalizados (feitos em JavaScript) em sites específicos. Ele é amplamente usado para personalizar sites, automatizar tarefas ou, como neste caso, modificar jogos baseados em navegador. O Tampermonkey injeta scripts no código do site enquanto ele carrega, permitindo alterar o comportamento do jogo.

---

## Como Instalar o Tampermonkey

Siga os passos abaixo para instalar o Tampermonkey no Google Chrome (se usar outro navegador, como Firefox, o processo é parecido):

1. Abra o Google Chrome.
2. Acesse a [Chrome Web Store](https://chrome.google.com/webstore).
3. Na barra de pesquisa, digite **Tampermonkey** e pressione Enter.
4. Clique no resultado **Tampermonkey** (desenvolvido por "Tampermonkey") e depois em **Instalar** (ou "Adicionar ao Chrome").
5. Confirme a instalação clicando em **Adicionar extensão** na janela que aparecer.
6. Após a instalação, você verá o ícone do Tampermonkey (um "T" preto com fundo cinza) no canto superior direito do Chrome, ao lado da barra de endereço.

---

## Como Usar o Script

### 1. Baixe o Script
- Faça o download do arquivo `venge-hack.js` deste repositório. Você pode clicar no botão **Code** > **Download ZIP** ou copiar o conteúdo do arquivo diretamente.

### 2. Adicione o Script ao Tampermonkey
- Clique no ícone do Tampermonkey no canto superior direito do Chrome.
- Selecione **Criar um novo script**.
- Uma nova aba vai abrir com um modelo de script. Apague tudo que estiver lá.
- Copie o conteúdo do arquivo `venge-hack.js` e cole no editor do Tampermonkey.
- Salve o script pressionando **Ctrl+S** ou clicando em **Arquivo** > **Salvar** no menu do Tampermonkey.

### 3. Entre no Venge.io
- Acesse o site oficial do Venge.io: [https://venge.io/](https://venge.io/).
- O script será ativado automaticamente assim que o jogo carregar.

### 4. Ative os Hacks com as Teclas
O script usa teclas específicas para ativar/desativar os hacks. Quando você pressiona uma tecla, uma mensagem aparece no chat do jogo indicando se o hack foi ativado ou desativado. Aqui está a lista de teclas e funções:

| Tecla               | Função                     | Descrição                                   |
|---------------------|----------------------------|---------------------------------------------|
| **Vírgula (,)**     | Munição Infinita          | Nunca fica sem munição.                     |
| **Ponto e vírgula (;)** | Aimbot                 | Mira automaticamente nos inimigos.          |
| **Aspas ('')**      | Pulo Infinito             | Pule sem parar, sem limitações.             |
| **Barra (/)**       | Multiplicador de Velocidade | Aumenta sua velocidade (de 1x a 5x).       |
| **Colchete esquerdo ([)** | Teleporte            | Teleporta você para um lugar seguro.        |
| **Colchete direito (])** | ESP                   | Mostra inimigos através das paredes.        |
| **Barra invertida (\)** | Escala de Tempo        | Ajusta a velocidade do jogo (de 1x a 5x).   |
| **Ponto (.)**       | Auto-Kill                 | Mata inimigos automaticamente ao nascerem.  |
| **Menos (-)**       | Vida Infinita             | Mantém sua saúde sempre no máximo.          |

---

## O que o Script Faz?

Este script "engancha" (hook) em funções internas do Venge.io pra alterar o comportamento do jogo. Aqui está o que cada hack faz:

- **Munição Infinita**: Impede que sua munição diminua ao atirar.
- **Vida Infinita**: Mantém sua saúde sempre em 100, evitando que você morra.
- **Pulo Infinito**: Permite pular sem parar, ignorando as limitações normais.
- **Aimbot**: Mira automaticamente no inimigo mais próximo com linha de visão clara.
- **ESP**: Mostra os inimigos através das paredes, facilitando localizá-los.
- **Auto-Kill**: Mata os inimigos automaticamente 3,5 segundos após eles nascerem.
- **Teleporte**: Usa a função de respawn do jogo pra te teletransportar pra um lugar seguro.
- **Multiplicador de Velocidade**: Aumenta sua velocidade de movimento (de 1x a 5x).
- **Escala de Tempo**: Altera a velocidade do jogo inteiro (de 1x a 5x), afetando tudo, como animações e física.

---

## Avisos e Riscos

- **Risco de Banimento**: O Venge.io tem um anti-cheat chamado **VengeGuard**, que pode detectar o uso de scripts como este. Em 4 de junho de 2025, às 14:39 -03, o anti-cheat está bem avançado e pode banir sua conta se você for pego. Use uma conta secundária ou jogue em partidas personalizadas pra reduzir o risco.
- **Atualizações do Jogo**: Se o Venge.io for atualizado, o script pode parar de funcionar. Isso acontece se os nomes das funções internas (como `Movement` ou `NetworkManager`) mudarem. Nesse caso, você precisará inspecionar o novo código do jogo com as Ferramentas de Desenvolvedor (F12) e ajustar o script.
- **Segurança**: Só baixe scripts de fontes confiáveis. Este repositório é seguro, mas evite .exe ou arquivos de fontes duvidosas que podem conter malware.

---

## Contribuições

Se você quiser contribuir com melhorias pro script (como novos hacks ou correções), sinta-se à vontade pra abrir um pull request! Algumas ideias de melhorias:
- Adicionar um menu visual pra ativar os hacks em vez de teclas.
- Melhorar a bypass do VengeGuard.
- Adicionar mais hacks, como "no recoil" (sem recuo nas armas).

---

## Créditos

- **Autor do Script**: Desenvolvido por [Bruno Hoinacki](https://www.linkedin.com/in/brunohoinacki).
- **Inspiração**: Baseado em scripts e tutoriais de comunidades como UnknownCheats e WeAreDevs.

---

**Divirta-se, mas jogue com cuidado! 🐀**
