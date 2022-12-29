const list = [
    {
        id: 0,
        label: 'Check',
        tableClass: 'bg-orange',
    },
    {
        id: 1,
        label: 'No',
        tableClass: '',
    },
    {
        id: 2,
        label: 'Yes',
        tableClass: 'bg-red',
    },
    {
        id: 3,
        label: 'Sent',
        tableClass: 'bg-green',
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