import { Component } from '@angular/core';

type VehicleType = 'auto' | 'motor' | 'scooter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  vehicleType: VehicleType = 'auto';
  vehicleSubtype = 'Hatchback';
  licensePlate = '';

  // Available subtypes options rely on selected vehicle type
   subtypes = {
    auto: ['Hatchback', 'Sedan', 'Station', 'Cabriolet', 'Coupé', 'MPV', 'Terreinauto'],
    motor: ['All-road', 'Naked', 'Enduro', 'Race', 'Toermotor', 'Chopper', 'Zijspan'],
    scooter: []
  };
  
// For current vehicle selection it matches the image path
  get vehicleImage(): string {
    return `assets/${this.vehicleType}.jpg`;
  }
}
