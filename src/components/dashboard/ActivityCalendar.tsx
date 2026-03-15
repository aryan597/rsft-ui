import React from 'react';

interface ActivityDay {
  date: string;
  count: number;
}

export default function ActivityCalendar() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const getLastYear = (): Date[] => {
    const dates: Date[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 370; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date);
    }
    return dates;
  };

  const getMonthLabels = (dates: Date[]): { label: string; width: number }[] => {
    const labels: { label: string; width: number }[] = [];
    let currentMonth = '';
    let weekCount = 0;
    
    dates.forEach((date) => {
      const month = months[date.getMonth()];
      const dayOfWeek = date.getDay();
      
      if (dayOfWeek === 1) weekCount++;
      
      if (month !== currentMonth) {
        if (currentMonth !== '') {
          labels.push({ 
            label: currentMonth, 
            width: weekCount * 20
          });
          weekCount = 0;
        }
        currentMonth = month;
      }
    });
    
    if (weekCount > 0) {
      labels.push({ 
        label: currentMonth, 
        width: weekCount * 20 
      });
    }
    
    return labels;
  };

  const generateCalendarData = (): ActivityDay[][] => {
    const dates = getLastYear();
    const columns: ActivityDay[][] = [];
    let currentColumn: ActivityDay[] = [];
    
    dates.forEach((date) => {
      const dayOfWeek = date.getDay();
      const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      
      if (adjustedDay === 0 && currentColumn.length > 0) {
        columns.push(currentColumn);
        currentColumn = [];
      }
      
      while (currentColumn.length < adjustedDay) {
        currentColumn.push({ date: '', count: 0 });
      }
      
      const count = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0;
      currentColumn.push({
        date: date.toISOString().split('T')[0],
        count
      });
    });
    
    if (currentColumn.length > 0) {
      columns.push(currentColumn);
    }
    
    return columns;
  };

  const getActivityColor = (count: number): string => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    const opacity = 0.25 + (count * 0.2); // Creates a nice gradient from 0.45 to 1.05
    return `bg-black dark:bg-white opacity-[${opacity}]`;
  };

  const weeks = generateCalendarData();
  const monthLabels = getMonthLabels(getLastYear());

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max">
        {/* Days labels */}
        <div className="flex flex-col mr-4 pt-8">
          {days.map(day => (
            <div key={day} className="h-5 text-xs font-mono mb-[3px] text-gray-600 dark:text-gray-400 w-8">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="flex-1">
          {/* Month labels */}
          <div className="flex h-8 items-end mb-2">
            {monthLabels.map((month, index) => (
              <div 
                key={`${month.label}-${index}`} 
                className="text-xs font-mono text-gray-600 dark:text-gray-400"
                style={{ 
                  width: month.width,
                  marginRight: '4px',
                  position: 'relative',
                  left: '-8px'
                }}
              >
                {month.label}
              </div>
            ))}
          </div>

          <div className="grid grid-flow-col gap-1">
            {weeks.map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-[3px]">
                {column.map((day, dayIndex) => (
                  <div
                    key={`${columnIndex}-${dayIndex}`}
                    className={`w-4 h-4 rounded-sm transition-all duration-200 
                      hover:ring-2 hover:ring-black dark:hover:ring-white 
                      hover:scale-105 ${getActivityColor(day.count)}`}
                    title={day.date ? `${new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}: ${day.count} activities` : 'No activity'}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-end items-center mt-4 space-x-2">
        <span className="text-xs font-mono text-gray-600 dark:text-gray-400">Less</span>
        <div className="flex space-x-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-4 h-4 rounded-sm ${getActivityColor(level)}`}
              title={`${level} activities`}
            />
          ))}
        </div>
        <span className="text-xs font-mono text-gray-600 dark:text-gray-400">More</span>
      </div>
    </div>
  );
}