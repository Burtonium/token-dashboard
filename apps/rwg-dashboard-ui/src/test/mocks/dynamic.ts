export const settings = {
  chains: [
    {
      enabled: true,
      name: 'hardhat',
      networks: [
        {
          chainName: 'hardhat',
          enabled: true,
          networkId: 31337,
          rpcUrl: 'http://localhost:8545',
        },
      ],
    },
    {
      enabled: false,
      name: 'eclipse',
      networks: [
        {
          chainName: 'mainnet',
          enabled: true,
          networkId: 1,
        },
      ],
    },
    {
      enabled: true,
      name: 'bitcoin',
      networks: [],
    },
    {
      enabled: true,
      name: 'ethereum',
      networks: [],
    },
    {
      enabled: false,
      name: 'algorand',
      networks: [],
    },
    {
      enabled: false,
      name: 'starknet',
      networks: [
        {
          chainName: 'Mainnet',
          enabled: true,
          networkId: 410,
        },
        {
          chainName: 'Goerli',
          enabled: false,
          networkId: 411,
        },
        {
          chainName: 'Sepolia',
          enabled: false,
          networkId: 412,
        },
      ],
    },
    {
      enabled: false,
      name: 'flow',
      networks: [],
    },
    {
      enabled: true,
      name: 'solana',
      networks: [
        {
          chainName: 'Mainnet',
          enabled: true,
          networkId: 101,
          rpcUrl:
            'https://mainnet.helius-rpc.com/?api-key=83ec8540-dfbc-4e25-af05-66e6948ebde7',
        },
        {
          chainName: 'Solana Testnet',
          enabled: false,
          networkId: 102,
        },
        {
          chainName: 'Solana Devnet',
          enabled: false,
          networkId: 103,
        },
        {
          chainName: 'Eclipse Mainnet',
          enabled: false,
          networkId: 201,
        },
        {
          chainName: 'Eclipse Testnet',
          enabled: false,
          networkId: 202,
        },
      ],
    },
    {
      enabled: true,
      name: 'evm',
      networks: [
        {
          chainName: 'Ethereum Mainnet',
          enabled: true,
          networkId: 1,
        },
        {
          chainName: 'Goerli',
          enabled: false,
          networkId: 5,
        },
        {
          chainName: 'Sepolia',
          enabled: true,
          networkId: 11155111,
        },
        {
          chainName: 'Polygon Mainnet',
          enabled: true,
          networkId: 137,
        },
        {
          chainName: 'Polygon Mumbai',
          enabled: false,
          networkId: 80001,
        },
        {
          chainName: 'Polygon Amoy',
          enabled: false,
          networkId: 80002,
        },
        {
          chainName: 'Arbitrum',
          enabled: false,
          networkId: 42161,
        },
        {
          chainName: 'Arbitrum Goerli',
          enabled: false,
          networkId: 421613,
        },
        {
          chainName: 'Arbitrum Sepolia',
          enabled: false,
          networkId: 421614,
        },
        {
          chainName: 'Optimism',
          enabled: false,
          networkId: 10,
        },
        {
          chainName: 'Optimism Goerli',
          enabled: false,
          networkId: 420,
        },
        {
          chainName: 'Optimism Sepolia',
          enabled: false,
          networkId: 11155420,
        },
        {
          chainName: 'Palm',
          enabled: false,
          networkId: 11297108109,
        },
        {
          chainName: 'Aurora',
          enabled: false,
          networkId: 1313161554,
        },
        {
          chainName: 'BNB Smart Chain',
          enabled: false,
          networkId: 56,
        },
        {
          chainName: 'Gnosis',
          enabled: false,
          networkId: 100,
        },
        {
          chainName: 'Base',
          enabled: false,
          networkId: 8453,
        },
        {
          chainName: 'Base Goerli',
          enabled: false,
          networkId: 84531,
        },
        {
          chainName: 'Base Sepolia',
          enabled: false,
          networkId: 84532,
        },
        {
          chainName: 'Avalanche C-Chain',
          enabled: false,
          networkId: 43114,
        },
        {
          chainName: 'Celo Mainnet',
          enabled: false,
          networkId: 42220,
        },
        {
          chainName: 'Chiliz Chain',
          enabled: false,
          networkId: 88888,
        },
        {
          chainName: 'Fantom Opera',
          enabled: false,
          networkId: 250,
        },
        {
          chainName: 'EVM on Flow',
          enabled: false,
          networkId: 747,
        },
        {
          chainName: 'EVM on Flow Testnet',
          enabled: false,
          networkId: 545,
        },
        {
          chainName: 'EON',
          enabled: false,
          networkId: 7332,
        },
        {
          chainName: 'EON Gobi',
          enabled: false,
          networkId: 1663,
        },
        {
          chainName: 'Abstract',
          enabled: false,
          networkId: 2741,
        },
        {
          chainName: 'Abstract Testnet',
          enabled: false,
          networkId: 11124,
        },
        {
          chainName: 'Berachain Artio',
          enabled: false,
          networkId: 80085,
        },
        {
          chainName: 'opBNB',
          enabled: false,
          networkId: 204,
        },
        {
          chainName: 'opBNB Testnet',
          enabled: false,
          networkId: 5611,
        },
        {
          chainName: 'zkSync Era Mainnet',
          enabled: false,
          networkId: 324,
        },
        {
          chainName: 'zkSync Era Testnet',
          enabled: false,
          networkId: 280,
        },
        {
          chainName: 'zkSync Era Sepolia',
          enabled: false,
          networkId: 300,
        },
        {
          chainName: 'Cronos Mainnet',
          enabled: false,
          networkId: 25,
        },
        {
          chainName: 'Cronos Testnet',
          enabled: false,
          networkId: 338,
        },
        {
          chainName: 'Scroll Mainnet',
          enabled: false,
          networkId: 534352,
        },
        {
          chainName: 'Scroll Sepolia',
          enabled: false,
          networkId: 534351,
        },
        {
          chainName: 'Sophon',
          enabled: false,
          networkId: 50104,
        },
        {
          chainName: 'Sophon Testnet',
          enabled: false,
          networkId: 531050104,
        },
        {
          chainName: 'Matchain Mainnet',
          enabled: false,
          networkId: 698,
        },
        {
          chainName: 'Matchain Testnet',
          enabled: false,
          networkId: 699,
        },
        {
          chainName: 'Mode',
          enabled: false,
          networkId: 34443,
        },
        {
          chainName: 'Mode Sepolia',
          enabled: false,
          networkId: 919,
        },
        {
          chainName: 'Moonbeam',
          enabled: false,
          networkId: 1284,
        },
        {
          chainName: 'Moonbase Alpha',
          enabled: false,
          networkId: 1287,
        },
        {
          chainName: 'Zora',
          enabled: false,
          networkId: 7777777,
        },
        {
          chainName: 'Zora Sepolia',
          enabled: false,
          networkId: 999999999,
        },
        {
          chainName: 'Degen Chain',
          enabled: false,
          networkId: 666666666,
        },
        {
          chainName: 'Blast Mainnet',
          enabled: false,
          networkId: 81457,
        },
        {
          chainName: 'Root Mainnet',
          enabled: false,
          networkId: 7668,
        },
        {
          chainName: 'Shardeum Sphinx 1.X',
          enabled: false,
          networkId: 8082,
        },
        {
          chainName: 'Oasis Sapphire',
          enabled: false,
          networkId: 23294,
        },
        {
          chainName: 'Berachain bArtio',
          enabled: false,
          networkId: 80084,
        },
        {
          chainName: 'Morph Holesky Testnet',
          enabled: false,
          networkId: 2810,
        },
        {
          chainName: 'Holesky Testnet',
          enabled: false,
          networkId: 17000,
        },
        {
          chainName: 'BOB Mainnet',
          enabled: false,
          networkId: 60808,
        },
        {
          chainName: 'BOB Sepolia',
          enabled: false,
          networkId: 111,
        },
        {
          chainName: 'Zircuit Testnet',
          enabled: false,
          networkId: 48899,
        },
        {
          chainName: 'Lightlink Phoenix',
          enabled: false,
          networkId: 1890,
        },
        {
          chainName: 'Linea',
          enabled: false,
          networkId: 59144,
        },
        {
          chainName: 'Linea Sepolia',
          enabled: false,
          networkId: 59141,
        },
        {
          chainName: 'Mantle',
          enabled: false,
          networkId: 5000,
        },
        {
          chainName: 'Mantle Sepolia',
          enabled: false,
          networkId: 5003,
        },
        {
          chainName: 'ApeCoin Curtis',
          enabled: false,
          networkId: 33111,
        },
        {
          chainName: 'Story Partner Testnet',
          enabled: false,
          networkId: 1513,
        },
        {
          chainName: 'Story Developer Mainnet',
          enabled: false,
          networkId: 1514,
        },
        {
          chainName: 'Aeneid',
          enabled: false,
          networkId: 1315,
        },
        {
          chainName: 'XLayer Testnet',
          enabled: false,
          networkId: 195,
        },
        {
          chainName: 'XLayer',
          enabled: false,
          networkId: 196,
        },
        {
          chainName: 'Sei Devnet',
          enabled: false,
          networkId: 713715,
        },
        {
          chainName: 'Sei Testnet',
          enabled: false,
          networkId: 1328,
        },
        {
          chainName: 'Sei',
          enabled: false,
          networkId: 1329,
        },
        {
          chainName: 'Game7 Testnet',
          enabled: false,
          networkId: 13746,
        },
        {
          chainName: 'Ethernity',
          enabled: false,
          networkId: 183,
        },
        {
          chainName: 'Ethernity Testnet',
          enabled: false,
          networkId: 233,
        },
        {
          chainName: 'Odyssey Testnet',
          enabled: false,
          networkId: 911867,
        },
        {
          chainName: 'ApeChain',
          enabled: false,
          networkId: 33139,
        },
        {
          chainName: 'Filecoin Calibration Testnet',
          enabled: false,
          networkId: 314159,
        },
        {
          chainName: 'Filecoin Mainnet',
          enabled: false,
          networkId: 314,
        },
        {
          chainName: 'Monad Testnet',
          enabled: false,
          networkId: 10143,
        },
        {
          chainName: 'Ink',
          enabled: false,
          networkId: 57073,
        },
        {
          chainName: 'Ink Sepolia',
          enabled: false,
          networkId: 763373,
        },
        {
          chainName: 'Hemi',
          enabled: false,
          networkId: 43111,
        },
        {
          chainName: 'Berachain Mainnet',
          enabled: false,
          networkId: 80094,
        },
        {
          chainName: 'Unichain',
          enabled: false,
          networkId: 130,
        },
        {
          chainName: 'Nexus',
          enabled: false,
          networkId: 392,
        },
        {
          chainName: 'Hyperliquid Mainnet',
          enabled: false,
          networkId: 999,
        },
        {
          chainName: 'Hyperliquid Testnet',
          enabled: false,
          networkId: 998,
        },
        {
          chainName: 'Sonic',
          enabled: false,
          networkId: 146,
        },
        {
          chainName: 'Sonic Blaze Testnet',
          enabled: false,
          networkId: 57054,
        },
        {
          chainName: 'Soneium',
          enabled: false,
          networkId: 1868,
        },
        {
          chainName: 'MegaETH Testnet',
          enabled: false,
          networkId: 6342,
        },
      ],
    },
    {
      enabled: false,
      name: 'cosmos',
      networks: [
        {
          chainName: 'Cosmos Hub',
          enabled: false,
          networkId: 401,
        },
        {
          chainName: 'Axelar',
          enabled: false,
          networkId: 402,
        },
        {
          chainName: 'Osmosis',
          enabled: false,
          networkId: 403,
        },
        {
          chainName: 'Sei',
          enabled: false,
          networkId: 404,
        },
        {
          chainName: 'Noble',
          enabled: false,
          networkId: 405,
        },
      ],
    },
  ],
  design: {
    button: {
      background: '#4779FF',
      fontColor: '#FFFFFF',
      paddingHeight: 16,
      paddingWidth: 50,
      radius: 16,
    },
    modal: {
      border: 'square',
      brand: 'bold',
      displayOrder: ['wallet', 'email'],
      emailOnly: false,
      emailSubmitButtonInsideInput: false,
      primaryColor: '#4779FF',
      radius: 24,
      showWalletsButton: false,
      socialAboveEmail: false,
      splitEmailAndSocial: false,
      template: 'default',
      theme: 'dark',
      view: 'extended',
    },
    widget: {
      backgroundColor: '',
      border: 'square',
      radius: 24,
      textColor: '',
      theme: 'light',
    },
  },
  general: {
    displayName: 'the REAL world',
    emailCompanyName: 'the REAL world',
    skipOptionalKYCFieldDuringOnboarding: true,
    supportUrls: {},
  },
  kyc: [
    {
      enabled: true,
      label: 'Username',
      name: 'username',
      required: false,
      type: 'standard',
      unique: true,
      verify: false,
    },
    {
      enabled: false,
      label: 'Alias',
      name: 'alias',
      required: false,
      type: 'standard',
      unique: false,
      verify: false,
    },
    {
      enabled: false,
      label: 'First Name',
      name: 'firstName',
      required: false,
      type: 'standard',
      unique: false,
      verify: false,
    },
    {
      enabled: false,
      label: 'Last Name',
      name: 'lastName',
      required: false,
      type: 'standard',
      unique: false,
      verify: false,
    },
    {
      enabled: false,
      label: 'E-mail',
      name: 'email',
      required: false,
      type: 'standard',
      unique: false,
      verify: false,
    },
    {
      enabled: false,
      label: 'Phone Number',
      name: 'phoneNumber',
      required: false,
      type: 'standard',
      unique: false,
      verify: false,
    },
    {
      enabled: false,
      label: 'Job Title',
      name: 'jobTitle',
      required: false,
      type: 'standard',
      unique: false,
      verify: false,
    },
    {
      enabled: false,
      label: 'T-Shirt Size',
      name: 'tShirtSize',
      required: false,
      type: 'standard',
      unique: false,
      verify: false,
    },
    {
      enabled: false,
      label: 'Policies Consent',
      name: 'policiesConsent',
      required: false,
      type: 'standard',
      unique: false,
      verify: false,
    },
    {
      enabled: true,
      label: 'Social Accounts',
      name: 'social',
      required: false,
      type: 'standard',
      unique: false,
      verify: false,
    },
  ],
  privacy: {
    collectIp: false,
  },
  providers: [
    {
      createNewAccounts: true,
      enabledAt: '2024-09-11T06:41:24.432Z',
      id: '7ce3dbbd-0d0e-4f82-b48f-ba5b67779d5f',
      provider: 'turnkey',
      scopes: '',
    },
    {
      createNewAccounts: true,
      id: 'd8ae77bd-45fc-4aab-b746-43ba4cc3f5dd',
      provider: 'dynamic',
      scopes: '',
    },
    {
      authorizationUrl:
        'https://app.dynamicauth.com/api/v0/sdk/84fc7be7-9397-4241-b0f9-9f6d0d882755/providers/google/login',
      baseAuthUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      clientId:
        '476663700491-eh71cqj7dc77pbfbp4l9o4nkdsiborpu.apps.googleusercontent.com',
      clientSecret: '...LhE',
      createNewAccounts: true,
      enabledAt: '2023-11-30T17:48:14.880Z',
      id: 'b04d8040-c112-4d79-babe-4849401d5c95',
      provider: 'google',
      redirectUrl:
        'https://app.dynamicauth.com/api/v0/sdk/dca95954-81d8-4ef8-b20f-b1c3b6781cb6/providers/google/redirect',
      scopes: 'email profile',
    },
    {
      authorizationUrl:
        'https://app.dynamicauth.com/api/v0/sdk/84fc7be7-9397-4241-b0f9-9f6d0d882755/telegram/auth',
      clientId: 'DynamicSharedBot',
      clientSecret: '...pZg',
      createNewAccounts: true,
      enabledAt: '2024-11-20T17:53:09.170Z',
      id: '20db3c2f-ff7c-426d-8dd0-38423d15f7e6',
      provider: 'telegram',
      redirectUrl: 'https://app.dynamicauth.com',
      scopes: '',
    },
  ],
  sdk: {
    accountAbstraction: {
      allUsers: false,
      allWallets: false,
      separateSmartWalletAndSigner: false,
    },
    automaticEmbeddedWalletCreation: true,
    blockEmailSubaddresses: false,
    confirmEmailProviderForVerify: true,
    confirmWalletTransfers: true,
    disabledWalletConnectors: ['safe'],
    displayDynamicMessaging: true,
    emailSignIn: {
      signInProvider: 'dynamic',
    },
    embeddedWalletSecurityMethods: [],
    embeddedWallets: {
      allowSkippingAuthenticatorAtSignup: false,
      automaticEmbeddedWalletCreation: true,
      automaticEmbeddedWalletCreationForExternal: false,
      chainConfigurations: [
        {
          enabled: true,
          name: 'EVM',
          primary: true,
        },
        {
          enabled: false,
          name: 'SOL',
          primary: false,
        },
      ],
      defaultWalletVersion: 'V1',
      domainEnabledByProvider: false,
      emailRecoveryEnabled: true,
      forceAuthenticatorAtSignup: false,
      promptForKeyExport: false,
      sessionKeyDuration: {
        amount: 30,
        unit: 'minutes',
      },
      showEmbeddedWalletActionsUI: true,
      supportedSecurityMethods: {
        email: {
          isDefault: false,
          isEnabled: false,
          isPermanentAuthenticator: false,
          listPosition: 1,
        },
        passkey: {
          isDefault: true,
          isEnabled: true,
          isPermanentAuthenticator: true,
          listPosition: 0,
        },
        password: {
          isDefault: false,
          isEnabled: false,
          isPermanentAuthenticator: true,
          listPosition: 2,
        },
      },
      transactionSimulation: false,
    },
    enableMultiAsset: true,
    featureFlags: {
      connectOnlyMultiAsset: false,
    },
    funding: {
      externalWallets: {
        defaultSettings: {
          chainSettings: [
            {
              chain: 'BTC',
              token: {
                rule: 'recommended',
                value: 'BTC',
              },
            },
            {
              chain: 'EVM',
              token: {
                rule: 'recommended',
                value: 'USDC',
              },
            },
            {
              chain: 'SOL',
              token: {
                rule: 'recommended',
                value: 'USDC',
              },
            },
          ],
        },
        enabled: false,
        minAmount: {},
      },
      onramps: [],
    },
    hideNetworkInDynamicWidget: false,
    mobile: {
      deeplinkUrlsEnabled: false,
    },
    multiWallet: true,
    multiWalletUnlinkDisabled: false,
    nameService: {
      evm: {},
    },
    onrampFunding: false,
    passkeyEmbeddedWalletRecoveryEnabled: true,
    preventOrphanedAccounts: false,
    showFiat: true,
    socialSignIn: {
      providers: [
        {
          enabled: false,
          provider: 'apple',
        },
        {
          enabled: false,
          provider: 'bitbucket',
        },
        {
          enabled: false,
          provider: 'discord',
        },
        {
          enabled: false,
          provider: 'epicgames',
        },
        {
          enabled: false,
          provider: 'facebook',
        },
        {
          enabled: false,
          provider: 'farcaster',
        },
        {
          enabled: false,
          provider: 'github',
        },
        {
          enabled: false,
          provider: 'gitlab',
        },
        {
          enabled: true,
          provider: 'google',
        },
        {
          enabled: false,
          provider: 'linkedin',
        },
        {
          enabled: false,
          provider: 'microsoft',
        },
        {
          enabled: false,
          provider: 'tiktok',
        },
        {
          enabled: false,
          provider: 'twitch',
        },
        {
          enabled: false,
          provider: 'twitter',
        },
        {
          enabled: false,
          provider: 'instagram',
        },
        {
          enabled: false,
          provider: 'coinbasesocial',
        },
        {
          enabled: false,
          provider: 'telegram',
        },
        {
          enabled: false,
          provider: 'spotify',
        },
        {
          enabled: false,
          provider: 'shopify',
        },
        {
          enabled: false,
          provider: 'line',
        },
      ],
      signInProvider: 'dynamic',
    },
    views: [],
    waas: {
      backupOptions: [],
      onSignUp: {
        promptBackupOptions: false,
        promptClientShareExport: false,
      },
      passcodeRequired: false,
    },
    walletConnect: {
      projectId: '7569c63c696a4e8aeb3217c1b1332bd7',
      v2Enabled: true,
      walletProjectId: '7569c63c696a4e8aeb3217c1b1332bd7',
    },
  },
  security: {
    auth: {
      storage: ['localstorage'],
    },
    externalAuth: {
      enabled: false,
    },
    hCaptcha: {
      enabled: false,
    },
    jwtDuration: {
      amount: 2,
      unit: 'hours',
    },
    mfa: {
      availableMethods: ['totp'],
      enabled: false,
      required: false,
    },
  },
  customFields: [],
  networks: [
    {
      chainName: 'evm',
      networks: [
        {
          chain: 'HARD',
          chainId: 31337,
          iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
          isTestnet: true,
          key: 'hardhat',
          name: 'Hardhat',
          nativeCurrency: {
            decimals: 18,
            iconUrl: 'https://app.dynamic.xyz/assets/networks/eth.svg',
            name: 'Ether',
            pricingProviderTokenId: 'ethereum',
            symbol: 'ETH',
          },
          networkId: 31337,
          rpcUrls: ['http://localhost:8545'],
          shortName: 'har',
          vanityName: 'Hardhat',
          chainName: 'Hardhat',
        },
        {
          blockExplorerUrls: ['https://etherscan.io/'],
          chain: 'ETH',
          chainId: '1',
          iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
          isTestnet: false,
          key: 'ethereum',
          name: 'Ethereum Mainnet',
          nameService: {
            registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
          },
          nativeCurrency: {
            decimals: 18,
            iconUrl: 'https://app.dynamic.xyz/assets/networks/eth.svg',
            name: 'Ether',
            pricingProviderTokenId: 'ethereum',
            symbol: 'ETH',
          },
          networkId: '1',
          rpcUrls: ['https://rpc.ankr.com/eth'],
          shortName: 'eth',
          vanityName: 'Ethereum',
          chainName: 'Ethereum Mainnet',
        },
        {
          blockExplorerUrls: [
            'https://sepolia.etherscan.io',
            'https://sepolia.otterscan.io',
          ],
          chain: 'ETH',
          chainId: '11155111',
          iconUrls: ['https://app.dynamic.xyz/assets/networks/sepolia.svg'],
          isTestnet: true,
          key: 'sepolia',
          name: 'Sepolia',
          nativeCurrency: {
            decimals: 18,
            iconUrl: 'https://app.dynamic.xyz/assets/networks/eth.svg',
            name: 'Sepolia Ether',
            pricingProviderTokenId: 'ethereum',
            symbol: 'ETH',
          },
          networkId: '11155111',
          rpcUrls: ['https://rpc.sepolia.org'],
          shortName: 'sep',
          vanityName: 'Sepolia',
          chainName: 'Sepolia',
        },
        {
          blockExplorerUrls: ['https://polygonscan.com/'],
          chain: 'Polygon',
          chainId: '137',
          iconUrls: ['https://app.dynamic.xyz/assets/networks/polygon.svg'],
          isTestnet: false,
          key: 'polygon',
          name: 'Polygon Mainnet',
          nativeCurrency: {
            decimals: 18,
            iconUrl: 'https://app.dynamic.xyz/assets/networks/polygon.svg',
            name: 'MATIC',
            pricingProviderTokenId: 'polygon-ecosystem-token',
            symbol: 'MATIC',
          },
          networkId: '137',
          rpcUrls: ['https://polygon-rpc.com'],
          shortName: 'MATIC',
          vanityName: 'Polygon',
          chainName: 'Polygon Mainnet',
        },
      ],
    },
    {
      chainName: 'solana',
      networks: [
        {
          blockExplorerUrls: ['https://explorer.solana.com'],
          chain: 'SOL',
          chainId: '101',
          cluster: 'mainnet-beta',
          genesisHash: '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
          iconUrls: ['https://app.dynamic.xyz/assets/networks/solana.svg'],
          isTestnet: true,
          key: 'solana',
          name: 'Solana',
          nativeCurrency: {
            decimals: 9,
            iconUrl: 'https://app.dynamic.xyz/assets/networks/solana.svg',
            name: 'Solana',
            pricingProviderTokenId: 'solana',
            symbol: 'SOL',
          },
          networkId: '101',
          rpcUrls: ['https://api.mainnet-beta.solana.com'],
          shortName: 'sol',
          vanityName: 'Solana',
          chainName: 'Solana',
          privateCustomerRpcUrls: [
            'https://mainnet.helius-rpc.com/?api-key=83ec8540-dfbc-4e25-af05-66e6948ebde7',
          ],
        },
      ],
    },
  ],
  environmentName: 'sandbox',
};
