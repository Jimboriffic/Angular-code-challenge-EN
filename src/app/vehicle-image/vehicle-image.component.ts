import { Component, Input } from '@angular/core';

type VehicleType = 'auto' | 'motor' | 'scooter';
// type VehicleSubtype = 'Hatchback' | 'Sedan' | 'Station' | 'Cabriolet' | 'Coupé' 
// | 'MPV' | 'Terreinauto' | 'All-road' | 'Naked' | 'Enduro' | 'Race' | 'Toermotor' |
// 'Chopper' | 'Zijspan'; 

@Component({
  selector: 'app-vehicle-image',
  templateUrl: './vehicle-image.component.html',
  styleUrls: ['./vehicle-image.component.css']
})

// receives the selected vehicle type from the parent in order to update preview
export class VehicleImageComponent {
  @Input() vehicleType: VehicleType = 'auto';
  @Input() vehicleSubtype = 'Hatchback';

// For current vehicle selection it matches the image path
  get vehicleImage(): string {
    return `assets/${this.vehicleType}.jpg`;
    // return `assets/${this.vehicleSubType}.jpg`;
  }
}