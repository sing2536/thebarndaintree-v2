const list = [
    {
        id: 0,
        label: 'Direct',
    },
    {
        id: 1,
        label: 'Stayz',
    },
    {
        id: 2,
        label: 'Airbnb',
    },
    {
        id: 3,
        label: 'Flip Key',
    },
    {
        id: 4,
        label: 'Homeaway',
    },
    {
        id: 5,
        label: 'Booking.com',
    },
    {
        id: 6,
        label: 'Gumtree',
    },
    {
        id: 999,
        label: 'Other',
    },
]

const getLabel = (id) => {
    const item = list.find(x => x.id == id)
    if (item) return item.label
    return 'unknown'
}

export default { list, getLabel }