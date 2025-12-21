# 🚀 Web3 Crowdfunding Platform (Factory Pattern)

Uma plataforma descentralizada de financiamento coletivo que permite a criação de campanhas individuais de arrecadação utilizando contratos inteligentes na rede **Binance Smart Chain (Testnet)**.

## 🛠 Tecnologias Utilizadas
- **Blockchain**: Solidity, Binance Smart Chain (BSC).
- **Frontend**: Next.js, TypeScript, Tailwind CSS.
- **Web3 Stack**: Thirdweb SDK v5 (Connect Wallet, Deploy Engine).
- **Infraestrutura**: Vercel (Deployment).

## 🏗 Arquitetura do Projeto
O projeto utiliza o **Padrão Factory (Fábrica)**, uma das melhores práticas em Solidity para escalabilidade e segurança:

1.  **CrowdfundingFactory.sol**: Atua como o contrato mestre. Ele gerencia a criação de novas campanhas e mantém um registro centralizado de todos os endereços criados.
2.  **Crowdfunding.sol**: O contrato lógico da campanha. Cada vez que um usuário cria uma campanha, o Factory faz o deploy de uma nova instância deste contrato, garantindo que os fundos de uma campanha sejam isolados das outras.



## 🌟 Funcionalidades Principais
- **Criação Dinâmica**: Usuários podem definir nome, descrição, meta (Goal) e prazo (Deadline).
- **Contribuições Transparentes**: Doações rastreáveis on-chain com verificação de metas.
- **Sistema de Saque Seguro**: O proprietário só pode sacar os fundos se a meta for atingida e o prazo expirado (`checkAndUpdateCampaignState`).
- **Pausa de Emergência**: O dono da Factory pode pausar novas criações em caso de manutenção.

# 🚀 Web3 Crowdfunding Platform
**Live Demo:** [https://web3cfapp-sandy.vercel.app](https://web3cfapp-sandy.vercel.app)

## 🚀 Como Executar
1. Clone o repositório.
2. Instale as dependências: `npm install`.
3. Configure o `.env.local` com seu `NEXT_PUBLIC_TEMPLATE_CLIENT_ID` da Thirdweb.
4. Execute o projeto: `npm run dev`.

## 📄 Contratos Publicados (Testnet)
- **Factory Address**: `0x214e2566df210d5466c827a090b0959bdadf0a2c`
- **Link Explorer**: [BscScan Testnet](https://testnet.bscscan.com/address/0x214E2566dF210D5466c827A090b0959BDAdF0a2c)