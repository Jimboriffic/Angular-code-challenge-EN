import { Component, Input } from '@angular/core';

type vehicleType = 'auto' | 'motor' | 'scooter';

const autoImageMap: Record<string, string> = {
  Hatchback: 'subtype/Hatchback.jpg',
  Sedan: 'subtype/Sedan.jpg',
  Station: 'subtype/Station.jpg',
  Cabriolet: 'subtype/Cabriolet.jpg',
  'Coupé': 'subtype/Coupe.jpg',
  MPV: 'subtype/MPV.jpg',
  Terreinauto: 'subtype/Terreinauto.jpg'
};

@Component({
  selector: 'app-vehicle-image',
  templateUrl: './vehicle-image.component.html',
  styleUrls: ['./vehicle-image.component.css']
})

// receives the selected vehicle type from the parent in order to update preview
export class VehicleImageComponent {
  @Input() vehicleType: vehicleType = 'auto';
  @Input() vehicleSubtype = '';

// For current vehicle selection it matches the image path
  get vehicleImage(): string {
    if (this.vehicleType === 'auto' && this.vehicleSubtype) {
      return `assets/${autoImageMap[this.vehicleSubtype] ?? 'auto.jpg'}`;
    }
    return `assets/${this.vehicleType}.jpg`;
  }
}