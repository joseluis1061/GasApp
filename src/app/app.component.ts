import { Component, inject } from '@angular/core';
import { FireauthService } from './common/services/fireauth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private fireauthService: FireauthService = inject(FireauthService);
  constructor() { }

}
