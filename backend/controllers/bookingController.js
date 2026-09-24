const Booking = require('../models/Booking');
const Event = require('../models/Event');
const QRCode = require('qrcode');

const createBooking = async (req, res) => {
  const { eventId, seatsBooked } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.availableSeats < seatsBooked) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    event.availableSeats -= seatsBooked;
    await event.save();

    const totalAmount = event.price * seatsBooked;

    const booking = new Booking({
      event: event._id,
      user: req.user._id,
      seatsBooked,
      totalAmount
    });

    const qrData = JSON.stringify({
      bookingId: booking._id,
      event: event.title,
      seats: seatsBooked,
      user: req.user.email
    });
    booking.qrCodeUrl = await QRCode.toDataURL(qrData);

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getMyBookings };
