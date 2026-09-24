const Event = require('../models/Event');

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).populate('organizer', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEvent = async (req, res) => {
  const { title, description, venue, date, price, totalSeats } = req.body;
  try {
    const event = new Event({
      title,
      description,
      venue,
      date,
      price,
      totalSeats,
      availableSeats: totalSeats,
      organizer: req.user._id
    });
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEvents, createEvent };
