import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  returned: {
    type: Boolean,
    default: false
  },
  returnDate: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('Loan', loanSchema);