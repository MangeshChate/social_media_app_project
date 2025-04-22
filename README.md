
# Web3 Social Network 🚀

A decentralized social media platform leveraging AI (PalmAI) for content moderation/recommendations and Solidity smart contracts for secure transactions (e.g., tipping, NFT-based posts). Built with a modern tech stack for scalability and security.

## Key Features

- **AI-Powered Feed**: Personalized content using PalmAI.
- **Blockchain Integration**: Smart contracts for tipping/ownership (Ethereum/Polygon).
- **Web3 Auth**: Secure login via MetaMask/WalletConnect.
- **Real-Time Interactions**: WebSockets for chats/notifications.

## 🛠 Tech Stack

| Area            | Technologies Used                                     |
|-----------------|--------------------------------------------------------|
| **Frontend**    | React-Vite, TailwindCSS, Ethers.js                    |
| **Backend**     | Node.js, Express.js, WebSockets                       |
| **Database**    | MongoDB (NoSQL for user data)                         |
| **AI**          | Google PalmAPI (Moderation/Recommendations)           |
| **Blockchain**  | Solidity, Hardhat, IPFS (for media storage)           |

## 🌟 Why This Stands Out?

This social media platform offers a unique blend of advanced technologies, making it stand out in the crowded social media space. Here are some key reasons why:

- **AI-Powered Content Moderation & Recommendations**: Leverages Google PalmAI to personalize the feed and automatically moderate content, ensuring a safer and more engaging user experience.
  
- **Blockchain Integration**: Uses Ethereum/Polygon smart contracts for secure tipping and NFT-based ownership of posts, giving users full control and transparency over their digital assets.

- **Web3 Authentication**: Enables secure login via MetaMask/WalletConnect, integrating Web3 authentication to enhance security and user privacy.

- **Real-Time Social Interactions**: Implements WebSockets for real-time chat and notifications, ensuring seamless communication between users.

- **Decentralized Media Storage**: Media files (images, videos) are stored on IPFS, further promoting decentralization and ensuring that users own their content.

This project demonstrates the power of combining AI and blockchain technologies to create a modern, decentralized, and secure social media platform.

## ⚙️ Installation

### Clone the repo:

```bash
git clone https://github.com/MangeshChate/web3-social-network.git
cd web3-social-network
```

### Install dependencies:

```bash
npm install
```

### Set up .env (example):

```env
MONGO_URI=your_mongodb_uri  
PALM_API_KEY=your_ai_key  
PRIVATE_KEY=your_wallet_key_for_smart_contracts
```

### Run the app:

```bash
npm run dev  # Frontend (Vite)
npm start    # Backend (Node/Express)
```


