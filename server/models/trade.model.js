import {model, Schema} from 'mongoose'
const tradeSchema = new Schema(
    {
        ticker: {
            type: String,
            require: [true, "Ticker symbol is required"],
            minLength: [1, "Ticker symbol must be atleast 1 character"],
            maxLength: [5, "Ticker symbol cannot be more than 5 characters"]
        },
        date: {
            type: Date,
            require: [true, "Date is required"]
        },
        buySell: {
            type: String,
            require: [true, "Buy or Sell is required"],
            enum: ["buy", "sell"]
        },
        shares: {
            type: Number,
            require: [true, "Number of shares is required"],
            min: [1, "Number of shares must be atleast 1"],
            max: [1000000, "Number of shares cannot be more than 1,000,000"]
        },
        price: {
            type: Number,
            require: [true, "Purchase price required"],
            min: [0.01, "Price must be atleast $0.01"],
            max: [25000, "Is this stock really more than $25,000 a share"]
        },
        shaper: {
            type: String,
            require: [false],
            maxLength: [50, "Cannot be more than 50 characters"]
        }, 
        tactical: {
            type: String,
            require: [false],
            maxLength: [50, "Cannot be more than 50 characters"]
        },
        closeTrade: {
            type: Boolean,
            require: [false]
        },
        openTrade: {
            type: Boolean,
            require: [false]
        }
    },
    { timestamps: true}
)

const Trade = model("Trade", tradeSchema)
export default Trade