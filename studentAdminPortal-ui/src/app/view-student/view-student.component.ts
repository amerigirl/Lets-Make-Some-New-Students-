import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/ui-models/student.model';
import { StudentService } from '../students/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  studentId: string | null | undefined;

  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress:''
    }
  }

  constructor(private readonly studentService: StudentService,
    private readonly route: ActivatedRoute) //creates a route for the student ID
    {

    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(       //subscribes to the params coming from the route
    (params)=> {
      this.studentId = params.get('id');

      if(this.studentId) {
            this.studentService.getStudent(this.studentId)
            .subscribe((successResponse)=>{
              this.student = successResponse;
            }
          );
      }
    }
  );
}


}