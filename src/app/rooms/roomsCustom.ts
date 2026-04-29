export interface RoomNumbers    {
    bookedRooms: number;
    availableRooms: number;
}

export interface RoomList   {
    roomNumber: number,
    roomType: string;
    price: number;
    checkinDate: Date;
    chances: number;
}