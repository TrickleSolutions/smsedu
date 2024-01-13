const { model, Schema } = require('mongoose')


const TransactionsSchema = new Schema({
    source: {
        type: String,
    },
    incomeType: {
        type: String,
        enum: ["dabit", "credit"]
    },
    amount: {
        type: Number,
    },
    dateTime: {
        type: Date
    }
})



const schema = new Schema({
    year: {
        type: Date,
        unique: true,
    },
    OpeningBalance: {
        type: Number,
        required: true
    },
    ClosingBalance: {
        type: Number,
        required: true,
    },
    totalRevenue: {
        type: Number,
    },
    totalExpense: {
        type: Number
    },
    totalIncome: {
        type: Number
    },
    transactions: [TransactionsSchema]
}, {
    timestamps: true,
})



const CashbookModel = model("cash_ledger", schema)


module.exports = CashbookModel