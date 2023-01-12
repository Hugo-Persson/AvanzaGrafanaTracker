declare module 'avanza';
export = Avanza;
/**
 * An Avanza API wrapper.
 *
 * ### Constants
 *
 * Some methods require certain constants as parameters. These are described below.
 *
 * #### Instrument types
 *
 * | Type                          | Note |
 * | :---------------------------- | :--- |
 * | `Avanza.STOCK`                |      |
 * | `Avanza.FUND`                 |      |
 * | `Avanza.BOND`                 |      |
 * | `Avanza.OPTION`               |      |
 * | `Avanza.FUTURE_FORWARD`       |      |
 * | `Avanza.CERTIFICATE`          |      |
 * | `Avanza.WARRANT`              |      |
 * | `Avanza.EXCHANGE_TRADED_FUND` |      |
 * | `Avanza.INDEX`                |      |
 * | `Avanza.PREMIUM_BOND`         |      |
 * | `Avanza.SUBSCRIPTION_OPTION`  |      |
 * | `Avanza.EQUITY_LINKED_BOND`   |      |
 * | `Avanza.CONVERTIBLE`          |      |
 *
 * #### Periods
 *
 * | Period                | Note |
 * | :-------------------- | :--- |
 * | `Avanza.TODAY`        |      |
 * | `Avanza.ONE_WEEK`     |      |
 * | `Avanza.ONE_MONTH`    |      |
 * | `Avanza.THREE_MONTHS` |      |
 * | `Avanza.THIS_YEAR`    |      |
 * | `Avanza.ONE_YEAR`     |      |
 * | `Avanza.FIVE_YEARS`   |      |
 *
 * #### Lists
 *
 * | List                                              | Note |
 * | :------------------------------------------------ | :--- |
 * | `Avanza.HIGHEST_RATED_FUNDS`                      |      |
 * | `Avanza.LOWEST_FEE_INDEX_FUNDS`                   |      |
 * | `Avanza.BEST_DEVELOPMENT_FUNDS_LAST_THREE_MONTHS` |      |
 * | `Avanza.MOST_OWNED_FUNDS`                         |      |
 *
 * #### Channels
 *
 * Note that for all channels where a _sequence_ of account IDs are expected
 * (`<accountId1>,<accountId2>,...`), you must supply all of your account IDs,
 * regardless of whether or not you want data for that account.
 *
 * | Channel                     | Note                                                                                                                |
 * | :-------------------------- | :------------------------------------------------------------------------------------------------------------------ |
 * | `Avanza.QUOTES`             | Minute-wise data containing current price, change, total volume traded etc. Expects an **orderbookId**.             |
 * | `Avanza.ORDERDEPTHS`        | Best five offers and current total volume on each side. Expects an **orderbookId**.                                 |
 * | `Avanza.TRADES`             | Updates whenever a new trade is made. Data contains volume, price, broker etc. Expects an **orderbookId**.          |
 * | `Avanza.BROKERTRADESUMMARY` | Pushes data about which brokers are long/short and how big their current net volume is. Expects an **orderbookId**. |
 * | `Avanza.POSITIONS`          | Your positions in an instrument. Expects a string of `<orderbookId>_<accountId1>,<accountId2,<accountId3>,...`.     |
 * | `Avanza.ORDERS`             | Your current orders. Expects a string of `_<accountId1>,<accountId2,<accountId3>,...`.                              |
 * | `Avanza.DEALS`              | Recent trades you have made. Expects a string of `_<accountId1>,<accountId2,<accountId3>,...`.                      |
 * | `Avanza.ACCOUNTS`           | N/A. Expects a string of `_<accountId>`.                                                                            |
 *
 * #### Transaction Types
 *
 * | Transaction type          | Note |
 * | :------------------------ | :--- |
 * | `Avanza.OPTIONS`          |      |
 * | `Avanza.FOREX`            |      |
 * | `Avanza.DEPOSIT_WITHDRAW` |      |
 * | `Avanza.BUY_SELL`         |      |
 * | `Avanza.DIVIDEND`         |      |
 * | `Avanza.INTEREST`         |      |
 * | `Avanza.FOREIGN_TAX`      |      |
 *
 * #### Order Types
 *
 * | Order type    | Note |
 * | :------------ | :--- |
 * | `Avanza.BUY`  |      |
 * | `Avanza.SELL` |      |
 *
 * @extends EventEmitter
 *
 */
