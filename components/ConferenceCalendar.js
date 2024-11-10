import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const ConferenceCalendar = () => {
  const [conferences, setConferences] = useState([
    {
      name: "ICML 2024",
      deadline: "2024-01-25",
      url: "https://icml.cc/",
    },
    {
      name: "NeurIPS 2024",
      deadline: "2024-01-25",  // Same date as ICML for demonstration
      url: "https://neurips.cc/",
    },
    // Add more conferences as needed
  ]);
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getCurrentMonthInfo = () => {
    const now = new Date();
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    return {
      startYear: twoMonthsAgo.getFullYear(),
      startMonth: twoMonthsAgo.getMonth(),
      currentYear: now.getFullYear(),
      currentMonth: now.getMonth(),
    };
  };

  const { startYear, startMonth, currentYear, currentMonth } = getCurrentMonthInfo();

  const generateCalendarData = () => {
    const calendarData = [];
    let yearCounter = startYear;
    let monthCounter = startMonth;

    for (let i = 0; i < 12; i++) {
      if (monthCounter > 11) {
        monthCounter = 0;
        yearCounter++;
      }

      const daysInMonth = new Date(yearCounter, monthCounter + 1, 0).getDate();
      const firstDayOfMonth = new Date(yearCounter, monthCounter, 1).getDay();

      calendarData.push({
        year: yearCounter,
        month: monthCounter,
        daysInMonth,
        firstDayOfMonth,
        isCurrentMonth: yearCounter === currentYear && monthCounter === currentMonth,
      });

      monthCounter++;
    }

    return calendarData;
  };

  const getConferencesForDate = (year, month, day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return conferences.filter(conf => conf.deadline === dateStr);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {generateCalendarData().map(({ year, month, daysInMonth, firstDayOfMonth, isCurrentMonth }) => (
          <div 
            key={`${year}-${month}`} 
            className={`border rounded-lg p-4 bg-white shadow-sm ${
              isCurrentMonth ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${
                isCurrentMonth ? 'text-blue-600' : ''
              }`}>
                {months[month]} {year}
                {isCurrentMonth && <span className="ml-2 text-sm">(Current)</span>}
              </h3>
              <Calendar className={`w-5 h-5 ${
                isCurrentMonth ? 'text-blue-500' : 'text-gray-500'
              }`} />
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
              
              {[...Array(firstDayOfMonth)].map((_, i) => (
                <div key={`empty-${i}`} className="h-8" />
              ))}
              
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const confs = getConferencesForDate(year, month, day);
                return (
                  <div
                    key={day}
                    className={`group h-8 flex items-center justify-center relative
                      ${confs.length > 0 ? 'bg-green-100 rounded-full' : ''}
                      ${confs.length > 1 ? 'ring-2 ring-green-500' : ''}
                    `}
                  >
                    <span className="text-sm">{day}</span>
                    {confs.length > 0 && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white shadow-lg rounded p-2 hidden group-hover:block w-48 z-10">
                        {confs.map(conf => (
                          <a
                            key={conf.name}
                            href={conf.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline block py-1"
                          >
                            {conf.name}
                          </a>
                        ))}
                        {confs.length > 1 && (
                          <div className="text-xs text-gray-500 mt-1 border-t pt-1">
                            {confs.length} deadlines on this date
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConferenceCalendar;
