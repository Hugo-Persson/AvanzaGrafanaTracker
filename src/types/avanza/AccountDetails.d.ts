
export interface CurrencyAccount {
  currency: string;
  balance: number;
}

export interface AccountDetails {
  courtageClass: string;
  depositable: boolean;
  accountType: string;
  accountName: string;
  withdrawable: boolean;
  accountId: string;
  accountTypeName: string;
  jointlyOwned: boolean;
  clearingNumber: string;
  instrumentTransferPossible: boolean;
  internalTransferPossible: boolean;
  interestRate: number;
  numberOfOrders: number;
  numberOfDeals: number;
  undebitedYieldTax: number;
  performanceSinceOneWeek: number;
  performanceSinceOneMonth: number;
  performanceSinceThreeMonths: number;
  performanceSinceSixMonths: number;
  performanceSinceOneYear: number;
  performanceSinceThreeYears: number;
  performanceSinceOneWeekPercent: number;
  performanceSinceOneMonthPercent: number;
  performanceSinceThreeMonthsPercent: number;
  performanceSinceSixMonthsPercent: number;
  performanceSinceOneYearPercent: number;
  performanceSinceThreeYearsPercent: number;
  currencyAccounts: CurrencyAccount[];
  creditLimit: number;
  forwardBalance: number;
  reservedAmount: number;
  totalCollateralValue: number;
  totalPositionsValue: number;
  buyingPower: number;
  totalProfitPercent: number;
  totalProfit: number;
  availableSuperLoanAmount: number;
  totalBalance: number;
  ownCapital: number;
  performancePercent: number;
  accruedInterest: number;
  creditAfterInterest: number;
  overMortgaged: boolean;
  overdrawn: boolean;
  performance: number;
  numberOfTransfers: number;
  numberOfIntradayTransfers: number;
  sharpeRatio: number;
  standardDeviation: number;
}



