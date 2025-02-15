import express from 'express';
import Loan from '../models/Loan.js';
import Book from '../models/Book.js';

const router = express.Router();

// Get all loans
router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate('member')
      .populate('book');
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new loan
router.post('/', async (req, res) => {
  try {
    const book = await Book.findById(req.body.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (book.quantity < 1) {
      return res.status(400).json({ message: 'Book not available' });
    }

    const loan = new Loan({
      member: req.body.memberId,
      book: req.body.bookId,
      dueDate: req.body.dueDate
    });

    book.quantity -= 1;
    await book.save();
    
    const newLoan = await loan.save();
    await newLoan.populate(['member', 'book']);
    
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Return a book
router.patch('/:id/return', async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    if (loan.returned) {
      return res.status(400).json({ message: 'Book already returned' });
    }

    const book = await Book.findById(loan.book);
    book.quantity += 1;
    await book.save();

    loan.returned = true;
    loan.returnDate = new Date();
    await loan.save();
    await loan.populate(['member', 'book']);

    res.json(loan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;