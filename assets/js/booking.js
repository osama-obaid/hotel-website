XMLDocumentx    
        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function () {
                navLinks.classList.toggle('active');
                const icon = menuToggle.querySelector('i');
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }

        // Navbar Hide on Scroll
        let lastScroll = 0;
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }
            lastScroll = currentScroll;
        });

        // Flatpickr Date Pickers
        flatpickr("#checkIn", {
            locale: "ar",
            minDate: "today",
            dateFormat: "Y-m-d",
            onChange: function (selectedDates, dateStr, instance) {
                if (document.getElementById('checkOut').value) {
                    calculateNights();
                }
            }
        });

        flatpickr("#checkOut", {
            locale: "ar",
            minDate: "today",
            dateFormat: "Y-m-d",
            onChange: function (selectedDates, dateStr, instance) {
                if (document.getElementById('checkIn').value) {
                    calculateNights();
                }
            }
        });

        // Room Selection
        let selectedRoom = {
            name: 'غرفة قياسية',
            price: 50
        };

        const roomCards = document.querySelectorAll('.room-card');
        roomCards.forEach(card => {
            card.addEventListener('click', function () {
                roomCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');

                const roomName = this.querySelector('h3').innerText;
                const roomPrice = parseInt(this.dataset.price);

                selectedRoom = {
                    name: roomName,
                    price: roomPrice
                };

                updateSummary();
            });
        });

        // Select first room by default
        if (roomCards.length > 0) {
            roomCards[0].classList.add('selected');
        }

        // Calculate Nights
        function calculateNights() {
            const checkIn = document.getElementById('checkIn').value;
            const checkOut = document.getElementById('checkOut').value;

            if (checkIn && checkOut) {
                const inDate = new Date(checkIn);
                const outDate = new Date(checkOut);
                const diffTime = Math.abs(outDate - inDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays > 0) {
                    document.getElementById('summaryNights').innerText = diffDays + ' ليالي';
                    updateSummary(diffDays);
                    return diffDays;
                } else {
                    document.getElementById('summaryNights').innerText = '0 ليالي';
                    return 0;
                }
            }
            return 0;
        }

        // Update Guests
        const guestsSelect = document.getElementById('guests');
        guestsSelect.addEventListener('change', function () {
            const guests = this.value;
            document.getElementById('summaryGuests').innerText = guests + (guests > 1 ? ' ضيوف' : ' ضيف');
            updateSummary();
        });

        // Update Summary
        function updateSummary(nights = null) {
            if (nights === null) {
                nights = calculateNights();
            }

            document.getElementById('summaryRoom').innerText = selectedRoom.name;
            document.getElementById('summaryPrice').innerText = '$' + selectedRoom.price;

            const total = selectedRoom.price * nights;
            document.getElementById('summaryTotal').innerHTML = '$' + total;
        }

        // Real-time updates
        setInterval(() => {
            calculateNights();
        }, 1000);

        // Submit Booking
        function submitBooking() {
            const fullName = document.getElementById('fullName').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const checkIn = document.getElementById('checkIn').value;
            const checkOut = document.getElementById('checkOut').value;
            const guests = document.getElementById('guests').value;

            if (!fullName || !phone || !email || !checkIn || !checkOut) {
                alert('يرجى تعبئة جميع الحقول المطلوبة');
                return;
            }

            const nights = calculateNights();
            if (nights === 0) {
                alert('يرجى تحديد تاريخ الوصول والمغادرة بشكل صحيح');
                return;
            }

            const total = selectedRoom.price * nights;

            const message = `📋 طلب حجز جديد:
      
🏨 الفندق: فندق بلاتينيوم
👤 الاسم: ${fullName}
📞 الهاتف: ${phone}
📧 البريد: ${email}
🏠 نوع الغرفة: ${selectedRoom.name}
💰 سعر الليلة: $${selectedRoom.price}
📅 تاريخ الوصول: ${checkIn}
📅 تاريخ المغادرة: ${checkOut}
👥 عدد الضيوف: ${guests}
💵 الإجمالي: $${total}

شكراً لحجزكم في فندق بلاتينيوم!`;

            if (confirm('هل أنت متأكد من تأكيد الحجز؟')) {
                alert(message + '\n\nسيتم التواصل معكم قريباً لتأكيد الحجز.');
                document.getElementById('bookingForm').reset();
                document.getElementById('checkIn').value = '';
                document.getElementById('checkOut').value = '';
                calculateNights();
            }
        }
