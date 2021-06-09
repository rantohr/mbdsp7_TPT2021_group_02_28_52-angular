import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from 'src/app/core/schema/news.model';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  @Input() data: any;
  @Output() formEvent = new EventEmitter<any>();

  formData: any = {
    _id: undefined,
    title: undefined,
    description: undefined,
    date: undefined,
    image: undefined,
  };

  constructor() {}

  ngOnInit(): void {
    if (this.data && this.data._id) {
      this.formData = {
        _id: this.data._id,
        title: this.data.title,
        description: this.data.description,
        date: new Date(this.data.date),
        image: this.data.image,
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
