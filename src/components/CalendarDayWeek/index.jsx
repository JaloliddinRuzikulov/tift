import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction';
import uzLocale from '@fullcalendar/core/locales/uz';
import { ContentWrapper } from '../../global_styles/styles';
import { Paper } from '@mui/material';
 
const events = [ 
  { 
    id: 1, 
    title: 'event 1', 
    start: '2023-07-07T10:45:00', 
    end: '2023-07-07T12:00:00',
    backgroundColor: "red",
    allDay: false
  },
  { 
    id: 12, 
    title: 'event 1', 
    start: '2023-07-07T10:45:00', 
    end: '2023-07-07T12:00:00',
    backgroundColor: "yellow",
    allDay: false
  },
  { 
    id: 2, 
    title: 'event 2', 
    start: '2023-07-07T13:00:00', 
    end: '2023-07-07T18:00:00', 
    allDay: false
  }
]; 
 
function CalendarDayWeek() { 
  return ( 
    <ContentWrapper> 
      <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    padding: "20px",
                    borderRadius: "10px",
                    // backgroundColor: "transparent"
                }}
            >
      <FullCalendar 
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
        initialView="timeGridWeek"
        timeZone= 'UTC'
        headerToolbar={{ 
          center: 'timeGridWeek,timeGridDay',
          right: "",
          left: ""
        }} 
        customButtons={{ 
          new: { 
            text: 'new', 
            click: () => console.log('new event'), 
          }, 
        }}
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        }}
        events={events} 
        nowIndicator 
        allDaySlot={false}
        dateClick={(e) => console.log(e.dateStr)} 
        eventClick={(e) => console.log(e.event.id)}
        locale={uzLocale}
      /> 
      </Paper>
    </ContentWrapper> 
  ); 
} 
 
export default CalendarDayWeek;