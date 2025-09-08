'use client';

import { useState } from 'react';

interface ParkingSlot {
  id: string;
  number: number;
  isAvailable: boolean;
  price: number;
}

interface Booking {
  slotId: string;
  slotNumber: number;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalPrice: number;
  email: string;
}

export default function ParkingBooking() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [email, setEmail] = useState('');

  const parkingSlots: ParkingSlot[] = [
    { id: 'A1', number: 1, isAvailable: true, price: 15 },
    { id: 'A2', number: 2, isAvailable: false, price: 15 },
    { id: 'A3', number: 3, isAvailable: true, price: 15 },
    { id: 'A4', number: 4, isAvailable: true, price: 15 },
    { id: 'B1', number: 5, isAvailable: true, price: 20 },
    { id: 'B2', number: 6, isAvailable: false, price: 20 },
    { id: 'B3', number: 7, isAvailable: true, price: 20 },
    { id: 'B4', number: 8, isAvailable: true, price: 20 },
    { id: 'C1', number: 9, isAvailable: true, price: 30 },
    { id: 'C2', number: 10, isAvailable: true, price: 30 },
    { id: 'C3', number: 11, isAvailable: false, price: 30 },
    { id: 'C4', number: 12, isAvailable: true, price: 30 },
  ];

  const calculateDuration = (start: string, end: string): number => {
    const startDate = new Date(`2000-01-01T${start}:00`);
    const endDate = new Date(`2000-01-01T${end}:00`);
    return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBooking = () => {
    if (!selectedSlot || !bookingDate || !startTime || !endTime || !email) {
      alert('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    const slot = parkingSlots.find(s => s.id === selectedSlot);
    if (!slot) return;

    const duration = calculateDuration(startTime, endTime);
    if (duration <= 0) {
      alert('End time must be after start time');
      return;
    }

    const newBooking: Booking = {
      slotId: selectedSlot,
      slotNumber: slot.number,
      date: bookingDate,
      startTime,
      endTime,
      duration,
      totalPrice: duration * slot.price,
      email
    };

    setBooking(newBooking);
    setShowConfirmation(true);
  };

  const confirmBooking = () => {
    alert(`Booking confirmed! A confirmation email has been sent to ${booking?.email}`);
    setShowConfirmation(false);
    setSelectedSlot(null);
    setBookingDate('');
    setStartTime('');
    setEndTime('');
    setEmail('');
    setBooking(null);
  };

  if (showConfirmation && booking) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Booking Confirmation</h1>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="font-semibold">{booking.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Parking Slot:</p>
                    <p className="font-semibold">Slot #{booking.slotNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date:</p>
                    <p className="font-semibold">{booking.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Time:</p>
                    <p className="font-semibold">{booking.startTime} - {booking.endTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration:</p>
                    <p className="font-semibold">{booking.duration} hours</p>
                  </div>
                </div>
              </div>
              
              <div className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Price:</span>
                  <span className="text-2xl font-bold text-green-600">RM{booking.totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={confirmBooking}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Parking Booking System</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Select Parking Slot</h2>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
              {parkingSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.isAvailable ? setSelectedSlot(slot.id) : null}
                  disabled={!slot.isAvailable}
                  className={`
                    aspect-square rounded-lg border-2 font-semibold text-sm transition-all
                    ${selectedSlot === slot.id 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : slot.isAvailable 
                        ? 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300' 
                        : 'bg-red-100 text-red-800 border-red-300 cursor-not-allowed opacity-50'
                    }
                  `}
                >
                  <div className="text-center">
                    <div>#{slot.number}</div>
                    <div className="text-xs">RM{slot.price}/hr</div>
                    <div className="text-xs">
                      {slot.isAvailable ? 'Available' : 'Occupied'}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                <span>Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                <span>Selected</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Slot:
                </label>
                <input
                  type="text"
                  value={selectedSlot ? `Slot #${parkingSlots.find(s => s.id === selectedSlot)?.number}` : ''}
                  placeholder="Please select a parking slot"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking Date:
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time:
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time:
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {selectedSlot && startTime && endTime && bookingDate && email && validateEmail(email) && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Booking Summary</h3>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>Duration: {calculateDuration(startTime, endTime)} hours</p>
                    <p>Rate: RM{parkingSlots.find(s => s.id === selectedSlot)?.price}/hour</p>
                    <p className="font-semibold">
                      Total: RM{(calculateDuration(startTime, endTime) * (parkingSlots.find(s => s.id === selectedSlot)?.price || 0)).toFixed(2)}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleBooking}
                disabled={!selectedSlot || !bookingDate || !startTime || !endTime || !email || !validateEmail(email)}
                className={`
                  w-full py-3 px-6 rounded-lg font-semibold transition-colors
                  ${selectedSlot && bookingDate && startTime && endTime && email && validateEmail(email)
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                Book Parking Slot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
