import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  Form!: FormGroup;
  submitted = false;
  isLoading = false;


  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.Form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]

    }, {
      validator: this.passwordMatchValidator
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
    this.submitted = true;
    this.isLoading = true;
    if (this.Form.invalid) {
      this.isLoading = false;
      this.passwordMatchValidator
      console.log(this.passwordMatchValidator);
    } else {
      setTimeout(() => {
        const username = this.Form.value.username;
        const email = this.Form.value.email;
        const password = this.Form.value.password;
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('email', email);
        this.router.navigate(['/server']);
        this.Form.reset();
        this.isLoading = false;
      }, 2000);
    }
}



passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;

  if (password !== repeatPassword) {
    control.get('repeatPassword')?.setErrors({ passwordMismatch: true });
  } else {
    control.get('repeatPassword')?.setErrors(null);
  }
}
}
