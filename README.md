# PANDSAL: Simplify Blockchain. Easy Onboarding. Endless Possibilities.

**Authors:**
- [0xbryanf@gmail.com](mailto:0xbryanf@gmail.com)
- [paolanocom@gmail.com](mailto:paolanocom@gmail.com)

Simplify Web3 onboarding, and welcome new users to your app - even if they're new to blockcain. Collaborate quickly with frictionless account creation, unique blockchain identities, and gasless transactions using only a Google account.

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
The Pandsal project, named after the universally familiar bread that starts the day for many in the Philippines, is a pioneering endeavor to welcome Web2 users into Web3 in a much easier way. The mission is to enable and encourage users to interact with their beloved Web3 apps with fewer steps - especially if this is their first blockchain experience. All without sacrificing the decentralization and security of the technology.

Conventionally, the journey into blockchain and decentralized applications (dApps) can be daunting, requiring know-how of complex cryptocurrency wallet downloads and the management of sensitive private keys. This isn't the most appealing entry into an otherwise exciting world. It needs to be simple, dependable, instant and versatile - like **pandesal!**

The Pandsal onboarding kit is here to remove those barriers and deliver accessibility for all.

Whether you're a consumer eager to explore the possibilities of Web3, or a business trying to harness the potential of blockchain technology, Pandsal has you covered.

We've reimagined onboarding by minimizing - or delaying - the need for users or enterprises to grapple with private keys and downloading wallets., serving a seamless and secure transition. It's not a wallet, but a user-friendly, self-custodial gateway to the Ethereum network. No more depending on private keys or panicking over intimidating jargon before they're ready. 

Simply put, with Pandesal, your users are empowered to create accounts, access dApps, and manage digital assets in just a click or two. Tailor-fit it to your business's needs!

With Pandesal at your service, your business or dApp can have full control over the full experience. Easy and dependable way to get you started.

This groundbreaking approach democratizes Web3 access, promising a more inclusive and accessible future for blockchain technology. Start your day with Pandsal. Take a byte and we promise it'll be a great one.

## Features:

1. **Simplify Blockchain: Easy Onboarding:** Blockchain can be a complex and intimidating term, often associated with scams and technical jargon like "zero-knowledge proof" and "cryptocurrency." But we're here to make it easy to understand. 

Think back to the early days of social media and online shopping. You didn't need to install a special wallet to get started, did you? Just an email address was enough. In the same way, Pandsal simplifies the process. When you hit the "connect" or "sign in" button, we use your familiar email address from the web2 world to instantly create a wallet and an account. It's that simple. No need to dive into the complexities of blockchain technology – Pandsal brings it to you in a way that anyone can grasp.

As easy as it may get to start, the development and what's happening behind the scenes is far from the word "easy." We've taken the security of this project seriously.

2. **Deterministic & Secure Wallet Addresses:** Users can create unique wallet addresses derived from their email addresses. These addresses can be deployed on various blockchain networks, ensuring uniqueness for each user. If a user engages in malicious activity, they can be banned from that particular network.

![Alt Text]("public\Pandesal - Frame 1.jpg")

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