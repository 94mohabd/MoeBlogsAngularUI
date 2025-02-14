import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: LoginRequest;
  returnUrl: string = '/';

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute) {
    this.model = {
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    // Get the returnUrl query parameter
    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
    });
    console.log(this.returnUrl);
  }

  onFormSubmit(): void {
    this.authService.login(this.model).subscribe({
      next: (response) => {
        // Set Auth Cookie
        this.cookieService.set('Authorization', `Bearer ${response.token}`,
          undefined, '/', undefined, true, 'Strict');

        // Set User
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

        // Redirect back to Home or returnUrl
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
