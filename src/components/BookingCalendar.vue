<script setup>
import { watch, ref } from 'vue';
import Calendar from 'js-year-calendar';
import { useTableStore } from '../stores/table';
import { useBookingModalStore } from '../stores/bookingModal';
import { usePropertiesStore } from '../stores/properties';

const table = useTableStore()
const bookingModal = useBookingModalStore()
const properties = usePropertiesStore()
var calendar

function formatDate(date) {
    const addZero = (x) => {return x < 10 ? '0'+x:x}
    return `${date.getFullYear()}-${addZero(date.getMonth()+1)}-${addZero(date.getDate())}`
}

async function getData(year) {
    const req = await fetch(`./api/bookings/calendar?properties=${properties.selected}&year=${year}`)
    const data = await req.json()
    return data.map(x => ({
        id: x.id,
        name: x.name,
        propertyId: x.propertyId,
        startDate: new Date(x.checkIn+'T00:00'),
        endDate: new Date(x.checkOut+'T00:00'),
        color: getBookingColor(x.status)
    }))
}

function render() {
    calendar = new Calendar('.calendar', {
        style: 'custom',
        alwaysHalfDay: true,
        enableRangeSelection: true,
        dataSource: async (e) => getData(e.year),
        customDataSourceRenderer: (element, date, events) => {
            element.style.boxShadow = `${events[0].color} 0px -4px 0px 0px inset`
            if (new Date(date).toLocaleDateString() == new Date(events[0].startDate).toLocaleDateString()) {
                element.style.backgroundColor = `${events[0].color}`
            }
            element.style.borderRadius = 0
            if (events.length > 1) {
                element.style.backgroundColor = getBookingColor()
                element.style.boxShadow = `${getBookingColor()} 0px -4px 0px 0px inset`
            }
        },
        clickDay: (e)=> {
            if (e.events.length == 1) bookingModal.openSync(e.events[0])
            if (!e.events.length) bookingModal.create({checkIn: formatDate(e.date)})
        },
        selectRange: (e) => {
            if (e.startDate == e.endDate) return
            bookingModal.create({
                checkIn: formatDate(e.startDate),
                checkOut: formatDate(e.endDate),
            })
        },
    })
}

function getBookingColor(status) {
    let color
    switch (status) {
        case 1:
            color = '--color-orange'
            break;
        case 2:
            color = '--color-purple'
            break;
        case 3:
            color = '--color-green'
            break;
        case 4:
            color = '--color-grey'
            break;
        case 6:
            color = '--color-blue'
            break;
    
        default:
            color = '--color-red'
            break;
    }
    return getComputedStyle(document.documentElement).getPropertyValue(color)
}

watch(()=> table.list, ()=>{
    //this way the calendar stays in the active year when changing properties or creating bookings etc.
    if (calendar) return calendar.setDataSource(async (e) => await getData(e.year))
    render()
})
</script>

<template>
    <div class="calendar"></div>
</template>

<style lang="less">
@import 'js-year-calendar/dist/js-year-calendar.css';

.calendar {
    width: 100%;

    table {
        border-spacing: 2px;
    }

    .calendar-header {
        border: none;
    }
    .calendar-header table th {
        &:hover {
            background: var(--color-shade);
        }
    }
    .month-title, .day-header {
        font-size: small !important;
    }
    table td {
        font-size: x-small !important;
    }
    table.month td.day .day-content:hover {
        background: var(--color-shade);
    }
    table.month td.range .day-content {
        background: var(--color-shade) !important;
    }
}
</style>