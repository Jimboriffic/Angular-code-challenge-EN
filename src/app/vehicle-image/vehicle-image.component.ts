import { Component, Input } from '@angular/core';

type VehicleType = 'auto' | 'motor' | 'scooter';

@Component({
  selector: 'app-vehicle-image',
  templateUrl: './vehicle-image.component.html',
  styleUrls: ['./vehicle-image.component.css']
})

// receives the selected vehicle type from the parent in order to update preview
export class VehicleImageComponent {
  @Input() vehicleType: VehicleType = 'auto';

// For current vehicle selection it matches the image path
  get vehicleImage(): string {
    return `assets/${this.vehicleType}.jpg`;
  }
}