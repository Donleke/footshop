import order from "../model/order.js";

//create order
export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingDetails,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    console.log(req.body);
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order item");
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingDetails,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      const createOrder = await order.save();
      res.status(201).json(createOrder);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//get order by user
export const getUserOrders = async (req, res) => {
  const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
  res.json(order);
};
//get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ _id: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get orderdetail
export const getOrderDetail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.json(order);
      return;
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//get paid cashorder
export const cashOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
//get paid paypalorder
export const paypalOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//set delivery paypal
export const paypalDelivery = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//track an order
export const trackOrders = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};
