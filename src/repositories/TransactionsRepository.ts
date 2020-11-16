import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const balance = this.transactions.reduce(
      (acc: Balance, transaction: Transaction) => {

        switch (transaction.type) {
          case "income":
            acc.income += transaction.value;
            break;
          case 'outcome':
            acc.outcome += transaction.value;
            break;
          default:
            break;
        }
        return acc;
      }, {
      income: 0,
      outcome: 0,
      total: 0
    })
    balance.total = balance.income - balance.outcome;
    return balance;
  }

  public create({ title, value, type }: CreateTransationDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
