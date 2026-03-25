import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KentekenCheck } from 'rdw-kenteken-check';


type VehicleType = 'auto' | 'motor' | 'scooter';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  @Input() vehicleType: VehicleType = 'auto';
  @Output() vehicleTypeChange = new EventEmitter<VehicleType>();

  vehicleForm = new FormGroup({
    vehicleType: new FormControl<VehicleType>('auto', { nonNullable: true }),
    vehicleSubtype: new FormControl('Hatchback', { nonNullable: true }),
    licensePlate: new FormControl('', { nonNullable: true })
  });

  vehicleSubtype = 'Hatchback';
  licensePlate = '';
  showLicensePlateError = false;
  showLicensePlateSuccess = false;

  // Available subtype options for each vehicle type
  subtypes = {
    auto: ['Hatchback', 'Sedan', 'Station', 'Cabriolet', 'Coupé', 'MPV', 'Terreinauto'],
    motor: ['All-road', 'Naked', 'Enduro', 'Race', 'Toermotor', 'Chopper', 'Zijspan'],
    scooter: []
  };

   ngOnInit(): void {
    // Keeps subtype and parent state in sync when vehicle type changes
    this.vehicleForm.controls.vehicleType.valueChanges.subscribe((value) => {
    this.vehicleType = value;
    this.vehicleSubtype = this.subtypes[value][0] ?? '';

    this.vehicleForm.controls.vehicleSubtype.setValue(this.vehicleSubtype);
    this.vehicleTypeChange.emit(value);
    });

    // Normalize user input to Dutch licence plate format while typing
    this.vehicleForm.controls.licensePlate.valueChanges.subscribe((value) => {
    const cleaned = value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '') // All non letters or numbers are removed
      .slice(0, 6);

    const formatted = cleaned.match(/.{1,2}/g)?.join('-') ?? '';
    this.licensePlate = formatted;

    // Avoid triggering valueChanges again when writing back formatted value
    this.vehicleForm.controls.licensePlate.setValue(formatted, { emitEvent: false });
    
    // Earlier errors dissapear while user is typing
    this.showLicensePlateError = false; // 
    
    // Success state resets during typing
    this.showLicensePlateSuccess = false; 

    });
  }

  // Only validates after user leaves input
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