const list = [
    {
        id: 0,
        label: 'Enquiry',
        tableClass: '',
    },
    {
        id: 1,
        label: 'Pending',
        tableClass: 'bg-orange',
    },
    {
        id: 2,
        label: 'Deposit',
        tableClass: 'bg-purple',
    },
    {
        id: 3,
        label: 'Paid',
        tableClass: 'bg-green',
    },
    {
        id: 4,
        label: 'Completed',
        tableClass: '',
    },
    {
        id: 5,
        label: 'Cancelled',
        tableClass: 'bg-red',
    },
    {
        id: 6,
        label: 'Blockout',
        tableClass: 'bg-blue',
    },
]

const getLabel = (id) => {
    const item = list.find(x => x.id == id)
    if (item) return item.label
    return 'unknown'
}

const getTableClass = (id) => {
    const item = list.find(x => x.id == id)
    if (item) return item.tableClass
    return ''
}

export default { list, getLabel, getTableClass }