// {
//       ID: 8,
//       CreatedAt: '2026-08-31T11:19:27.395356+07:00',
//       UpdatedAt: '2026-08-31T11:19:27.395356+07:00',
//       DeletedAt: null,
//       name: 'Jokowi',
//       description: 'Penghutang Handal',
//       location: 'yntkts',
//       image: '',
//       imageId: '',
//       userid: 1,
//       user: {
//         ID: 1,
//         CreatedAt: '0001-01-01T00:00:00Z',
//         UpdatedAt: '0001-01-01T00:00:00Z',
//         DeletedAt: null,
//         name: 'Jokowi',
//         email: 'Jokowi@solo.com',
//         password: '',
//         Events: null
//       },
//       datetime: '2026-01-11T15:54:55+07:00',
//       listBooking: null
// },

export interface EventType{
    "ID": number,
    "CreatedAt": string,
    "UpdatedAt": string,
    "DeletedAt": null | string,
    "name": string,
    "description": string,
    "location": string,
    "image": string,
    "imageId": string,
    "userid": number,
    "user": UserType,
    "datetime": string,
    "listBooking": null

}

export interface UserType{
    "ID": number,
    "id": number,
    "CreatedAt": string,
                "UpdatedAt": string,
                "DeletedAt": null | string,
                "name": string,
                "email": string,
                "password": string,
                "Events": null
}

export interface EventFormData{
    name?: string
    description?: string
    image?: string
    location?: string
    datetime?: string
}