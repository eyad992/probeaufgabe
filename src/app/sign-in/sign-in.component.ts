import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  Form!: FormGroup;
  public submitted: boolean = false;
  public isLoading: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.Form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

    });
  }

  clearPlaceholder(event: any) {
    event.target.classList.add('focused');
  }

  restorePlaceholder(event: any) {
    if (event.target.value === '') {
      event.target.classList.remove('focused');
    }
  }
  onSubmit() {
    console.log('Email:', this.Form.value.email);
    console.log('Password:', this.Form.value.password);
    this.submitted = true;
    this.isLoading = true;
    if (this.Form.invalid) {
      this.isLoading = false;
    } else {
      setTimeout(() => {
        const email = this.Form.value.email;
        const password = this.Form.value.password;
        localStorage.setItem('password', password);
        localStorage.setItem('email', email);
        this.router.navigate(['/server']);
        this.Form.reset();
        this.isLoading = false;
      }, 1000);
    }
}
}
