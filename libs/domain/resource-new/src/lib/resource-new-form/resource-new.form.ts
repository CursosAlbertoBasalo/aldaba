import { ABValidators } from '@ab/form';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CourseForm } from '../course-form/course.form';
import { Category } from '../models/category';
import { Resource } from '../models/resource';

@Component({
  selector: 'ab-resource-new',
  templateUrl: './resource-new.form.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceNewForm implements OnInit {
  form!: FormGroup;
  @Input() categories: Category[] = [];
  @Output() send = new EventEmitter<any>();
  @ViewChild(CourseForm, { static: true }) courseSubForm!: CourseForm;

  header = {
    heroClass: 'is-warning',
    title: 'Add a new resource',
    subtitle: 'Help us complete the Angular Builders Catalog.',
  };
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      resourcename: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      categoryId: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.minLength(3)]),
      url: new FormControl('', ABValidators.includes('http')),
      price: new FormControl(0),
      course: this.courseSubForm.buildGroup(),
    });
  }
  onSubmit() {
    const { resourcename: name, ...others } = this.form.value;
    const newResource: Resource = { name, ...others };
    if (newResource.categoryId !== 'courses') {
      delete newResource.course;
    }
    this.send.next(newResource);
  }
}
