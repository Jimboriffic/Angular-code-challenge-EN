import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KentekenCheck } from 'rdw-kenteken-check';


type VehicleType = 'auto' | 'motor' | 'scooter';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent {
  @Input() vehicleType: VehicleType = 'auto';
  @Output() vehicleTypeChange = new EventEmitter<VehicleType>();

  
  vehicleSubtype = 'Hatchback';
  licensePlate = '';
  showLicensePlateError = false;
  showLicensePlateSuccess = false;

  // Available subtypes options rely on selected vehicle type
   subtypes = {
    auto: ['Hatchback', 'Sedan', 'Station', 'Cabriolet', 'Coupé', 'MPV', 'Terreinauto'],
    motor: ['All-road', 'Naked', 'Enduro', 'Race', 'Toermotor', 'Chopper', 'Zijspan'],
    scooter: []
  };

// Resets the subtype when vehicle category changes and syncs new value
   onVehicleTypeChange(value: string): void {
    const nextType = value as VehicleType;
    this.vehicleType = nextType;
    this.vehicleSubtype = this.subtypes[nextType][0] ?? '';
    this.vehicleTypeChange.emit(nextType);
   }

    onLicensePlateInput(value: string): void {
    const cleaned = value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '') // All non letters or numbers are removed
      .slice(0, 6);

    this.licensePlate = cleaned.match(/.{1,2}/g)?.join('-') ?? ''; 
    this.showLicensePlateError = false; // Earlier errors dissapear while user is typing
    this.showLicensePlateSuccess = false; // Success state resets during typing
  }

  onLicensePlateBlur(): void {
    const cleaned = this.licensePlate.replace(/-/g, '');
  
    if (!cleaned) {
      this.showLicensePlateError = false;
      this.showLicensePlateSuccess = false;
      return;
    }
    
    const checker = new KentekenCheck(cleaned);
    const isInvalid = checker.formatLicense() === 'XX-XX-XX';

    this.showLicensePlateError = isInvalid;
    this.showLicensePlateSuccess = !isInvalid;

  }
}