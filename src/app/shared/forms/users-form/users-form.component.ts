import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/schema/user.model';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit {
  @Input() data: any;
  @Output() formEvent = new EventEmitter<any>();

  formData: User = {
    _id: undefined,
    email: undefined,
    role: undefined,
    name: undefined,
    qrCode: undefined,
    birthDate: undefined,
    gender: undefined,
    money: undefined,
    tokens: undefined,
    image: undefined,
    createdAt: undefined,
  };

  constructor() {}

  ngOnInit(): void {
    if (this.data && this.data._id) {
      this.formData = {
        _id: this.data._id,
        email: this.data.email,
        role: this.data.role,
        name: this.data.name,
        qrCode: this.data.qrCode,
        birthDate: new Date(this.data.birthDate),
        gender: this.data.gender,
        money: this.data.money,
        tokens: this.data.tokens,
        image: this.data.image,
        createdAt: this.data.createdAt,
      };
    }
  }

  submit(): void {
    this.formEvent.emit(this.formData);
  }

  cancel(): void {
    this.formEvent.emit(-1);
  }

  changeImage(): void {
    const imageInput: any = document.getElementById('imageInput');
    imageInput.click();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.toBase64(event.target.files[0]).then((base64: any) => {
        this.formData.image = base64;
      });
    }
  }

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
