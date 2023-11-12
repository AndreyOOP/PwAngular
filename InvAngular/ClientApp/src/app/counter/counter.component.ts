import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter-component',
  template: `
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" [(ngModel)]="password" (input)="checkPasswordStrength()">
    </div>
    <br><br><br><br><br><br><br>
    <div class="password-strength">
      <p>Password Strength:</p>
      <div class="strength-section" [ngStyle]="{'background-color': leftSection}"></div>
      <div class="strength-section" [ngStyle]="{'background-color': midleSection}"></div>
      <div class="strength-section" [ngStyle]="{'background-color': rightSection}"></div>
    </div>
  `,
  styles: [`
    .password-strength {
      display: flex;
      align-items: center;
    }

    .strength-section {
      height: 20px;
      width: 100px;
      margin: 5px 5px 5px 5px;
    }
  `]
})
export class PasswordStrengthComponent implements OnInit {
  password: string = '';
  leftSection: string = 'gray';
  midleSection: string = 'gray';
  rightSection: string = 'gray';

  ngOnInit() {
    this.resetColors();
  }

  checkPasswordStrength() {
    const strength = this.calculatePasswordStrength();
    this.updateColors(strength);
  }

  calculatePasswordStrength(): number {
    //return this.password.length; - use for testing

    const hasLetters = /[a-zA-Z]/.test(this.password);
    const hasNumbers = /\d/.test(this.password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
    if (this.password.length === 0) {
      return 0; // empty
    } else if (this.password.length < 8) {
      return 1; // less than 8
    } else if (hasLetters && hasNumbers && hasSymbols) {
      return 4; // Strong
    } else if ((hasLetters && hasNumbers) || (hasLetters && hasSymbols) || (hasNumbers && hasSymbols)) {
      return 3; // Medium
    } else if (hasLetters || hasNumbers || hasSymbols) {
      return 2; // Weak
    } else {
      return -1; // error
    }
  }

  updateColors(strength: number) {
    this.resetColors();

    switch (strength) {
      case 0:
        break;
      case 1:
        this.leftSection = 'red';
        this.midleSection = 'red';
        this.rightSection  = 'red';
        break;
      case 2:
        this.leftSection = 'red';
        break;
      case 3:
        this.leftSection = 'yellow';
        this.midleSection = 'yellow';
        break;
      case 4:
        this.leftSection = 'green';
        this.midleSection = 'green';
        this.rightSection = 'green';
        break;

    }
  }

  resetColors() {
    this.leftSection = 'gray';
    this.midleSection = 'gray';
    this.rightSection = 'gray';
  }
}
