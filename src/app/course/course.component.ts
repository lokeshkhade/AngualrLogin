import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courseForm = this.fb.group({
    name: [''],

  });
  course: any;
  data: any;
  kisan: any;


  displayedColumns: string[] = ['id', 'name'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private fb: FormBuilder, private ds: DataService, private ss: StudentService) { }

  ngOnInit(): void {

    this.getCourse();
  }




  getCourse() {
    this.ds.getData('courses/getCourses').subscribe(res => {
      this.course = res;
      this.dataSource = new MatTableDataSource(this.course);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.course);

    });
  }
  onSubmit() {

    console.log(this.courseForm.value);

    this.ds.postData('courses', this.courseForm.value).subscribe(res => {
      this.data = res;
      if (this.data)
        alert('Data Saved Succesfully');
    });
    this.getCourse();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
