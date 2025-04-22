🚀 About the Project
A decentralized social media platform leveraging AI (PalmAI) for content moderation/recommendations and Solidity smart contracts for secure transactions (e.g., tipping, NFT-based posts). Built with a modern tech stack for scalability and security.

Key Features:

✔ AI-Powered Feed: Personalized content using PalmAI.

✔ Blockchain Integration: Smart contracts for tipping/ownership (Ethereum/Polygon).

✔ Web3 Auth: Secure login via MetaMask/WalletConnect.

✔ Real-Time Interactions: WebSockets for chats/notifications.

🛠 Tech Stack
Area	Technologies Used
Frontend	React-Vite, TailwindCSS, Ethers.js
Backend	Node.js, Express.js, WebSockets
Database	MongoDB (NoSQL for user data)
AI	Google PalmAPI (Moderation/Recommendations)
Blockchain	Solidity, Hardhat, IPFS (for media storage)
⚙️ Installation
Clone the repo:

bash
git clone https://github.com/MangeshChate/web3-social-network.git
cd web3-social-network
Install dependencies:

bash
npm install 
Set up .env (example):

env
MONGO_URI=your_mongodb_uri  
PALM_API_KEY=your_ai_key  
PRIVATE_KEY=your_wallet_key_for_smart_contracts 
Run the app:

bash
npm run dev  # Frontend (Vite) 
npm start    # Backend (Node/Express) 
