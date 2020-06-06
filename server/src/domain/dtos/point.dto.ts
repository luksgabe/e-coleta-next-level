export class PointDto {
 
    id: number;
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    latitude: number;
    longitude: number;
    city: string;
    uf: string;

    constructor(obj: any) {
        this.id = obj.id;
        this.image = obj.image;
        this.name = obj.name;
        this.email = obj.email;
        this.whatsapp = obj.whatsapp;
        this.latitude = obj.latitude;
        this.longitude = obj.longitude;
        this.city = obj.city;
        this.uf = obj.uf;
    }
}