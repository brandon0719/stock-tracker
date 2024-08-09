// groupedTrades = [  [AMZN TRADE {AMZN1}, {AMZN2}, {AMZN3}], [NVDA TRADE {NVDA1}, {NVDA2}]  ]

function groupTrades(trades) {
    const tradeGroups = new Map();

    trades.forEach((trade, index) => {
        const tickerKey = `${trade.ticker}`;

        if (!tradeGroups.has(tickerKey)) {
            tradeGroups.set(tickerKey, []);
        }

        const tickerGroup = tradeGroups.get(tickerKey);

        if (trade.openTrade) {
            // Start a new trade group
            tickerGroup.push([trade]);
        } else if (trade.closeTrade) {
            // Find the last open trade group for the ticker and add to it
            const lastOpenGroup = tickerGroup[tickerGroup.length - 1];
            if (lastOpenGroup) {
                lastOpenGroup.push(trade);
            }
        } else {
            // Add to the last open trade group for the ticker
            const lastOpenGroup = tickerGroup[tickerGroup.length - 1];
            if (lastOpenGroup) {
                lastOpenGroup.push(trade);
            }
        }
    });

    return Array.from(tradeGroups.values()).reduce(
        (acc, groups) => acc.concat(groups),
        []
    );
}

function gainLoss(tradeList) {
    // console.log(`gainloss test ${tradeList}`)
    let totalGainLoss = 0;
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "buy") {
            totalGainLoss += tradeList[i].price * tradeList[i].shares * -1;
        } else {
            totalGainLoss += tradeList[i].price * tradeList[i].shares;
        }
    }
    return totalGainLoss;
}

function totalCost(tradeList) {
    let cost = 0;
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "buy") {
            cost += tradeList[i].price * tradeList[i].shares;
        }
    }
    return cost;
}

function avgOpenPrice(tradeList) {
    let totalShares = 0;
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "buy") {
            totalShares += tradeList[i].shares;
        }
    }
    let avgPrice = totalCost(tradeList) / totalShares;
    return avgPrice;
}

function totalSold(tradeList) {
    let value = 0;
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "sell") {
            value += tradeList[i].price * tradeList[i].shares;
        }
    }
    return value;
}

function avgClosePrice(tradeList) {
    let totalShares = 0;
    let totalValue = 0;
    for (let i = 0; i < tradeList.length; i++) {
        if (tradeList[i].buySell === "sell") {
            totalShares += tradeList[i].shares;
            totalValue += tradeList[i].shares * tradeList[i].price;
        }
    }
    let avgPrice = totalValue / totalShares;
    return avgPrice;
}

function percentGainLoss(tradeList) {
    let prctGainLoss = (100 * gainLoss(tradeList)) / totalCost(tradeList);
    return prctGainLoss;
}

function getOpenDate(trades) {
    for (const trade of trades) {
        if (trade.openTrade === true) {
            return trade.date;
        }
    }
}

function getCloseDate(trades) {
    for (const trade of trades) {
        if (trade.closeTrade === true) {
            return trade.date;
        }
    }
}

function getOwnedShares(trades) {
    let totalShares = 0;
    for (const trade of trades) {
        if (trade.buySell === "buy") {
            totalShares += trade.shares;
        }
    }
    return totalShares;
}

function currentShares(trades) {
    let totalShares = 0;
    for (const trade of trades) {
        if (trade.buySell === "buy") {
            totalShares += trade.shares;
        } else if (trade.buySell === "sell") {
            totalShares -= trade.shares;
        }
    }
    return totalShares;
}

function openTradeTrue(trades) {
    let count = 0;
    for (const trade of trades) {
        if (trade.closeTrade === true) {
            count += 1;
        }
    }
    if (count == 1) {
        return true;
    } else {
        return false;
    }
}

export {
    groupTrades,
    totalCost,
    avgOpenPrice,
    totalSold,
    avgClosePrice,
    percentGainLoss,
    getOpenDate,
    getCloseDate,
    getOwnedShares,
    gainLoss,
    openTradeTrue,
    currentShares,
};