declare class Avanza {
    _credentials: {
        username: string;
        password: string;
        totp: string;
        totpSecret: string;
    };
    _socket: any;
    _authenticated: boolean;
    _authenticationSession: any;
    _authenticationTimeout: number;
    _pushSubscriptionId: any;
    _reauthentication: number;
    _customerId: any;
    _securityToken: any;
    _backOffTimestamps: {};
    _socketHandshakeTimer: number;
    _socketSubscriptions: {};
    _socketMonitor: number;
    _socketLastMetaConnect: number;
    _adviceTimeout: number;
    _socketConnected: boolean;
    _socketMessageCount: number;
    _socketClientId: any;
    _backoffCalc(actionName: any): number;
    _socketRestart(): void;
    _socketInit(restart: any): void;
    _socketSend(data: any): void;
    _socketHandleMessage(data: any): void;
    _authenticateSocket(forceHandshake: any): void;
    _socketSubscribe(subscriptionString: any): void;
    _socketUnsubscribe(subscriptionString: any): void;
    /**
     * Authenticate the client.
     *
     * If second factor authentication is needed, either the one time code can be provided in `totp`, or the secret to
     * generate codes can be provided in `totpSecret`.
     *
     * @param {Object} credentials
     * @param {String} credentials.username
     * @param {String} credentials.password
     * @param {String} credentials.totp
     * @param {String} credentials.totpSecret
     */
    authenticate(credentials: {
        username: string;
        password: string;
        totp: string;
        totpSecret: string;
    }): any;
    _scheduleReauth(delay: any): void;
    /**
     * Disconnects by simulating a client that just goes away.
     */
    disconnect(): void;
    /**
     * Get all `positions` held by this user.
     */
    getPositions(): Promise<any>;
    /**
     * Get an overview of the users holdings at Avanza Bank.
     */
    getOverview(): Promise<any>;
    /**
     * Get an overview of the users holdings for a specific account at Avanza Bank.
     * @param {String} accountId A valid account ID.
     *
     */
    getAccountOverview(accountId: string): Promise<any>;
    /**
     * Get recent deals and orders.
     */
    getDealsAndOrders(): Promise<any>;
    /**
     * Get all transactions of an account.
     *
     * @param {String} accountOrTransactionType A valid account ID or a
     *                                          [Transaction Type](#transaction-type).
     * @param {Object} options Configuring which transactions to fetch.
     * @param {String} [options.from] On the form YYYY-MM-DD.
     * @param {String} [options.to] On the form YYYY-MM-DD.
     * @param {Number} [options.maxAmount] Only fetch transactions of at most this value.
     * @param {Number} [options.minAmount] Only fetch transactions of at least this value.
     * @param {String|Array} [options.orderbookId] Only fetch transactions involving
     *                                             this/these orderbooks.
     */
    getTransactions(accountOrTransactionType: string, options: {
        from?: string;
        to?: string;
        maxAmount?: number;
        minAmount?: number;
        orderbookId?: string | any[];
    }): Promise<any>;
    /**
     * Get all watchlists created by this user. Note that the second table was
     * created from a specific watchlist, and so the response from the API will be
     * different for you.
     */
    getWatchlists(): Promise<any>;
    /**
     * Add an instrument to the watchlist.
     *
     * @param {String} instrumentId The ID of the instrument to add.
     * @param {String} watchlistId  The ID of the watchlist to add the instrument to.
     */
    addToWatchlist(instrumentId: string, watchlistId: string): Promise<any>;
    /**
     * Remove an instrument from the watchlist.
     *
     * @param {String} instrumentId The ID of the instrument to remove.
     * @param {String} watchlistId  The ID of the watchlist to remove the instrument from.
     */
    removeFromWatchlist(instrumentId: string, watchlistId: string): Promise<any>;
    /**
     * Get instrument information.
     *
     * @param {String} instrumentId Likely the same as the instrumentId.
     * @param {String} instrumentType The type of the instrument. See
     *                                [Instrument Types](#instrument-types).
     */
    getInstrument(instrumentType: string, instrumentId: string): Promise<any>;
    /**
     * Get orderbook information.
     *
     * @param {String} orderbookId Likely the same as the instrumentId.
     * @param {String} instrumentType The type of the instrument. See
     *                                [Instrument Types](#instrument-types).
     */
    getOrderbook(instrumentType: string, orderbookId: string): Promise<any>;
    /**
     * Get information about multiple orderbooks.
     *
     * @param {Array} orderbookIds A list of orderbook IDs.
     */
    getOrderbooks(orderbookIds: any[]): Promise<any>;
    /**
     * Get an array of prices over a period of time.
     *
     * @param {String} orderbookId The orderbook to fetch price data about.
     * @param {Period} period The period from which to fetch data. See [Periods](#periods).
     */
    getChartdata(orderbookId: string, period: Period): Promise<any>;
    /**
     * List all inspiration lists.
     */
    getInspirationLists(): Promise<any>;
    /**
     * Get information about a single inspiration list.
     *
     * @param {String} type List type. See [Lists](#lists)
     */
    getInspirationList(type: string): Promise<any>;
    /**
     * Subscribe to real-time data.
     *
     * @param {String} channel The channel on which to listen. See [Channels](#channels).
     * @param {String|Array<String>} ids One or many IDs to subscribe to.
     * @param {Function} callback Function to call whenever the subscription receives a new message
     * @return {Function} Call to unsubscribe.
     */
    subscribe(channel: string, ids: string | Array<string>, callback: Function): Function;
    /**
     * Place a limit order.
     *
     * @param {Object} options Order options.
     * @param {String} options.accountId ID of the account to trade on.
     * @param {String} options.orderbookId ID of the instrument to trade.
     * @param {String} options.orderType One of "BUY" or "SELL".
     * @param {Number} options.price The price limit of the order.
     * @param {String} options.validUntil A date on the form YYYY-MM-DD. Cancels
     *                                    the order if this date is passed.
     * @param {Number} options.volume How many securities to order.
     * @return {Object} Properties are `messages`, `requestId`, `status`, `orderId`.
     */
    placeOrder(options: {
        accountId: string;
        orderbookId: string;
        orderType: string;
        price: number;
        validUntil: string;
        volume: number;
    }): any;
    /**
     * Get information about an order.
     *
     * It is quite hard to automatically generate tables of what this endpoint
     * returns since orders are merely temporary entities.
     *
     * The returned object however looks very much like that from
     * [getOrderbook()](#getorderbook) with an extra property `order` which
     * contains information you already have (such as order price or volume).
     *
     * @param {String} instrumentType Instrument type of the pertaining instrument.
     *                                See [Instrument Types](#instrument-types).
     * @param {String} accountId ID of the account which this order was placed on.
     * @param {String} orderId ID of the order.
     */
    getOrder(instrumentType: string, accountId: string, orderId: string): Promise<any>;
    /**
     * Edit an order.
     *
     * @param {String} instrumentType Instrument type of the pertaining instrument.
     *                                See [Instrument Types](#instrument-types).
     * @param {String} orderId Order ID received when placing the order.
     * @param {Object} options Order options. See [placeOrder()](#placeorder).
     */
    editOrder(instrumentType: string, orderId: string, options: any): Promise<any>;
    /**
     * Delete and cancel an order.
     *
     * @param {String} accountId ID of the account on which this order was placed.
     * @param {String} orderId Order ID received when the order was placed.
     */
    deleteOrder(accountId: string, orderId: string): Promise<any>;
    /**
     * Free text search for an instrument.
     *
     * @param {String} searchQuery Search query.
     * @param {String} [type] An instrument type.
     */
    search(searchQuery: string, type?: string): Promise<any>;
    /**
     * Make a call to the API. Note that this method will filter dangling question
     * marks from `path`.
     *
     * @param {String} [method='GET'] HTTP method to use.
     * @param {String} [path=''] The URL to send the request to.
     * @param {Object} [data={}] JSON data to send with the request.
     * @return {Promise}
     */
    call(method?: string, path?: string, data?: any): Promise<any>;
}
