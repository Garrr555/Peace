const formatDateTime = (date:string) => {
    return new Date(date).toLocaleString("id-iD", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

export default formatDateTime