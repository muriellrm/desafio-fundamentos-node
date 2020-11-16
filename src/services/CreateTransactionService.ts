import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Resquest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Resquest): Transaction {

    if (type !== 'income' && type !== 'outcome') {
      throw new Error('The field Type is not valid');
    }

    const balance = this.transactionsRepository.getBalance();

    if (balance.total < value && type === 'outcome') {
      throw new Error("You don't have enough money");
    }

    const transaction = this.transactionsRepository.create({ title, value, type });

    return transaction;
  }
}

export default CreateTransactionService;
