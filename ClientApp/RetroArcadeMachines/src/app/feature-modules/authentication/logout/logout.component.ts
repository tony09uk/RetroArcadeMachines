import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.signOut();
    this._router.navigate(['/']);
  }

}
