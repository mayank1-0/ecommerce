const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paypalOrderId: String,
    totalAmount: Number,
  },
  { timestamps: true }
);

// Pre-save hook to automatically populate shippingAddress
orderSchema.pre('save', async function(next) {
  if (!this.shippingAddress && this.customer) {
    try {
      const customer = await mongoose.model('Customer').findById(this.customer);
      if (customer && customer.shippingAddress) {
        this.shippingAddress = customer.shippingAddress;
      }
    } catch (err) {
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema, 'Orders')
