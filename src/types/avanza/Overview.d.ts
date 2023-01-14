export interface Account {
    accountType: string;
    interestRate: number;
    depositable: boolean;
    active: boolean;
    accountId: string;
    accountPartlyOwned: boolean;
    tradable: boolean;
    totalBalance: number;
    totalBalanceDue: number;
    ownCapital: number;
    buyingPower: number;
    totalProfitPercent: number;
    totalProfit: number;
    performance: number;
    performancePercent: number;
    attorney: boolean;
    name: string;
    sparkontoPlusType?: string;
}

export interface Overview {
    accounts: Account[];
    numberOfOrders: number;
    numberOfDeals: number;
    totalBalance: number;
    numberOfTransfers: number;
    numberOfIntradayTransfers: number;
    totalBuyingPower: number;
    totalOwnCapital: number;
    totalPerformance: number;
    totalPerformancePercent: number;
}