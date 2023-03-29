import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Validators } from '@angular/forms';
import { log } from 'console';
@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.scss']
})
export class StudentdetailsComponent implements OnInit {
  studentdetailsForm = this.fb.group({
    student_name: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    course_id: [null, [Validators.required]],
    mobile_no: ['', [Validators.pattern("[6789][0-9]{9}"), Validators.required, Validators.maxLength(10)]],

  });
  course: any;
  isEditMode: boolean = false;
  data: any;
  displayedColumns: string[] = ['student_id', 'student_name', 'dob', 'course_name', 'mobile_no', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  studentdetails: any;
  studentdatabyid: any;
  editstudent_id: any;

  constructor(private fb: FormBuilder, private ds: DataService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getCourse();
    this.getStudentDetails();
  }



  getCourse() {
    this.ds.getData('courses/getCourses').subscribe(res => {
      this.course = res;
      console.log(this.course);

    });
  }
  onSubmit() {
    if (this.studentdetailsForm.value.student_id) {
      console.log(this.studentdetailsForm.value.student_id);
    }

    this.studentdetailsForm.patchValue
      ({
        dob: this.datePipe.transform(this.studentdetailsForm.get("dob")?.value, "yyyy-MM-dd"),
      });

    console.log();

    this.ds.postData('studentdetails', this.studentdetailsForm.value).subscribe(res => {
      this.data = res;
      if (this.data)
        alert('Data Saved Succesfully');
    });
    this.getStudentDetails();
  }
  onClear() {
    this.studentdetailsForm.reset();
  }


  getStudentDetails() {

    this.ds.getData('studentdetails/getStudentDetails').subscribe((res: any) => {
      this.studentdetails = res;
      this.dataSource = new MatTableDataSource(this.studentdetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  onEdit(student_id: any) {

    this.studentdatabyid = this.studentdetails.find((f: any) => f.student_id === parseInt(student_id));
    console.log(this.studentdatabyid);
    this.isEditMode = true;
    this.editstudent_id = student_id;


    this.studentdetailsForm.patchValue
      ({
        student_id: this.studentdatabyid.student_id,
        student_name: this.studentdatabyid.student_name,
        dob: this.studentdatabyid.dob,
        course_id: this.studentdatabyid.course_id,
        mobile_no: this.studentdatabyid.mobile_no
      });

  }


  onUpdate() {
    console.log(this.editstudent_id);
    this.studentdetailsForm.patchValue
      ({
        dob: this.datePipe.transform(this.studentdetailsForm.get("dob")?.value, "yyyy-MM-dd"),
      });

    this.ds.updateData('studentdetails/updateStudentDetailsById/' + this.editstudent_id, this.studentdetailsForm.value).subscribe(res => {
      this.data = res;
      if (this.data)
        alert('Data Updated Succesfully');
    });
    this.getStudentDetails();
  }





  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}



