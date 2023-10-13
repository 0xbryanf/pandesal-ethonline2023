# Pandesal: Making Group Finance Effortless, Secure, and Rewarding

**Authors:**
- [0xbryanf@gmail.com](mailto:0xbryanf@gmail.com)
- [paolanocom@gmail.com](mailto:paolanocom@gmail.com)

Pandesal is a decentralized finance (DeFi) platform that reimagines the concept of "you are who your friends are." With our innovative platform, users can seamlessly collaborate, establish unique blockchain identities, and perform gasless transactions. Pandesal empowers groups of friends to pool funds, generate income together, and support one another effortlessly.

## Table of Contents
- [Introduction](#pandesal-a-defi-platform-for-collaborative-finance)
- [Project Overview](#project-overview)
- [Idea](#idea)
- [Features](#features)
- [Use Cases](#use-cases)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
Pandesal revolutionizes collaborative finance with a focus on user-friendly, secure, and efficient blockchain interactions. By offering deterministic wallet addresses, gasless transaction deployment, unique blockchain identities, and multi-signature security, Pandesal creates a supportive ecosystem for groups of friends to manage their finances together.

## Idea
Imagine this scenario: You're at the bakery, craving that delicious pandesal (bread), but alas, you find out you're a bit short on cash to make the purchase. This is where Pandesal comes to the rescue! Whether you're the one in need or the friend who can help out, Pandesal offers a solution. It allows your friend to cover the cost while ensuring a secure and guaranteed way for the lender to be paid back.

In the process, you not only saved your friend but also saved your friendship from any consequences that borrowing money can sometimes bring.

But Pandesal doesn't stop there! It's not just about individual transactions; it's about making group financing effortless, secure, and rewarding. You can use Pandesal for shared savings towards future goals, creating an emergency fund for your group, setting up a vacation fund with your team, and much more.

Our DeFi platform is tailored for groups of friends looking to generate income while supporting one another. Here's how Pandesal works:

1. **Deterministic Wallet Addresses:** Users can create unique wallet addresses derived from their email addresses. These addresses can be deployed on various blockchain networks, ensuring uniqueness for each user. If a user engages in malicious activity, they can be banned from that particular network.

2. **Gasless Transaction Deployment:** Users can deploy their deterministic contract addresses without the need to pay gas fees, making it easier for them to get started on the blockchain.

3. **Identity Establishment:** Once users have their deterministic contract address, they establish their identity on the blockchain. This identity is the foundation for participation in various activities on the platform.

4. **Group Formation:** Users can create groups and invite their friends to join. These groups collaborate to generate income through shared financial activities.

5. **Income Generation:** Groups can pool their money and invest it in the Compound protocol, a lending and borrowing DeFi platform. The income generated from these investments is distributed directly to the deterministic contract addresses of all group members.

6. **Guarantor System:** In cases where a member wants to make a purchase but lacks sufficient funds, other members can step in as guarantors. Smart contracts ensure that the lender will be repaid in full, along with interest, by the debtor, offering a safety net for financial transactions within the group.

7. **Safe Multi-Signature for Gasless Transactions:** Pandesal offers a robust security layer through Safe Multi-Signature for Gasless Transactions. This functionality ensures that group members can collectively approve and execute transactions securely without the need to pay individual gas fees.

In summary, Pandesal is designed to facilitate a supportive and secure environment for groups of friends to manage their finances collaboratively on the blockchain. It offers features like deterministic addresses, gasless deployment, multi-signature for gasless transactions, income generation through investments, and a guarantor system to enhance financial cooperation among users.

## Features

- Create unique deterministic wallet addresses from email addresses.
- Deploy wallet contracts without gas fees.
- Establish blockchain identities for secure participation.
- Form and manage income-generating groups.
- Invest in DeFi platforms and distribute income to group members.
- Provide a guarantor system for secure financial transactions.
- Safe multi-signature for gasless transaction approvals.

## Use Cases
Pandesal is versatile and can be used for various purposes, including but not limited to:

1. Shared savings for future goals
2. Emergency fund for group members
3. Peer-to-peer lending circle
4. Vacation fund
5. Investment club
6. Homeownership fund
7. Education fund
8. Celebration fund
9. Community/Outreach program fund

## Getting Started
To get started with Pandesal, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/0xbryanf/pandesal-ethonline2023.git

2. **Navigate to the app directory:**
    ```bash
    cd app/

3. **Install the Node Package Manager (NPM) dependencies:**
    ```bash
    npm install

4. **Create a .env file. Make sure to fill in the following important information. For Google credentials, visit this link:** https://console.cloud.google.com/
    ```bash
    NODE_ENV=development
    PORT=1989
    ORIGIN=http://localhost:3000
    SALTWORKFACTOR=
    JWT_SECRET=
    GOOGLE_CLIENT_SECRET=
    GOOGLE_CLIENT_ID=
    GOOGLE_REDIRECT_URL=http://localhost:1989/api/services/oauth/google

5. **Start the server:**
    ```bash
    npm run dev

If you see **App is listening on port 1989**, then you have configured the server correctly.

6. **Navigate back to root folder.**

7. **Then, navigate to the client directory:**
    ```bash
    cd client/

8. **Install the Node Package Manager (NPM) dependencies:**
    ```bash
    npm install

9. **Create a .env.local file and fill in the following important information:**
    ```bash
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=
    NEXT_PUBLIC_SERVER_ENDPOINT=
    NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL=http://localhost:1989/api/services/oauth/google 

10. **Start the server:**
    ```bash
    npm run dev

If you see - Local: http://localhost:3000, then you have configured the client side correctly. Copy    **http://localhost:3000** to your browser.


## There you go, you're all set to start using Pandesal!!

For more detailed instructions, refer to the [Getting Started Guide](docs/getting-started.md).
This revised section provides clear, step-by-step instructions for getting started with Pandesal, including setting up the server and client sides with the required environment variables and dependencies.