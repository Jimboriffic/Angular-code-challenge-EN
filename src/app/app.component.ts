import { Component } from '@angular/core';

type VehicleType = 'auto' | 'motor' | 'scooter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Shared vehicle state is here so the form and preview stays in sync
  vehicleType: VehicleType = 'auto';
}